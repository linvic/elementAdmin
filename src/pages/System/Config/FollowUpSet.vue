<template>
    <div>
        <el-card>
            <div slot="header" class="clearfix">
                <span>跟进配置</span>
                <el-button-group style="float: right;">
                    <el-button icon="el-icon-refresh" size="mini" plain onclick="window.location.reload()">刷新</el-button>
                </el-button-group>
            </div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="id" label="类目ID" width="180"></el-table-column>
                <el-table-column prop="name" label="设置类目名称"></el-table-column>
                <el-table-column prop="rimind_time" label="提醒时间"></el-table-column>
                <el-table-column prop="limited_time" label="限定时间"></el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="followEdit(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="text-center m-t">
                <el-pagination
                    @size-change="pageSizeChange"
                    @current-change="currentPageChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 50, 100, 200]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data () {
        return {
            tableData: [{
                id: '1',
                name: '新线索跟进提醒',
                rimind_time: '公开前',
                limited_time: '48小时'
            }, {
                id: '2',
                name: '崔收款提醒',
                rimind_time: '交款前',
                limited_time: '24小时'
            }, {
                id: '3',
                name: 'A类客户跟进时间',
                rimind_time: '距离上次跟进日期10天',
                limited_time: '15天'
            }, {
                id: '4',
                name: 'B类客户跟进时间',
                rimind_time: '距离上次跟进日期10天',
                limited_time: '15天'
            }, {
                id: '5',
                name: 'C类客户跟进时间',
                rimind_time: '距离上次跟进日期10天',
                limited_time: '15天'
            }, {
                id: '6',
                name: 'D类客户跟进时间',
                rimind_time: '距离上次跟进日期',
                limited_time: '15天'
            }, {
                id: '7',
                name: 'E类客户跟进时间',
                rimind_time: '距离上次跟进日期',
                limited_time: '15天'
            }, {
                id: '8',
                name: 'F类客户跟进时间',
                rimind_time: '距离上次跟进日期',
                limited_time: '15天'
            }],
            currentPage: 1 // 当前页码
        }
    },
    watch: {
    },
    methods: {
        followEdit(index, row) { // 修改
            console.log(index, row);
        },
        pageSizeChange(val) { // 分页：pageSize改变时
            console.log(`每页 ${val} 条`);
        },
        currentPageChange(val) { // 分页：当前页码改变时
            console.log(`当前页: ${val}`);
        }
    }
}
</script>

<style scoped>
</style>
