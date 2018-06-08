<template>
    <div>
        <el-form ref="form" :model="form" label-width="140px" label-suffix="：" size="small">

            <el-row v-if="form.customer_classify !== '2'">
                <el-col :span="24">
                    <el-form-item label="线索名称/主题">
                        <p>{{form.theme}}</p>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="客户分类" prop="classification">
                        <p>{{getDicVals(form.classification.join(','), 'classification')}}</p>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="客户来源" prop="customer_source">
                        <p>{{getDicVals(form.customer_source, 'customer_source')}}</p>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="form.customer_classify !== '2'">
                <el-col :span="12">
                    <el-form-item label="购买意向" prop="purchase_intention">
                        <p>{{getDicVals(form.purchase_intention, 'purchase_intention')}}</p>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="意向面积">
                        <p>{{form.intentional_area}}平米</p>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="form.transactions_num > 0">
                <el-col :span="12">
                    <el-form-item label="成交次数" prop="transactions_num">
                        <p>{{form.transactions_num}}</p>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="企业名称" prop="enterprise_name">
                        <p>{{form.enterprise_name}}</p>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="客户姓名" prop="customer_name">
                        <p>{{form.customer_name}}</p>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="客户联系电话" prop="telephone">
                        <p>{{form.telephone}}</p>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="form.customer_type !== '1'">
                <el-col :span="12">
                    <el-form-item label="客户主体类别" prop="customer_name">
                        <p>{{form.customer_type === '1' ? '个人' : '企业'}}</p>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="性别">
                        <p>{{(form.sex === '1' ? '男' : '女')}}</p>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="籍贯">
                        <p>{{form.native_place}}</p>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="电子邮箱">
                        <p>{{form.company_email}}</p>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="职务">
                        <p>{{form.job}}</p>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="个人证件类型">
                        <p>{{getDicVals(form.person_identification_type, 'identification_type')}}</p>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="个人证件号码" prop="person_identification_number">
                        <p>{{form.person_identification_number}}</p>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24">
                    <el-form-item label="个人证件图片">
                        <p>
                            <img width="120px" height="120px" v-for="(item, index) in form.person_identification_image" :key="index" :src="item" v-if="item">
                        </p>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="通讯地址">
                        <p>{{form.communication_address}}</p>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="企业Logo">
                        <p>
                            <img width="120px" height="120px" :src="form.company_logo" v-if="form.company_logo">
                        </p>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="企业证件类型">
                        <p>{{getDicVals(form.company_identification_type, 'company_card_type')}}</p>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="企业证件号码">
                        <p>{{form.company_identification_number}}</p>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24">
                    <el-form-item label="企业证件图片">
                        <p>
                            <img width="120px" height="120px" v-for="(item, index) in form.company_identification_image" :key="index" :src="item" v-if="item">
                        </p>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="企业法人">
                        <p>{{form.company_corporate}}</p>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="企业行业类别">
                        <p>{{getDicVals(form.company_industry_type, 'company_industry')}}</p>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="企业类型">
                        <p>{{getDicVals(form.company_type, 'company_type')}}</p>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="企业注册资金">
                        <p>{{form.company_registered_capital}}</p>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="主营产品">
                        <p>{{form.company_main_product}}</p>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="企业员工人数(人)">
                        <p>{{getDicVals(form.company_employees_number, 'company_employees')}}</p>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="企业注册地址">
                        <p>{{form.company_registered_address}}</p>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="经营范围">
                        <p>{{form.company_scope_of_operation}}</p>
                    </el-form-item>
                </el-col>
            </el-row>

        </el-form>

        <h3 class="table_title">联系人信息：</h3>
        <el-table :data="tableData" style="width: 100%" border size="mini">
            <el-table-column prop="linkman_name" label="联系人姓名" width="90"></el-table-column>
            <el-table-column prop="telephone" label="电话"></el-table-column>
            <el-table-column prop="identification_number" label="证件号码"></el-table-column>
            <el-table-column label="证件类型">
                <template slot-scope="scope">
                    {{getDicVals(scope.row.identification_type,'identification_type')}}
                </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
            <el-table-column prop="created_time" label="创建时间" width="140"></el-table-column>
        </el-table>
        <div class="text-center m-t">
            <el-button @click="closeDialog()">关 闭</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            form: {
                theme: '', // 主题
                customer_classify: '0', // 客户类别 0 线索 1 机会
                customer_type: '0', // 1个人 2 企业
                transactions_num: '', // 成交次数
                classification: [], // 线索分类
                customer_source: '', // 线索来源
                purchase_intention: '', // 购买意向
                intentional_area: '', // 意向面积
                enterprise_name: '', // 企业名称
                customer_name: '', // 客户姓名
                telephone: '', // 客户联系电话
                sex: '1', // 性别 1男 0女
                native_place: '', //籍贯
                company_email: '', // 电子邮箱
                job: '', // 职务
                person_identification_type: '', // 个人证件类型
                person_identification_number: '', // 个人证件号码
                person_identification_image: [], // 个人证件图片
                communication_address: '', // 通讯地址
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
            tableData: [], // 联系人
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
        getOldData() { // 获取编辑数据

            this.$https.get('/api/Customer/get_customerdetails?c_id=' + this.id).then((result) => {
                if (result.data.code == 0) {
                    let _data = result.data.data;
                    
                    this.form.theme = _data.theme;// 主题
                    this.form.customer_classify = _data.customer_classify;// 客户分类
                    this.form.customer_type = _data.customer_type;// 客户z主体类别分类
                    
                    this.form.classification = _data.classification.split(',');// 线索分类
                    this.form.customer_source = _data.customer_source; // 线索来源
                    this.form.purchase_intention = _data.purchase_intention; // 购买意向
                    this.form.intentional_area = _data.intentional_area == 0 ? '' : _data.intentional_area; // 意向面积
                    this.form.transactions_num = _data.transactions_num; // 成交次数
                    this.form.enterprise_name = _data.enterprise_name; // 企业名称
                    this.form.customer_name = _data.customer_name; // 客户姓名
                    this.form.telephone = _data.telephone; // 客户联系电话
                    this.form.sex = _data.sex.toString(); // 性别 1男 0女
                    this.form.native_place = _data.native_place; // 籍贯
                    this.form.company_email = _data.company_email; // 电子邮箱
                    this.form.job = _data.job; // 职务
                    this.form.person_identification_type = _data.person_identification_type; // 个人证件类型
                    this.form.person_identification_number = _data.person_identification_number; // 个人证件号码
                    if(_data.person_identification_image) {
                        this.form.person_identification_image = _data.person_identification_image.split(',');// 个人证件图
                    }
                    
                    
                    this.form.company_logo = _data.company_logo; // 企业logo
                    this.form.company_identification_type = _data.company_identification_type; // 企业证件类型

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
                    this.tableData = result.data.data;
                } else {
                    this.$message({
                        type: 'error',
                        showClose: true,
                        message: result.data.message
                    })
                }
            })
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
        getDicVals(keys, dic) { // 根据字典值匹配字典名
            let texts = [];
            let keysArr = keys.toString().split(',');
            for(var keyItem of keysArr) {
                for(var item of this[dic]) {
                    if (keyItem == item.value_id) {
                        texts.push(item.value_name);
                    }
                }
            }
            return texts.join(', ');
        },
        closeDialog(name) { // 关闭当前
            // this.$refs.form.resetFields(); // 重置表单
            if (!name) {
                this.$emit('closeDialog', 'dialogDetails'); // 执行父组件关闭方法
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