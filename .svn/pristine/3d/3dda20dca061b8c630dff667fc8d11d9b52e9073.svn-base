<template>
    <div>
        <el-row :gutter="20">
            <el-col :sm="24" :md="12" v-show="!this.frameParame.type">
                <el-form ref="form" :model="documentData" label-width="120px" size="small">
                    <el-form-item label="客户" prop="c_id">
                        <el-select v-model="documentData.c_id" @change="changeCustomer" filterable placeholder="请选择客户">
                            <el-option
                                v-for="item in myCustomers"
                                :key="item.c_id"
                                :label="item.customer_name"
                                :value="item.c_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="填表日期" prop="create_time">
                        <el-date-picker v-model="documentData.create_time" :editable="false" type="date" placeholder="选择日期" format="yyyy年MM月dd日" value-format="yyyy年MM月dd日"></el-date-picker>
                    </el-form-item>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="公司名称">
                                <el-input v-model="documentData.company_name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="公司法人">
                                <el-input v-model="documentData.company_corporate"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="联系人">
                                <el-input v-model="documentData.linkman_name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="联系电话">
                                <el-input v-model="documentData.linkman_phone"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="注册地址">
                                <el-input v-model="documentData.company_registered_address"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="注册资金">
                                <el-input v-model="documentData.company_registered_capital"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="企业类型">
                        <el-checkbox-group v-model="documentData.company_type">
                            <el-checkbox label="1">股份公司</el-checkbox>
                            <el-checkbox label="2">已上市</el-checkbox>
                            <el-checkbox label="3">拟上市</el-checkbox>
                            <el-checkbox label="4">有限公司</el-checkbox>
                            <el-checkbox label="5">其他</el-checkbox>
                            <el-input type="text" v-model="documentData.company_type_other" placeholder="其他" style="margin-left:10px;display:inline-block;width:80px;"></el-input>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="行业类别">
                        <el-checkbox-group v-model="documentData.company_industry_type">
                            <el-checkbox label="1">互联网</el-checkbox>
                            <el-checkbox label="2">生物</el-checkbox>
                            <el-checkbox label="3">新能源</el-checkbox>
                            <el-checkbox label="4">新材料</el-checkbox>
                            <el-checkbox label="5">创意</el-checkbox>
                            <el-checkbox label="6">环保</el-checkbox>
                            <el-checkbox label="7">其他</el-checkbox>
                            <el-input type="text" v-model="documentData.company_industry_type_other" placeholder="其他" style="margin-left:10px;display:inline-block;width:80px;"></el-input>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="认定高新企业">
                        <el-checkbox-group v-model="documentData.high_tech_enterprises_type">
                            <el-checkbox label="1">国家</el-checkbox>
                            <el-checkbox label="2">深圳市</el-checkbox>
                            <el-checkbox label="4">无</el-checkbox>
                            <el-checkbox label="3">其他</el-checkbox>
                            <el-input type="text" v-model="documentData.high_tech_enterprises_type_other" placeholder="其他" style="margin-left:10px;display:inline-block;width:80px;"></el-input>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="建筑面积">
                                <el-input v-model="documentData.built_area" @keyup.native="onkeyupPrice($event)" placeholder="数字，小数点两位，单位平方米">
                                    <template slot="append">平方米</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="物业面积">
                                <el-input v-model="documentData.property_area" @keyup.native="onkeyupPrice($event)" placeholder="数字，小数点两位，单位平方米">
                                    <template slot="append">平方米</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="主营产品">
                        <el-input v-model="documentData.company_main_product"></el-input>
                    </el-form-item>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="上年度产值">
                                <el-input v-model="documentData.output_value" @keyup.native="onkeyupPrice($event)" placeholder="数字，小数点两位">
                                    <template slot="append">万元</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="上年度利润总额">
                                <el-input v-model="documentData.total_profit" @keyup.native="onkeyupPrice($event)" placeholder="数字，小数点两位">
                                    <template slot="append">万元</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="产品销售收入">
                                <el-input v-model="documentData.product_profit" @keyup.native="onkeyupPrice($event)" placeholder="数字，小数点两位">
                                    <template slot="append">万元</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="上年度研发投入">
                                <el-input v-model="documentData.dev_invested" @keyup.native="onkeyupPrice($event)" placeholder="数字，小数点两位">
                                    <template slot="append">万元</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="上年度纳税总额">
                                <el-input v-model="documentData.taxable_amount" @keyup.native="onkeyupPrice($event)" placeholder="数字，小数点两位">
                                    <template slot="append">万元</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="政策减免税额">
                                <el-input v-model="documentData.derate_amount" @keyup.native="onkeyupPrice($event)" placeholder="数字，小数点两位">
                                    <template slot="append">万元</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="员工人数">
                                <el-input v-model="documentData.company_employees_number"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="本科以上人数">
                                <el-input v-model="documentData.company_ability_employees_number"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="研发人数">
                                <el-input v-model="documentData.company_dev_employees_number"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="专利授权（件）">
                                <el-input v-model="documentData.patent_number"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="发明专利">
                                <el-input v-model="documentData.invent_number"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="实用新型专利">
                                <el-input v-model="documentData.utility_model_patent"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="拟购面积">
                        <el-input v-model="documentData.intentional_area" @keyup.native="onkeyupPrice($event)" placeholder="数字，小数点两位，单位平方米">
                            <template slot="append">平方米</template>
                        </el-input>
                    </el-form-item>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="朝向①">
                                <el-input v-model="documentData.intentional_toward1"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="朝向②">
                                <el-input v-model="documentData.intentional_toward2"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="朝向③">
                                <el-input v-model="documentData.intentional_toward3"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="楼层①">
                                <el-input v-model="documentData.intentional_floor1"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="楼层②">
                                <el-input v-model="documentData.intentional_floor2"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="楼层③">
                                <el-input v-model="documentData.intentional_floor3"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="拟投资额（万元）">
                                <el-input v-model="documentData.patent_number"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="物业投资">
                                <el-input v-model="documentData.invent_number"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="其他投资">
                                <el-input v-model="documentData.utility_model_patent"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="拟入驻内容">
                        <el-checkbox-group v-model="documentData.enter_content">
                            <el-checkbox label="1">企业总部</el-checkbox>
                            <el-checkbox label="2">研发中心</el-checkbox>
                            <el-checkbox label="3">管理中心</el-checkbox>
                            <el-checkbox label="4">地区总部</el-checkbox>
                            <el-checkbox label="5">销售中心</el-checkbox>
                            <el-checkbox label="6">其他</el-checkbox>
                            <el-input type="text" v-model="documentData.enter_content_other" placeholder="其他" style="margin-left:10px;display:inline-block;width:80px;"></el-input>
                        </el-checkbox-group>
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="submit()" icon="el-icon-tickets">保存文档</el-button>
                        <el-button icon="el-icon-web-reply">取消</el-button>
                        <el-button type="success" @click="onPrint()" icon="el-icon-printer">打印</el-button>
                    </el-form-item>
               </el-form>
            </el-col>
            <el-col :sm="24" :md="!this.frameParame.type ? 12 : 24">
                <div class="text-right" v-show="this.frameParame.type === 'print'">
                    <el-button type="primary" @click="onPrint()" icon="el-icon-printer" circle>点击打印本文档</el-button>
                </div>
                <div class="print">
                    <div ref="printbox">
                        <EnterParkRegistrationForm-Template @setTemplateHtml="SetTemplateHtml" :documentData="documentData"></EnterParkRegistrationForm-Template>

                        <!--
<div class="word font-song font18 line18">
<h2 class="text-center font28">入园登记表</h2>
<br>
<p>致 {{money_from}}</p>
<p>由：（付款人） {{money_to}}</p>

<p class="text-indent">我（们）在此自愿以{{money_pay_type_txt}}，向贵公司提供金额为：￥ {{money_pay_amount}} 元（大写 {{money_pay_amount_inwords}}）的款项，该款项用于 {{customer_name}} 购置（物业名） {{room_all_name}} 而缴纳的{{money_type_txt}}（ {{money_type_other}} ），我（们）保证资金确实。 </p>
<br>
<p class="text-indent">付款人签名（公章）：</p>
<br>
<p class="text-indent">客户签名（公章）：</p>
<br>
<p class="text-indent">（以下由收款方填写）</p>
<p class="text-indent">经办人（签名）：</p>
<br>
<p class="text-indent">经办人（签名）：</p>
<p class="text-right">　　　　年　　月　　日</p>
<br>
<p class="text-indent">付款人联系电话：{{money_to_phone}}</p>
</div>
                         -->
                    </div>
                </div>
                
            </el-col>
        </el-row>
    </div>
</template>

<script>
import '@/assets/css/wordPrint.css'
import Vue from 'vue'
import Print from '@/plugs/print'
import axios from 'axios'
Vue.use(Print)
Vue.component('EnterParkRegistrationForm-Template', function (resolve, reject) {
    axios.get('/api/file_template/get_file_templatedetails_by_file_code?file_code=EnterParkRegistrationForm').then((result) => {
        let templateHtml = result.data.data.template_html; // 将模板 html 传到父组件 用于 数据提交
        // <span class="placeholder"></span>
        let _html = result.data.data.template_html.replace(/{{/g, '{{documentData.').replace(/}}/g, ' || "      " }}')

        resolve({
            template: _html,
            props: {
                documentData: {
                    type: Object
                }
            },
            data() {
                return {
                    templateHtml: ''
                }
            },
            methods: {
            },
            created() {
                this.$emit('setTemplateHtml', templateHtml); // 将模板 html 传到父组件 用于 数据提交
            }
        })
    })
})
export default {
    props: {
        frameParame: {
            type: Object
        },
        editId: {
            type: Number()
        }
    },
    data () {
        return {
            documentData: {
                c_id: '', // 客户ID
                customer_name: '', //客户姓名
                file_template_html: '', // 文件模板_HTML

                create_time: '', // 填表日期
                company_name: '', // 公司名称
                company_corporate: '', // 公司法人
                linkman_name: '', // 联系人
                linkman_phone: '', // 联系人电话
                company_registered_address: '', // 注册地址
                company_registered_capital: '', // 资金
                company_type: [], // 企业类型
                company_type_txt: '□股份公司（□已上市 □拟上市） □有限公司 □其他', // 企业类型
                company_type_other: '', // 企业类型
                company_industry_type: [], // 行业类别
                company_industry_type_txt: '□互联网 □生物 □新能源 □新材料 □创意 □环保 □其他', // 行业类别
                company_industry_type_other: '', // 企业类型
                high_tech_enterprises_type: [], // 高新技术企业类型
                high_tech_enterprises_type_txt: '□国家 □深圳市 □其他 □无 （ ）', // 高新技术企业类型
                high_tech_enterprises_type_other: '', // 高新技术企业类型
                built_area: '', // 建筑面积
                property_area: '', // 物业面积
                company_main_product: '', // 主营产品
                output_value: '', // 产值
                total_profit: '', // 总利润
                product_profit: '', // 产品利润
                dev_invested: '', // 研发投入
                taxable_amount: '', // 纳税额
                derate_amount: '', // 减免额度
                company_employees_number: '', // 员工人数
                company_ability_employees_number: '', // 本科及以上人员数
                company_dev_employees_number: '', // 研发人员数
                patent_number: '', // 专利数
                invent_number: '', // 发明数
                utility_model_patent: '', // 实用新型专利数
                intentional_toward1: '', // 意向朝向
                intentional_toward2: '', // 意向朝向
                intentional_toward3: '', // 意向朝向
                intentional_floor1: '', // 意向楼层
                intentional_floor2: '', // 意向楼层
                intentional_floor3: '', // 意向楼层
                intentional_invested_amount: '', // 意向投资金额
                intentional_property_invested_amount: '', // 意向物业投资金额
                outher_invested_amount: '', // 其他投资金额
                enter_content: [], // 入驻内容
                enter_content_txt: '□企业总部 □研发中心 □管理中心 □地区总部 □销售中心 □其他', // 入驻内容
                enter_content_other: '', // 入驻内容
            },
            myCustomers: [] // 我的客户列表
        }
    },
    created() {
        let _this = this;
        this.$https.all([
            this.getMyCustomer()
        ]).then(this.$https.spread(function (acct, perms) {
            if (_this.editId) { // 编辑文档
                _this.getOldData(); // 获取旧数据
            }
        }))
    },
    watch: {
        'documentData.company_type': function(val) {
            console.log(val)
            let _txt = '';
            let _arrL = val.length + 1;
            if (val.indexOf('1', -_arrL ) !== -1) {
                _txt += '☑股份公司';
            } else {
                _txt += '□股份公司';
            }
            if (val.indexOf('2', -_arrL ) !== -1) {
                _txt += '（☑已上市   ';
            } else {
                _txt += '（□已上市   ';
            }
            if (val.indexOf('3', -_arrL ) !== -1) {
                _txt += '☑拟上市）  ';
            } else {
                _txt += '□拟上市）  ';
            }
            if (val.indexOf('4', -_arrL ) !== -1) {
                _txt += '☑有限公司     ';
            } else {
                _txt += '□有限公司     ';
            }
            if (val.indexOf('5', -_arrL ) !== -1) {
                _txt += '☑其他';
            } else {
                _txt += '□其他';
                this.documentData.company_type_other = '';
            }
            this.documentData.company_type_txt = _txt;
        },
        'documentData.company_industry_type': function(val) {
            console.log(val)
            let _txt = '';
            let _arrL = val.length + 1;
            if (val.indexOf('1', -_arrL ) !== -1) {
                _txt += '☑互联网 ';
            } else {
                _txt += '□互联网 ';
            }
            if (val.indexOf('2', -_arrL ) !== -1) {
                _txt += '☑生物 ';
            } else {
                _txt += '□生物 ';
            }
            if (val.indexOf('3', -_arrL ) !== -1) {
                _txt += '☑新能源 ';
            } else {
                _txt += '□新能源 ';
            }
            if (val.indexOf('4', -_arrL ) !== -1) {
                _txt += '☑新材料 ';
            } else {
                _txt += '□新材料 ';
            }
            if (val.indexOf('5', -_arrL ) !== -1) {
                _txt += '☑创意 ';
            } else {
                _txt += '□创意 ';
            }
            if (val.indexOf('6', -_arrL ) !== -1) {
                _txt += '☑环保 ';
            } else {
                _txt += '□环保 ';
            }
            if (val.indexOf('7', -_arrL ) !== -1) {
                _txt += '☑其他';
            } else {
                _txt += '□其他';
                this.documentData.company_industry_type_other = '';
            }
            this.documentData.company_industry_type_txt = _txt;
        },
        'documentData.high_tech_enterprises_type': function(val) {
            console.log(val)
            let _txt = '';
            let _arrL = val.length + 1;
            if (val.indexOf('1', -_arrL ) !== -1) {
                _txt += '☑国家   ';
            } else {
                _txt += '□国家   ';
            }
            if (val.indexOf('2', -_arrL ) !== -1) {
                _txt += '☑深圳市    ';
            } else {
                _txt += '□深圳市    ';
            }
            if (val.indexOf('3', -_arrL ) !== -1) {
                _txt += '☑其他    ';
            } else {
                _txt += '□其他    ';
                this.documentData.high_tech_enterprises_type_other = '';
            }
            if (val.indexOf('4', -_arrL ) !== -1) {
                _txt += '☑无 ';
            } else {
                _txt += '□无 ';
            }
            this.documentData.high_tech_enterprises_type_txt = _txt;
        },
        'documentData.enter_content': function(val) {
            console.log(val)
            let _txt = '';
            let _arrL = val.length + 1;
            if (val.indexOf('1', -_arrL ) !== -1) {
                _txt += '☑企业总部  ';
            } else {
                _txt += '□企业总部  ';
            }
            if (val.indexOf('2', -_arrL ) !== -1) {
                _txt += '☑研发中心   ';
            } else {
                _txt += '□研发中心   ';
            }
            if (val.indexOf('3', -_arrL ) !== -1) {
                _txt += '☑管理中心  ';
            } else {
                _txt += '□管理中心  ';
            }
            if (val.indexOf('4', -_arrL ) !== -1) {
                _txt += '☑地区总部  ';
            } else {
                _txt += '□地区总部  ';
            }
            if (val.indexOf('5', -_arrL ) !== -1) {
                _txt += '☑销售中心      ';
            } else {
                _txt += '□销售中心      ';
            }
            if (val.indexOf('6', -_arrL ) !== -1) {
                _txt += '☑其他';
            } else {
                _txt += '□其他';
                this.documentData.enter_content_other = '';
            }
            this.documentData.enter_content_txt = _txt;
        }
        
    },
    methods: {
        onPrint() {
            this.$print(this.$refs.printbox)
        },
        SetTemplateHtml(html) {
            this.documentData.file_template_html = html;
        },
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
            this.documentData.customer_name = obj.customer_name; // 客户名称
            this.documentData.company_name = obj.enterprise_name; // 公司名称
            this.documentData.company_corporate = obj.company_corporate; // 企业法人
            this.documentData.company_registered_address = obj.company_registered_address; // 注册地址
            this.documentData.company_registered_capital = obj.company_registered_capital; // 注册资金
            this.documentData.company_main_product = obj.company_main_product; // 主营产品
            this.documentData.company_employees_number = obj.company_employees_number; // 员工人数

        },
        getOldData() { // 获取编辑数据

            this.$https.get('/api/file_common/get_file_commondetails?fc_id=' + this.editId).then((result) => {
                if (result.data.code == 0) {
                    let _data = result.data.data;
                    this.documentData.c_id = _data.c_id; // 客户ID
                    this.documentData.customer_name = _data.customer_name; //客户姓名
                    this.documentData.file_template_html = _data.file_template_html; // 文件模板_HTML
                    let _file_json_data = JSON.parse(_data.file_json_data);
                    
                    this.documentData.create_time = _file_json_data.create_time; // 填表日期
                    this.documentData.company_name = _file_json_data.company_name; // 公司名称
                    this.documentData.company_corporate = _file_json_data.company_corporate; // 公司法人
                    this.documentData.linkman_name = _file_json_data.linkman_name; // 联系人
                    this.documentData.linkman_phone = _file_json_data.linkman_phone; // 联系人电话
                    this.documentData.company_registered_address = _file_json_data.company_registered_address; // 注册地址
                    this.documentData.company_registered_capital = _file_json_data.company_registered_capital; // 资金
                    this.documentData.company_type = _file_json_data.company_type ? _file_json_data.company_type : []; // 企业类型
                    this.documentData.company_type_other = _file_json_data.company_type_other; // 企业类型
                    this.documentData.company_industry_type = _file_json_data.company_industry_type ? _file_json_data.company_industry_type : []; // 行业类别
                    this.documentData.company_industry_type_other = _file_json_data.company_industry_type_other; // 企业类型
                    this.documentData.high_tech_enterprises_type = _file_json_data.high_tech_enterprises_type ? _file_json_data.high_tech_enterprises_type : []; // 高新技术企业类型
                    this.documentData.high_tech_enterprises_type_other = _file_json_data.high_tech_enterprises_type_other; // 高新技术企业类型
                    this.documentData.built_area = _file_json_data.built_area; // 建筑面积
                    this.documentData.property_area = _file_json_data.property_area; // 物业面积
                    this.documentData.company_main_product = _file_json_data.company_main_product; // 主营产品
                    this.documentData.output_value = _file_json_data.output_value; // 产值
                    this.documentData.total_profit = _file_json_data.total_profit; // 总利润
                    this.documentData.product_profit = _file_json_data.product_profit; // 产品利润
                    this.documentData.dev_invested = _file_json_data.dev_invested; // 研发投入
                    this.documentData.taxable_amount = _file_json_data.taxable_amount; // 纳税额
                    this.documentData.derate_amount = _file_json_data.derate_amount; // 减免额度
                    this.documentData.company_employees_number = _file_json_data.company_employees_number; // 员工人数
                    this.documentData.company_ability_employees_number = _file_json_data.company_ability_employees_number; // 本科及以上人员数
                    this.documentData.company_dev_employees_number = _file_json_data.company_dev_employees_number; // 研发人员数
                    this.documentData.patent_number = _file_json_data.patent_number; // 专利数
                    this.documentData.invent_number = _file_json_data.invent_number; // 发明数
                    this.documentData.utility_model_patent = _file_json_data.utility_model_patent; // 实用新型专利数
                    this.documentData.intentional_toward1 = _file_json_data.intentional_toward1; // 意向朝向
                    this.documentData.intentional_toward2 = _file_json_data.intentional_toward2; // 意向朝向
                    this.documentData.intentional_toward3 = _file_json_data.intentional_toward3; // 意向朝向
                    this.documentData.intentional_floor1 = _file_json_data.intentional_floor1; // 意向楼层
                    this.documentData.intentional_floor2 = _file_json_data.intentional_floor2; // 意向楼层
                    this.documentData.intentional_floor3 = _file_json_data.intentional_floor3; // 意向楼层
                    this.documentData.intentional_invested_amount = _file_json_data.intentional_invested_amount; // 意向投资金额
                    this.documentData.intentional_property_invested_amount = _file_json_data.intentional_property_invested_amount; // 意向物业投资金额
                    this.documentData.outher_invested_amount = _file_json_data.outher_invested_amount; // 其他投资金额
                    this.documentData.enter_content = _file_json_data.enter_content ? _file_json_data.enter_content : []; // 入驻内容
                    this.documentData.enter_content_other = _file_json_data.enter_content_other; // 入驻内容
                    
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
                        c_id: this.documentData.c_id, // 客户ID
                        customer_name: this.documentData.customer_name, //客户姓名
                        file_template_html: this.documentData.file_template_html, // 文件模板_HTML
                        file_template_id: this.frameParame.id, // 文件模板id
                        file_name: this.frameParame.name, // 文件模板名称
                        file_type_code: this.frameParame.code // 文件模板code
                    }
                    _postData.file_json_data = JSON.stringify({
                        create_time: this.documentData.create_time, // 填表日期
                        company_name: this.documentData.company_name, // 公司名称
                        company_corporate: this.documentData.company_corporate, // 公司法人
                        linkman_name: this.documentData.linkman_name, // 联系人
                        linkman_phone: this.documentData.linkman_phone, // 联系人电话
                        company_registered_address: this.documentData.company_registered_address, // 注册地址
                        company_registered_capital: this.documentData.company_registered_capital, // 资金
                        company_type: this.documentData.company_type, // 企业类型
                        company_type_other: this.documentData.company_type_other, // 企业类型
                        company_industry_type: this.documentData.company_industry_type, // 行业类别
                        company_industry_type_other: this.documentData.company_industry_type_other, // 企业类型
                        high_tech_enterprises_type: this.documentData.high_tech_enterprises_type, // 高新技术企业类型
                        high_tech_enterprises_type_other: this.documentData.high_tech_enterprises_type_other, // 高新技术企业类型
                        built_area: this.documentData.built_area, // 建筑面积
                        property_area: this.documentData.property_area, // 物业面积
                        company_main_product: this.documentData.company_main_product, // 主营产品
                        output_value: this.documentData.output_value, // 产值
                        total_profit: this.documentData.total_profit, // 总利润
                        product_profit: this.documentData.product_profit, // 产品利润
                        dev_invested: this.documentData.dev_invested, // 研发投入
                        taxable_amount: this.documentData.taxable_amount, // 纳税额
                        derate_amount: this.documentData.derate_amount, // 减免额度
                        company_employees_number: this.documentData.company_employees_number, // 员工人数
                        company_ability_employees_number: this.documentData.company_ability_employees_number, // 本科及以上人员数
                        company_dev_employees_number: this.documentData.company_dev_employees_number, // 研发人员数
                        patent_number: this.documentData.patent_number, // 专利数
                        invent_number: this.documentData.invent_number, // 发明数
                        utility_model_patent: this.documentData.utility_model_patent, // 实用新型专利数
                        intentional_toward1: this.documentData.intentional_toward1, // 意向朝向
                        intentional_toward2: this.documentData.intentional_toward2, // 意向朝向
                        intentional_toward3: this.documentData.intentional_toward3, // 意向朝向
                        intentional_floor1: this.documentData.intentional_floor1, // 意向楼层
                        intentional_floor2: this.documentData.intentional_floor2, // 意向楼层
                        intentional_floor3: this.documentData.intentional_floor3, // 意向楼层
                        intentional_invested_amount: this.documentData.intentional_invested_amount, // 意向投资金额
                        intentional_property_invested_amount: this.documentData.intentional_property_invested_amount, // 意向物业投资金额
                        outher_invested_amount: this.documentData.outher_invested_amount, // 其他投资金额
                        enter_content: this.documentData.enter_content, // 入驻内容
                        enter_content_other: this.documentData.enter_content_other, // 入驻内容
                    })

                    if (this.editId) { // 编辑
                        _postData.fc_id = parseInt(this.editId);
                        this.$https.post('/api/file_common/update_file_common', _postData).then((result) => {
                            if (result.data.code == 0) {
                                this.$message({
                                    type: 'success',
                                    showClose: true,
                                    message: '成功编辑文档',
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
                    } else { // 新增
                        this.$https.post('/api/file_common/create_file_common', _postData).then((result) => {
                            if (result.data.code == 0) {
                                this.$message({
                                    type: 'success',
                                    showClose: true,
                                    message: '成功保存文档',
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
                    }
                    

                } else {
                    console.error('验证失败');
                    return false;
                }
            });
        },
        closeDialog(name) {
            if (!name) {
                this.$emit('closeDialog', 'Frame'); // 执行父组件关闭方法
            } else {
                this.$emit('closeDialog', name); // 执行父组件关闭方法
            }
        }
    }
}

</script>

<style scoped>
</style>
