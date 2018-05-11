<template>
    <div class="header">
        <el-row>
            
            <h1 class="header_logo">
                <img src="@/assets/images/logo_white.png">
            </h1>
            <ul class="header_tool">
                <li>
                    <el-tooltip class="item" effect="dark" content="退出" placement="bottom">
                        <a href="javascript:;" @click="LogOff()"><i class="el-icon-web-sign-out"></i></a>
                    </el-tooltip>
                </li>
            </ul>
        </el-row>
    </div>
</template>

<script>
export default {
    data () {
        return {
        }
    },
    methods: {
        // 退出登录
        LogOff() {
            this.$https.post('api/Account/LogOff').then((result) => {
                if (result.data.code == 0) {
                    localStorage.removeItem("UserAccount");
                    router.replace({
                        path: '/Login'
                    })
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
        line-height: 60px;
    }
    .header .header_tool li a {
        position: relative;
        display: block;
        padding-left: 25px;
        padding-right: 25px;
        color: #fff;
    }
    .header .header_tool li a:hover {
        background-color: rgba(0,0,0,.1);
    }
</style>
