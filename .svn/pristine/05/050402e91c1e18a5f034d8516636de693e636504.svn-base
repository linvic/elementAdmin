<template>
    <div class="dictype">
        <el-card style="min-width:800px;">
            <div slot="header" class="clearfix">
                <span>组织架构</span>
                <el-button-group style="float: right;">
                    <el-button icon="el-icon-refresh" size="mini" plain onclick="window.location.reload()">刷新</el-button>
                    <el-button type="primary" icon="el-icon-circle-plus-outline" size="mini" @click="dialogStructureAdd = true">新增</el-button>
                </el-button-group>
            </div>
            <el-input
                placeholder="输入关键字进行过滤"
                v-model="filterText" suffix-icon="el-icon-search" style="max-width:320px;">
            </el-input>
            <table cellspacing="0" cellpadding="0" border="0" class="el-table el-table__header" width="100%">
                <thead class="has-gutter">
                    <tr>
                        <th class="cell">组织名称</th>
                        <th width="200px">负责人</th>
                        <th width="200px">操作</th>
                    </tr>
                </thead>
            </table>
            <el-tree
                class="filter-tree"
                :data="treeData"
                :props="defaultProps"
                default-expand-all
                :expand-on-click-node="false"
                :filter-node-method="filterNode"

                ref="tree">
                <div class="custom-tree-node" slot-scope="{ node, data }">
                    <div>{{ node.label }}</div>
                    <div>
                        <div class="custom-tree-node-item" style="width:200px;">{{ data.director }}</div>
                        <div class="custom-tree-node-item" style="width:200px;">
                            <el-button
                                size="mini"
                                @click="dicEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="dicDelete(scope.$index, scope.row)">删除</el-button>
                        </div>
                    </div>
                </div>
            </el-tree>
        </el-card>
        <el-dialog title="新增组织" :visible.sync="dialogStructureAdd"  append-to-body>
            <StructureAdd></StructureAdd>
        </el-dialog>
    </div>
</template>

<script>
import StructureAdd from './Add'
export default {
    components: {
        StructureAdd
    },
    data () {
        return {
            filterText: '', // tree 检索框
            treeData: [{
                id: 1,
                label: '一级 1',
                director: '123',
                remark: '备注',
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    director: '001',
                    remark: '备注',
                    children: [{
                        id: 9,
                        label: '三级 1-1-1',
                        director: '001',
                        remark: '备注'
                    }, {
                        id: 10,
                        label: '三级 1-1-2',
                        director: '001',
                        remark: '备注'
                    }]
                }]
            }, {
                id: 2,
                label: '一级 2',
                director: '001',
                remark: '备注',
                children: [{
                    id: 5,
                    label: '二级 2-1',
                    director: '001',
                    remark: '备注'
                }, {
                    id: 6,
                    label: '二级 2-2',
                    director: '001',
                    remark: '备注'
                }]
            }, {
                id: 3,
                label: '一级 3',
                director: '001',
                remark: '备注',
                children: [{
                    id: 7,
                    label: '二级 3-1',
                    director: '001',
                    remark: '备注'
                }, {
                    id: 8,
                    label: '二级 3-2',
                    director: '001',
                    remark: '备注'
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label',
                code: 'code'
            },
            dialogStructureAdd: false // 新增弹层
        }
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    methods: {
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
        }
    }
}
</script>

<style scoped>
    .custom-tree-node {
        -ms-flex: 1;
        flex: 1;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: justify;
        justify-content: space-between;
        font-size: 14px;
    }
    .custom-tree-node-item {
        display:inline-block;
        text-align:left;
        float:left;
    }
    .dictype /deep/ .el-tree-node__content {
        height: 46px;
    }
</style>
