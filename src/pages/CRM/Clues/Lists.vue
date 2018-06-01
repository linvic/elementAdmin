<template>
    <div>
        <el-card>
            <div slot="header" class="clearfix">
                <span>我的线索客户</span>
                <el-button-group style="float: right;">
                    <el-button icon="el-icon-refresh" size="mini" plain onclick="window.location.reload()">刷新</el-button>
                </el-button-group>
            </div>
            <el-form :inline="true" :model="formFilter" class="clues_form_seach" size="small">
                <el-form-item label="公司名称">
                    <el-input v-model="formFilter.enterprise_name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="联系人姓名">
                    <el-input v-model="formFilter.customer_name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="formFilter.telephone" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="主题">
                    <el-input v-model="formFilter.theme" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="formFilterSubmit" icon="el-icon-search">查询</el-button>
                </el-form-item>
            </el-form>
            <el-row>
                <el-col :span="18">
                    <el-button size="small" @click="crmDel()" icon="el-icon-delete">删除</el-button>
                    <el-button size="small" @click="crmToPublic()" icon="el-icon-delete">丢公海</el-button>
                    <el-button size="small" type="info" @click="changeSalesman()" icon="el-icon-web-loop">变更业务员</el-button>
                    <el-select size="small" v-model="formFilter.user_id" style="width: 150px;margin-left:20px;vertical-align: middle;" placeholder="请选择业务员">
                        <el-option label="本人" value="-2"></el-option>
                        <el-option v-for="item in roleunitUsers" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-select size="small" v-model="formFilter.purchase_intention" style="width: 150px;vertical-align: middle;" placeholder="请选择购买意向">
                        <el-option label="所有购买意向" value=""></el-option>
                        <el-option v-for="item in purchase_intention" :key="item.value_id" :label="item.value_name" :value="item.value_id"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="6" class="text-right">
                    <el-button size="small" type="success" onclick="alert('敬请期待')" icon="el-icon-upload">导入</el-button>
                    <el-button size="small" type="success" onclick="alert('敬请期待')" icon="el-icon-web-download">导出</el-button>
                    <el-button size="small" type="primary" @click="dialogCluesAdd = true" icon="el-icon-circle-plus-outline">新增</el-button>
                </el-col>
            </el-row>
            <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" v-loading="loading">
                <el-table-column type="selection" width="55" prop="c_id"></el-table-column>
                <el-table-column prop="c_id" label="ID" width="55"></el-table-column>
                <el-table-column prop="theme" label="主题"></el-table-column>
                <el-table-column prop="enterprise_name" label="公司名称"></el-table-column>
                <el-table-column prop="customer_name" label="联系人姓名"></el-table-column>
                <el-table-column prop="telephone" label="联系电话"></el-table-column>
                <el-table-column label="客户分类">
                    <template slot-scope="scope">
                        {{getDicVals(scope.row.classification, 'classification')}}
                    </template>
                </el-table-column>
                <el-table-column label="购买意向">
                    <template slot-scope="scope">
                        {{getDicVal(scope.row.purchase_intention, 'purchase_intention')}}
                    </template>
                </el-table-column>
                <el-table-column prop="intentional_area" label="意向面积"></el-table-column>
                <el-table-column prop="user_name" label="业务员"></el-table-column>
                <el-table-column prop="created_time" label="创建时间"></el-table-column>
                <el-table-column label="操作" width="350">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="cluesEdit(scope.row.c_id)" plain>编辑</el-button>
                        <el-button
                            size="mini"
                            type="warning"
                            @click="FollowUp(scope.row.c_id, scope.row.customer_name, scope.row.purchase_intention)" plain>跟进记录</el-button>
                        <el-button
                            size="mini"
                            type="success"
                            @click="cluesToChance(scope.row.c_id)" plain>转机会客户</el-button>
                        <el-button
                            size="mini"
                            @click="cluesDemand(scope.row.c_id)" plain>需求</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="text-center m-t">
                <el-pagination
                    @size-change="pageSizeChange"
                    @current-change="pageIndexChange"
                    :current-page="pageIndex"
                    :page-sizes="[10, 15, 20, 30]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="dataTotal">
                </el-pagination>
            </div>
        </el-card>
        <el-dialog v-if="dialogCluesAdd" title="新增线索客户" :visible.sync="dialogCluesAdd" append-to-body width="900px">
            <CluesAdd @closeDialog="closeDialog" @parentGetDataList="getDataList"></CluesAdd>
        </el-dialog>
        <el-dialog v-if="dialogCluesEdit" title="编辑线索客户" :visible.sync="dialogCluesEdit" append-to-body width="900px">
            <CluesAdd @closeDialog="closeDialog" @parentGetDataList="getDataList" :id="editId"></CluesAdd>
        </el-dialog>
        <el-dialog v-if="dialogFollowUp" title="跟进记录" :visible.sync="dialogFollowUp" append-to-body width="900px">
            <FollowUp @closeDialog="closeDialog" @parentGetDataList="getDataList" :followData="FollowUpObj"></FollowUp>
        </el-dialog>

        <el-dialog v-if="dialogCluesToChance" title="线索客户转机会客户" :visible.sync="dialogCluesToChance" append-to-body width="900px">
            <CluesToChance @closeDialog="closeDialog" @parentGetDataList="getDataList" :id="editId"></CluesToChance>
        </el-dialog>
        <el-dialog v-if="dialogChangeSalesman" title="变更业务员" :visible.sync="dialogChangeSalesman" append-to-body width="900px">
            <ChangeSalesman @closeDialog="closeDialog" @parentGetDataList="getDataList" :users="selectionChecked"></ChangeSalesman>
        </el-dialog>
    </div>
</template>

<script>
import CluesAdd from './CluesAdd'
import FollowUp from './../FollowUp'
import CluesToChance from './CluesToChance'
import ChangeSalesman from './../ChangeSalesman'

export default {
    components: {
        CluesAdd,
        FollowUp,
        CluesToChance,
        ChangeSalesman
    },
    data () {
        return {
            editId: null, // 编辑id
            FollowUpObj: null, // 更进记录需要数据
            pageIndex: 1, // 当前页码
            pageSize: 10, // 页码大小
            dataTotal: 0, // 数据总数
            loading: true,
            formFilter: {
                enterprise_name: '', // 公司名称
                customer_name: '',// 联系人姓名
                telephone: '',// 联系电话
                theme: '',// 主题
                user_id: '-2',// 查看谁的
                purchase_intention: '' //购买意向
            }, // 检索
            searchForm: {
                enterprise_name: '', // 公司名称
                customer_name: '',// 联系人姓名
                telephone: '',// 联系电话
                theme: ''// 主题
            },
            selectionChecked: [],
            tableData: [],
            classification: [], // 字典 - 客户分类
            purchase_intention: [], // 字典 - 购买意向
            roleunitUsers: [], // 所属业务员
            dialogCluesAdd: false, //新增
            dialogCluesEdit: false, //编辑
            dialogFollowUp: false, //跟进记录
            dialogChangeSalesman: false, // 变更业务员
            dialogCluesToChance: false // 转销售机会
        }
    },
    created() {
        let _this = this;
        this.$https.all([
            this.getDic('crm_classification', 'classification'),
            this.getDic('crm_purchase_intention', 'purchase_intention'),
            this.getRoleunitUsers(),
            this.getDataList()
        ]).then(this.$https.spread(function (acct, perms) {
        }))
    },
    watch: {
        'formFilter.purchase_intention': function(){
            this.getDataList();
        },
        'formFilter.user_id': function(){
            this.getDataList();
        }
    },
    methods: {
        pageSizeChange(val) { // 分页：pageSize改变时
            this.pageSize = val;
            this.getDataList();
        },
        pageIndexChange(val) { // 分页：当前页码改变时
            this.pageIndex = val;
            this.getDataList();
        },
        closeDialog(name) { // 关闭弹层
            this[name] = false;
        },
        cluesEdit(id) { // 修改
            this.editId = Number(id);
            this.dialogCluesEdit = true;
        },
        FollowUp(id, name, type) { // 更进记录
            this.FollowUpObj = {
                id: Number(id),
                name: name,
                type: type // 购买意向
            };
            this.dialogFollowUp = true;
        },
        cluesToChance(id) {
            this.editId = Number(id);
            this.dialogCluesToChance = true;
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
        getDicVals(keys, dic) { // 根据字典值匹配字典名
            let texts = [];
            let keysArr = keys.split(',');
            for(var keyItem of keysArr) {
                for(var item of this[dic]) {
                    if (keyItem == item.value_id) {
                        texts.push(item.value_name);
                    }
                }
            }
            return texts.join(', ');
        },
        handleSelectionChange(val) { // 多选执行的方法
            this.selectionChecked = val;
            console.info(this.selectionChecked);
        },
        formFilterSubmit() { // 搜索查询按钮
            this.searchForm.enterprise_name = this.formFilter.enterprise_name;
            this.searchForm.customer_name = this.formFilter.customer_name;
            this.searchForm.telephone = this.formFilter.telephone;
            this.searchForm.theme = this.formFilter.theme;
            this.getDataList();
        },
        crmDel() { // 删除
            if (this.selectionChecked.length === 0) {
                this.$message({
                    type: 'error',
                    showClose: true,
                    message: '您未勾选需要删除的客户'
                })
            } else {
                this.$prompt('请输入删除原因', '删除需要总监确认。您还可以将其丢入公海', {
                    inputType: 'textarea',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(({ value }) => {

                    let _postData = [];
                    for(var valItem of this.selectionChecked) {
                        let item = {
                            c_id: valItem.c_id,
                            old_user_id: valItem.user_id,
                            apply_remark: value
                        }
                        _postData.push(item)
                    }
                    this.$https.post('/api/customer_delete_approve/create_customer_delete_approve', _postData).then((result) => {
                        if (result.data.code == 0) {
                            this.$message({
                                type: 'success',
                                showClose: true,
                                message: '删除成功',
                                duration: 1500,
                                onClose: () => {
                                    this.getDataList();
                                    // window.location.reload()
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
                });
            }
        },
        crmToPublic() { // 丢公海

            if (this.selectionChecked.length === 0) {
                this.$message({
                    type: 'error',
                    showClose: true,
                    message: '您未勾选需要丢入公海的客户'
                })
            } else {
                let _postData = [];
                for(var valItem of this.selectionChecked) {
                    let item = {
                        c_id: valItem.c_id,
                        user_id: valItem.user_id
                    }
                    _postData.push(item)
                }
                this.$https.post('/api/Customer/update_customer_to_public', _postData).then((result) => {
                    if (result.data.code == 0) {
                        this.$message({
                            type: 'success',
                            showClose: true,
                            message: '已将选中客户转入公海',
                            duration: 1500,
                            onClose: () => {
                                this.getDataList();
                                // window.location.reload()
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
        },
        changeSalesman() { // 变更业务员

            if (this.selectionChecked.length === 0) {
                this.$message({
                    type: 'error',
                    showClose: true,
                    message: '您未勾选需要变更业务员的客户'
                })
            } else {
                this.dialogChangeSalesman = true;

                
            }
        },
        cluesDemand(id) { // 置业需求
            this.$message({
                type: 'error',
                showClose: true,
                message: '敬请期待'
            })
        },
        getRoleunitUsers() { // 获取员工
            this.$https.get('/api/Account/list_users_by_roleunit').then((result) => {
                if (result.data.code == 0) {
                    for (let item of result.data.data) {
                        let _item = {
                            id: item.user_id,
                            name: item.user_name
                        }
                        this.roleunitUsers.push(_item);
                    }
                } else {
                    this.$message({
                        type: 'error',
                        showClose: true,
                        message: result.data.message
                    })
                }
            })
        },
        getDataList() { // 分页获取
            
            this.$https.get('/api/Customer/page', {
                params: {
                    currentPage: this.pageIndex,
                    pageSize: this.pageSize,
                    customer_classify: 0,
                    enterprise_name: this.searchForm.enterprise_name,
                    customer_name: this.searchForm.customer_name,
                    telephone: this.searchForm.telephone,
                    theme: this.searchForm.theme,
                    user_id: this.formFilter.user_id == '' ? '-2' : this.formFilter.user_id,
                    purchase_intention: this.formFilter.purchase_intention
                }
            }).then((result) => {
                if (result.data.code == 0) {
                    this.tableData = result.data.data.Items;
                    this.dataTotal = result.data.data.Total;

                    this.loading = false;
                } else {
                    this.$message({
                        type: 'error',
                        showClose: true,
                        message: result.data.message
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
    .clues_form_seach {
        border-bottom: 1px dashed #eee;
        margin-bottom: 20px;
    }
</style>
