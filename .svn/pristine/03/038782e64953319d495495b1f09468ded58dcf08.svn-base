<template>
    <div>
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="带看房源">
                <p>{{form.resource_name}}</p>
            </el-form-item>
            <el-form-item label="跟进内容" prop="follow_content">
                <el-input v-model="form.follow_content" type="textarea" :rows="4"></el-input>
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
    props: {
        resourceData: {
            type: Object
        }
    },
    data () {
        return {
            form: {
                follow_content: '', // 跟进内容
                resource_id: '', // 租售房源标识
                resource_name: '', // 租售房源物业名
            }
        }
    },
    created() {
        this.form.resource_id = this.resourceData.id;
        this.form.resource_name = this.resourceData.name;
    },
    methods: {
        submit() { // 提交
            this.$refs.form.validate((valid) => {
                if (valid) {
                    let _postData = JSON.parse(JSON.stringify(this.form));
                    this.$https.post('/api/rent_base_resources/CreateFollow', _postData).then((result) => {
                        if (result.data.code == 0) {
                            this.$message({
                                type: 'success',
                                showClose: true,
                                message: '添加成功',
                                duration: 1500,
                                onClose: () => {
                                    // 关闭当前dialog，
                                    this.closeDialog();
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
                    

                } else {
                    console.error('验证失败');
                    return false;
                }
            });
        },
        closeDialog(name) {
            if (!name) {
                this.$emit('closeDialog', 'dialogFollowUpAdd'); // 执行父组件关闭方法
            } else {
                this.$emit('closeDialog', name); // 执行父组件关闭方法
            }
        }
    }
}

</script>

<style scoped>
</style>
