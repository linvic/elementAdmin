<template>
    <div>
        <el-form ref="form" :rules="form_rules" :model="form" label-width="120px" size="small">
            <el-form-item label="业务员变更为：" prop="user_id">
                <el-select v-model="form.user_id">
                    <el-option v-for="item in usersAll" :key="item.user_id" :label="item.user_name" :value="String(item.user_id)">{{item.user_name}}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit()">确定</el-button>
                <el-button @click="closeDialog()">取消</el-button>
            </el-form-item>
        </el-form>
        <h3 class="table_title">已选中客户：</h3>
        <el-table :data="tableData" style="width: 100%" border>
            <el-table-column prop="c_id" label="ID" width="55"></el-table-column>
            <el-table-column prop="enterprise_name" label="公司名称"></el-table-column>
            <el-table-column prop="customer_name" label="联系人姓名"></el-table-column>
            <el-table-column prop="telephone" label="联系电话"></el-table-column>
            <el-table-column label="购买意向">
                <template slot-scope="scope">
                    {{getDicVal(scope.row.purchase_intention, 'purchase_intention')}}
                </template>
            </el-table-column>
            <el-table-column prop="user_name" label="原业务员"></el-table-column>
            <el-table-column prop="created_time" label="创建时间"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import ContactsAdd from './ContactsAdd'
import PhotosUploader from '@/components/uploader/PhotosUploader'
export default {
    components: {
        ContactsAdd,
        PhotosUploader
    },
    data () {
        return {
            form: {
                user_id: '', // 变更业务员
            },
            form_rules: {
                user_id: [
                    { required: true, message: '请选择业务员', trigger: 'change'}
                ]
            },
            tableData: [],
            purchase_intention: [], // 字典 - 购买意向
            usersAll: [] // 所有业务员
        }
    },
    props: {
        users: {
            type: Array
        }
    },
    created() {
        let _this = this;
        this.$https.all([
            this.getDic('crm_purchase_intention', 'purchase_intention'),
            this.getUsersAll()
        ]).then(this.$https.spread(function (acct, perms) {

            _this.tableData = _this.users;
            console.log(_this.tableData)
            
        }))
    },
    methods: {
        getUsersAll() { // 获取所有业务员
            this.$https.get('/api/Account/list_users_all', ).then((result) => {
                if (result.data.code == 0) {
                    this.usersAll = result.data.data;
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
                        user_id: this.form.user_id
                    };
                    let _list_c_id = []
                    for(var item of this.users) {
                        _list_c_id.push(item.c_id)
                    }
                    _postData.list_c_id = _list_c_id;

                    this.$https.post('/api/Customer/update_customer_user_id', _postData).then((result) => {
                        if (result.data.code == 0) {
                            this.$message({
                                type: 'success',
                                showClose: true,
                                message: '选中客户业务员变更成功',
                                duration: 1500,
                                onClose: () => {
                                    // 关闭当前dialog，
                                    this.closeDialog('dialogChangeSalesman');
                                    // 刷新列表
                                    this.$emit('parentSetContactsList', _postData);
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
        
        getDic(code, dic) { // 根据关键字获取字典值并保存 相应字段
            this.$https.get('/api/Dicts/GetValues', {
                params: {
                    type_code: code
                }
            }).then((result) => {
                if (result.data.code == 0) {
                    this[dic] = result.data.data;
                } else {
                    this.$message({
                        type: 'error',
                        showClose: true,
                        message: result.data.message
                    })
                }
            })
        },
        getDicVal(key, dic) { // 根据字典值匹配字典名
            let text = '';
            for(var item of this[dic]) {
                if (key == item.value_id) {
                    text = item.value_name;
                }
            }
            return text;
        },
        closeDialog(name) { // 关闭当前
            // this.$refs.form.resetFields(); // 重置表单
            if (!name) {
                this.$emit('closeDialog', 'dialogChangeSalesman'); // 执行父组件关闭方法
            } else {
                this.$emit('closeDialog', name); // 执行父组件关闭方法
            }
        }
    }
}
</script>
<style scoped>
    /* el-progress--circle */
    .table_title {
        display: inline-block;
        margin-top: 30px;
        margin-bottom: 30px;
        color: #666;
        font-weight: normal;
        padding-left: 5px;
        border-left: 2px solid #4E97D9;
        line-height: 1.2;
    }

    .el-tag {
        margin-top: 5px;
        margin-right: 10px;
    }
</style>