<template>
    <div>
        <el-form ref="form" :rules="form_rules" :model="form" label-width="100px" size="small">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="楼层编码" prop="floor_code">
                        <el-input v-model="form.floor_code"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="楼层名称" prop="floor_name">
                        <el-input v-model="form.floor_name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="开始楼层">
                        <el-input v-model="form.floor_start" @keyup.native="onkeyupPlusInt($event)" placeholder="正整数"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="结束楼层">
                        <el-input v-model="form.floor_end" @keyup.native="onkeyupPlusInt($event)" placeholder="正整数"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="开始房号">
                        <el-input v-model="form.room_start" @keyup.native="onkeyupPlusInt($event)" placeholder="正整数"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="结束房号">
                        <el-input v-model="form.room_end" @keyup.native="onkeyupPlusInt($event)" placeholder="正整数"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="备注">
                        <el-input type="textarea" v-model="form.remark"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
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
                floor_code: '', // 楼层编码
                floor_name: '', // 楼层名称
                floor_start: '', // 开始楼层
                floor_end: '', // 结束楼层
                room_start: '', // 开始房号
                room_end: '', // 结束房号
                remark: '' // 备注
            },
            form_rules: {
                floor_code: [
                    { required: true, message: '楼层编码不能为空', trigger: 'blur'}
                ],
                floor_name: [
                    { required: true, message: '楼层名称不能为空', trigger: 'blur'}
                ]
            }
        }
    },
    props: {
        id: {
            type: Number
        },
        project_id: {
            type: Number
        },
        building_id: {
            type: Number
        }
    },
    created() {
        if (this.id) { // 编辑
            this.getOldData();
        }
    },
    methods: {
        getOldData() { // 获取编辑数据

            this.$https.get('/api/pms_base_floors/GetFloorDetail?floor_id=' + this.id).then((result) => {
                if (result.data.code == 0) {
                    let _data = result.data.data;
                    this.form.floor_code = _data.floor_code; // 楼层编码
                    this.form.floor_name = _data.floor_name; // 楼层名称
                    this.form.floor_start = _data.floor_start; // 开始楼层
                    this.form.floor_end = _data.floor_end; // 结束楼层
                    this.form.room_start = _data.room_start; // 开始房号
                    this.form.room_end = _data.room_end; // 结束房号
                    this.form.remark = _data.remark; // 备注
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
                    _postData.project_id = this.project_id;
                    _postData.building_id = this.building_id;

                    _postData.floor_start  = this.form.floor_start == '' ? 1 : this.form.floor_start; // 开始楼层
                    _postData.floor_end  = this.form.floor_end == '' ? 1 : this.form.floor_end; // 结束楼层
                    _postData.room_start  = this.form.room_start == '' ? 1 : this.form.room_start; // 开始房号
                    _postData.room_end  = this.form.room_end == '' ? 1 : this.form.room_end; // 结束房号

                    if (this.id) { // 编辑
                        _postData.floor_id = parseInt(this.id);
                        this.$https.post('/api/pms_base_floors/ModifyFloor', _postData).then((result) => {
                            if (result.data.code == 0) {
                                this.$message({
                                    type: 'success',
                                    showClose: true,
                                    message: '编辑成功',
                                    duration: 1500,
                                    onClose: () => {
                                        // 关闭当前dialog，
                                        this.closeDialog('dialogFloorEdit');
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

                        this.$https.post('/api/pms_base_floors/InsertFloor', _postData).then((result) => {
                            if (result.data.code == 0) {
                                this.$message({
                                    type: 'success',
                                    showClose: true,
                                    message: '添加成功',
                                    duration: 1500,
                                    onClose: () => {
                                        // 关闭当前dialog，
                                        this.closeDialog('dialogFloorAdd');
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
        closeDialog(name) { // 关闭当前
            // this.$refs.form.resetFields(); // 重置表单
            if (!name) {
                this.$emit('closeDialog', 'dialogFloorAdd'); // 执行父组件关闭方法
                this.$emit('closeDialog', 'dialogFloorEdit'); // 执行父组件关闭方法
            } else {
                this.$emit('closeDialog', name); // 执行父组件关闭方法
            }
        }
    }
}
</script>
<style scoped>
</style>