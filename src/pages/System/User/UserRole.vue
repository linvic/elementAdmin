<template>
    <div>
        <el-transfer v-model="value" :titles="['可选角色','已选角色']" :data="baseData" :props="baseProps"></el-transfer>
        <div class="m-t text-center">
            <el-button type="primary" @click="submit()">保存</el-button>
            <el-button @click="closeDialog()">取消</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            baseData: [],
            value: [],
            baseProps: {
                key: 'role_id',
                label: 'role_name'
            }
        }
    },
    props: {
        id: {
            type: Number
        }
    },
    created() {
        this.getDataBase();
    },
    computed: {
    },
    watch: {
    },
    methods: {
        getDataBase() { // 获取基础数据
            this.$https.get('/api/company_role/page', {
                params: {
                    currentPage: 1,
                    pageSize: 999
                }
            }).then((result) => {
                if (result.data.code == 0) {
                    this.baseData = result.data.data.Items;
                    this.getOldData()
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

            this.$https.get('/api/company_role/list_company_role_user?user_id=' + this.id).then((result) => {
                if (result.data.code == 0) {
                    let _data = result.data.data;
                    console.log(_data)
                    for(var item of _data) {
                        this.value.push(item.role_id)
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
        submit() { // 提交
            let _postData = [];
            for(var valItem of this.value) {
                console.log(valItem)
                let item = {
                    user_id: this.id,
                    role_id: valItem
                }
                _postData.push(item)
            }
            console.log('您将提交：', _postData)
            this.$https.post('/api/company_role/create_company_role_user', _postData).then((result) => {
                if (result.data.code == 0) {
                    this.$message({
                        type: 'success',
                        showClose: true,
                        message: '配置成功',
                        duration: 1500,
                        onClose: () => {
                            // 关闭当前dialog，
                            this.closeDialog('dialogUserRole');
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
        },
        closeDialog(name) { // 关闭当前
            // this.$refs.form.resetFields(); // 重置表单
            if (!name) {
                this.$emit('closeDialog', 'dialogUserRole'); // 执行父组件关闭方法
            } else {
                this.$emit('closeDialog', name); // 执行父组件关闭方法
            }
        }
    }
}
</script>
<style scoped>
</style>