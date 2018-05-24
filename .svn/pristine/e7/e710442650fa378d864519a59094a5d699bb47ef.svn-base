<template>
    <div>
        <el-form ref="form" :rules="form_rules" :model="form" label-width="120px" size="small">
            
            <el-form-item label="联系人姓名" prop="linkman_name">
                <el-input v-model="form.linkman_name"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="telephone">
                <el-input v-model="form.telephone"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="form.linkman_sex">
                    <el-radio label="1">男</el-radio>
                    <el-radio label="0">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="证件类型">
                <el-select v-model="form.identification_type">
                    <el-option v-for="item in identification_type" :key="item.value_id" :label="item.value_name" :value="item.value_id">{{item.value_name}}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="证件号码">
                <el-input v-model="form.identification_number"></el-input>
            </el-form-item>
            <el-form-item label="联系人类型">
                <el-radio-group v-model="form.linkman_type">
                    <el-radio v-for="item in linkman_type" :key="item.value_id" :label="String(item.value_id)">{{item.value_name}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="备注">
                <el-input type="textarea" v-model="form.remark" :rows="3"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit()">保存</el-button>
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
                c_id: 0,
                linkman_name: '', // 联系人姓名
                telephone: '', // 联系人电话
                linkman_type: '1', // 联系人类别
                linkman_sex: '1', // 性别
                identification_type: '', // 证件类别
                identification_number: '', // 证件号码
                remark: '' // 跟进备注
            },
            form_rules: {
                linkman_name: [
                    { required: true, message: '联系人姓名不能为空', trigger: 'blur'}
                ],
                telephone: [
                    { required: true, message: '联系人电话不能为空', trigger: 'blur'}
                ]
            },
            identification_type: [], // 字典 - 房间功能
            linkman_type: [{ // 联系人类型
                value_id: '1',
                value_name: '法定联系人'
            },{
                value_id: '2',
                value_name: '财务联系人'
            },{
                value_id: '3',
                value_name: '物业联系人'
            },{
                value_id: '4',
                value_name: '政务联系人'
            }]
        }
    },
    created() {
        let _this = this;
        this.$https.all([
            this.getDic('contact_card_type', 'identification_type')
        ]).then(this.$https.spread(function (acct, perms) {
        }))
    },
    methods: {
        submit() { // 提交
            this.$refs.form.validate((valid) => {
                if (valid) {
                    let _postData = JSON.parse(JSON.stringify(this.form));


                    _postData.identification_type = this.form.identification_type == '' ? 0 : this.form.identification_type;

                    _postData = JSON.stringify(_postData);
                    this.$message({
                        type: 'success',
                        showClose: true,
                        message: '联系人新增成功',
                        duration: 1000,
                        onClose: () => {
                            // 关闭当前dialog，
                            this.closeDialog('dialogContactsAdd');
                            // 刷新列表
                            this.$emit('parentSetContactsList', _postData);
                        }
                    })
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
                this.$emit('closeThisDialog', 'dialogContactsAdd'); // 执行父组件关闭方法
                this.$emit('closeThisDialog', 'dialogContactsEdit'); // 执行父组件关闭方法
            } else {
                this.$emit('closeThisDialog', name); // 执行父组件关闭方法
            }
        }
    }
}
</script>
<style scoped>
    .el-radio {
        line-height: 32px;
        margin-right: 30px;
    }
    .el-radio+.el-radio {
        margin-left: 0px;
    }
</style>