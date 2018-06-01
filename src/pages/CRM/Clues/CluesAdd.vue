<template>
    <div>
        <el-form ref="form" :rules="form_rules" :model="form" label-width="120px" size="small">
            <el-form-item label="线索名称/主题" prop="theme">
                <el-input v-model="form.theme" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="线索分类" prop="classification">
                <el-checkbox-group v-model="form.classification">
                    <el-checkbox v-for="item in classification" :key="item.value_id" :label="String(item.value_id)" name="type">{{item.value_name}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="线索来源" prop="customer_source">
                <el-radio-group v-model="form.customer_source">
                    <el-radio v-for="item in customer_source" :key="item.value_id" :label="String(item.value_id)">{{item.value_name}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="购买意向" prop="purchase_intention">
                <el-radio-group v-model="form.purchase_intention">
                    <el-radio v-for="item in purchase_intention" :key="item.value_id" :label="String(item.value_id)">{{item.value_name}}</el-radio>
                </el-radio-group>
            </el-form-item>
            
            <el-form-item label="客户姓名" prop="customer_name">
                <el-input v-model="form.customer_name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="客户联系电话" prop="telephone">
                <el-input v-model="form.telephone" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="企业名称">
                <el-input v-model="form.enterprise_name" placeholder="请输入" @blur="existCompany()"></el-input>
            </el-form-item>
            <el-form-item label="职务">
                <el-input v-model="form.job" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="意向面积">
                <el-input v-model="form.intentional_area" @keyup.native="onkeyupPrice($event)" placeholder="数字，小数点两位，单位平方米" type="number" style="width: 150px"></el-input> 平米
            </el-form-item>
            <el-form-item label="电子邮箱">
                <el-input v-model="form.company_email" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="通讯地址">
                <el-input v-model="form.communication_address" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="联系人">
                <el-tag
                    :key="index"
                    type="success"
                    v-for="(tag, index) in ContactsList"
                    closable
                    :disable-transitions="false"
                    @close="closeTag(tag, index)">
                    {{tag.linkman_name}}
                </el-tag>
                <el-button type="primary" @click="dialogContactsAdd = true" icon="el-icon-web-add" plain>新增联系人</el-button>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submit()">保存</el-button>
                <el-button @click="closeDialog()">取消</el-button>
            </el-form-item>
        </el-form>

        <el-dialog v-if="dialogContactsAdd" title="新增联系人" :visible.sync="dialogContactsAdd" append-to-body width="500px">
            <ContactsAdd @closeThisDialog="closeThisDialog" @parentSetContactsList="setContactsList"></ContactsAdd>
        </el-dialog>
    </div>
</template>

<script>
import ContactsAdd from './../ContactsAdd'
export default {
    components: {
        ContactsAdd
    },
    data () {
        var existPhone = (rule, value, callback) => {
            if (value) {
                this.$https.get('/api/Customer/get_model_by_telephone?telephone=' + this.form.telephone ).then((result) => {
                    if (result.data.code == 0) {
                        callback(new Error('联系号码已存在'));
                        let c_id = result.data.data.c_id;
                        let old_user_id = result.data.data.user_id;
                        this.$confirm('联系号码已存在' + (result.data.data.user_name ? ', 此客户现归属于业务员（' + result.data.data.user_name + '）' : '') + '，您可申请仲裁', '提示', {
                            confirmButtonText: '申请仲裁',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            let _postData = [{
                                c_id: c_id,
                                old_user_id: old_user_id,
                                apply_remark: '线索新增时申请仲裁'
                            }]
                            this.$https.post('/api/customer_change_salesman/create_customer_change_salesman', _postData).then((result) => {
                                if (result.data.code == 0) {
                                    this.$message({
                                        type: 'success',
                                        showClose: true,
                                        message: '申请成功',
                                        duration: 1500,
                                        onClose: () => {
                                            // 关闭当前dialog
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

                        }).catch(() => {        
                        });
                    }
                })
            } else {
                callback();
            }
        };
        return {
            form: {
                theme: '', // 主题
                classification: [], // 线索分类
                customer_source: '', // 线索来源
                purchase_intention: '', // 购买意向
                customer_name: '', // 客户姓名
                telephone: '', // 客户联系电话
                enterprise_name: '', // 企业名称
                job: '', // 职务
                intentional_area: '', // 意向面积
                company_email: '', // 电子邮箱
                communication_address: '' // 通讯地址
            },
            form_rules: {
                theme: [
                    { required: true, message: '线索主题不能为空', trigger: 'blur'}
                ],
                classification: [
                    {type: 'array', required: true, message: '请至少选择一个分类', trigger: 'change'}
                ],
                customer_source: [
                    { required: true, message: '请选择线索来源', trigger: 'change'}
                ],
                purchase_intention: [
                    { required: true, message: '请选择购买意向', trigger: 'change'}
                ],
                customer_name: [
                    { required: true, message: '客户姓名不能为空', trigger: 'blur'}
                ],
                telephone: [
                    { required: true, message: '联系电话不能为空', trigger: 'blur'},
                    { validator: existPhone, trigger: 'blur'}
                ]
            },
            dialogContactsAdd: false, // 新增联系人页面
            ContactsList: [], // 已增联系人
            classification: [], // 字典 - 线索分类
            customer_source: [], // 字典 - 线索来源
            purchase_intention: [] // 字典 - 购买意向
        }
    },
    props: {
        id: {
            type: Number
        }
    },
    created() {
        let _this = this;
        this.$https.all([
            this.getDic('crm_classification', 'classification'),
            this.getDic('crm_customer_source', 'customer_source'),
            this.getDic('crm_purchase_intention', 'purchase_intention')
        ]).then(this.$https.spread(function (acct, perms) {
            if (_this.id) { // 编辑
                _this.getOldData();
                _this.getContactsList();
            }
        }))
    },
    watch: {
    },
    methods: {
        setContactsList(val) { // 接收子组件新增的数据
            let contactsItem = JSON.parse(val);
            if (this.id) { // 编辑状态下需要单独新增
                contactsItem.c_id = this.id;
                this.$https.post('/api/customer_linkman/create_customer_linkman', contactsItem).then((result) => {
                    if (result.data.code == 0) {
                        this.getContactsList();
                    } else {
                        this.$message({
                            type: 'error',
                            showClose: true,
                            message: result.data.message
                        })
                    }
                })
                
            } else {

                this.ContactsList.push(contactsItem); // 新增联系人到数组

            }
        },
        closeTag(item, i) { // 删除已加联系人标签

            if (this.id) { // 编辑模式下删除需调用删除接口
                
                this.$https.get('/api/customer_linkman/delete_customer_linkman?cl_id=' + item.cl_id +'&c_id=' + this.id ).then((result) => {
                    if (result.data.code == 0) {
                        this.$message({
                            type: 'success',
                            showClose: true,
                            message: '联系人删除成功',
                            duration: 1000,
                            onClose: () => {
                                this.getContactsList();
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
                this.ContactsList.splice(i, 1); // 删除联系人到数组
            }
        },
        closeThisDialog(name) { // 关闭弹层
            this[name] = false;
        },
        getOldData() { // 获取编辑数据

            this.$https.get('/api/Customer/get_customerdetails?c_id=' + this.id).then((result) => {
                if (result.data.code == 0) {
                    let _data = result.data.data;
                    this.form.theme = _data.theme; // 主题
                    this.form.classification = _data.classification.split(',');// 线索分类
                    this.form.customer_source = _data.customer_source; // 线索来源
                    this.form.purchase_intention = _data.purchase_intention; // 购买意向
                    this.form.customer_name = _data.customer_name; // 客户姓名
                    this.form.telephone = _data.telephone; // 客户联系电话
                    this.form.enterprise_name = _data.enterprise_name; // 企业名称
                    this.form.job = _data.job; // 职务
                    this.form.intentional_area = _data.intentional_area == 0 ? '' : _data.intentional_area; // 意向面积
                    this.form.company_email = _data.company_email; // 电子邮箱
                    this.form.communication_address = _data.communication_address; // 通讯地址
                    console.log(this.form);
                } else {
                    this.$message({
                        type: 'error',
                        showClose: true,
                        message: result.data.message
                    })
                }
            })
        },
        getContactsList() { // 获取联系人列表

            this.$https.get('/api/customer_linkman/list_customer_linkman?c_id=' + this.id).then((result) => {
                if (result.data.code == 0) {
                    this.ContactsList = result.data.data;
                } else {
                    this.$message({
                        type: 'error',
                        showClose: true,
                        message: result.data.message
                    })
                }
            })
        },
        existCompany() {
            this.$https.get('/api/Customer/exist_by_enterprise_name?enterprise_name=' + this.form.enterprise_name ).then((result) => {
                if (result.data.code == 0) {
                    this.$alert('此公司名称已存在，如有需要可向总监申请仲裁', '提醒', {
                        confirmButtonText: '知道了'
                    });
                }
            })
        },
        submit() { // 提交
            this.$refs.form.validate((valid) => {
                if (valid) {

                    // if (this.ContactsList.length == 0) {
                    //     this.$message({
                    //         type: 'error',
                    //         showClose: true,
                    //         message: '请至少添加一位联系人'
                    //     })
                    //     return;
                    // }
                    let _postData = JSON.parse(JSON.stringify(this.form));
                     _postData.classification = this.form.classification.join(',');
                    _postData.intentional_area = this.form.intentional_area == '' ? 1 : this.form.intentional_area;
                    
                    if (this.id) { // 编辑
                        _postData.c_id = parseInt(this.id);
                        this.$https.post('/api/Customer/update_customer_clue', _postData).then((result) => {
                            if (result.data.code == 0) {
                                this.$message({
                                    type: 'success',
                                    showClose: true,
                                    message: '编辑成功',
                                    duration: 1500,
                                    onClose: () => {
                                        // 关闭当前dialog，
                                        this.closeDialog('dialogCluesEdit');
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
                    } else { // 新增

                        _postData.list_customer_linkman = this.ContactsList; // 联系人
                        this.$https.post('/api/Customer/create_customer_clue', _postData).then((result) => {
                            if (result.data.code == 0) {
                                this.$message({
                                    type: 'success',
                                    showClose: true,
                                    message: '添加成功',
                                    duration: 1500,
                                    onClose: () => {
                                        // 关闭当前dialog
                                        this.closeDialog('dialogCluesAdd');
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
                    }
                    

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
        closeDialog(name) { // 关闭当前
            // this.$refs.form.resetFields(); // 重置表单
            if (!name) {
                this.$emit('closeDialog', 'dialogCluesAdd'); // 执行父组件关闭方法
                this.$emit('closeDialog', 'dialogCluesEdit'); // 执行父组件关闭方法
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