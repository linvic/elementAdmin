<template>
    <div>
        <div class="clearfix">
            <span>房源：{{resourceData.name}}</span>
            <el-button-group style="float: right;">
                <el-button size="mini" type="primary" @click="dialogFollowUpAdd = true" icon="el-icon-circle-plus-outline">新增跟进记录</el-button>
            </el-button-group>
        </div>
        <el-table :data="tableData" style="width: 100%" v-loading="loading">
            <el-table-column prop="follow_content" label="跟进内容" width="200"></el-table-column>
            <el-table-column prop="follow_time" label="跟进时间"></el-table-column>
            <el-table-column prop="created_user_name" label="跟进人"></el-table-column>
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
        <el-dialog v-if="dialogFollowUpAdd" title="新增跟进记录" :visible.sync="dialogFollowUpAdd" append-to-body width="800px">
            <FollowUpAdd @closeDialog="closeDialog" @parentGetDataList="getDataList" :resourceData="resourceData"></FollowUpAdd>
        </el-dialog>
        
    </div>
</template>

<script>
import FollowUpAdd from './FollowUpAdd'
export default {
    components: {
        FollowUpAdd
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
            dialogFollowUpAdd: false, // 新增带看记录
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
        getDataList() { // 分页获取
            
            this.$https.get('/api/rent_base_resources/GetFollows', {
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
        }
    }
}
</script>

<style scoped>
</style>
