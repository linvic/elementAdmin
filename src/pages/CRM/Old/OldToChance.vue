<template>
    <div>
        <el-form ref="form" :rules="form_rules" :model="form" label-width="120px" size="small">
            <el-form-item label="客户姓名">
                <p>{{form.customer_name}}</p>
            </el-form-item>
            <el-form-item label="客户联系电话">
                <p>{{form.telephone}}</p>
            </el-form-item>
            <el-form-item label="购买意向" prop="purchase_intention">
                <el-radio-group v-model="form.purchase_intention">
                    <el-radio v-for="item in purchase_intention" :key="item.value_id" :label="String(item.value_id)">{{item.value_name}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="线索分类" prop="classification">
                <el-checkbox-group v-model="form.classification">
                    <el-checkbox v-for="item in classification" :key="item.value_id" :label="String(item.value_id)" name="type">{{item.value_name}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="线索名称/主题" prop="theme">
                <el-input v-model="form.theme" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="意向面积">
                <el-input v-model="form.intentional_area" @keyup.native="onkeyupPrice($event)" placeholder="数字，小数点两位，单位平方米" type="number" style="width: 150px"></el-input> 平米
            </el-form-item>


            <el-form-item label="客户主体类别" prop="customer_type">
                <el-radio-group v-model="form.customer_type">
                    <el-radio :label="1">个人</el-radio>
                    <el-radio :label="2">企业</el-radio>
                </el-radio-group>
            </el-form-item>
            <div v-if="form.customer_type == 1">
                <el-form-item label="个人证件类型">
                    <el-select v-model="form.person_identification_type">
                        <el-option v-for="item in identification_type" :key="item.value_id" :label="item.value_name" :value="String(item.value_id)">{{item.value_name}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="个人证件号码" prop="person_identification_number">
                    <el-input v-model="form.person_identification_number" placeholder="请输入"></el-input>
                </el-form-item>
            </div>
            <div v-if="form.customer_type == 2">
                <el-form-item label="企业名称">
                    <el-input v-model="form.enterprise_name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="企业证件类型">
                    <el-select v-model="form.company_identification_type">
                        <el-option v-for="item in company_card_type" :key="item.value_id" :label="item.value_name" :value="String(item.value_id)">{{item.value_name}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="企业证件号码">
                    <el-input v-model="form.company_identification_number" placeholder="请输入"></el-input>
                </el-form-item>
            </div>

            <el-form-item>
                <el-button type="primary" @click="submit()">保存</el-button>
                <el-button @click="closeDialog()">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data () {
        return {
            form: {
                theme: '', // 主题
                classification: [], // 线索分类
                purchase_intention: '', // 购买意向
                customer_name: '', // 客户姓名
                telephone: '', // 客户联系电话
                intentional_area: '', // 意向面积
                customer_type: 1, // 客户主体类别(1:个人2:企业)
                person_identification_type: '', // 个人证件类型
                person_identification_number: '', // 个人证件号码
                enterprise_name: '', // 企业名称
                company_identification_type: '', // 个人证件类型
                company_identification_number: '', // 个人证件号码
            },
            rawform: {
                person_identification_type: '', // 个人证件类型
                person_identification_number: '', // 个人证件号码
                enterprise_name: '', // 企业名称
                company_identification_type: '', // 个人证件类型
                company_identification_number: '', // 个人证件号码
            },
            form_rules: {
                theme: [
                    { required: true, message: '线索主题不能为空', trigger: 'blur'}
                ],
                classification: [
                    {type: 'array', required: true, message: '请至少选择一个分类', trigger: 'change'}
                ],
                purchase_intention: [
                    { required: true, message: '请选择购买意向', trigger: 'change'}
                ],
                customer_type: [
                    { required: true, message: '请选择客户类别', trigger: 'change'}
                ]
            },
            classification: [], // 字典 - 线索分类
            purchase_intention: [], // 字典 - 购买意向
            identification_type: [], // 个人证件类别
            company_card_type: [] // 企业证件类别
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
            this.getDic('crm_purchase_intention', 'purchase_intention'),
            this.getDic('contact_card_type', 'identification_type'),
            this.getDic('company_card_type', 'company_card_type')

        ]).then(this.$https.spread(function (acct, perms) {
            console.log(_this.id)
            if (_this.id) { // 编辑
                _this.getOldData();
            }
        }))
    },
    methods: {
        closeThisDialog(name) { // 关闭弹层
            this[name] = false;
        },
        getOldData() { // 获取编辑数据

            this.$https.get('/api/Customer/get_customerdetails?c_id=' + this.id).then((result) => {
                if (result.data.code == 0) {
                    let _data = result.data.data;
                    this.form.theme = _data.theme; // 主题
                    this.form.classification = _data.classification.split(',');// 线索分类
                    this.form.purchase_intention = _data.purchase_intention; // 购买意向
                    this.form.customer_name = _data.customer_name; // 客户姓名
                    this.form.telephone = _data.telephone; // 客户联系电话
                    this.form.intentional_area = _data.intentional_area == 0 ? '' : _data.intentional_area; // 意向面积

                    this.form.enterprise_name = _data.enterprise_name; // 
                    this.form.company_identification_type = _data.company_identification_type; // 
                    this.form.company_identification_number = _data.company_identification_number; // 
                    this.form.person_identification_type = _data.person_identification_type; // 
                    this.form.person_identification_number = _data.person_identification_number; // 
                    this.rawform.enterprise_name = _data.enterprise_name; // 
                    this.rawform.company_identification_type = _data.company_identification_type; // 
                    this.rawform.company_identification_number = _data.company_identification_number; // 
                    this.rawform.person_identification_type = _data.person_identification_type; // 
                    this.rawform.person_identification_number = _data.person_identification_number; // 
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
                    let _postData = JSON.parse(JSON.stringify(this.form));
                    _postData.c_id = parseInt(this.id);

                    if (_postData.customer_type == 1) { // 个人
                        if (_postData.person_identification_type == '') {
                            this.$message({
                                type: 'error',
                                showClose: true,
                                message: '请选择个人证件类型'
                            })
                            return;
                        }
                        if (_postData.person_identification_number == '') {
                            this.$message({
                                type: 'error',
                                showClose: true,
                                message: '请填写个人证件号码'
                            })
                            return;
                        }
                        _postData.enterprise_name = this.rawform.enterprise_name;
                        _postData.company_identification_type = this.rawform.company_identification_type;
                        _postData.company_identification_number = this.rawform.company_identification_number;
                    } else {
                        if (_postData.enterprise_name == '') {
                            this.$message({
                                type: 'error',
                                showClose: true,
                                message: '请填写企业名称'
                            })
                            return;
                        }
                        if (_postData.company_identification_type == '') {
                            this.$message({
                                type: 'error',
                                showClose: true,
                                message: '请选择企业证件类型'
                            })
                            return;
                        }
                        if (_postData.company_identification_number == '') {
                            this.$message({
                                type: 'error',
                                showClose: true,
                                message: '请填写企业证件号码'
                            })
                            return;
                        }
                        _postData.person_identification_type = this.rawform.person_identification_type;
                        _postData.person_identification_number = this.rawform.person_identification_number;
                    }
                    _postData.classification = this.form.classification.join(',');
                    
                    this.$https.post('/api/Customer/update_customer_old_to_sale', _postData).then((result) => {
                        if (result.data.code == 0) {
                            this.$message({
                                type: 'success',
                                showClose: true,
                                message: '已成功将该客户转换为机会客户',
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
                this.$emit('closeDialog', 'dialogOldToChance'); // 执行父组件关闭方法
            } else {
                this.$emit('closeDialog', name); // 执行父组件关闭方法
            }
        }
    }
}
</script>
<style scoped>

    .el-radio-group {
        line-height: 32px;
        vertical-align: inherit;
    }
    .el-radio {
        margin-left: 0;
        margin-right: 30px;
    }
</style>
