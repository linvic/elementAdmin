<template>
    <div>
        <el-card>
            <div slot="header" class="clearfix">
                <span>锁盘申请</span>
                <el-button-group style="float: right;">
                    <el-button icon="el-icon-refresh" size="mini" plain onclick="window.location.reload()">刷新</el-button>
                </el-button-group>
            </div>
            <el-tabs value="0" type="card" @tab-click="handleClick">
                <el-tab-pane label="待处理" name="0"></el-tab-pane>
                <el-tab-pane label="已同意" name="1"></el-tab-pane>
                <el-tab-pane label="已驳回" name="2"></el-tab-pane>
                <el-tab-pane label="已释放" name="9"></el-tab-pane>
            </el-tabs>
            <el-table :data="tableData" style="width: 100%" v-loading="loading">
                <el-table-column prop="lock_id" label="ID" width="55"></el-table-column>
                <el-table-column prop="created_user_name" label="申请人"></el-table-column>
                <el-table-column prop="created_time" label="申请时间"></el-table-column>
                <el-table-column label="锁盘房源">
                    <template slot-scope="scope">
                        <a href="javascript:;" @click="openDetails(scope.row.resource_id)">{{scope.row.resource_fullname || scope.row.resource_id}}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="reason" label="锁盘原因"></el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <span>{{ scope.row.status === 0 ? '待处理' : (scope.row.status === 1 ? '已同意' : (scope.row.status === 2 ? '已驳回(' + scope.row.reject + ')' : '已释放')) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            plain
                            type="primary"
                            v-if="scope.row.status === 0"
                            @click="changeState(scope.row.lock_id, scope.row.resource_id, true)">同意</el-button>
                        <el-button
                            size="mini"
                            plain
                            type="danger"
                            v-if="scope.row.status === 0"
                            @click="changeState(scope.row.lock_id, scope.row.resource_id, false)">驳回</el-button>
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
        <el-dialog v-if="dialogDetails" title="房源详情" :visible.sync="dialogDetails" append-to-body width="1000px">
            <Details @closeDialog="closeDialog" :id="editId"></Details>
        </el-dialog>
    </div>
</template>

<script>
import Details from '@/pages/Renting/Details'
export default {
    components: {
        Details
    },
    data () {
        return {
            editId: null, // 编辑id
            pageIndex: 1, // 当前页码
            pageSize: 10, // 页码大小
            dataTotal: 0, // 数据总数
            loading: true,
            status: '0',
            dialogDetails: false, // 详情
            tableData: []
        }
    },
    created() {
        this.getDataList()
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
        openDetails(id) { // 详情
            this.editId = Number(id);
            this.dialogDetails = true;
        },
        handleClick(tab) {
            this.status = tab.name;
            this.getDataList();
        },
        changeState(lock_id, resource_id, isOn) { // 是否同意 isOn
            if (isOn) { // 同意
                this.$https.post('/api/rent_base_resources/UpdateLockStatus',{
                        lock_id: lock_id,
                        resource_id: resource_id,
                        status: 1
                    }).then((result) => {
                        if (result.data.code == 0) {
                            this.$message({
                                type: 'success',
                                showClose: true,
                                message: '已同意申请',
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
            } else { // 拒绝
                this.$prompt('请输入审批驳回意见', '审批', {
                    inputType: 'textarea',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(({ value }) => {
                    this.$https.post('/api/rent_base_resources/UpdateLockStatus',{
                        lock_id: lock_id,
                        resource_id: resource_id,
                        reject: value,
                        status: 2
                    }).then((result) => {
                        if (result.data.code == 0) {
                            this.$message({
                                type: 'success',
                                showClose: true,
                                message: '已驳回申请',
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
        getDataList() { // 分页获取
            
            this.$https.get('/api/rent_base_resources/GetLockedApply', {
                params: {
                    page: this.pageIndex,
                    page_size: this.pageSize,
                    status: this.status
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
</style>
