<template>
    <!-- 【注意】必须设置 ref="upload" -->
    <el-upload
        ref="upload"
        list-type="picture-card"
        multiple
        :limit="limit"
        :action="action"
        :data="access"
        :file-list="fileList"
        :accept="acceptTypes.join(',')"
        :before-upload="beforeUpload"
        :on-exceed="handleExceed"
        :on-remove="onRemove"
        :on-progress="onProgress"
        :on-success="onSuccess"
        :on-error="onError">
        <i class="el-icon-plus"></i>
    </el-upload>
</template>
<script>
import uploader from '@/mixins/uploader'

export default {
    mixins: [uploader],
    data: () => ({
        acceptTypes: ['image/png', 'image/jpeg', 'image/gif']
    }),
    methods: {
        // 一般情况下只需要实现以下函数即可
        beforeUpload (file) {
            let isPngJpg = this.acceptTypes.includes(file.type)
            if (!isPngJpg) {
                this.$notify.info({
                    title: file.name,
                    message: '只能上传 PNG / JPG / GIF 格式的图片'
                })
                return false
            }
            let isLt1M = file.size / 1024 / 1024 < 1
            if (!isLt1M) {
                this.$notify.info({
                    title: file.name,
                    message: '单张图片不得大于 1 MB 的限制'
                })
                return false
            }
            return this.addFile(file)
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        }
    }
}
</script>
<style scoped>
</style>