<template>
    <div>
        <el-form ref="form" status-icon :rules="form_rules" :model="form" label-width="100px">
            <el-form-item label="模板名称" prop="template_name">
                <el-input v-model="form.template_name"></el-input>
            </el-form-item>
            <el-form-item label="模板Code" prop="file_code">
                <el-input v-model="form.file_code" :disabled="!!id"></el-input>
            </el-form-item>
            <el-form-item label="模板类别" prop="file_type">
                <el-select v-model="form.file_type">
                    <el-option v-for="item in doc_template_type" :key="item.value_id" :label="item.value_name" :value="item.value_id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="模板版本" prop="version_num">
                <el-input v-model="form.version_num"></el-input>
            </el-form-item>
            <el-form-item label="模板HTML" prop="template_html">
                <el-input type="textarea" v-model="form.template_html" :rows="5"></el-input>
                <p style="font-size:10px;"><i class="el-icon-warning"></i> 提示：请勿随意更改，请最外层使用div包裹，使用 {{}} 进行字段占位</p>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit()">保存</el-button>
                <el-button @click="closeDialog()">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data () {
        return {
            form: {
                template_name: '', // 模板名称
                file_code: '', // 模板Code
                file_type: '', // 模板类别
                version_num: '', // 模板版本
                template_html: '' // 模板HTML
            },
            form_rules: {
                template_name: [
                    { required: true, message: '请输入模板名称', trigger: 'blur' }
                ],
                file_code: [
                    { required: true, message: '请输入模板Code', trigger: 'blur' }
                ],
                file_type: [
                    { required: true, message: '请输入模板类别', trigger: 'blur' }
                ],
                version_num: [
                    { required: true, message: '请输入模板版本', trigger: 'blur' }
                ],
                template_html: [
                    { required: true, message: '请输入模板HTML', trigger: 'blur' }
                ]
            },
            doc_template_type: [] // 字典 - 文档模板类别
        }
    },
    props: {
        id: {
            type: Number
        },
        code: {
            type: String
        }
    },
    created() {
        let _this = this;
        this.$https.all([
            this.getDic('doc_template_type', 'doc_template_type')
        ]).then(this.$https.spread(function (acct, perms) {
            if (_this.id) { // 编辑
                _this.getOldData();
            }
        }))
    },
    methods: {
        getOldData() { // 获取详情数据
            this.$https.get('/api/file_template/get_file_templatedetails_by_file_code?file_code=' + this.code).then((result) => {
                if (result.data.code == 0) {
                    let _data = result.data.data;
                    this.form.template_name = _data.template_name;
                    this.form.file_code = _data.file_code;
                    this.form.file_type = parseInt(_data.file_type);
                    this.form.version_num = _data.version_num;
                    this.form.template_html = _data.template_html;
                } else {
                    this.$message({
                        type: 'error',
                        showClose: true,
                        message: result.data.message
                    })
                }
            })
        },
        submit() { // 提交
            this.$refs.form.validate((valid) => {
                if (valid) {
                    let _postData = JSON.parse(JSON.stringify(this.form));
                    if (this.id) { // 编辑
                        _postData.id = parseInt(this.id);
                        this.$https.post('/api/file_template/update_file_template', _postData).then((result) => {
                            if (result.data.code == 0) {
                                this.$message({
                                    type: 'success',
                                    showClose: true,
                                    message: '编辑成功',
                                    duration: 1500,
                                    onClose: () => {
                                        // 关闭当前dialog
                                        this.closeDialog('dialogTemplateEdit');
                                        // 刷新列表
                                        this.$emit('parentGetDataList');
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
                    } else { // 新增
                        this.$https.post('/api/file_template/create_file_template', _postData).then((result) => {
                            if (result.data.code == 0) {
                                this.$message({
                                    type: 'success',
                                    showClose: true,
                                    message: '添加成功',
                                    duration: 1500,
                                    onClose: () => {
                                        // 关闭当前dialog，
                                        this.closeDialog('dialogTemplateAdd');
                                        // 刷新列表
                                        this.$emit('parentGetDataList');
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
                    

                } else {
                    console.error('验证失败');
                    return false;
                }
            });
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
        closeDialog(name) { // 关闭当前
            // this.$refs.form.resetFields(); // 重置表单
            if (!name) {
                this.$emit('closeDialog', 'dialogTemplateAdd'); // 执行父组件关闭方法
                this.$emit('closeDialog', 'dialogTemplateEdit'); // 执行父组件关闭方法
            } else {
                this.$emit('closeDialog', name); // 执行父组件关闭方法
            }
        }
    }
}
</script>
<style scoped>
</style>