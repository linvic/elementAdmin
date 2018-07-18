<template>
    <div>
        <el-row :gutter="20">
            <el-col :sm="24" :md="12" v-show="!this.frameParame.type">
                <el-form ref="form" :model="documentData" label-width="120px">
                    <el-form-item label="客户名称" prop="c_id">
                        <el-select v-model="documentData.c_id" @change="changeCustomer" filterable placeholder="请选择客户">
                            <el-option
                                v-for="item in myCustomers"
                                :key="item.c_id"
                                :label="item.customer_name"
                                :value="item.c_id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="公司地址">
                        <el-input v-model="documentData.address"></el-input>
                    </el-form-item>
                    <el-form-item label="公司主营业务">
                        <el-input v-model="documentData.company_scope_of_operation"></el-input>
                    </el-form-item>
                    <el-form-item label="公司简介">
                        <el-input v-model="documentData.company_briefing"></el-input>
                    </el-form-item>
                    <el-form-item label="物业面积">
                        <el-input v-model="documentData.built_area"></el-input>
                    </el-form-item>
                    <el-form-item label="单元">
                        <el-input v-model="documentData.room_all_name"></el-input>
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
                        <PurchaseIntention-Template @setTemplateHtml="SetTemplateHtml" :documentData="documentData"></PurchaseIntention-Template>
                        <!--
<div class="word font-song font18 line18">
<br>
<h2 class="text-center font28">关于购买凤岗天安数码城物业的意向书</h2>
<br>
<p>东莞市凤岗天安数码城有限公司：</p>
<p class="text-indent">{{customer_name}}位于{{address}}，本公司主营业务为{{company_scope_of_operation}}，{{company_briefing}}</p><p class="text-indent">我司因研发及经营业务需要，现申请入驻凤岗天安数码城项目，申请入驻意向面积{{built_area}}平米，意向{{room_all_name}}。</p>
<p class="text-indent">特此函达。此致！</p>
<br>
<p class="text-right">{{customer_name}}</p>
<p class="text-right">（盖　　章）</p><p class="text-right">　　　　年　　月　　日</p>
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
Vue.component('PurchaseIntention-Template', function (resolve, reject) {
    axios.get('/api/file_template/get_file_templatedetails_by_file_code?file_code=PurchaseIntention').then((result) => {
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

                room_all_name: '',
                built_area: '', // 建筑面积
                address: '', // 办公地址
                company_scope_of_operation: '', // 经营范围
                company_briefing: '' // 简介
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
        },
        getOldData() { // 获取编辑数据

            this.$https.get('/api/file_common/get_file_commondetails?fc_id=' + this.editId).then((result) => {
                if (result.data.code == 0) {
                    let _data = result.data.data;
                    this.documentData.c_id = _data.c_id; // 客户ID
                    this.documentData.customer_name = _data.customer_name; //客户姓名
                    this.documentData.file_template_html = _data.file_template_html; // 文件模板_HTML
                    let _file_json_data = JSON.parse(_data.file_json_data);
                    
                    this.documentData.room_all_name = _file_json_data.room_all_name; //单元名
                    this.documentData.built_area = _file_json_data.built_area; //建筑面积
                    this.documentData.address = _file_json_data.address; //办公地址
                    this.documentData.company_scope_of_operation = _file_json_data.company_scope_of_operation; //经营范围
                    this.documentData.company_briefing = _file_json_data.company_briefing; //简介

                    
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
                        room_all_name: this.documentData.room_all_name, //单元名
                        built_area: this.documentData.built_area, //建筑面积
                        address: this.documentData.address, //办公地址
                        company_scope_of_operation: this.documentData.company_scope_of_operation, //经营范围
                        company_briefing: this.documentData.company_briefing //简介
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
