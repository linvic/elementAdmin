<template>
    <div>
        <el-form ref="form" status-icon :rules="form_rules" :model="form" label-width="100px">
            <el-form-item label="所属组织" prop="unit_id">
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
            <el-form-item label="职位名称" prop="position_name">
                <el-input v-model="form.position_name"></el-input>
            </el-form-item>
            <el-form-item label="是否启用">
                <el-switch v-model="form.is_use" active-value="1" inactive-value="0"></el-switch>
            </el-form-item>
            <el-form-item label="职位备注">
                <el-input type="textarea" v-model="form.position_remark" :rows="3"></el-input>
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
                unit_id: null,
                position_name: '',
                is_use: "1",
                position_remark: ''
            },
            form_rules: {
                unit_id: [
                    { required: true, message: '请选择所属组织', trigger: 'change' }
                ],
                position_name: [
                    { required: true, message: '请输入字典名称', trigger: 'blur' }
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
        },
        pid: {
            type: [Number, String]
        }
    },
    created() {
        this.getDataTree();
    },
    methods: {
        getDataTree() { // 获取树结构
            this.$https.get('/api/company_unit/GetUnitsTree').then((result) => {
                if (result.data.code == 0) {
                    this.options = result.data.data;
                    if (this.pid && this.pid != 0) { // 新增时，取左侧已选类别
                        this.form.unit_id = this.pid;
                        this.optionsValue = this.getTreeDeepArr(this.pid, this.options);
                    }
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

            this.$https.get('/api/company_user_unit_position/get_company_user_unit_positiondetails?id=' + this.id).then((result) => {
                if (result.data.code == 0) {
                    let _data = result.data.data;
                    this.form.unit_id = _data.unit_id;
                    this.optionsValue = this.getTreeDeepArr(_data.unit_id, this.options);
                    this.form.position_name = _data.position_name;
                    this.form.is_use = _data.is_use.toString();
                    this.form.position_remark = _data.position_remark;
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
                        unit_id: this.form.unit_id,
                        position_name: this.form.position_name,
                        is_use: this.form.is_use,
                        position_remark: this.form.position_remark
                    }
                    if (this.id) { // 编辑
                        _postData.id = parseInt(this.id);
                        this.$https.post('/api/company_user_unit_position/update_company_user_unit_position', _postData).then((result) => {
                            if (result.data.code == 0) {
                                this.$message({
                                    type: 'success',
                                    showClose: true,
                                    message: '编辑成功',
                                    duration: 1500,
                                    onClose: () => {
                                        // 关闭当前dialog，
                                        this.closeDialog('dialogPositionEdit');
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

                        this.$https.post('/api/company_user_unit_position/create_company_user_unit_position', _postData).then((result) => {
                            if (result.data.code == 0) {
                                this.$message({
                                    type: 'success',
                                    showClose: true,
                                    message: '添加成功',
                                    duration: 1500,
                                    onClose: () => {
                                        // 关闭当前dialog，
                                        this.closeDialog('dialogPositionAdd');
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
                this.$emit('closeDialog', 'dialogPositionAdd'); // 执行父组件关闭方法
                this.$emit('closeDialog', 'dialogPositionEdit'); // 执行父组件关闭方法
            } else {
                this.$emit('closeDialog', name); // 执行父组件关闭方法
            }
        },
        cascaderChange(value) {
            this.form.unit_id = value[value.length-1];
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