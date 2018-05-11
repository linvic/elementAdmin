<template>
    <div>
        <el-form ref="form" status-icon :rules="form_rules" :model="form" label-width="120px">
            <el-form-item label="父级：">
                <el-cascader
                :options="options"
                :props="optionsProps"
                :show-all-levels="false"
                v-model="optionsValue"
                change-on-select
                clearable
                @change="cascaderChange"
                ></el-cascader>
            </el-form-item>
            <el-form-item label="字典类别名称：" prop="TypeName">
                <el-input v-model="form.TypeName"></el-input>
            </el-form-item>
            <el-form-item label="字典类编号：" prop="TypeCode">
                <el-input v-model="form.TypeCode"></el-input>
            </el-form-item>
            <el-form-item label="排序：" prop="SortOrder">
                <el-input v-model="form.SortOrder" type="number"></el-input>
            </el-form-item>
            <el-form-item label="是否有效：">
                <el-switch v-model="form.IsEnabled"></el-switch>
            </el-form-item>
            <el-form-item label="备注：">
                <el-input type="textarea" v-model="form.TypeDesc" :rows="3"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit()">保存</el-button>
                <el-button @click="closeDialog()">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data () {
        return {
            form: {
                ParentId: 0,
                TypeName: '',
                TypeCode: '',
                SortOrder: null,
                IsEnabled: true,
                TypeDesc: ''
            },
            form_rules: {
                TypeName: [
                    { required: true, message: '请输入字典类别名称', trigger: 'blur' }
                ],
                TypeCode: [
                    { required: true, message: '请输入字典类别编号', trigger: 'blur' }
                ],
                SortOrder: [
                    { required: true, message: '请输入字典类别排序', trigger: 'blur' }
                ]
            },
            optionsValue: [],
            options: [],
            optionsProps: {
                value: 'id',
                label: 'text',
                children: 'children'
            }
        }
    },
    props: {
        id: {
            type: Number
        }
    },
    created() {
        this.getDataTree();
    },
    methods: {
        getDataTree() { // 获取树结构
            this.$https.get('/api/Dicts/GetTypesTree?is_enabled=').then((result) => {
                if (result.data.code == 0) {
                    this.options = result.data.data;
                    if (this.id) { // 编辑
                        this.getOldData();
                    }
                } else {
                    this.$message({
                        type: 'error',
                        showClose: true,
                        message: result.data.message
                    })
                }
            })
            
        },
        getOldData() { // 获取编辑数据

            this.$https.get('/api/Dicts/GetTypesDetail?type_id=' + this.id).then((result) => {
                if (result.data.code == 0) {
                    let _data = result.data.data;
                    this.form.ParentId = _data.parent_id;
                    this.optionsValue = this.getTreeDeepArr(_data.parent_id, this.options);
            
                    this.form.TypeName = _data.type_name;
                    this.form.TypeCode = _data.type_code;
                    this.form.SortOrder = _data.sort_order;
                    this.form.IsEnabled = _data.is_enabled;
                    this.form.TypeDesc = _data.dicts_desc;
                } else {
                    this.$message({
                        type: 'error',
                        showClose: true,
                        message: result.data.message
                    })
                }
            })
        },
        submit() { // 提交
            this.$refs.form.validate((valid) => {
                if (valid) {
                    let _postData = {
                        ParentId: this.form.ParentId,
                        TypeName: this.form.TypeName,
                        TypeCode: this.form.TypeCode,
                        SortOrder: this.form.SortOrder,
                        IsEnabled: this.form.IsEnabled,
                        IsDeleted: false,
                        TypeDesc: this.form.TypeDesc,
                    }

                    if (this.id) { // 编辑
                        _postData.TypeId = parseInt(this.id);
                        this.$https.post('/api/Dicts/UpdateTypes', _postData).then((result) => {
                            if (result.data.code == 0) {
                                this.$message({
                                    type: 'success',
                                    showClose: true,
                                    message: '编辑成功',
                                    duration: 1500,
                                    onClose: () => {
                                        // 关闭当前dialog，
                                        this.closeDialog('dialogDicTypeEdit');
                                        // 刷新列表
                                        this.$emit('parentGetDataList');
                                    }
                                })
                            } else {
                                this.$message({
                                    type: 'error',
                                    showClose: true,
                                    message: result.data.message
                                })
                            }
                        })
                    } else { // 新增

                        this.$https.post('/api/Dicts/AppendTypes', _postData).then((result) => {
                            if (result.data.code == 0) {
                                this.$message({
                                    type: 'success',
                                    showClose: true,
                                    message: '添加成功',
                                    duration: 1500,
                                    onClose: () => {
                                        // 关闭当前dialog，
                                        this.closeDialog('dialogDicTypeAdd');
                                        // 刷新列表
                                        this.$emit('parentGetDataList');
                                    }
                                })
                            } else {
                                this.$message({
                                    type: 'error',
                                    showClose: true,
                                    message: result.data.message
                                })
                            }
                        })
                    }
                    

                } else {
                    console.error('验证失败');
                    return false;
                }
            });
        },
        closeDialog(name) { // 关闭当前
            // this.$refs.form.resetFields(); // 重置表单
            if (!name) {
                this.$emit('closeDialog', 'dialogDicTypeAdd'); // 执行父组件关闭方法
                this.$emit('closeDialog', 'dialogDicTypeEdit'); // 执行父组件关闭方法
            } else {
                this.$emit('closeDialog', name); // 执行父组件关闭方法
            }
        },
        cascaderChange(value) {
            console.log(value[value.length-1]);
            this.form.ParentId = value[value.length-1];
        },
        getTreeDeepArr(key, treeData) {

            let arr = []; // 在递归时操作的数组
            let returnArr = []; // 存放结果的数组
            let depth = 0; // 定义全局层级
            // 定义递归函数
            function childrenEach(childrenData, depthN) {

                for (var j = 0; j < childrenData.length; j++) {

                    depth = depthN; // 将执行的层级赋值 到 全局层级

                    arr[depthN] = (childrenData[j].id);
                    
                    if (childrenData[j].id == key) {

                        // returnArr = arr; // 原写法不行, 因 此赋值存在指针关系
                        returnArr = arr.slice(0, depthN+1); //将目前匹配的数组，截断并保存到结果数组，
                        break

                    } else {

                        if (childrenData[j].children) {

                            depth ++;
                            childrenEach(childrenData[j].children, depth);

                        }
                    }

                }
                return returnArr;
            }
            return childrenEach(treeData, depth);
        }
    }
}
</script>
<style scoped>
</style>