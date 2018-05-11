<template>
    <div>
        <el-form ref="form" status-icon :rules="form_rules" :model="form" label-width="120px">
            <el-form-item label="字典所属类别：" prop="TypeId">
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
            <el-form-item label="字典名称：" prop="ValueName">
                <el-input v-model="form.ValueName"></el-input>
            </el-form-item>
            <el-form-item label="字典值：" prop="DictsValue">
                <el-input v-model="form.DictsValue"></el-input>
            </el-form-item>
            <el-form-item label="排序：" prop="SortOrder">
                <el-input v-model="form.SortOrder" type="number"></el-input>
            </el-form-item>
            <el-form-item label="是否默认：">
                <el-switch v-model="form.IsDefault"></el-switch>
            </el-form-item>
            <el-form-item label="备注：">
                <el-input type="textarea" v-model="form.ValueDesc" :rows="3"></el-input>
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
                TypeId: null,
                ValueName: '',
                DictsValue: '',
                SortOrder: null,
                IsDefault: true,
                ValueDesc: ''
            },
            form_rules: {
                TypeId: [
                    { required: true, message: '请选择所属类别', trigger: 'change' }
                ],
                ValueName: [
                    { required: true, message: '请输入字典名称', trigger: 'blur' }
                ],
                DictsValue: [
                    { required: true, message: '请输入字典值', trigger: 'blur' }
                ],
                SortOrder: [
                    { required: true, message: '请输入字典排序', trigger: 'blur' }
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
            this.$https.get('/api/Dicts/GetTypesTree').then((result) => {
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

            this.$https.get('/api/Dicts/GetDictValue?value_id=' + this.id).then((result) => {
                if (result.data.code == 0) {
                    let _data = result.data.data;
                    this.form.TypeId = _data.type_id;
                    this.optionsValue = this.getTreeDeepArr(_data.type_id, this.options);
            
                    this.form.ValueName = _data.value_name;
                    this.form.DictsValue = _data.value_code;
                    this.form.SortOrder = _data.sort_order;
                    this.form.IsDefault = _data.is_default === 1 ? true : false;
                    this.form.ValueDesc = _data.value_desc;
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
                        TypeId: this.form.TypeId,
                        ValueName: this.form.ValueName,
                        DictsValue: this.form.DictsValue,
                        SortOrder: this.form.SortOrder,
                        IsDefault: this.form.IsDefault,
                        IsEnabled: true,
                        IsDeleted: false,
                        ValueDesc: this.form.ValueDesc
                    }
                    if (this.id) { // 编辑
                        _postData.ValueId = parseInt(this.id);
                        this.$https.post('/api/Dicts/UpdateValues', _postData).then((result) => {
                            if (result.data.code == 0) {
                                this.$message({
                                    type: 'success',
                                    showClose: true,
                                    message: '编辑成功',
                                    duration: 1500,
                                    onClose: () => {
                                        // 关闭当前dialog，
                                        this.closeDialog('dialogDicEdit');
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

                        this.$https.post('/api/Dicts/AppendValues', _postData).then((result) => {
                            if (result.data.code == 0) {
                                this.$message({
                                    type: 'success',
                                    showClose: true,
                                    message: '添加成功',
                                    duration: 1500,
                                    onClose: () => {
                                        // 关闭当前dialog，
                                        this.closeDialog('dialogDicAdd');
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
                this.$emit('closeDialog', 'dialogDicAdd'); // 执行父组件关闭方法
                this.$emit('closeDialog', 'dialogDicEdit'); // 执行父组件关闭方法
            } else {
                this.$emit('closeDialog', name); // 执行父组件关闭方法
            }
        },
        cascaderChange(value) {
            this.form.TypeId = value[value.length-1];
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