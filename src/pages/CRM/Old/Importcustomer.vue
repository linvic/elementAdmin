<template>
    <div>
        <el-upload
            drag
            :action="this.$https.defaults.baseURL + '/api/Customer_excel/Importcustomer'"
            :accept="acceptTypes.join(',')"
            :before-upload="beforeUpload"
            with-credentials
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
            } else if (response.code === 9999) {

                let alertHtml = '<h4>客户导入成功，以下客户导入失败：</h4>';
                alertHtml += '<table class="el-table el-table--border" cellpadding="0" cellspacing="0">';
                alertHtml += '<tr><th>公司名称</th><th>客户姓名</th><th>客户电话</th><th>出错原因</th></tr>';
                for (let item of response.data) {
                    alertHtml += '<tr>';
                    alertHtml += '<td>' + item.enterprise_name + '</td>';
                    alertHtml += '<td>' + item.customer_name + '</td>';
                    alertHtml += '<td>' + item.telephone + '</td>';
                    alertHtml += '<td>' + item.badtype + '</td>';
                    alertHtml += '</tr>';
                }
                alertHtml += '</table>';
                this.$alert(alertHtml, '部分用户导入不成功', {
                    dangerouslyUseHTMLString: true
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