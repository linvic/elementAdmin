<template>
    <div>

        <el-card>
            <div slot="header" class="clearfix">
                <span>销售记录</span>
                <el-button-group style="float: right;">
                    <el-button type="primary" icon="el-icon-circle-plus-outline" size="small" @click="dialogFlowCreate = true">创建新的销售流程</el-button>
                </el-button-group>
            </div>
            
            <el-table :data="tableData" style="width: 100%" v-loading="loading">
                <el-table-column prop="id" label="ID" width="80"></el-table-column>
                <el-table-column prop="template_name" label="适用流程"></el-table-column>
                <el-table-column prop="version_num" label="创建人"></el-table-column>
                <el-table-column prop="created_time" label="创建时间"></el-table-column>
                <el-table-column prop="version_num" label="成交主体名称"></el-table-column>
                <el-table-column label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            @click="listDetails(scope.row.id, scope.row.file_code)">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
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
        <el-dialog v-if="dialogFlowCreate" title="创建销售流程" :visible.sync="dialogFlowCreate" append-to-body width="600px">
            <FlowCreate @closeDialog="closeDialog" @parentGetDataList="getDataList" :flowObj="flowObj"></FlowCreate>
        </el-dialog>
    </div>
</template>

<script>
import FlowCreate from './FlowCreate'
export default {
    components: {
        FlowCreate
    },
    props: {
        flowObj: {
            type: Object
        }
    },
    data () {
        return {
            loading: false,
            tableData: [],
            pageIndex: 1, // 当前页码
            pageSize: 10, // 页码大小
            dataTotal: 0, // 数据总数,
            dialogFlowCreate: false, // 新增弹层
        }
    },
    created() {
        let _this = this;
        this.$https.all([
        ]).then(this.$https.spread(function (acct, perms) {
            _this.getDataList();
        }))
    },
    watch: {
    },
    methods: {
        // 获取分页
        getDataList() {
            this.loading = true;
            this.$https.get('/api/file_template/page', {
                params: {
                    currentPage: this.pageIndex,
                    pageSize: this.pageSize
                }
            }).then((result) => {
                this.loading = false;
                if (result.data.code == 0) {
                    this.tableData = result.data.data.Items;
                    this.dataTotal = result.data.data.Total;
                } else {
                    this.$message({
                        type: 'error',
                        showClose: true,
                        message: result.data.message
                    })
                }
            }).catch((error) => {
                this.loading = false;
            })
        },
        closeDialog(name) {
            this[name] = false;
        },
        listDetails(id, code) { // 查看详情-
            alert('即将上线')
            this.editId = id;
            this.editCode = code;
            this.dialogFlowEdit = true;
        },

        pageSizeChange(val) { // 分页：pageSize改变时
            this.pageSize = val;
            this.getDataList();
        },
        pageIndexChange(val) { // 分页：当前页码改变时
            this.pageIndex = val;
            this.getDataList();
        }
    }
}
</script>

<style scoped>
    .dicMain {
        padding: 0px 0px 20px 20px;
    }
</style>
