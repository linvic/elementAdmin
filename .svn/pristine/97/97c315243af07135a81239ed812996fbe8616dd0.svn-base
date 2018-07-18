<template>
    <div>
        <el-row :gutter="20">
            <el-col :sm="24" :md="12" v-show="!this.frameParame.type">
                <el-form ref="form" :model="documentData" label-width="120px">
                    <el-form-item label="款项用于谁" prop="c_id">
                        <el-select v-model="documentData.c_id" @change="changeCustomer" filterable placeholder="请选择客户">
                            <el-option
                                v-for="item in myCustomers"
                                :key="item.c_id"
                                :label="item.customer_name"
                                :value="item.c_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="付款对象">
                        <el-select v-model="documentData.money_from" style="width:400px">
                            <el-option label="东莞市凤岗天安数码城有限公司" value="东莞市凤岗天安数码城有限公司"></el-option>
                            <el-option label="东莞市天安数码产业投资发展有限公司" value="东莞市天安数码产业投资发展有限公司"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="付款人">
                        <el-input v-model="documentData.money_to"></el-input>
                    </el-form-item>
                    <el-form-item label="付款人联系电话">
                        <el-input v-model="documentData.money_to_phone"></el-input>
                    </el-form-item>
                    <el-form-item label="付款金额">
                        <el-input v-model="documentData.money_pay_amount"></el-input>
                    </el-form-item>
                    <el-form-item label="付款方式">
                        <el-radio-group v-model="documentData.money_pay_type">
                            <el-radio label="1">现钞</el-radio>
                            <el-radio label="2">支票</el-radio>
                            <el-radio label="3">银行卡</el-radio>
                            <el-radio label="4">其他方式</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="物业房产">
                        <el-input v-model="documentData.room_all_name"></el-input>
                    </el-form-item>
                    <el-form-item label="款项类别">
                        <el-radio-group v-model="documentData.money_type">
                            <el-radio label="1">意向金</el-radio>
                            <el-radio label="2">购房款</el-radio>
                            <el-radio label="3">车位款</el-radio>
                            <el-radio label="4">其它</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="款项类别-其它">
                        <el-input v-model="documentData.money_type_other"></el-input>
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
                        <ProofOfPendingPayment-Template @setTemplateHtml="SetTemplateHtml" :documentData="documentData"></ProofOfPendingPayment-Template>

                        <!--
<div class="word font-song font18 line18">
<h2 class="text-center font28">待付款证明</h2>
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
Vue.component('ProofOfPendingPayment-Template', function (resolve, reject) {
    axios.get('/api/file_template/get_file_templatedetails_by_file_code?file_code=ProofOfPendingPayment').then((result) => {
        let templateHtml = result.data.data.template_html; // 将模板 html 传到父组件 用于 数据提交
        // <span class="placeholder"></span>
        let _html = result.data.data.template_html.replace(/{{/g, '{{documentData.').replace(/}}/g, ' || "______" }}')

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

                money_from: '', // 付款对象
                money_to: '', // 付款人
                money_to_phone: '', // 付款人联系电话
                money_pay_amount: '', // 付款金额
                money_pay_amount_inwords: '', // 付款金额大写
                money_pay_type: '', // 付款方式
                money_pay_type_txt: '□现钞，□支票，□银行卡，□其他方式',
                room_all_name: '', // 物业房产
                money_type: '', // 款项类别
                money_type_txt: '□意向金，□购房款，□车位款，□其它',
                money_type_other: '', // 款项类别-其它
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
        // 监听小写金额，转换成大写金额
        'documentData.money_pay_amount': function(val) {
            this.documentData.money_pay_amount_inwords = this.Arabia_To_SimplifiedChinese(val);
        },
        'documentData.money_pay_type': function(val) {
            val = Number(val);
            console.log(val)
            if (val === 1) {
                this.documentData.money_pay_type_txt = '√现钞，□支票，□银行卡，□其他方式';
            } else if (val === 2) {
                this.documentData.money_pay_type_txt = '□现钞，√支票，□银行卡，□其他方式';
            } else if (val === 3) {
                this.documentData.money_pay_type_txt = '□现钞，□支票，√银行卡，□其他方式';
            } else if (val === 4) {
                this.documentData.money_pay_type_txt = '□现钞，□支票，□银行卡，√其他方式';
            } else {
                this.documentData.money_pay_type_txt = '□现钞，□支票，□银行卡，□其他方式';
            }
        },
        'documentData.money_type': function(val) {
            val = Number(val);
            console.log(val)
            if (val === 1) {
                this.documentData.money_type_txt = '√意向金，□购房款，□车位款，□其它';
            } else if (val === 2) {
                this.documentData.money_type_txt = '□意向金，√购房款，□车位款，□其它';
            } else if (val === 3) {
                this.documentData.money_type_txt = '□意向金，□购房款，√车位款，□其它';
            } else if (val === 4) {
                this.documentData.money_type_txt = '□意向金，□购房款，□车位款，√其它';
            } else {
                this.documentData.money_type_txt = '□意向金，□购房款，□车位款，□其它';
            }
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
            this.documentData.customer_name = obj.customer_name;
            this.documentData.money_to = obj.customer_name;
        },
        getOldData() { // 获取编辑数据

            this.$https.get('/api/file_common/get_file_commondetails?fc_id=' + this.editId).then((result) => {
                if (result.data.code == 0) {
                    let _data = result.data.data;
                    this.documentData.c_id = _data.c_id; // 客户ID
                    this.documentData.customer_name = _data.customer_name; //客户姓名
                    this.documentData.file_template_html = _data.file_template_html; // 文件模板_HTML
                    let _file_json_data = JSON.parse(_data.file_json_data);
                    
                    this.documentData.money_from = _file_json_data.money_from; //付款对象
                    this.documentData.money_to = _file_json_data.money_to; //付款人
                    this.documentData.money_to_phone = _file_json_data.money_to_phone; //付款人联系电话
                    this.documentData.money_pay_amount = _file_json_data.money_pay_amount; //付款金额
                    this.documentData.money_pay_type = _file_json_data.money_pay_type; //付款方式
                    this.documentData.room_all_name = _file_json_data.room_all_name; //物业房产
                    this.documentData.money_type = _file_json_data.money_type; //款项类别
                    this.documentData.money_type_other = _file_json_data.money_type_other; //款项类别-其它

                    
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
                        money_from: this.documentData.money_from, // 付款对象
                        money_to: this.documentData.money_to, // 付款人
                        money_to_phone: this.documentData.money_to_phone, // 付款人联系电话
                        money_pay_amount: this.documentData.money_pay_amount, // 付款金额
                        money_pay_type: this.documentData.money_pay_type, // 付款方式
                        room_all_name: this.documentData.room_all_name, // 物业房产
                        money_type: this.documentData.money_type, // 款项类别
                        money_type_other: this.documentData.money_type_other // 款项类别-其它
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
        },
        Arabia_To_SimplifiedChinese(n) { // 阿拉伯数字金额转换成大写中文金额
            var fraction = ['角', '分'];
            var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
            var unit = [
                ['元', '万', '亿'],
                ['', '拾', '佰', '仟']
            ];
            var head = n < 0 ? '欠' : '';
            n = Math.abs(n);
            var s = '';
            for (var i = 0; i < fraction.length; i++) {
                // s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]);
                s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
            }
            console.log('325=',s)
            s = s || '整';
            n = Math.floor(n);

            for (var j = 0; j < unit[0].length && n > 0; j++) {
                var p = '';
                for (var k = 0; k < unit[1].length && n > 0; k++) {
                    p = digit[n % 10] + unit[1][k] + p;
                    n = Math.floor(n / 10);
                }
                s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][j] + s;
            }
            return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
        }
    }
}

</script>

<style scoped>
</style>
