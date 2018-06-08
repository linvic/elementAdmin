<template>
    <div class="NotFound">
        <img src="@/assets/images/404.png">
        <h1>{{Text }}</h1>
        <p><span>{{second}}</span>秒后将自动跳转到 <a href="/Index">首页</a></p>
    </div>
</template>

<script>
export default {
    data () {
        return {
            second: 5,
            Text: '很抱歉！没有找到您要访问的页面！'
        }
    },
    created() {
        let _this = this;
        setInterval(function(){
            console.log(_this.second)
            if (_this.second === 0) {
                window.location.href = '/Index';
                return;
            }
            _this.second--
        }, 1000)
    }
}
</script>

<style scoped>
    .NotFound {
        text-align: center;
        padding-top: 5%
    }
    .NotFound img {
        display: block;
        width: 100%;
        max-width: 960px;
        margin: 0 auto;
    }
    .NotFound h1 {
        font-size: 24px;
        margin-top: 30px;
    }
    .NotFound a {
        color: #409EFF;
        text-decoration: none;
    }
</style>
