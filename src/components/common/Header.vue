<template>
    <div class="header">
        <el-row>
            
            <h1 class="header_logo">
                <img src="@/assets/images/logo_white.png">
            </h1>
            <ul class="header_tool">
                <li>
                    <el-tooltip class="item" effect="dark" placement="bottom">
                        <span slot="content">账号：{{UserAccount}}</span>
                        <a href="javascript:;"><i class="el-icon-web-user"></i> </a>
                    </el-tooltip>
                </li>
                <li @click="dialogResetPwd = true">
                    <el-tooltip class="item" effect="dark" placement="bottom">
                        <span slot="content">重置密码</span>
                        <a href="javascript:;"><i class="el-icon-web-reset-pwd"></i> </a>
                    </el-tooltip>
                </li>
                <li>
                    <el-tooltip class="item" effect="dark" content="退出" placement="bottom">
                        <a href="javascript:;" @click="LogOff()"><i class="el-icon-web-sign-out"></i></a>
                    </el-tooltip>
                </li>
            </ul>
        </el-row>

        <el-dialog v-if="dialogResetPwd" title="重置密码" :visible.sync="dialogResetPwd" append-to-body width="600px">
            <resetPwd @closeDialog="closeDialog"></resetPwd>
        </el-dialog>
    </div>
</template>

<script>
import resetPwd from './resetPwd'
export default {
    components: {
        resetPwd
    },
    data () {
        return {
            UserAccount: '',
            dialogResetPwd: false // 重置密码弹层
        }
    },
    created(){
        this.UserAccount = localStorage.getItem('UserAccount');
    },
    methods: {
        closeDialog(name) {
            this[name] = false;
        },
        // 退出登录
        LogOff() {
            this.$https.post('api/Account/LogOff').then((result) => {
                if (result.data.code == 0) {
                    localStorage.removeItem("UserAccount");
                    this.$router.replace('/Login');
                } else {
                    this.$message({
                        type: 'error',
                        showClose: true,
                        message: result.data.message
                    })
                }
            })
            .catch((error) => {
                console.log('请求失败',error)
            })
        }
    }
}
</script>
<style scoped>
    .header {
        width: 100%;
        min-height: 60px;
        background-color: #4e97d9;
    }
    .header .header_logo {
        display: inline-block;
    }
    .header .header_logo img {
        display: block;
        width: 142px;
        height: 38px;
        margin-top: 11px;
        margin-left: 20px;
    }
    .header .header_tool {
        float: right;
    }
    .header .header_tool li {
        float: left;
        line-height: 60px;
    }
    .header .header_tool li a {
        position: relative;
        display: block;
        padding-left: 20px;
        padding-right: 20px;
        color: #fff;
    }
    .header .header_tool li a:hover {
        background-color: rgba(0,0,0,.1);
    }
</style>
