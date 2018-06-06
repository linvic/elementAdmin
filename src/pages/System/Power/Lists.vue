<template>
    <div class="dictype">
        <el-card style="min-width:800px;">
            <div slot="header" class="clearfix">
                <span>功能配置</span>
                <el-button-group style="float: right;">
                    <el-button icon="el-icon-refresh" size="mini" plain onclick="window.location.reload()">刷新</el-button>
                    <el-button type="primary" icon="el-icon-circle-plus-outline" size="mini" @click="dialogPowerAdd = true">新增</el-button>
                </el-button-group>
            </div>
            <table cellspacing="0" cellpadding="0" border="0" class="el-table el-table__header" width="100%">
                <thead class="has-gutter">
                    <tr>
                        <th class="cell">功能名称</th>
                        <th width="120px">功能代码</th>
                        <th width="250px">路径</th>
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
                        <div class="custom-tree-node-item" style="width:120px;">{{ (data.value || '&nbsp;') }}</div>
                        <div class="custom-tree-node-item" style="width:250px;">{{ (data.attrValue || '&nbsp;') }}</div>
                        <div class="custom-tree-node-item" style="width:200px;">

                            <el-button
                                size="mini"
                                plain
                                v-if="data.title === '1'"
                                @click="changeState(data.id, false)">禁用</el-button>
                            <el-button
                                size="mini"
                                plain
                                v-else
                                @click="changeState(data.id, true)">启用</el-button>
                            <el-button
                                size="mini"
                                type="primary"
                                plain
                                @click="itemEdit(data.id)">编辑</el-button>
                        </div>
                    </div>
                </div>
            </el-tree>
        </el-card>
        <el-dialog v-if="dialogPowerAdd" title="新增功能" :visible.sync="dialogPowerAdd"  append-to-body width="800px">
            <StructureAdd @closeDialog="closeDialog" @parentGetDataList="getDataList"></StructureAdd>
        </el-dialog>

        <el-dialog v-if="dialogPowerEdit" title="编辑功能" :visible.sync="dialogPowerEdit"  append-to-body width="800px">
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
            dialogPowerAdd: false, // 新增弹层
            dialogPowerEdit: false // 新增弹层
        }
    },
    created() {
        this.getDataList();
    },
    methods: {
        getDataList() {
            this.$https.get('/api/company_role/list_module?status=999&parent_id=0').then((result) => {
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
            this.dialogPowerEdit = true;
        },
        closeDialog(name) {
            this[name] = false;
        },
        changeState(id, isOn) { // 启用禁用 isOn： true启用  false禁用
            this.$https.post('/api/company_role/update_module_status',{
                module_id: id,
                status: (isOn ? 1 : 0)
            }).then((result) => {
                if (result.data.code == 0) {
                    let _message = isOn ? '启用成功' : '禁用成功';
                    this.$message({
                        type: 'success',
                        showClose: true,
                        message: _message,
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
