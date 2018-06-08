<template>
    <div>
        <el-upload
            drag
            :action="this.$https.defaults.baseURL + '/api/pms_base_rooms/ImportRooms'"
            :accept="acceptTypes.join(',')"
            :before-upload="beforeUpload"
            :on-change="handleChange"
            :on-success="onSuccess"
            :on-error="onError"
            :file-list="fileList">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div slot="tip" class="el-upload__tip">只能上传xlsx,csv文件，且不超过1MB</div>
        </el-upload>
        
    </div>
</template>

<script>
export default {
    data () {
        
        return {
            fileList: [],
            acceptTypes: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
        }
    },
    created() {
    },
    methods: {
        beforeUpload (file) {
            console.log('type', file.type)
            let isPngJpg = this.acceptTypes.includes(file.type)
            if (!isPngJpg) {
                this.$notify.info({
                    title: file.name,
                    message: '只能上传 xlsx / csv 格式的文件'
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
            return file
        },
        handleChange(file, fileList) {
            console.log(file)
        },
        onSuccess(response, file, fileList) {
            if (response.code === 0) {
                this.$message({
                    type: 'success',
                    showClose: true,
                    message: '导入成功，您可返还列表刷新页面查看，也可继续导入',
                    duration: 2500,
                    onClose: () => {
                        
                    }
                })
            } else {
                this.$message({
                    type: 'error',
                    showClose: true,
                    duration: 2500,
                    message: response.message
                })
            }
            
        },
        onError(err, file, fileList) {
            this.$message({
                type: 'error',
                showClose: true,
                duration: 2500,
                message: err.message
            })
        }
    }
}
</script>
<style scoped>
</style>