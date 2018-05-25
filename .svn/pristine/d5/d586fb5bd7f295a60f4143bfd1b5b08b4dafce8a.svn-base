<template>
    <div v-loading="loading">
        <div class="">
            <el-form label-position="right" ref="form" :model="form" :rules="rules" status-icon>
                <el-form-item prop="old_user_pwd">
                    <el-input v-model="form.old_user_pwd" type="password" placeholder="请输入旧密码"></el-input>
                </el-form-item>
                <el-form-item prop="user_pwd">
                    <el-input v-model="form.user_pwd" type="password" placeholder="请输入新密码"></el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                    <el-input v-model="form.checkPass" type="password" placeholder="请再次输入新密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit()">立即重置密码</el-button>
                    <el-button @click="closeDialog()">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        var validatePwd = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.form.user_pwd) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        }
        return {
            form: {
                old_user_pwd: '',
                user_pwd: '',
                checkPass: ''
            },
            rules: {
                old_user_pwd: [
                    { required: true, message: '请输入旧密码', trigger: 'blur' },
                    { min: 6, message: '长度不少于6位', trigger: 'blur' }
                ],
                user_pwd: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { min: 6, message: '长度不少于6位', trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePwd, trigger: 'blur'}
                ]
            },
            loading: true
        }
    },
    mounted(){
        this.loading = false;
    },
    methods: {
        submit() { // 提交
            this.$refs.form.validate((valid) => {
                if (valid) {
                    let _postData = {
                        old_user_pwd: this.form.old_user_pwd,
                        user_pwd: this.form.user_pwd
                    };
                    this.$https.post('/api/Account/update_users_pwd', _postData).then((result) => {
                        if (result.data.code == 0) {
                            this.$message({
                                type: 'success',
                                showClose: true,
                                message: '密码重置成功，请重新登录',
                                duration: 1500,
                                onClose: () => {
                                    // 关闭当前dialog
                                    this.closeDialog('dialogOldAdd');
                                    // 退出登录
                                    localStorage.removeItem("UserAccount");
                                    this.$router.replace('/Login');
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
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        closeDialog(name) { // 关闭当前
            // this.$refs.form.resetFields(); // 重置表单
            if (!name) {
                this.$emit('closeDialog', 'dialogResetPwd'); // 执行父组件关闭方法
            } else {
                this.$emit('closeDialog', name); // 执行父组件关闭方法
            }
        }
    }
}
</script>
<style scoped>
</style>
