<template>
    <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="带看房源">
                <p>{{form.resource_name}}</p>
            </el-form-item>
            <el-form-item label="客户名称" prop="customer_id">
                <el-select v-model="form.customer_id" @change="changeCustomer" filterable placeholder="请选择客户">
                    <el-option
                        v-for="item in myCustomers"
                        :key="item.c_id"
                        :label="item.customer_name"
                        :value="item.c_id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="看房情况" prop="view_result">
                <el-input v-model="form.view_result" type="textarea" :rows="4"></el-input>
            </el-form-item>
            <el-form-item label="带看日期" prop="view_date">
                <el-date-picker v-model="form.view_date" :editable="false" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
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
    props: {
        resourceData: {
            type: Object
        }
    },
    data () {
        return {
            form: {
                customer_name: '', // 客户姓名
                view_date: '', // 带看日期
                customer_id: '', // 客户标识
                customer_mobile: '', // 客户手机号
                view_result: '', // 看房情况
                resource_id: '', // 租售房源标识
                resource_name: '', // 租售房源物业名称
            },
            rules: {
                customer_id: [
                    { required: true, message: '请选择客户', trigger: 'blur' }
                ],
                view_date: [
                    { required: true, message: '请选择带看日期', trigger: 'change' }
                ],
                view_result: [
                    { required: true, message: '请输入看房情况', trigger: 'blur' }
                ]
            },
            myCustomers: [] // 我的客户列表
        }
    },
    created() {
        this.form.resource_id = this.resourceData.id;
        this.form.resource_name = this.resourceData.name;

        let _this = this;
        this.$https.all([
            this.getMyCustomer()
        ]).then(this.$https.spread(function (acct, perms) {
        }))
    },
    methods: {
        getMyCustomer() { // 获取我的客户 list
            this.$https.get('/api/Customer/page', {
                params: {
                    currentPage: 1,
                    pageSize: 9999,
                    customer_classify: 999,
                    user_id: -2
                }
            }).then((result) => {
                if (result.data.code == 0) {
                    this.myCustomers = result.data.data.Items;
                } else {
                    this.$message({
                        type: 'error',
                        showClose: true,
                        message: result.data.message
                    })
                }
            })
        },
        changeCustomer(val) {
            let obj = {};
            obj = this.myCustomers.find((item) => {
                return item.c_id === val;
            })
            console.log(obj)
            console.log(this.form)
            this.form.customer_name = obj.customer_name;
            this.form.customer_mobile = obj.telephone;
        },
        submit() { // 提交
            this.$refs.form.validate((valid) => {
                if (valid) {
                    let _postData = JSON.parse(JSON.stringify(this.form));
                    console.log(this.form)
                    this.$https.post('/api/rent_base_resources/CreateView', _postData).then((result) => {
                        if (result.data.code == 0) {
                            this.$message({
                                type: 'success',
                                showClose: true,
                                message: '添加成功',
                                duration: 1500,
                                onClose: () => {
                                    // 关闭当前dialog，
                                    this.closeDialog();
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
        closeDialog(name) {
            if (!name) {
                this.$emit('closeDialog', 'dialogGetViewsAdd'); // 执行父组件关闭方法
            } else {
                this.$emit('closeDialog', name); // 执行父组件关闭方法
            }
        }
    }
}

</script>

<style scoped>
</style>
