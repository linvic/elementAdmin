<template>
    <div>
        <div class="clearfix">
            <span>房源：{{resourceData.name}}</span>
            <el-button-group style="float: right;">
                <el-button size="mini" type="primary" @click="dialogGetViewsAdd = true" icon="el-icon-circle-plus-outline">新增带看记录</el-button>
            </el-button-group>
        </div>
        <el-table :data="tableData" style="width: 100%" v-loading="loading">
            <el-table-column label="客户">
                <template slot-scope="scope">
                    <a href="javascript:;" @click="openDetails(scope.row.customer_id)">{{scope.row.customer_name}}（{{scope.row.customer_mobile}}）</a>
                </template>
            </el-table-column>
            <el-table-column prop="view_result" label="看房情况" width="200"></el-table-column>
            <el-table-column prop="view_date" label="带看日期" :formatter="formatterDate"></el-table-column>
            <el-table-column prop="created_user_name" label="带看人"></el-table-column>
            <el-table-column prop="created_time" label="录入时间"></el-table-column>
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
        <el-dialog v-if="dialogGetViewsAdd" title="新增带看记录" :visible.sync="dialogGetViewsAdd" append-to-body width="800px">
            <GetViewsAdd @closeDialog="closeDialog" @parentGetDataList="getDataList" :resourceData="resourceData"></GetViewsAdd>
        </el-dialog>
        <el-dialog v-if="dialogDetails" title="客户详情" :visible.sync="dialogDetails" append-to-body width="1000px">
            <Details @closeDialog="closeDialog" :id="editId"></Details>
        </el-dialog>
        
    </div>
</template>

<script>
import GetViewsAdd from './GetViewsAdd'
import Details from '@/pages/CRM/Details'
export default {
    components: {
        GetViewsAdd,
        Details
    },
    props: {
        resourceData: {
            type: Object
        }
    },
    data () {
        return {
            editId: null, // 
            pageIndex: 1, // 当前页码
            pageSize: 10, // 页码大小
            dataTotal: 0, // 数据总数
            loading: true,
            tableData: [],
            dialogGetViewsAdd: false, // 新增带看记录
            dialogDetails: false // 客户详情
        }
    },
    created() {
        if(this.resourceData) {
            this.getDataList()
        } else {
            alert('未能获取到您所要查询的盘源信息')
        }
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
        openDetails(id) {
            this.editId = Number(id);
            this.dialogDetails = true;
        },
        getDataList() { // 分页获取
            
            this.$https.get('/api/rent_base_resources/GetViews', {
                params: {
                    page: this.pageIndex,
                    page_size: this.pageSize,
                    resource_id: this.resourceData.id
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
        },
        formatterDate(row, column) {
            let d = new Date(row.view_date);
            let _year = d.getFullYear();
            _year = _year < 10 ? ('0' + _year) : _year;
            let _mouth = (d.getMonth() + 1);
            _mouth = _mouth < 10 ? ('0' + _mouth) : _mouth;
            let _day = d.getDate();
            _day = _day < 10 ? ('0' + _day) : _day;
            return _year + '-' + _mouth + '-' + _day;
        }
    }
}
</script>

<style scoped>
</style>
