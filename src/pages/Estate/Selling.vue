<template>
    <div>
        <el-card>
            <div slot="header" class="clearfix">
                <span>放盘记录</span>
                <el-button-group style="float: right;">
                    <el-button size="small" onclick="window.location.reload()" icon="el-icon-refresh">刷新</el-button>
                    
                    <el-button size="small" type="primary" @click="dialogSellingAdd = true" icon="el-icon-circle-plus-outline">新增</el-button>
                </el-button-group>
            </div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="open_id" label="ID" width="55"></el-table-column>
                <el-table-column prop="open_name" label="放盘名称/批次"></el-table-column>
                <el-table-column prop="project_name" label="项目名称"></el-table-column>
                <el-table-column prop="building_name" label="楼宇名称"></el-table-column>
                <el-table-column label="适用销售流程">
                    <template slot-scope="scope">
                        {{(scope.row.process_type === 0 ? '产业楼销售流程' : '住宅楼销售流程')}}
                    </template>
                </el-table-column>
                <el-table-column prop="open_area" label="放盘面积(平方米)"></el-table-column>
                <el-table-column prop="created_time" label="创建时间"></el-table-column>
                <el-table-column label="更新时间">
                    <template slot-scope="scope">
                        {{(scope.row.modify_time === '0001-01-01 00:00:00' ? '' : scope.row.modify_time)}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="success"
                            @click="See(scope.row.open_id)" plain>查看</el-button>
                        <el-button
                            size="mini"
                            type="primary"
                            @click="sellingEdit(scope.row)" plain>修改</el-button>
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
        <el-dialog v-if="dialogSellingAdd" title="新增放盘" :visible.sync="dialogSellingAdd" append-to-body width="840px">
            <SellingAdd @closeDialog="closeDialog" @parentGetDataList="getDataList"></SellingAdd>
        </el-dialog>
        <el-dialog v-if="dialogSellingEdit" title="修改放盘" :visible.sync="dialogSellingEdit" append-to-body width="840px">
            <SellingAdd @closeDialog="closeDialog" @parentGetDataList="getDataList" :editObj="editObjs"></SellingAdd>
        </el-dialog>
    </div>
</template>

<script>
import SellingAdd from './SellingAdd'

export default {
    components: {
        SellingAdd
    },
    data () {
        return {
            editObjs: null,
            pageIndex: 1, // 当前页码
            pageSize: 10, // 页码大小
            dataTotal: 0, // 数据总数
            loading: true,
            tableData: [],
            dialogSellingAdd: false, //新增
            dialogSellingEdit: false //新增
        }
    },
    created() {
        this.getDataList()
    },
    watch: {
    },
    methods: {
        closeDialog(name) { // 关闭弹层
            this[name] = false;
        },
        pageSizeChange(val) { // 分页：pageSize改变时
            this.pageSize = val;
            this.getDataList();
        },
        pageIndexChange(val) { // 分页：当前页码改变时
            this.pageIndex = val;
            this.getDataList();
        },
        getDataList(){

            this.$https.get('/api/pms_sale_open/GetRecords', {
                params: {
                    page: this.pageIndex,
                    page_size: this.pageSize
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
        sellingEdit(obj) {
            this.editObjs = {
                id: obj.open_id,
                open_name: obj.open_name,
                project_id: obj.project_id,
                building_id: obj.building_id,
                process_type: obj.process_type
            };
            this.dialogSellingEdit = true;
        }
    }
}
</script>

<style scoped>
</style>
