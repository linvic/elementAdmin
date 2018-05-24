<template>
    <!-- 【注意】必须设置 ref="upload" -->
    <el-upload
        ref="upload"
        :data="access"
        :action="action"
        :file-list="fileList"
        :show-file-list="false"
        :accept="acceptTypes.join(',')"
        :before-upload="beforeUpload"
        :on-progress="onProgress"
        :on-success="onSuccess"
        :on-error="onError">
        <div class="icon-uploader">    
            <span v-if="isUploading">{{ percent }} %</span>
            <img v-else-if="files" :src="files">
            <span v-else>100px &times; 100px</span>
        </div>
    </el-upload>
</template>
<script>
import uploader from '@/mixins/uploader'

export default {
    mixins: [uploader],
    data: () => ({
        acceptTypes: ['image/png', 'image/jpeg']
    }),
    methods: {
        // 一般情况下只需要实现以下函数即可
        beforeUpload (file) {
            let isPngJpg = this.acceptTypes.includes(file.type)
            if (!isPngJpg) {
                this.$notify.info({
                    title: file.name,
                    message: '只能上传 PNG / JPG 格式的图片'
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
        }
    }
}
</script>
<style scoped>
.icon-uploader {
    width: 100px;
    height: 100px;
    color: #acacac;
    border: 1px dashed #d9d9d9;
    border-radius: 4px;
    font-size: 12px;
    line-height: 100px;
}
.icon-uploader:hover {
    border-color: #3498ff;
}
.icon-uploader > img {
    width: 100%;
    height: 100%;
    vertical-align: top;
}
</style>