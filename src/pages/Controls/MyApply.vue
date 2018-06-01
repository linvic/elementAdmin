<template>
    <div>
        <el-card>
            <div slot="header" class="clearfix">
                <span>我的申请记录</span>
                <el-button-group style="float: right;">
                    <el-button icon="el-icon-refresh" size="mini" plain onclick="window.location.reload()">刷新</el-button>
                </el-button-group>
            </div>
            <el-tabs v-model="tabType" type="card" @tab-click="handleClick">
                <el-tab-pane label="删除申请" name="1">
                    
                    <el-table :data="delTableData" style="width: 100%" v-loading="loading">
                        <el-table-column prop="id" label="ID" width="55"></el-table-column>
                        <el-table-column prop="created_user_name" label="申请人"></el-table-column>
                        <el-table-column prop="created_time" label="申请时间"></el-table-column>
                        <el-table-column prop="old_user_name" label="删除客户"></el-table-column>
                        <el-table-column prop="apply_remark" label="删除原因"></el-table-column>
                        <el-table-column label="状态">
                            <template slot-scope="scope">
                                <span>{{ scope.row.approve_status === 0 ? '拒绝' : (scope.row.approve_status === 1 ? '同意' : '未处理') }}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="业务员变更申请" name="2">
                    
                    <el-table :data="salesTableData" style="width: 100%" v-loading="loading">
                        <el-table-column prop="id" label="ID" width="55"></el-table-column>
                        <el-table-column prop="created_user_name" label="申请人"></el-table-column>
                        <el-table-column prop="created_time" label="申请时间"></el-table-column>
                        <el-table-column prop="old_user_name" label="变更客户"></el-table-column>
                        <el-table-column prop="apply_remark" label="变更原因"></el-table-column>
                        <el-table-column label="状态">
                            <template slot-scope="scope">
                                <span>{{ scope.row.approve_status === 0 ? '拒绝' : (scope.row.approve_status === 1 ? '同意' : '未处理') }}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
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
    </div>
</template>

<script>

export default {
    data () {
        return {
            pageIndex: 1, // 当前页码
            pageSize: 10, // 页码大小
            dataTotal: 0, // 数据总数
            loading: true,
            tabType: '1', // 1: 删除  2: 变更
            delTableData: [],
            salesTableData: []
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
        handleClick(tab) {
            this.tabType = tab.name;
            this.pageIndex = 1;
            this.getDataList();
        },
        getDataList() { // 分页获取
            switch(this.tabType) {
                case '1': 
                    this.$https.get('/api/customer_delete_approve/page', {
                        params: {
                            currentPage: this.pageIndex,
                            pageSize: this.pageSize,
                            approve_status: -1,
                            created_user_id: -1
                        }
                    }).then((result) => {
                        if (result.data.code == 0) {
                            this.delTableData = result.data.data.Items;
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
                    break;
                case '2': 
                    this.$https.get('/api/customer_change_salesman/page', {
                        params: {
                            currentPage: this.pageIndex,
                            pageSize: this.pageSize,
                            approve_status: -1,
                            created_user_id: -1
                        }
                    }).then((result) => {
                        if (result.data.code == 0) {
                            this.salesTableData = result.data.data.Items;
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
                    break;
            }
            
        }
    }
}
</script>

<style scoped>
</style>
