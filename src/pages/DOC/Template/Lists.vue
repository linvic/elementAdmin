<template>
    <div>

        <el-card>
            <div slot="header" class="clearfix">
                <span>文档模板管理</span>
                <el-button-group style="float: right;">
                    <el-button icon="el-icon-refresh" size="small" plain onclick="window.location.reload()">刷新</el-button>
                    <el-button type="primary" icon="el-icon-circle-plus-outline" size="small" @click="dialogTemplateAdd = true">新增</el-button>
                </el-button-group>
            </div>
            
            <el-table :data="tableData" style="width: 100%" v-loading="loading">
                <el-table-column prop="id" label="ID" width="80"></el-table-column>
                <el-table-column prop="template_name" label="模板名称"></el-table-column>
                <el-table-column prop="file_code" label="模板Code"></el-table-column>
                <el-table-column label="模板类别">
                    <template slot-scope="scope">
                        <span>{{ getDicVal(scope.row.file_type, 'doc_template_type')}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="version_num" label="模板版本"></el-table-column>
                <el-table-column prop="created_time" label="创建时间"></el-table-column>
                <el-table-column label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            @click="listEdit(scope.row.id, scope.row.file_code)">编辑模板</el-button>
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            @click="listFrame(scope.row.id, scope.row.template_name, scope.row.file_code)">使用模板</el-button>
                    </template>
                </el-table-column>
            </el-table>
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
        </el-card>
        <el-dialog v-if="dialogTemplateAdd" title="新增模板" :visible.sync="dialogTemplateAdd" append-to-body width="600px">
            <TemplateAdd @closeDialog="closeDialog" @parentGetDataList="getDataList"></TemplateAdd>
        </el-dialog>

        <el-dialog v-if="dialogTemplateEdit" title="编辑模板信息" :visible.sync="dialogTemplateEdit" append-to-body width="600px">
            <TemplateAdd @closeDialog="closeDialog" @parentGetDataList="getDataList" :id="editId" :code="editCode"></TemplateAdd>
        </el-dialog>

        <el-dialog v-if="dialogFrame" title="创建文档" :visible.sync="dialogFrame" append-to-body fullscreen>
            <Frame @closeDialog="closeDialog" @parentGetDataList="getDataList" :frameParame="FrameParame"></Frame>
        </el-dialog>
    </div>
</template>

<script>
import TemplateAdd from './TemplateAdd'
import Frame from './../Frame'
export default {
    components: {
        TemplateAdd,
        Frame
    },
    data () {
        return {
            loading: false,
            editId: null,
            editCode: null,
            FrameParame: null, // 使用模板参数
            tableData: [],
            dialogTemplateAdd: false, // 新增弹层
            dialogTemplateEdit: false, // 新增弹层
            dialogFrame: false, // 使用模板
            pageIndex: 1, // 当前页码
            pageSize: 10, // 页码大小
            dataTotal: 0, // 数据总数,
            doc_template_type: [] // 字典 - 文档模板类别
        }
    },
    created() {
        let _this = this;
        this.$https.all([
            this.getDic('doc_template_type', 'doc_template_type')
        ]).then(this.$https.spread(function (acct, perms) {
            _this.getDataList();
        }))
    },
    watch: {
    },
    methods: {
        // 获取字典值分页
        getDataList() {
            this.loading = true;
            this.$https.get('/api/file_template/page', {
                params: {
                    currentPage: this.pageIndex,
                    pageSize: this.pageSize,
                    is_enable: 2
                }
            }).then((result) => {
                this.loading = false;
                if (result.data.code == 0) {
                    this.tableData = result.data.data.Items;
                    this.dataTotal = result.data.data.Total;
                } else {
                    this.$message({
                        type: 'error',
                        showClose: true,
                        message: result.data.message
                    })
                }
            })
        },
        listEdit(id, code) { // 修改
            this.editId = id;
            this.editCode = code;
            this.dialogTemplateEdit = true;
        },
        listFrame(id, name, code) { // 使用模板
            this.FrameParame = {
                id: Number(id),
                name: name,
                code: code
            };
            this.dialogFrame = true;
        },

        pageSizeChange(val) { // 分页：pageSize改变时
            this.pageSize = val;
            this.getDataList();
        },
        pageIndexChange(val) { // 分页：当前页码改变时
            this.pageIndex = val;
            this.getDataList();
        },
        getDic(code, dic) { // 根据关键字获取字典值并保存 相应字段
            this.$https.get('/api/Dicts/GetValues', {
                params: {
                    type_code: code
                }
            }).then((result) => {
                if (result.data.code == 0) {
                    this[dic] = result.data.data;
                } else {
                    this.$message({
                        type: 'error',
                        showClose: true,
                        message: result.data.message
                    })
                }
            })
        },
        getDicVal(key, dic) { // 根据字典值匹配字典名
            let text = '';
            for(var item of this[dic]) {
                if (key == item.value_id) {
                    text = item.value_name;
                }
            }
            return text;
        },
        closeDialog(name) {
            if(name === "Frame") {
                this.dialogFrame = false; // 使用模板
                this.dialogFrameEdit = false; // 编辑文档
                this.dialogFramePrint = false; // 打印文档
            }
            this[name] = false;
        }
    }
}
</script>

<style scoped>
    .dicMain {
        padding: 0px 0px 20px 20px;
    }
</style>
