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
                <el-table-column prop="config_code" label="类目Code" width="180"></el-table-column>
                <el-table-column prop="config_name" label="设置类目名称"></el-table-column>
                <el-table-column prop="config_titps" label="提醒时间"></el-table-column>
                <el-table-column label="限定时间">
                    <template slot-scope="scope">
                        {{scope.row.config_value + (scope.row.config_unit === 1 ? '小时' : '天')}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="followEdit(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog v-if="dialogFollowEdit" title="修改配置" :visible.sync="dialogFollowEdit" append-to-body width="500px">
            <FollowEdit @closeDialog="closeDialog" @parentGetDataList="getDataList" :oldData="editData"></FollowEdit>
        </el-dialog>
    </div>
</template>

<script>
import FollowEdit from './FollowEdit'
export default {
    components: {
        FollowEdit
    },
    data () {
        return {
            tableData: [],
            editCode: null,
            dialogFollowEdit: false

        }
    },
    watch: {
    },
    created() {
        this.getDataList()
    },
    methods: {
        followEdit(rowData) { // 修改
            this.editData = {
                config_code: rowData.config_code,
                config_value: rowData.config_value.toString(),
                config_unit: rowData.config_unit.toString()
            }
            this.dialogFollowEdit = true;
        },
        closeDialog(name) { // 关闭弹层
            this[name] = false;
        },
        getDataList() {

            this.$https.get('/api/system_config/list_system_config_communicate').then((result) => {
                if (result.data.code == 0) {
                    this.tableData = result.data.data;
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
