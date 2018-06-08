<template>
    <div v-loading="loading" class="login-page">
        <div class="login-form">
            <h2>智领招商管理系统</h2>
            <el-form label-position="right" ref="loginForm" :model="loginForm" :rules="rules" status-icon @keyup.enter.native="submitForm('loginForm')" >
                <el-form-item prop="account">
                    <el-input v-model="loginForm.account" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item class="text-center">
                    <el-button type="primary" @click="submitForm('loginForm')">立即登录</el-button>
                    <el-button @click="resetForm('loginForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        var validateAcc = (rule, value, callback) => {
            var telmatch = /^1[0-9]{10}$/;
            if (!value) {
                return callback(new Error('请输入账号'));
            }
            // else if (!telmatch.test(value)) {
            //     return callback(new Error('请输入正确的手机号'));
            // }
            else {
                callback();
            }
        }
        var validatePwd = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入密码'));
            } else if (value.length < 6) {
                return callback(new Error('密码位数应不少于6位'));
            } else {
                callback();
            }
        }
        return {
            loginForm: {
                account: '',
                password: ''
            },
            rules: {
                account: [
                    { validator: validateAcc, trigger: 'blur' }
                ],
                password: [
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
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$https.post('/api/Account/login', {
                        user_account: this.loginForm.account,
                        user_pwd: this.loginForm.password
                    })
                    .then((result) => {
                        if (result.data.code == 0) {
                            console.log(result.data);
                            // 将当前登录账号存储
                            localStorage.setItem('UserAccount', this.loginForm.account);
                            this.$router.replace('/Index');
                        } else {
                            this.$message({
                                type: 'error',
                                showClose: true,
                                message: result.data.message
                            })
                        }
                    })
                    .catch((error) => {
                        console.log('登录请求失败',error)
                    })
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>
<style scoped>
    .login-page {
        position: absolute;
        width: 100%;
        height: 100%;
        background: url('/static/img/loginBg.jpg') no-repeat;
    }
    .login-form {
        position: absolute;
        background-color: #fff;
        top: 50%;
        left: 50%;
        padding: 50px;
        width: 400px;
        margin-left: -251px;
        height: 300px;
        margin-top: -200px;
        border: 1px solid #eee;
    }
    .login-form h2 {
        font-weight: normal;
        text-align: center;
        font-size: 28px;
        margin-bottom: 50px;
        color: #333;
        letter-spacing: 1px;
    }
    .login-form .copy {
        text-align: center
    }
    .text-center {
        margin-top: 40px;
        text-align: center
    }
    @media screen and (max-width: 510px) {
        .login-form {
            box-sizing: border-box;
            width: 320px;
            margin-left: -160px;
            padding: 20px;
        }
        .login-form h2 {
            margin-bottom: 30px;
        }
        .text-center {
            margin-top: 20px;
        }
    }
</style>
