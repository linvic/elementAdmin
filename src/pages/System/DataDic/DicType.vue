<template>
    <div class="dictype">
        <el-card style="min-width:900px;">
            <div slot="header" class="clearfix">
                <span>字典分类</span>
                <el-button-group style="float: right;">
                    <el-button type="primary" icon="el-icon-circle-plus-outline" size="small" @click="dialogDicTypeAdd = true">新增</el-button>
                </el-button-group>
            </div>
            <table cellspacing="0" cellpadding="0" border="0" class="el-table el-table__header" width="100%">
                <thead class="has-gutter">
                    <tr>
                        <th class="cell">字典名</th>
                        <th width="150px">编号</th>
                        <th width="50px">排序</th>
                        <th width="50px">有效</th>
                        <th width="200px">备注</th>
                        <th width="200px">操作</th>
                    </tr>
                </thead>
            </table>
            <el-tree
                class="filter-tree"
                :data="treeData"
                :props="treeProps"
                default-expand-all
                :expand-on-click-node="false"
                ref="tree">
                <div class="custom-tree-node" slot-scope="{ node, data }">
                    <div>{{ node.label }}</div>
                    <div>
                        <div class="custom-tree-node-item" style="width:150px;">{{ data.value }}</div>
                        <div class="custom-tree-node-item" style="width:50px;">{{ data.sort }}</div>
                        <div class="custom-tree-node-item" style="width:50px;">{{ data.attrValue === 'true' ? '是' : '否' }}</div>
                        <div class="custom-tree-node-item" style="width:200px;">{{ data.title }}</div>
                        <div class="custom-tree-node-item" style="width:200px;">
                            <el-button
                                size="mini"
                                plain
                                @click="dicTypeEdit(data.id)">编辑</el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                plain
                                @click="dicTypeDel(data.id)">删除</el-button>
                        </div>
                    </div>
                </div>
            </el-tree>
        </el-card>
        <el-dialog v-if="dialogDicTypeAdd" title="新增字典类别" :visible.sync="dialogDicTypeAdd"  append-to-body width="600px">
            <DicTypeAdd @closeDialog="closeDialog" @parentGetDataList="getDataList"></DicTypeAdd>
        </el-dialog>

        <el-dialog v-if="dialogDicTypeEdit" title="编辑字典类别" :visible.sync="dialogDicTypeEdit"  append-to-body width="600px">
            <DicTypeAdd @closeDialog="closeDialog" @parentGetDataList="getDataList" :id="editId"></DicTypeAdd>
        </el-dialog>
    </div>
</template>

<script>
import DicTypeAdd from './DicTypeAdd'
export default {
    components: {
        DicTypeAdd
    },
    data () {
        return {
            editId: null,
            treeData: [],
            treeProps: {
                label: 'text',
                children: 'children'
            },
            dialogDicTypeAdd: false, // 新增弹层
            dialogDicTypeEdit: false // 编辑弹层
        }
    },
    created() {
        this.getDataList();
    },
    watch: {
    },
    methods: {
        getDataList() {
            this.$https.get('/api/Dicts/GetTypesTree?is_enabled=').then((result) => {
                if (result.data.code == 0) {
                    this.treeData = result.data.data;
                } else {
                    this.$message({
                        type: 'error',
                        showClose: true,
                        message: result.data.message
                    })
                }
            })
        },
        dicTypeEdit(id) { // 字典修改
            this.editId = Number(id);
            this.dialogDicTypeEdit = true;
        },
        dicTypeDel(id) { // 字典删除

            this.$confirm('您确定要将删除该字典分类吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                
                this.$https.post('/api/Dicts/DeleteTypes?type_id=' + id).then((result) => {
                    if (result.data.code == 0) {
                        this.$message({
                            type: 'success',
                            showClose: true,
                            message: '删除成功',
                            duration: 1500,
                            onClose: () => {
                                this.getDataList();
                            }
                        })
                    } else {
                        this.$message({
                            type: 'error',
                            showClose: true,
                            message: result.data.message
                        })
                    }
                })

            }).catch(() => {     
            });
        },
        closeDialog(name) {
            this[name] = false;
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
        min-height: 28px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .dictype /deep/ .el-tree-node__content {
        height: 46px;
    }
</style>
