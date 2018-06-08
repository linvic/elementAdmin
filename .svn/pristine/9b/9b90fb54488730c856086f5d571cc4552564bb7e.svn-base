<template>
    <div>
        <el-form ref="form" :rules="form_rules" :model="form" label-width="120px" size="small">
            <el-form-item label="限定时间" prop="config_value">
                <el-input v-model="form.config_value" placeholder="请输入"></el-input>
            </el-form-item>
            
            <el-form-item label="时间单位" prop="config_unit">
                <el-select v-model="form.config_unit">
                    <el-option label="小时" value="1"></el-option>
                    <el-option label="天" value="2"></el-option>
                </el-select>
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
                config_value: '', // 时间
                config_unit: '' // 时间单位
            },
            form_rules: {
                config_value: [
                    { required: true, message: '请输入时间', trigger: 'blur'}
                ],
                config_unit: [
                    { required: true, message: '请选择时间单位', trigger: 'change'}
                ]
            }
        }
    },
    props: {
        oldData: {
            type: Object
        }
    },
    created() {
        this.form.config_value = this.oldData.config_value;
        this.form.config_unit = this.oldData.config_unit;
    },
    watch: {
    },
    methods: {
        submit() { // 提交
            this.$refs.form.validate((valid) => {
                if (valid) {
                    let _postData = JSON.parse(JSON.stringify(this.form));
                     _postData.config_code = this.oldData.config_code;
                    
                    
                    this.$https.post('/api/system_config/update_system_config_config_value', _postData).then((result) => {
                        if (result.data.code == 0) {
                            this.$message({
                                type: 'success',
                                showClose: true,
                                message: '修改成功',
                                duration: 1500,
                                onClose: () => {
                                    // 关闭当前dialog
                                    this.closeDialog('dialogFollowEdit');
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
                    

                } else {
                    console.error('验证失败');
                    return false;
                }
            });
        },
        closeDialog(name) { // 关闭当前
            // this.$refs.form.resetFields(); // 重置表单
            if (!name) {
                this.$emit('closeDialog', 'dialogFollowEdit'); // 执行父组件关闭方法
            } else {
                this.$emit('closeDialog', name); // 执行父组件关闭方法
            }
        }
    }
}
</script>
<style scoped>
.el-tag {
    margin-right: 10px;
}
</style>