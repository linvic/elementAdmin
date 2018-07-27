<template>
    <div  v-loading="loading">
        <el-card>
            {{msg}}
        </el-card>
    </div>
</template>

<script>
export default {
    data () {
        return {
            msg: '智领销售系统',
            loading: true
        }
    },
    mounted(){
        this.loading = false;
    }
}
</script>
</style>
