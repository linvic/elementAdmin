<template>
    <div>
        
        <el-container>
            <el-aside width="200px">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>组织架构</span>
                    </div>
                    <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="mini" suffix-icon="el-icon-search"></el-input>
                    <el-tree :data="dicData" default-expand-all :filter-node-method="filterNode" @node-click="handleNodeClick" ref="tree"></el-tree>
                </el-card>
            </el-aside>
            <el-main class="dicMain">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>角色管理{{currentDicTypeTxt}}</span>
                        <el-button-group style="float: right;">
                            <el-button icon="el-icon-refresh" size="mini" plain onclick="window.location.reload()">刷新</el-button>
                            <el-button type="primary" icon="el-icon-circle-plus-outline" size="mini" @click="dialogRoleAdd = true">新增</el-button>
                        </el-button-group>
                    </div>
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column prop="id" label="角色ID"></el-table-column>
                        <el-table-column prop="name" label="角色名称" width="180"></el-table-column>
                        <el-table-column prop="ping" label="角色描述"></el-table-column>
                        <el-table-column prop="isdefault" label="是否维修人员"></el-table-column>
                        <el-table-column prop="order" label="所属部门"></el-table-column>
                        <el-table-column prop="order" label="创建时间"></el-table-column>
                        <el-table-column label="操作" width="300">
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    @click="dicEdit(scope.$index, scope.row)">编辑</el-button>
                                <el-button
                                    size="mini"
                                    type="primary"
                                    @click="dicDelete(scope.$index, scope.row)">功能点配置</el-button>
                                <el-button
                                    size="mini"
                                    type="danger"
                                    @click="dicDelete(scope.$index, scope.row)">删除</el-button>
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
            </el-main>
        </el-container>
        <el-dialog title="新增角色" :visible.sync="dialogRoleAdd">
            <RoleAdd v-on:changeDialog="changeDialogRoleAdd"></RoleAdd>
        </el-dialog>
    </div>
</template>

<script>
import RoleAdd from './Add'
export default {
    components: {
        RoleAdd
    },
    data () {
        return {
            filterText: '', // tree 检索框
            dicData: [{
                id: 1,
                label: '一级1',
                disabled: true,
                children: [{
                    id: 2,
                    label: '二级1-1'
                },{
                    id: 3,
                    label: '二级1-2'
                }]
            }],
            currentDicTypeTxt: '', // 当前选中的类别名称
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                order: '1',
                ping: 'wxh',
                isdefault: '是',
                remark: '备注内容'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                order: '1',
                ping: 'wxh',
                isdefault: '是',
                remark: '备注内容'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                order: '1',
                ping: 'wxh',
                isdefault: '是',
                remark: '备注内容'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                order: '1',
                ping: 'wxh',
                isdefault: '是',
                remark: '备注内容'
            }],
            dialogRoleAdd: false, // 新增弹层
            dialogDicType: false, // 新增弹层
            currentPage: 1 // 当前页码
        }
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    methods: {
        handleNodeClick(data) {
            console.log(data.id);
            this.currentDicTypeTxt = ' - ' + data.label;
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        dicEdit(index, row) { // 字典修改
            console.log(index, row);
        },
        dicDelete(index, row) { // 字典删除
            console.log(index, row);
        },
        pageSizeChange(val) { // 分页：pageSize改变时
            console.log(`每页 ${val} 条`);
        },
        currentPageChange(val) { // 分页：当前页码改变时
            console.log(`当前页: ${val}`);
        },
        changeDialogRoleAdd(val) {
            this.dialogRoleAdd = val
        }
    }
}
</script>

<style scoped>
    .dicMain {
        padding: 0px 0px 20px 20px;
    }
</style>
