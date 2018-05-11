<template>
    <div>
        <el-card>
            <div slot="header" class="clearfix">
                <span>我的线索客户</span>
                <el-button-group style="float: right;">
                    <el-button icon="el-icon-refresh" size="mini" plain onclick="window.location.reload()">刷新</el-button>
                </el-button-group>
            </div>
            <el-form :inline="true" :model="formFilter" class="demo-form-inline" size="small">
                <el-form-item label="公司名称">
                    <el-input v-model="formFilter.company_name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="联系人姓名">
                    <el-input v-model="formFilter.user_name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="formFilter.phone" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="销售员">
                    <el-input v-model="formFilter.sale" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="主题">
                    <el-input v-model="formFilter.theme" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
            <el-row>
                <el-col :span="12">
                    <el-button size="small" @click="followEdit(scope.$index, scope.row)" icon="el-icon-delete">删除</el-button>
                    <el-button size="small" type="info" @click="followEdit(scope.$index, scope.row)" icon="el-icon-web-loop">变更业务员</el-button>
                </el-col>
                <el-col :span="12" class="text-right">
                    <el-button size="small" type="success" @click="followEdit(scope.$index, scope.row)" icon="el-icon-upload">导入</el-button>
                    <el-button size="small" type="primary" @click="followEdit(scope.$index, scope.row)" icon="el-icon-circle-plus-outline">新增</el-button>
                </el-col>
            </el-row>
            <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" prop="id"></el-table-column>
                <el-table-column prop="id" label="ID"></el-table-column>
                <el-table-column prop="name" label="主题"></el-table-column>
                <el-table-column prop="name" label="公司名称"></el-table-column>
                <el-table-column prop="name" label="客户姓名"></el-table-column>
                <el-table-column prop="name" label="联系电话"></el-table-column>
                <el-table-column prop="name" label="客户分类"></el-table-column>
                <el-table-column prop="name" label="购买意向"></el-table-column>
                <el-table-column prop="name" label="意向面积"></el-table-column>
                <el-table-column prop="name" label="销售员"></el-table-column>
                <el-table-column prop="rimind_time" label="创建时间"></el-table-column>
                <el-table-column label="操作" width="350">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="followEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                            size="mini"
                            @click="followEdit(scope.$index, scope.row)">跟进记录</el-button>
                        <el-button
                            size="mini"
                            @click="followEdit(scope.$index, scope.row)">转机会客户</el-button>
                        <el-button
                            size="mini"
                            @click="followEdit(scope.$index, scope.row)">需求</el-button>
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
            formFilter: {
                company_name: '',
                user_name: '',
                phone: '',
                sale: '',
                theme: '',
            }, // 检索
            selectionChecked: [],
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
        },
        handleSelectionChange(val) { // 多选执行的方法
            this.selectionChecked = val;
            console.info(this.selectionChecked);
        }
    }
}
</script>

<style scoped>
</style>
