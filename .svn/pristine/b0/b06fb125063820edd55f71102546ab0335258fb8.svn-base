<template>
    <div>
        <el-card>
            
            <el-row>
                <el-col :span="6" style="height: 700px;width: 150px;border-right: 5px solid #ebeef5;margin-right:15px;">
                        <el-steps direction="vertical" :active="step" process-status="finish" finish-status="success">
                            <el-step title="缴纳诚意金" @click.native="changeStep(0)"></el-step>
                            <el-step title="了解客户" @click.native="changeStep(1)"></el-step>
                            <el-step title="选房" @click.native="changeStep(2)"></el-step>
                            <el-step title="签定制协议" @click.native="changeStep(3)"></el-step>
                            <el-step title="预售准备" @click.native="changeStep(4)"></el-step>
                            <el-step title="签订认购书" @click.native="changeStep(5)"></el-step>
                            <el-step title="签定合同" @click.native="changeStep(6)"></el-step>
                            <el-step title="入伙通知" @click.native="changeStep(7)"></el-step>
                            <el-step title="领取房产证" @click.native="changeStep(8)"></el-step>
                        </el-steps>
                </el-col>
                <el-col :span="18">
                    <div v-if="step === 0">
                        <!-- 1缴纳诚意金 -->
                        <el-form ref="form1" :rules="form1_rules" :model="form1" label-width="120px" :disabled="flowStep !== 1" :label-suffix="flowStep !== 1 ? '：' : ''">
                            <el-form-item label="诚意金金额" prop="earnest_money_amount">
                                <el-input v-model="form1.earnest_money_amount" @keyup.native="onkeyupPrice($event)" placeholder="数字，小数点两位" style="width: 200px">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="缴纳时间" prop="earnest_money_pay_time">
                                <el-date-picker v-model="form1.earnest_money_pay_time" type="date" placeholder="选择日期" editable></el-date-picker>
                            </el-form-item>
                            <el-form-item label="缴纳备注">
                                <el-input type="textarea" v-model="form1.earnest_money_remark" :rows="4"></el-input>
                            </el-form-item>
                            <el-form-item v-if="flowStep === 1">
                                <el-button type="primary" @click="submit(1)">提交</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    
                    <div v-if="step === 1">
                        <!-- 2了解客户 -->
                        <el-form ref="form2" :rules="form2_rules" :model="form2" label-width="120px" v-if="flowStep === 1">
                            <el-form-item label="诚意金金额" prop="customer_information_status">
                                <el-radio-group v-model="form2.customer_information_status">
                                    <el-radio label="0">未完善</el-radio>
                                    <el-radio label="1">部分完善</el-radio>
                                    <el-radio label="2">已完善</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="诚意金金额" prop="custome_intention">
                                <el-radio-group v-model="form2.custome_intention">
                                    <el-radio label="0">自用</el-radio>
                                    <el-radio label="1">短期内不自用</el-radio>
                                    <el-radio label="2">投资</el-radio>
                                    <el-radio label="2">自用投资</el-radio>
                                    <el-radio label="2">不明朗</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submit(2)">提交</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div v-if="step === 2">
                        <!-- 3选房 -->
                    </div>
                    <div v-if="step === 3">
                        <!-- 4签定制协议 -->
                    </div>
                    <div v-if="step === 4">
                        <!-- 5预售准备 -->
                        <el-form ref="form5" :rules="form5_rules" :model="form5" label-width="180px">
                            <el-form-item label="是否已付清定制定金" prop="is_earnest_money_pay">
                                <el-radio-group v-model="form5.is_earnest_money_pay">
                                    <el-radio label="0">否</el-radio>
                                    <el-radio label="1">是</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="是否已提交银行资料" prop="is_get_bank_doc">
                                <el-radio-group v-model="form5.is_get_bank_doc">
                                    <el-radio label="0">否</el-radio>
                                    <el-radio label="1">是</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="是否已告知预售时间" prop="is_notice_pre_sale_time">
                                <el-radio-group v-model="form5.is_notice_pre_sale_time">
                                    <el-radio label="0">否</el-radio>
                                    <el-radio label="1">是</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="整理入园资料" prop="is_get_enter_park_doc">
                                <el-radio-group v-model="form5.is_get_enter_park_doc">
                                    <el-radio label="0">未完成</el-radio>
                                    <el-radio label="1">已完成</el-radio>
                                    <el-input v-if="form5.is_get_enter_park_doc === '1'" v-model="form5.enter_park_doc_remark" placeholder="请输入档案袋编号" style="width:200px;margin-left:10px;" size="mini"></el-input>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="客户真实意向" prop="customer_true_intention">
                                <el-radio-group v-model="form5.customer_true_intention">
                                    <el-radio label="0">自用</el-radio>
                                    <el-radio label="1">投资</el-radio>
                                    <el-radio label="2">两种都有</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submit(5)">提交</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div v-if="step === 5">
                        <!-- 6签订认购书 -->
                        <el-form ref="form6" :rules="form6_rules" :model="form6" label-width="150px">
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="服务费单价" prop="service_price">
                                        <el-input v-model="form6.service_price" @keyup.native="onkeyupPrice($event)" placeholder="数字，小数点两位" style="width: 200px">
                                            <template slot="append">元</template>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="保证金单价" prop="deposit_price">
                                        <el-input v-model="form6.deposit_price" @keyup.native="onkeyupPrice($event)" placeholder="数字，小数点两位" style="width: 200px">
                                            <template slot="append">元</template>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <table class="table-border">
                                <thead>
                                    <tr>
                                        <th>物业</th>
                                        <th>原单价（元/平方米）</th>
                                        <th>面积（平方米）</th>
                                        <th>折扣（元/平米）</th>
                                        <th>成交价格（元）</th>
                                        <th>房款</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>【N6】号厂房【10】层【1002】单元</td>
                                        <td>8000</td>
                                        <td>355</td>
                                        <td>1%</td>
                                        <td>价格1=折后单价*面积1</td>
                                        <td>（折后单价-服务费单价）*面积1</td>
                                    </tr>
                                    <tr>
                                        <td>【N6】号厂房【10】层【1003】单元</td>
                                        <td>8000</td>
                                        <td>366</td>
                                        <td>100</td>
                                        <td>价格1=折后单价*面积2</td>
                                        <td>（折后单价-服务费单价）*面积2</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th>合计</th>
                                        <td>-</td>
                                        <td>面积1+面积2</td>
                                        <td>-</td>
                                        <td>价格1+价格2</td>
                                        <td>房款1+房款2</td>
                                    </tr>
                                </tfoot>
                            </table>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="服务费总计" prop="service_price_count">
                                        <el-input v-model="form6.service_price_count" @keyup.native="onkeyupPrice($event)" placeholder="数字，小数点两位" style="width: 200px">
                                            <template slot="append">元</template>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="保证金总计" prop="deposit_price_count">
                                        <el-input v-model="form6.deposit_price_count" @keyup.native="onkeyupPrice($event)" placeholder="数字，小数点两位" style="width: 200px">
                                            <template slot="append">元</template>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                        <!-- total_price: '', // F_房款总价(元)
                            service_price: '', // F_服务费单价(元/平方)
                            service_price_count: '', // F_服务费总计_自动计算(元)
                        service_price_real_count: '', // F_服务费总计_实际发生额(元)
                            deposit_price: '', // F_保证金单价(元/平方)
                            deposit_price_count: '', // F_保证金总计_自动计算(元)
                        deposit_price_real_count: '', // F_保证金总计_实际发生额(元)
                        real_transaction_price: '', // F_成交总价(元)
                            pay_status: '', // F_付款方式(0:按揭 1:一次性)
                            first_pay_amount: '', // F_首款含定金金额(元)
                            mortgage_bank: '', // F_按揭银行
                            mortgage_percent: '', // F_按揭成数
                        mortgage_first_pay_amount: '', // F_按揭首期付款金额(元)
                            mortgage_first_pay_date: '', // F_按揭首期付款日期
                        mortgage_second_pay_amount: '', // F_按揭二期付款金额(元)
                            mortgage_second_pay_date: '', // F_按揭二期付款日期
                            one_payment_amount: '', // F_一次性付款金额(元)
                            one_payment_date: '', // F_一次性付款日期 -->
                            <el-row>
                                <el-col :span="24">
                                    <el-form-item label="房款总首付(含定金)" prop="first_pay_amount">
                                        <el-input v-model="form6.first_pay_amount" @keyup.native="onkeyupPrice($event)" placeholder="数字，小数点两位" style="width: 200px">
                                            <template slot="append">元</template>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="24">
                                    <el-form-item label="付款方式" prop="pay_status">
                                        <el-radio-group v-model="form6.pay_status">
                                            <el-radio label="0">按揭</el-radio>
                                            <el-radio label="1">一次性</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <div v-if="form6.pay_status === '0'">
                                <!-- 按揭 -->
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="按揭银行" prop="mortgage_bank">
                                            <el-autocomplete v-model="form6.mortgage_bank" :fetch-suggestions="querySearch" placeholder="请输入按揭银行"></el-autocomplete>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="按揭成数" prop="mortgage_percent">
                                            <el-input v-model="form6.mortgage_percent" @keyup.native="onkeyupPlusInt($event)" placeholder="整数" style="width: 200px">
                                                <template slot="append">成</template>
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="按揭首期付款日期" prop="mortgage_first_pay_date">
                                            <el-date-picker v-model="form1.mortgage_first_pay_date" type="date" placeholder="选择日期" editable style="width: 200px"></el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="按揭二期付款日期" prop="mortgage_second_pay_date">
                                            <el-date-picker v-model="form1.mortgage_second_pay_date" type="date" placeholder="选择日期" editable style="width: 200px"></el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </div>
                            <div v-else-if="form6.pay_status === '1'">
                                <!-- 一次性 -->
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="一次性付款金额" prop="one_payment_amount">
                                            <el-input v-model="form6.one_payment_amount" @keyup.native="onkeyupPrice($event)" placeholder="数字，小数点两位" style="width: 200px">
                                                <template slot="append">元</template>
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="一次性付款日期" prop="one_payment_date">
                                            <el-date-picker v-model="form1.one_payment_date" type="date" placeholder="选择日期" editable style="width: 200px"></el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </div>
                            <el-form-item>
                                <el-button type="primary" @click="submit(6)">提交</el-button>
                            </el-form-item>
                        </el-form>
                        
                    </div>
                    <div v-if="step === 6">
                        <!-- 7签定合同 -->
                    </div>
                    <div v-if="step === 7">
                        <!-- 8入伙通知 -->
                        <el-form ref="form8" :rules="form8_rules" :model="form8" label-width="150px">
                            <el-form-item label="是否已发入伙通知" prop="is_notice_owner_get_house">
                                <el-radio-group v-model="form8.is_notice_owner_get_house">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="0">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="预计入伙时间" prop="owner_get_house_time">
                                <el-date-picker v-model="form8.owner_get_house_time" type="date" placeholder="选择日期" editable></el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submit(8)">提交</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div v-if="step === 8">
                        <!-- 9领取房产证 -->
                        <el-form ref="form9" :rules="form9_rules" :model="form9" label-width="150px">
                            <el-form-item label="是否已领房产证" prop="is_get_house_certificate">
                                <el-radio-group v-model="form9.is_get_house_certificate">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="0">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="房产证编号" prop="certificate_no">
                                <el-input v-model="form9.certificate_no" placeholder="请输入房产证编号"></el-input>
                            </el-form-item>
                            <el-form-item label="领证时间" prop="get_house_certificate_time">
                                <el-date-picker v-model="form9.get_house_certificate_time" type="date" placeholder="选择日期" editable></el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submit(9)">提交</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
            
        </el-card>
    </div>
</template>

<script>
export default {
    data () {
        return {
            step: 0, // setp 0 （ 步骤一 form1）当前显示的步骤
            flowStep: 6, // 当前进行到哪一步骤
            // step 是视角切换， flowStep 是固定值
            // 例如：当前进行到第6步，则第6步是编辑状态，第6步之前的均是查看状态，第6步之后的无法点击（不可查看/编辑）
            form1: {
                earnest_money_amount: '', // 诚意金金额
                earnest_money_pay_time: '', // 诚意金缴纳时间
                earnest_money_remark: '', // 诚意金缴纳备注
            },
            form1_rules: {
                earnest_money_amount: [
                    { required: true, message: '请输入诚意金金额', trigger: 'blur'}
                ],
                earnest_money_pay_time: [
                    { required: true, message: '请输入诚意金缴纳时间', trigger: 'blur'}
                ]
            },
            form2: {
                customer_information_status: '', // 客户资料完善状态
                custome_intention: '' // 客户购房意图
            },
            form2_rules: {
                customer_information_status: [
                    { required: true, message: '请选择客户资料完善情况', trigger: 'change'}
                ],
                custome_intention: [
                    { required: true, message: '请选择客户购房意图', trigger: 'change'}
                ]
            },
            form5: {
                is_earnest_money_pay: '', // E_是否已付清定制定金(0:否 1:是)
                is_get_bank_doc: '', // E_是否已提交银行资料(0:否 1:是)
                is_notice_pre_sale_time: '', // E_是否已告知预售时间(0:否 1:是)
                is_get_enter_park_doc: '', // E_整理入园资料(0:未完成 1:已完成)
                enter_park_doc_remark: '', // E_j整理入园资料_备注
                customer_true_intention: '', // E_客户真实意向
            },
            form5_rules: {
                is_earnest_money_pay: [
                    { required: true, message: '请选择', trigger: 'change'}
                ],
                is_get_bank_doc: [
                    { required: true, message: '请选择', trigger: 'change'}
                ],
                is_notice_pre_sale_time: [
                    { required: true, message: '请选择', trigger: 'change'}
                ],
                is_get_enter_park_doc: [
                    { required: true, message: '请选择', trigger: 'change'}
                ],
                customer_true_intention: [
                    { required: true, message: '请选择', trigger: 'change'}
                ]
            },
            form6: {
                total_price: '', // F_房款总价(元)
                service_price: '', // F_服务费单价(元/平方)
                service_price_count: '', // F_服务费总计_自动计算(元)
                service_price_real_count: '', // F_服务费总计_实际发生额(元)
                deposit_price: '', // F_保证金单价(元/平方)
                deposit_price_count: '', // F_保证金总计_自动计算(元)
                deposit_price_real_count: '', // F_保证金总计_实际发生额(元)
                real_transaction_price: '', // F_成交总价(元)
                pay_status: '0', // F_付款方式(0:按揭 1:一次性)
                first_pay_amount: '', // F_首款含定金金额(元)
                mortgage_bank: '', // F_按揭银行
                mortgage_percent: '', // F_按揭成数
                mortgage_first_pay_amount: '', // F_按揭首期付款金额(元)
                mortgage_first_pay_date: '', // F_按揭首期付款日期
                mortgage_second_pay_amount: '', // F_按揭二期付款金额(元)
                mortgage_second_pay_date: '', // F_按揭二期付款日期
                one_payment_amount: '', // F_一次性付款金额(元)
                one_payment_date: '', // F_一次性付款日期
            },
            banks: [], // 银行数组
            form6_rules: {
                total_price: [
                    { required: true, message: '请选择', trigger: 'change'}
                ],
                service_price: [
                    { required: true, message: '请选择', trigger: 'change'}
                ]
            },
            
            form8: {
                is_notice_owner_get_house: '', // H_是否已发入伙通知(0:否 1:是)
                owner_get_house_time: '' // H_预计入伙时间
            },
            form8_rules: {
                is_notice_owner_get_house: [
                    { required: true, message: '请选择', trigger: 'change'}
                ],
                owner_get_house_time: [
                    { required: true, message: '请输入预计入伙时间', trigger: 'blur'}
                ]
            },
            form9: {
                is_get_house_certificate: '', // I_是否已领房产证(0:否 1:是)
                certificate_no: '', // I_房产证编号
                get_house_certificate_time: '' // I_领证时间
            },
            form9_rules: {
                is_get_house_certificate: [
                    { required: true, message: '请选择', trigger: 'change'}
                ],
                certificate_no: [
                    { required: true, message: '请输入房产证编号', trigger: 'blur'}
                ],
                get_house_certificate_time: [
                    { required: true, message: '请输入预计入伙时间', trigger: 'blur'}
                ]
            }
        }
    },
    props: {
        c_id: {
            type: Number
        },
        f_id: {
            type: Number
        }
    },
    created() {
        let _this = this;
        this.$https.all([
        ]).then(this.$https.spread(function (acct, perms) {
            if (_this.id) { // 编辑
            }
        }))
    },
    watch: {
        'form5.is_get_enter_park_doc': function(val) { // 监听入园资料勾选状态
            if (val === '0') {
                this.form5.enter_park_doc_remark = '';
            }
        }
    },
    methods: {
        changeStep(val) {
            if (val < this.flowStep) { // 设置可点击的步骤
                this.step = val;
            }
        },
        submit(_step) { // 提交  _setp 与步骤值等同
                console.log(_step)
            switch (_step) {
                case 1: // 缴纳诚意金
                    this.$refs.form1.validate((valid) => {
                        if (valid) {
                            let _postData = {
                                earnest_money_amount: this.form1.earnest_money_amount, // 诚意金金额
                                earnest_money_pay_time: this.form1.earnest_money_pay_time, // 诚意金缴纳时间
                                earnest_money_remark: this.form1.earnest_money_remark, // 诚意金缴纳备注
                                current_step: 1, // 当前步骤
                                f_id: this.f_id, // 流程标识
                                c_id: this.c_id // 客户标识
                            }
                            this.$https.post('/api/flow_buyinghouse/pay_earnest_money', _postData).then((result) => {
                                if (result.data.code == 0) {
                                    this.$message({
                                        type: 'success',
                                        showClose: true,
                                        message: '提交成功',
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
                    break;
                case 2: // 了解客户-完成客户资料
                    this.$refs.form2.validate((valid) => {
                        if (valid) {
                            let _postData = {
                                customer_information_status: this.form2.customer_information_status, // 客户资料完善状态
                                custome_intention: this.form2.custome_intention, // 客户购房意图
                                current_step: 2, // 当前步骤
                                f_id: this.f_id, // 流程标识
                                c_id: this.c_id // 客户标识
                            }
                            this.$https.post('/api/flow_buyinghouse/complete_customer_information', _postData).then((result) => {
                                if (result.data.code == 0) {
                                    this.$message({
                                        type: 'success',
                                        showClose: true,
                                        message: '提交成功',
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
                    break;
                case 5: // 预售准备
                    this.$refs.form5.validate((valid) => {
                        if (valid) {
                            let _postData = {
                                is_earnest_money_pay: this.form5.is_earnest_money_pay, // E_是否已付清定制定金(0:否 1:是)
                                is_get_bank_doc: this.form5.is_get_bank_doc, // E_是否已提交银行资料(0:否 1:是)
                                is_notice_pre_sale_time: this.form5.is_notice_pre_sale_time, // E_是否已告知预售时间(0:否 1:是)
                                is_get_enter_park_doc: this.form5.is_get_enter_park_doc, // E_整理入园资料(0:未完成 1:已完成)
                                enter_park_doc_remark: this.form5.enter_park_doc_remark, // E_j整理入园资料_备注
                                customer_true_intention: this.form5.customer_true_intention, // E_客户真实意向
                                current_step: 5, // 当前步骤
                                f_id: this.f_id, // 流程标识
                                c_id: this.c_id // 客户标识
                            }
                            this.$https.post('/api/flow_buyinghouse/pre_sale_preparation', _postData).then((result) => {
                                if (result.data.code == 0) {
                                    this.$message({
                                        type: 'success',
                                        showClose: true,
                                        message: '提交成功',
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
                    break;
                case 8: // 入伙通知
                    this.$refs.form8.validate((valid) => {
                        if (valid) {
                            let _postData = {
                                is_notice_owner_get_house: this.form8.is_notice_owner_get_house, // H_是否已发入伙通知(0:否 1:是)
                                owner_get_house_time: this.form8.owner_get_house_time, // H_预计入伙时间
                                current_step: 8, // 当前步骤
                                f_id: this.f_id, // 流程标识
                                c_id: this.c_id // 客户标识
                            }
                            this.$https.post('/api/flow_buyinghouse/notice_owner', _postData).then((result) => {
                                if (result.data.code == 0) {
                                    this.$message({
                                        type: 'success',
                                        showClose: true,
                                        message: '提交成功',
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
                    break;
                case 9: // 领取房产证
                    this.$refs.form9.validate((valid) => {
                        if (valid) {
                            let _postData = {
                                is_get_house_certificate: this.form8.is_get_house_certificate, // I_是否已领房产证(0:否 1:是)
                                certificate_no: this.form8.certificate_no, // I_房产证编号
                                get_house_certificate_time: this.form8.get_house_certificate_time, // I_领证时间
                                current_step: 9, // 当前步骤
                                f_id: this.f_id, // 流程标识
                                c_id: this.c_id // 客户标识
                            }
                            this.$https.post('/api/flow_buyinghouse/get_house_certificate', _postData).then((result) => {
                                if (result.data.code == 0) {
                                    this.$message({
                                        type: 'success',
                                        showClose: true,
                                        message: '提交成功',
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
                    break;
                default:
                    // statements_def
                    break;
            }
            
        },
        closeDialog(name) { // 关闭当前
            // this.$refs.form.resetFields(); // 重置表单
            if (!name) {
                this.$emit('closeDialog', 'dialogRentingAdd'); // 执行父组件关闭方法
                this.$emit('closeDialog', 'dialogRentingEdit'); // 执行父组件关闭方法
            } else {
                this.$emit('closeDialog', name); // 执行父组件关闭方法
            }
        },
        querySearch(queryString, cb) {
            var banks = this.banks;
            var results = queryString ? banks.filter(this.createFilter(queryString)) : banks;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (banks) => {
              return (banks.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        loadBank() {
            return [
                {code: 'CDB', value: '国家开发银行'},
                {code: 'ICBC', value: '中国工商银行'},
                {code: 'ABC', value: '中国农业银行'},
                {code: 'BOC', value: '中国银行'},
                {code: 'CCB', value: '中国建设银行'},
                {code: 'PSBC', value: '中国邮政储蓄银行'},
                {code: 'COMM', value: '交通银行'},
                {code: 'CMB', value: '招商银行'},
                {code: 'SPDB', value: '上海浦东发展银行'},
                {code: 'CIB', value: '兴业银行'},
                {code: 'HXBANK', value: '华夏银行'},
                {code: 'GDB', value: '广东发展银行'},
                {code: 'CMBC', value: '中国民生银行'},
                {code: 'CITIC', value: '中信银行'},
                {code: 'CEB', value: '中国光大银行'},
                {code: 'EGBANK', value: '恒丰银行'},
                {code: 'CZBANK', value: '浙商银行'},
                {code: 'BOHAIB', value: '渤海银行'},
                {code: 'SPABANK', value: '平安银行'},
                {code: 'SHRCB', value: '上海农村商业银行'},
                {code: 'YXCCB', value: '玉溪市商业银行'},
                {code: 'YDRCB', value: '尧都农商行'},
                {code: 'BJBANK', value: '北京银行'},
                {code: 'SHBANK', value: '上海银行'},
                {code: 'JSBANK', value: '江苏银行'},
                {code: 'HZCB', value: '杭州银行'},
                {code: 'NJCB', value: '南京银行'},
                {code: 'NBBANK', value: '宁波银行'},
                {code: 'HSBANK', value: '徽商银行'},
                {code: 'CSCB', value: '长沙银行'},
                {code: 'CDCB', value: '成都银行'},
                {code: 'CQBANK', value: '重庆银行'},
                {code: 'DLB', value: '大连银行'},
                {code: 'NCB', value: '南昌银行'},
                {code: 'FJHXBC', value: '福建海峡银行'},
                {code: 'HKB', value: '汉口银行'},
                {code: 'WZCB', value: '温州银行'},
                {code: 'QDCCB', value: '青岛银行'},
                {code: 'TZCB', value: '台州银行'},
                {code: 'JXBANK', value: '嘉兴银行'},
                {code: 'CSRCB', value: '常熟农村商业银行'},
                {code: 'NHB', value: '南海农村信用联社'},
                {code: 'CZRCB', value: '常州农村信用联社'},
                {code: 'H3CB', value: '内蒙古银行'},
                {code: 'SXCB', value: '绍兴银行'},
                {code: 'SDEB', value: '顺德农商银行'},
                {code: 'WJRCB', value: '吴江农商银行'},
                {code: 'ZBCB', value: '齐商银行'},
                {code: 'GYCB', value: '贵阳市商业银行'},
                {code: 'ZYCBANK', value: '遵义市商业银行'},
                {code: 'HZCCB', value: '湖州市商业银行'},
                {code: 'DAQINGB', value: '龙江银行'},
                {code: 'JINCHB', value: '晋城银行JCBANK'},
                {code: 'ZJTLCB', value: '浙江泰隆商业银行'},
                {code: 'GDRCC', value: '广东省农村信用社联合社'},
                {code: 'DRCBCL', value: '东莞农村商业银行'},
                {code: 'MTBANK', value: '浙江民泰商业银行'},
                {code: 'GCB', value: '广州银行'},
                {code: 'LYCB', value: '辽阳市商业银行'},
                {code: 'JSRCU', value: '江苏省农村信用联合社'},
                {code: 'LANGFB', value: '廊坊银行'},
                {code: 'CZCB', value: '浙江稠州商业银行'},
                {code: 'DYCB', value: '德阳商业银行'},
                {code: 'JZBANK', value: '晋中市商业银行'},
                {code: 'BOSZ', value: '苏州银行'},
                {code: 'GLBANK', value: '桂林银行'},
                {code: 'URMQCCB', value: '乌鲁木齐市商业银行'},
                {code: 'CDRCB', value: '成都农商银行'},
                {code: 'ZRCBANK', value: '张家港农村商业银行'},
                {code: 'BOD', value: '东莞银行'},
                {code: 'LSBANK', value: '莱商银行'},
                {code: 'BJRCB', value: '北京农村商业银行'},
                {code: 'TRCB', value: '天津农商银行'},
                {code: 'SRBANK', value: '上饶银行'},
                {code: 'FDB', value: '富滇银行'},
                {code: 'CRCBANK', value: '重庆农村商业银行'},
                {code: 'ASCB', value: '鞍山银行'},
                {code: 'NXBANK', value: '宁夏银行'},
                {code: 'BHB', value: '河北银行'},
                {code: 'HRXJB', value: '华融湘江银行'},
                {code: 'ZGCCB', value: '自贡市商业银行'},
                {code: 'YNRCC', value: '云南省农村信用社'},
                {code: 'JLBANK', value: '吉林银行'},
                {code: 'DYCCB', value: '东营市商业银行'},
                {code: 'KLB', value: '昆仑银行'},
                {code: 'ORBANK', value: '鄂尔多斯银行'},
                {code: 'XTB', value: '邢台银行'},
                {code: 'JSB', value: '晋商银行'},
                {code: 'TCCB', value: '天津银行'},
                {code: 'BOYK', value: '营口银行'},
                {code: 'JLRCU', value: '吉林农信'},
                {code: 'SDRCU', value: '山东农信'},
                {code: 'XABANK', value: '西安银行'},
                {code: 'HBRCU', value: '河北省农村信用社'},
                {code: 'NXRCU', value: '宁夏黄河农村商业银行'},
                {code: 'GZRCU', value: '贵州省农村信用社'},
                {code: 'FXCB', value: '阜新银行'},
                {code: 'HBHSBANK', value: '湖北银行黄石分行'},
                {code: 'ZJNX', value: '浙江省农村信用社联合社'},
                {code: 'XXBANK', value: '新乡银行'},
                {code: 'HBYCBANK', value: '湖北银行宜昌分行'},
                {code: 'LSCCB', value: '乐山市商业银行'},
                {code: 'TCRCB', value: '江苏太仓农村商业银行'},
                {code: 'BZMD', value: '驻马店银行'},
                {code: 'GZB', value: '赣州银行'},
                {code: 'WRCB', value: '无锡农村商业银行'},
                {code: 'BGB', value: '广西北部湾银行'},
                {code: 'GRCB', value: '广州农商银行'},
                {code: 'JRCB', value: '江苏江阴农村商业银行'},
                {code: 'BOP', value: '平顶山银行'},
                {code: 'TACCB', value: '泰安市商业银行'},
                {code: 'CGNB', value: '南充市商业银行'},
                {code: 'CCQTGB', value: '重庆三峡银行'},
                {code: 'XLBANK', value: '中山小榄村镇银行'},
                {code: 'HDBANK', value: '邯郸银行'},
                {code: 'KORLABANK', value: '库尔勒市商业银行'},
                {code: 'BOJZ', value: '锦州银行'},
                {code: 'QLBANK', value: '齐鲁银行'},
                {code: 'BOQH', value: '青海银行'},
                {code: 'YQCCB', value: '阳泉银行'},
                {code: 'SJBANK', value: '盛京银行'},
                {code: 'FSCB', value: '抚顺银行'},
                {code: 'ZZBANK', value: '郑州银行'},
                {code: 'SRCB', value: '深圳农村商业银行'},
                {code: 'BANKWF', value: '潍坊银行'},
                {code: 'JJBANK', value: '九江银行'},
                {code: 'JXRCU', value: '江西省农村信用'},
                {code: 'HNRCU', value: '河南省农村信用'},
                {code: 'GSRCU', value: '甘肃省农村信用'},
                {code: 'SCRCU', value: '四川省农村信用'},
                {code: 'GXRCU', value: '广西省农村信用'},
                {code: 'SXRCCU', value: '陕西信合'},
                {code: 'WHRCB', value: '武汉农村商业银行'},
                {code: 'YBCCB', value: '宜宾市商业银行'},
                {code: 'KSRB', value: '昆山农村商业银行'},
                {code: 'SZSBK', value: '石嘴山银行'},
                {code: 'HSBK', value: '衡水银行'},
                {code: 'XYBANK', value: '信阳银行'},
                {code: 'NBYZ', value: '鄞州银行'},
                {code: 'ZJKCCB', value: '张家口市商业银行'},
                {code: 'XCYH', value: '许昌银行'},
                {code: 'JNBANK', value: '济宁银行'},
                {code: 'CBKF', value: '开封市商业银行'},
                {code: 'WHCCB', value: '威海市商业银行'},
                {code: 'HBC', value: '湖北银行'},
                {code: 'BOCD', value: '承德银行'},
                {code: 'BODD', value: '丹东银行'},
                {code: 'JHBANK', value: '金华银行'},
                {code: 'BOCY', value: '朝阳银行'},
                {code: 'LSBC', value: '临商银行'},
                {code: 'BSB', value: '包商银行'},
                {code: 'LZYH', value: '兰州银行'},
                {code: 'BOZK', value: '周口银行'},
                {code: 'DZBANK', value: '德州银行'},
                {code: 'SCCB', value: '三门峡银行'},
                {code: 'AYCB', value: '安阳银行'},
                {code: 'ARCU', value: '安徽省农村信用社'},
                {code: 'HURCB', value: '湖北省农村信用社'},
                {code: 'HNRCC', value: '湖南省农村信用社'},
                {code: 'NYNB', value: '广东南粤银行'},
                {code: 'LYBANK', value: '洛阳银行'},
                {code: 'NHQS', value: '农信银清算中心'},
                {code: 'CBBQS', value: '城市商业银行资金清算中心'}
            ]
        }
    },
    mounted() {
        this.banks = this.loadBank();
    }
}
</script>
<style scoped>
    /deep/ .el-step.is-vertical .el-step__title {
        cursor: pointer;
    }
    .table-border {
        border-spacing: 0;
        border-collapse: collapse;
        margin-bottom: 22px;
    }
    .table-border th,.table-border td {
        border: 1px solid #ebeef5;
        padding: 12px 10px;
    }
    .table-border thead tr {
        background-color: #f5f7fa;
    }
</style>