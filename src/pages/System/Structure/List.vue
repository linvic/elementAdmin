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

                ref="tree">
                <div class="custom-tree-node" slot-scope="{ node, data }">
                    <div>{{ data.text }}</div>
                    <div>
                        <div class="custom-tree-node-item" style="width:200px;">{{ (data.attrValue || '&nbsp;') }}</div>
                        <div class="custom-tree-node-item" style="width:200px;">
                            <el-button
                                size="mini"
                                @click="itemEdit(data.id)">编辑</el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="itemDel(data.id)">删除</el-button>
                        </div>
                    </div>
                </div>
            </el-tree>
        </el-card>
        <el-dialog v-if="dialogStructureAdd" title="新增组织" :visible.sync="dialogStructureAdd"  append-to-body width="600px">
            <StructureAdd @closeDialog="closeDialog" @parentGetDataList="getDataList"></StructureAdd>
        </el-dialog>

        <el-dialog v-if="dialogStructureEdit" title="编辑组织" :visible.sync="dialogStructureEdit"  append-to-body width="600px">
            <StructureAdd @closeDialog="closeDialog" @parentGetDataList="getDataList" :id="editId"></StructureAdd>
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
            editId: null,
            treeData: [],
            defaultProps: {
                children: 'children',
                label: 'label',
                code: 'code'
            },
            dialogStructureAdd: false, // 新增弹层
            dialogStructureEdit: false // 新增弹层
        }
    },
    created() {
        this.getDataList();
    },
    methods: {
        getDataList() {
            this.$https.get('/api/company_unit/GetUnitsTree').then((result) => {
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
        itemEdit(id) { // 字典修改
            this.editId = Number(id);
            this.dialogStructureEdit = true;
        },
        itemDel(id) { // 字典删除
            this.$https.post('/api/company_unit/DeleteCompanyUnit?unit_id=' + id).then((result) => {
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
    }
    .dictype /deep/ .el-tree-node__content {
        height: 46px;
    }
</style>
