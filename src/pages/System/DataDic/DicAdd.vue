<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="字典名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="字典值">
                <el-input v-model="form.value"></el-input>
            </el-form-item>
            <el-form-item label="排序">
                <el-input v-model="form.order"></el-input>
            </el-form-item>
            <el-form-item label="是否默认">
                <el-switch v-model="form.isdefault"></el-switch>
            </el-form-item>
            <el-form-item label="备注">
                <el-input type="textarea" v-model="form.remark"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">立即创建</el-button>
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
                isdefault: false,
                remark: ''
            }
        }
    }
}
</script>
<style scoped>
</style>