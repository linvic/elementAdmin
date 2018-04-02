<template>
    <div>
        
        <el-container>
            <el-aside width="200px">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>字典分类</span>
                        <el-button style="float: right; padding: 3px 0" type="text">分类配置</el-button>
                    </div>
                    <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="mini" suffix-icon="el-icon-search"></el-input>
                    <el-tree :data="dicData" default-expand-all :filter-node-method="filterNode" @node-click="handleNodeClick" ref="tree"></el-tree>
                </el-card>
            </el-aside>
            <el-main class="dicMain">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>字典数据{{currentDicTypeTxt}}</span>
                        <el-button-group style="float: right;">
                            <el-button icon="el-icon-refresh" size="mini" plain>刷新</el-button>
                            <el-button type="primary" icon="el-icon-circle-plus-outline" size="mini" @click="dialogDicAdd = true">新增</el-button>
                        </el-button-group>
                    </div>
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column prop="date" label="字典名" width="180"></el-table-column>
                        <el-table-column prop="name" label="字典值"></el-table-column>
                        <el-table-column prop="order" label="排序"></el-table-column>
                        <el-table-column prop="ping" label="简拼"></el-table-column>
                        <el-table-column prop="isdefault" label="是否默认"></el-table-column>
                        <el-table-column prop="remark" label="备注"></el-table-column>
                        <el-table-column label="操作" width="180">
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    @click="dicEdit(scope.$index, scope.row)">编辑</el-button>
                                <el-button
                                    size="mini"
                                    type="danger"
                                    @click="dicDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-main>
        </el-container>
        <el-dialog title="新增字典数据" :visible.sync="dialogDicAdd">
            <DicAdd></DicAdd>
        </el-dialog>
    </div>
</template>

<script>
import DicAdd from './DicAdd'
export default {
    components: {
        DicAdd
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
            dialogDicAdd: false
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
            this.currentDicTypeTxt = '-' + data.label;
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
        }
    }
}
</script>

<style scoped>
    .dicMain {
        padding: 0px 0px 20px 20px;
    }
</style>
