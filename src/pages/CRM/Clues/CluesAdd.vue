<template>
    <div>
        <el-form ref="form" :model="form" label-width="120px" size="small">
            
            <el-form-item label="线索名称/主题">
                <el-input v-model="form.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="线索分类">
                <el-checkbox-group v-model="form.type">
                    <el-checkbox label="产业楼类" name="type"></el-checkbox>
                    <el-checkbox label="商铺类" name="type"></el-checkbox>
                    <el-checkbox label="住宅类" name="type"></el-checkbox>
                    <el-checkbox label="非预售类" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="线索来源">
                <el-radio-group v-model="form.resource">
                    <el-radio label="广告"></el-radio>
                    <el-radio label="电台"></el-radio>
                    <el-radio label="楼宇广告"></el-radio>
                    <el-radio label="媒体"></el-radio>
                    <el-radio label="活动"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="购买意向">
                <el-radio-group v-model="form.gmyx">
                    <el-radio label="A类-强烈"></el-radio>
                    <el-radio label="B类-有意向"></el-radio>
                    <el-radio label="C类-摇摆"></el-radio>
                    <el-radio label="D类-不确定"></el-radio>
                    <el-radio label="E类-无意向"></el-radio>
                    <el-radio label="F类-其它"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="客户姓名">
                <el-input v-model="form.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="客户联系电话">
                <el-input v-model="form.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="企业名称">
                <el-input v-model="form.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="职务">
                <el-input v-model="form.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="意向面积">
                <el-input v-model="form.name" placeholder="请输入" type="number" style="width: 150px"></el-input> - 
                <el-input v-model="form.name" placeholder="请输入" type="number" style="width: 150px"></el-input> 平米
            </el-form-item>
            <el-form-item label="电子邮箱">
                <el-input v-model="form.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="通讯地址">
                <el-input v-model="form.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">确定</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data () {
        return {
            form: {
                name: '',
                value: '',
                order: '',
                isdefault: true,
                remark: ''
            }
        }
    },
    methods: {
    }
}
</script>
<style scoped>
</style>