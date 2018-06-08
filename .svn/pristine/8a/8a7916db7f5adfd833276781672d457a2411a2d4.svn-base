<template>
    <div>
        <el-form ref="form" :rules="form_rules" :model="form" label-width="130px" size="small">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="客户主体类别" prop="customer_type">
                        <el-radio-group v-model="form.customer_type">
                            <el-radio :label="1">个人</el-radio>
                            <el-radio :label="2">企业</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="线索名称/主题" prop="theme">
                        <el-input v-model="form.theme" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="线索分类" prop="classification">
                        <el-checkbox-group v-model="form.classification">
                            <el-checkbox v-for="item in classification" :key="item.value_id" :label="String(item.value_id)" name="type">{{item.value_name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="线索来源" prop="customer_source">
                        <el-radio-group v-model="form.customer_source">
                            <el-radio v-for="item in customer_source" :key="item.value_id" :label="String(item.value_id)">{{item.value_name}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="购买意向" prop="purchase_intention">
                        <el-radio-group v-model="form.purchase_intention">
                            <el-radio v-for="item in purchase_intention" :key="item.value_id" :label="String(item.value_id)">{{item.value_name}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="意向面积">
                        <el-input v-model="form.intentional_area" @keyup.native="onkeyupPrice($event)" placeholder="数字，小数点两位，单位平方米" type="number" style="width: 150px"></el-input> 平米
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="客户姓名" prop="customer_name">
                        <el-input v-model="form.customer_name" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="客户联系电话" prop="telephone">
                        <el-input v-model="form.telephone" placeholder="请输入" :disabled="id !== undefined"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <div v-if="form.customer_type == 1">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="性别">
                            <el-radio-group v-model="form.sex">
                                <el-radio label="1">男</el-radio>
                                <el-radio label="0">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="籍贯">
                            <el-input v-model="form.native_place" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="电子邮箱">
                            <el-input v-model="form.company_email" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="职务">
                            <el-input v-model="form.job" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="个人证件类型">
                            <el-select v-model="form.person_identification_type">
                                <el-option v-for="item in identification_type" :key="item.value_id" :label="item.value_name" :value="String(item.value_id)">{{item.value_name}}</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="个人证件号码" prop="person_identification_number">
                            <el-input v-model="form.person_identification_number" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="个人证件图片">
                            <PhotosUploader
                                class="avatar-uploader"
                                :limit="9"
                                :files.sync="form.person_identification_image">
                            </PhotosUploader>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="通讯地址">
                            <el-input v-model="form.communication_address" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <div v-if="form.customer_type == 2">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="企业名称" prop="enterprise_name">
                            <el-input v-model="form.enterprise_name" placeholder="请输入" @blur="existCompany()"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="企业Logo">
                            <PhotoUploader
                                :files.sync="form.company_logo">
                            </PhotoUploader>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="企业证件类型">
                            <el-select v-model="form.company_identification_type">
                                <el-option v-for="item in company_card_type" :key="item.value_id" :label="item.value_name" :value="String(item.value_id)">{{item.value_name}}</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="企业证件号码">
                            <el-input v-model="form.company_identification_number" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="企业证件图片">
                            <PhotosUploader
                                class="avatar-uploader"
                                :limit="9"
                                :files.sync="form.company_identification_image">
                            </PhotosUploader>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="企业法人">
                            <el-input v-model="form.company_corporate" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="企业行业类别">
                            <el-select v-model="form.company_industry_type">
                                <el-option v-for="item in company_industry" :key="item.value_id" :label="item.value_name" :value="String(item.value_id)">{{item.value_name}}</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="企业类型">
                            <el-select v-model="form.company_type">
                                <el-option v-for="item in company_type" :key="item.value_id" :label="item.value_name" :value="String(item.value_id)">{{item.value_name}}</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="企业注册资金">
                            <el-input v-model="form.company_registered_capital" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="主营产品">
                            <el-input v-model="form.company_main_product" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="企业员工人数(人)">
                            <el-select v-model="form.company_employees_number">
                                <el-option v-for="item in company_employees" :key="item.value_id" :label="item.value_name" :value="item.value_id">{{item.value_name}}</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="企业注册地址">
                            <el-input v-model="form.company_registered_address" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="经营范围">
                            <el-input type="textarea" v-model="form.company_scope_of_operation" :rows="3" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
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
import PhotosUploader from '@/components/uploader/PhotosUploader'
import PhotoUploader from '@/components/uploader/PhotoUploader'
export default {
    components: {
        ContactsAdd,
        PhotosUploader,
        PhotoUploader
    },
    data () {
        
        return {
            form: {
                theme: '', // 主题
                classification: [], // 线索分类
                customer_source: '', // 线索来源
                purchase_intention: '', // 购买意向
                intentional_area: '', // 意向面积
                customer_name: '', // 客户姓名
                telephone: '', // 客户联系电话
                customer_type: 1, // 客户主体类别(1:个人2:企业)

                sex: '1', // 性别 1男 0女
                native_place: '', //籍贯
                company_email: '', // 电子邮箱
                job: '', // 职务
                person_identification_type: '', // 个人证件类型
                person_identification_number: '', // 个人证件号码
                person_identification_image: [], // 个人证件图片
                communication_address: '', // 通讯地址

                enterprise_name: '', // 企业名称
                company_logo: '', // 企业logo
                company_identification_type: '', // 企业证件类型
                company_identification_number: '', // 企业证件号码
                company_identification_image: [], // 企业证件图片
                company_corporate: '', // 企业法人
                company_industry_type: '', // 企业行业类型
                company_registered_capital: '', // 企业注册资金
                company_registered_address: '', // 企业注册地址
                company_type: '', // 企业类型
                company_main_product: '', // 主营产品
                company_employees_number: '', // 企业员工人数
                company_scope_of_operation: '', // 经营范围
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
                    { required: true, message: '联系电话不能为空', trigger: 'blur'}
                ],
                customer_type: [
                    { required: true, message: '请选择客户类别', trigger: 'change'}
                ]
            },
            dialogContactsAdd: false, // 新增联系人页面
            ContactsList: [], // 已增联系人
            classification: [], // 字典 - 线索分类
            customer_source: [], // 字典 - 线索来源
            identification_type: [], // 字典 - 个人证件类型
            company_card_type: [], // 字典 - 企业证件类型
            company_industry: [], // 字典 - 企业行业类型
            company_type: [], // 字典 - 企业类型
            company_employees: [], // 字典 - 企业员工人数类型
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
            this.getDic('contact_card_type', 'identification_type'),
            this.getDic('company_card_type', 'company_card_type'),
            this.getDic('company_industry', 'company_industry'),
            this.getDic('company_type', 'company_type'),
            this.getDic('company_employees', 'company_employees'),
            this.getDic('crm_purchase_intention', 'purchase_intention')
        ]).then(this.$https.spread(function (acct, perms) {
            if (_this.id) { // 编辑
                _this.getOldData();
                _this.getContactsList();
            }
        }))
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
            console.log('联系人',this.ContactsList);
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

                    this.form.customer_type = Number(_data.customer_type); // 客户类别
                    this.form.theme = _data.theme; // 主题
                    this.form.classification = _data.classification.split(',');// 线索分类
                    this.form.customer_source = _data.customer_source; // 线索来源
                    this.form.purchase_intention = _data.purchase_intention; // 购买意向
                    this.form.intentional_area = _data.intentional_area == 0 ? '' : _data.intentional_area; // 意向面积
                    this.form.enterprise_name = _data.enterprise_name; // 企业名称
                    this.form.customer_name = _data.customer_name; // 客户姓名
                    this.form.telephone = _data.telephone; // 客户联系电话
                    this.form.sex = _data.sex.toString(); // 性别 1男 0女
                    this.form.native_place = _data.native_place; // 籍贯
                    this.form.company_email = _data.company_email; // 电子邮箱
                    this.form.job = _data.job; // 职务
                    this.form.person_identification_type = _data.person_identification_type == 0 ? '' : _data.person_identification_type; // 个人证件类型
                    this.form.person_identification_number = _data.person_identification_number; // 个人证件号码
                    if(_data.person_identification_image) {
                        this.form.person_identification_image = _data.person_identification_image.split(',');// 个人证件图
                    }
                    
                    
                    this.form.company_logo = _data.company_logo; // 企业logo
                    this.form.company_identification_type = _data.company_identification_type == 0 ? '' : _data.company_identification_type; // 企业证件类型

                    this.form.company_industry_type = _data.company_industry_type == 0 ? '' : _data.company_industry_type; // 企业行业类别
                    this.form.company_type = _data.company_type == 0 ? '' : _data.company_type; // 企业类别
                    this.form.company_employees_number = _data.company_employees_number == 0 ? '' : _data.company_employees_number; // 企业员工人数
                    
                    this.form.company_identification_number = _data.company_identification_number; // 企业证件号码
                    if(_data.company_identification_image) {
                        this.form.company_identification_image = _data.company_identification_image.split(',');// 企业证件图
                    }
                    this.form.communication_address = _data.communication_address; // 通讯地址

                    this.form.company_corporate = _data.company_corporate; // 企业法人
                    this.form.company_registered_capital = _data.company_registered_capital; // 企业注册资金
                    this.form.company_registered_address = _data.company_registered_address; // 企业注册地址
                    this.form.company_main_product = _data.company_main_product; // 主营产品
                    this.form.company_scope_of_operation = _data.company_scope_of_operation; // 经营范围
                    
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

                    let _postData = {
                        customer_type: this.form.customer_type, // 客户主体类别
                        theme: this.form.theme, // 主题
                        classification: this.form.classification.join(','), // 线索分类
                        customer_source: this.form.customer_source, // 线索来源
                        purchase_intention: this.form.purchase_intention, // 购买意向
                        intentional_area: this.form.intentional_area == '' ? 0 : this.form.intentional_area, // 意向面积
                        customer_name: this.form.customer_name, // 客户姓名
                        telephone: this.form.telephone // 客户电话
                    }
                    if (_postData.customer_type == 1) { // 个人
                        
                        if (this.form.person_identification_type == '') {
                            this.$message({
                                type: 'error',
                                showClose: true,
                                message: '请选择个人证件类型'
                            })
                            return;
                            console.log('请选择个人证件类型')
                        }
                        if (this.form.person_identification_number == '') {
                            this.$message({
                                type: 'error',
                                showClose: true,
                                message: '请填写个人证件号码'
                            })
                            return;
                        }
                        _postData.sex = this.form.sex; // 性别 1男 0女
                        _postData.native_place = this.form.native_place; //籍贯
                        _postData.company_email = this.form.company_email; // 电子邮箱
                        _postData.job = this.form.job; // 职务
                        _postData.person_identification_type = this.form.person_identification_type == '' ? 0 : this.form.person_identification_type; // 个人证件类型
                        _postData.person_identification_number = this.form.person_identification_number; // 个人证件号码
                        _postData.person_identification_image = this.form.person_identification_image.join(','); // 个人证件图片
                        _postData.communication_address = this.form.communication_address; // 通讯地址
                    } else { // 企业
                        if (this.form.enterprise_name == '') {
                            this.$message({
                                type: 'error',
                                showClose: true,
                                message: '请填写企业名称'
                            })
                            return;
                        }
                        if (this.form.company_identification_type == '') {
                            this.$message({
                                type: 'error',
                                showClose: true,
                                message: '请选择企业证件类型'
                            })
                            return;
                        }
                        if (this.form.company_identification_number == '') {
                            this.$message({
                                type: 'error',
                                showClose: true,
                                message: '请填写企业证件号码'
                            })
                            return;
                        }
                        _postData.enterprise_name = this.form.enterprise_name; // 企业名称
                        _postData.company_logo = this.form.company_logo; // 企业logo
                        _postData.company_identification_type = this.form.company_identification_type; // 企业证件类型
                        _postData.company_identification_number = this.form.company_identification_number; // 企业证件号码
                        _postData.company_identification_image = this.form.company_identification_image.join(','); // 企业证件图片
                        _postData.company_corporate = this.form.company_corporate; // 企业法人
                        _postData.company_industry_type = this.form.company_industry_type == '' ? 0 : this.form.company_industry_type; // 企业行业类型
                        _postData.company_registered_capital = this.form.company_registered_capital; // 企业注册资金
                        _postData.company_registered_address = this.form.company_registered_address; // 企业注册地址
                        _postData.company_type = this.form.company_type == '' ? 0 : this.form.company_type; // 企业类型
                        _postData.company_main_product = this.form.company_main_product; // 主营产品
                        _postData.company_employees_number = this.form.company_employees_number == '' ? 0 : this.form.company_employees_number; // 企业员工人数
                        _postData.company_scope_of_operation = this.form.company_scope_of_operation; // 经营范围

                    }

                    if (this.id) { // 编辑
                        _postData.c_id = parseInt(this.id);
                        this.$https.post('/api/Customer/update_customer_chance', _postData).then((result) => {
                            if (result.data.code == 0) {
                                this.$message({
                                    type: 'success',
                                    showClose: true,
                                    message: '编辑成功',
                                    duration: 1500,
                                    onClose: () => {
                                        // 关闭当前dialog，
                                        this.closeDialog('dialogChanceEdit');
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
                this.$emit('closeDialog', 'dialogChanceEdit'); // 执行父组件关闭方法
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

    .avatar-uploader {
        display: block;
    }
    .avatar-uploader /deep/ .el-upload {
        width: 120px;
        height: 120px;
        line-height: 120px;
    }
    .avatar-uploader /deep/ .el-upload-list__item {
        width: 120px;
        height: 120px;
    }
    .avatar-uploader /deep/ .el-progress,.avatar-uploader /deep/ .el-progress-circle {
        width: 120px !important;
        height: 120px !important;
    }
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
</style>