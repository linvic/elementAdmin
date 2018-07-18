<template>
    <div>
        <el-card>
            <div slot="header" class="clearfix">
                <span>我的冷盘</span>
                <el-button-group style="float: right;">
                    <el-button icon="el-icon-refresh" size="mini" plain onclick="window.location.reload()">刷新</el-button>
                </el-button-group>
            </div>
            <el-form :inline="true" :model="formFilter" class="clues_form_seach" size="small">
                <el-form-item label="物业名">
                    <el-input v-model="formFilter.resource_name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="楼层">
                    <el-input v-model="formFilter.floor" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="房号">
                    <el-input v-model="formFilter.roomno" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="房间功能">
                    <el-select v-model="formFilter.room_feature" style="width: 150px;vertical-align: middle;" placeholder="">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="item in room_feature" :key="item.value_id" :label="item.value_name" :value="item.value_id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="formFilterSubmit" icon="el-icon-search">查询</el-button>
                </el-form-item>
            </el-form>
            <el-tabs value="0" type="card" @tab-click="handleClick" class="m-t">
                <el-tab-pane label="可租" name="0"></el-tab-pane>
                <el-tab-pane label="可售" name="1"></el-tab-pane>
                <el-tab-pane label="租售" name="2"></el-tab-pane>
            </el-tabs>
            <el-row>
                <el-col :span="24">
                    <el-button size="small" @click="rentingDel()" icon="el-icon-delete">删除</el-button>
                    <el-button size="small" type="info" @click="changeSalesman()" icon="el-icon-web-loop">变更业务员</el-button>
                    <el-button size="small" type="success" @click="Locking()" icon="el-icon-web-lock">锁盘</el-button>
                    <el-button size="small" type="primary" @click="Private()" icon="el-icon-web-private">私盘</el-button>
                </el-col>
            </el-row>
            <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" v-loading="loading">
                <el-table-column type="selection" width="55" prop="resource_id"></el-table-column>
                <el-table-column label="ID" width="55">
                    <template slot-scope="scope">
                        <a href="javascript:;" @click="openDetails(scope.row.resource_id)">{{scope.row.resource_id}}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="resource_name" label="物业名"></el-table-column>
                <el-table-column prop="built_area" label="建筑面积"></el-table-column>
                <el-table-column label="朝向">
                    <template slot-scope="scope">
                        {{getDicVals(scope.row.room_toward, 'room_toward')}}
                    </template>
                </el-table-column>
                <el-table-column label="装修">
                    <template slot-scope="scope">
                        {{getDicVal(scope.row.room_decoration, 'room_decoration')}}
                    </template>
                </el-table-column>
                <el-table-column prop="rent_charge" label="租价"></el-table-column>
                <el-table-column prop="status" label="物业现状" :formatter="formatter_status"></el-table-column>
                <el-table-column prop="check_way" label="看房方式"></el-table-column>
                <el-table-column label="房间功能">
                    <template slot-scope="scope">
                        {{getDicVal(scope.row.room_feature, 'room_feature')}}
                    </template>
                </el-table-column>
                <el-table-column prop="follow_user_name" label="经纪人"></el-table-column>
                <el-table-column prop="created_time" label="登记时间"></el-table-column>
                <el-table-column prop="follow_time" label="最新跟进时间"></el-table-column>
                <el-table-column label="操作" width="280">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="cluesEdit(scope.row.resource_id)" plain>编辑</el-button>
                        <el-button
                            size="mini"
                            type="primary"
                            @click="GetViews(scope.row.resource_id, scope.row.resource_name)" plain>带看记录</el-button>
                        <el-button
                            size="mini"
                            type="warning"
                            @click="FollowUp(scope.row.resource_id, scope.row.resource_name)" plain>跟进记录</el-button>
                            
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="text-center m-t">
                <el-pagination
                    v-if="dataTotal > 10"
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
        <el-dialog v-if="dialogRentingEdit" title="编辑房源" :visible.sync="dialogRentingEdit" append-to-body width="900px">
            <RentingAdd @closeDialog="closeDialog" @parentGetDataList="getDataList" :id="editId"></RentingAdd>
        </el-dialog>
        <el-dialog v-if="dialogGetViews" title="带看记录" :visible.sync="dialogGetViews" append-to-body width="1000px">
            <GetViews @closeDialog="closeDialog" @parentGetDataList="getDataList" :resourceData="resourceData"></GetViews>
        </el-dialog>
        <el-dialog v-if="dialogFollowUp" title="跟进记录" :visible.sync="dialogFollowUp" append-to-body width="900px">
            <FollowUp @closeDialog="closeDialog" @parentGetDataList="getDataList" :resourceData="resourceData"></FollowUp>
        </el-dialog>
        <el-dialog v-if="dialogChangeSalesman" title="变更业务员" :visible.sync="dialogChangeSalesman" append-to-body width="900px">
            <ChangeSalesman @closeDialog="closeDialog" @parentGetDataList="getDataList" :users="selectionChecked"></ChangeSalesman>
        </el-dialog>
        <el-dialog v-if="dialogDetails" title="客户详情" :visible.sync="dialogDetails" append-to-body width="1000px">
            <Details @closeDialog="closeDialog" :id="editId"></Details>
        </el-dialog>
        
    </div>
</template>

<script>
import RentingAdd from './RentingAdd'
import GetViews from './GetViews'

import FollowUp from './FollowUp'
import ChangeSalesman from './../CRM/ChangeSalesman'
import Details from './Details'


export default {
    components: {
        RentingAdd,
        GetViews,
        FollowUp,
        ChangeSalesman,
        Details
    },
    data () {
        return {
            editId: null, // 编辑id
            resourceData: null, // 房源对象含id和name
            status: '0', // 状态
            pageIndex: 1, // 当前页码
            pageSize: 10, // 页码大小
            dataTotal: 0, // 数据总数
            loading: true,
            formFilter: {
                resource_name: '', // 物业名
                floor: '', // 楼层
                roomno: '', // 房号
                room_feature: '' // 房间功能
            },
            selectionChecked: [],
            tableData: [],
            room_feature: [], // 字典 - 房间功能
            room_decoration: [], // 字典 - 装修
            room_toward: [], // 字典 - 朝向
            dialogRentingEdit: false, //编辑
            dialogDetails: false, // 详情
            dialogFollowUp: false, // 跟进记录
            dialogGetViews: false, // 带看
            dialogChangeSalesman: false // 变更业务员
        }
    },
    created() {
        let _this = this;
        this.$https.all([
            this.getDic('pms_type_roomfunc', 'room_feature'), // 房间功能
            this.getDic('pms_type_decoration', 'room_decoration'), // 装修
            this.getDic('pms_type_direction', 'room_toward'), // 朝向
            this.getDataList()
        ]).then(this.$https.spread(function (acct, perms) {
        }))
    },
    watch: {
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
        handleClick(tab) {
            this.status = tab.name;
            this.getDataList();
        },
        cluesEdit(id) { // 修改
            this.editId = Number(id);
            this.dialogRentingEdit = true;
        },
        openDetails(id) { // 详情
            this.editId = Number(id);
            this.dialogDetails = true;
        },
        GetViews(id, name) { // 带看
            this.resourceData = {
                id: Number(id),
                name: name
            }
            this.dialogGetViews = true;
        },
        FollowUp(id, name) { // 更进记录
            this.resourceData = {
                id: Number(id),
                name: name
            }
            this.dialogFollowUp = true;
        },
        formatter_status(row, column, cellValue, index) {
            switch (row.status) {
                case 0:
                    return '可租'
                    break;
                case 1:
                    return '可售'
                    break;
                case 2:
                    return '租售'
                    break;
                case 3:
                    return '已租'
                    break;
                case 4:
                    return '已售'
                    break;
                case 5:
                    return '被成交'
                    break;
                case 6:
                    return '暂缓'
                    break;
                default:
                    // statements_def
                    break;
            }
            
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
            let keysArr = [];
            if(keys) keysArr = keys.toString().split(',');
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
            this.getDataList();
        },
        rentingDel() { // 删除
            if (this.selectionChecked.length === 0) {
                this.$message({
                    type: 'error',
                    showClose: true,
                    message: '您未勾选需要删除的客户'
                })
            } else {
                this.$confirm('您确认要删除该房源吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let _postData = [];
                    for(var item of this.selectionChecked) {
                        _postData.push(item.resource_id)
                    }
                    this.$https.post('/api/rent_base_resources/DeleteResource', _postData).then((result) => {
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
                }).catch(() => {

                })
            }
        },
        
        Locking() { // 锁盘
            if (this.selectionChecked.length === 0) {
                this.$message({
                    type: 'error',
                    showClose: true,
                    message: '您未勾选需要锁盘操作的客户'
                })
            } else {

                this.$prompt('请输入锁盘原因', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(({ value }) => {

                    let _postData = [];
                    for(var item of this.selectionChecked) {
                        let itemVal = {
                            resource_id: item.resource_id,
                            resource_fullname: item.resource_name,
                            reason: value
                        }
                        _postData.push(itemVal)
                    }
                    this.$https.post('/api/rent_base_resources/LockingApply', _postData).then((result) => {
                        if (result.data.code == 0) {
                            this.$message({
                                type: 'success',
                                showClose: true,
                                message: '申请锁盘成功',
                                duration: 1500,
                                onClose: () => {
                                    this.getDataList();
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
                })
            }
        },
        Private() { // 私盘
            if (this.selectionChecked.length === 0) {
                this.$message({
                    type: 'error',
                    showClose: true,
                    message: '您未勾选需要私盘操作的客户'
                })
            } else {
                this.$prompt('请输入私盘原因', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(({ value }) => {
                    
                    let _postData = [];
                    for(var item of this.selectionChecked) {
                        let itemVal = {
                            resource_id: item.resource_id,
                            resource_fullname: item.resource_name,
                            reason: value
                        }
                        _postData.push(itemVal)
                    }
                    this.$https.post('/api/rent_base_resources/PrivateApply', _postData).then((result) => {
                        if (result.data.code == 0) {
                            this.$message({
                                type: 'success',
                                showClose: true,
                                message: '申请私盘成功',
                                duration: 1500,
                                onClose: () => {
                                    this.getDataList();
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
                })
            }
        },
        changeSalesman() { // 变更业务员
            alert('即将上线');
            return;
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
            
            this.$https.get('/api/rent_base_resources/GetReources', {
                params: {
                    page: this.pageIndex,
                    page_size: this.pageSize,
                    status: this.status,
                    resource_name: this.formFilter.resource_name,
                    floor: this.formFilter.floor,
                    roomno: this.formFilter.roomno,
                    room_feature: this.formFilter.room_feature,
                    is_full: false, // 是否所有盘源
                    is_inactive: true // 是否冷盘
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
