<template>
    <div>
        <el-form ref="form" :model="form" size="small" status-icon :rules="stepOne_rules" label-width="130px" v-show="step === 0">
            <el-form-item label="模板类别" prop="TemplateType">
                <el-select v-model="form.TemplateType" @change="getTemplateList">
                    <el-option label="请选择模板类别" value=""></el-option>
                    <el-option v-for="item in TemplateType" :key="item.value_id" :label="item.value_name" :value="item.value_id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文档模板" prop="TemplateList">
                <el-select v-model="form.TemplateList" @change="changeTemplateList">
                    <el-option label="请选择文档模板" value=""></el-option>
                    <el-option v-for="item in TemplateList" :key="item.id" :label="item.template_name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click="stepOne_next()">下一步</el-button>
            </el-form-item>
        </el-form>
        <div v-if="step === 1">
            <Frame @closeDialog="closeDialog" @parentGetDataList="getDataList" :frameParame="FrameParame"></Frame>
        </div>
    </div>
</template>

<script>
import Frame from './Frame'
export default {
    components: {
        Frame
    },
    data () {
        return {
            step: 0, // 步骤
            FrameParame: null,
            form: {
                TemplateType: '',
                TemplateList: ''
            },
            stepOne_rules: {
                TemplateList: [
                    { required: true, message: '请选择文档模板', trigger: 'change' }
                ]
            },
            TemplateType: [], // 类别列表
            TemplateList: [] // 楼宇列表
        }
    },
    created() {
        this.getTemplateType()
    },
    watch: {
    },
    methods: {
        stepOne_next() { // 下一步
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    this.step = 1;
                } else {
                    return false;
                }
            })
        },
        // 获取数据
        getTemplateType() {
            this.$https.get('/api/Dicts/GetValues?type_code=doc_template_type').then((result) => {
                if (result.data.code == 0) {
                    this.TemplateType = result.data.data;
                } else {
                    this.$message({
                        type: 'error',
                        showClose: true,
                        message: result.data.message
                    })
                }
            })
        },
        getTemplateList() {
            this.form.TemplateList = '';
            this.$https.get('/api/file_template/page', {
                params: {
                    currentPage: 1,
                    pageSize: 9999,
                    file_type: this.form.TemplateType,
                    is_enable: 1
                }
            }).then((result) => {
                this.loading = false;
                if (result.data.code == 0) {
                    this.TemplateList = result.data.data.Items;
                } else {
                    this.$message({
                        type: 'error',
                        showClose: true,
                        message: result.data.message
                    })
                }
            })
        },
        changeTemplateList(val) {
            let obj = {};
            obj = this.TemplateList.find((item) => {
                return item.id === val;
            })
            this.FrameParame = {
                id: Number(obj.id),
                name: obj.template_name,
                code: obj.file_code
            }
        },
        closeDialog(name) { // 关闭当前
            // this.$refs.form.resetFields(); // 重置表单
            if (name === 'Frame') {
                this.$emit('closeDialog', 'dialogDocAdd'); // 执行父组件关闭方法
            }
        },
        getDataList() {
            this.$emit('parentGetDataList');
        }
    }
}
</script>

<style scoped>
</style>
