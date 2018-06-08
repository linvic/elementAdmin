<template>
    <div>
        <el-form ref="form" :rules="form_rules" :model="form" label-width="120px" size="small">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="楼宇编码" prop="building_code">
                        <el-input v-model="form.building_code"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="楼宇证件名称" prop="building_name">
                        <el-input v-model="form.building_name" @input="form.building_alias_name = form.building_name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="楼宇运营名称" prop="building_alias_name">
                        <el-input v-model="form.building_alias_name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="楼层数量" prop="floor_amount">
                        <el-input v-model="form.floor_amount" @keyup.native="onkeyupPlusInt($event)" placeholder="正整数"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="建筑面积">
                        <el-input v-model="form.building_area" @keyup.native="onkeyupPrice($event)" placeholder="数字，小数点两位，单位平方米">
                            <template slot="append">平方米</template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="公摊面积">
                        <el-input v-model="form.public_area" @keyup.native="onkeyupPrice($event)" placeholder="数字，小数点两位，单位平方米">
                            <template slot="append">平方米</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="使用面积">
                        <el-input v-model="form.usable_area" @keyup.native="onkeyupPrice($event)" placeholder="数字，小数点两位，单位平方米">
                            <template slot="append">平方米</template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="楼宇功能">
                        <el-select v-model="form.building_function">
                            <el-option v-for="item in building_function" :key="item.value_id" :label="item.value_name" :value="item.value_id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="结构类别">
                        <el-select v-model="form.building_structure">
                            <el-option v-for="item in building_structure" :key="item.value_id" :label="item.value_name" :value="item.value_id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="装修标准">
                        <el-select v-model="form.building_decoration">
                            <el-option v-for="item in building_decoration" :key="item.value_id" :label="item.value_name" :value="item.value_id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="完损等级">
                        <el-select v-model="form.building_damage">
                            <el-option v-for="item in building_damage" :key="item.value_id" :label="item.value_name" :value="item.value_id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="竣工日期">
                        <el-date-picker v-model="form.completion" type="date" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="预售许可证日期">
                        <el-date-picker v-model="form.capped" type="date" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="建筑许可证">
                        <el-input v-model="form.building_permit"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="预售许可证">
                        <el-input v-model="form.presale_permit"></el-input>
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
                building_code: '', // 楼宇编码
                building_name: '', // 楼宇名称
                building_alias_name: '',//楼宇运营名称
                floor_amount: '', // 楼层数量
                building_function: '', // 楼宇功能
                building_structure: '', // 结构类别
                building_decoration: '', // 装修标准
                building_damage: '', // 完损等级
                building_area: '', // 建筑面积
                public_area: '', // 公摊面积
                usable_area: '', // 使用面积
                building_permit: '', // 建筑许可证
                presale_permit: '', // 预售许可证
                completion: '', // 竣工日期
                capped: '', // 预售许可证日期
                remark: '' // 备注
            },
            form_rules: {
                building_code: [
                    { required: true, message: '楼宇编码不能为空', trigger: 'blur'}
                ],
                building_name: [
                    { required: true, message: '楼宇证件名称不能为空', trigger: 'blur'}
                ],
                building_alias_name: [
                    { required: true, message: '楼宇运营名称不能为空', trigger: 'blur'}
                ],
                floor_amount: [
                    { required: true, message: '楼层数量不能为空', trigger: 'blur'}
                ]
            },
            building_function: [], // 字典 - 楼宇功能
            building_structure: [], // 字典 - 结构类别
            building_decoration: [], // 字典 - 装修标准
            building_damage: [] // 字典 - 完损等级
        }
    },
    props: {
        id: {
            type: Number
        },
        project_id: {
            type: Number
        }
    },
    created() {
        let _this = this;
        this.$https.all([this.getDic('pms_type_buildingfeature', 'building_function'),this.getDic('pms_type_structure', 'building_structure'),this.getDic('pms_type_decoration', 'building_decoration'),this.getDic('pms_type_damage', 'building_damage')]).then(this.$https.spread(function (acct, perms) {
            if (_this.id) { // 编辑
                _this.getOldData();
            }
        }))
    },
    methods: {
        getOldData() { // 获取编辑数据

            this.$https.get('/api/pms_base_buildings/GetBuildingDetail?building_id=' + this.id).then((result) => {
                if (result.data.code == 0) {
                    let _data = result.data.data;
                    this.form.building_code  = _data.building_code; // 楼宇编码
                    this.form.building_name  = _data.building_name; // 楼宇证件名称
                    this.form.building_alias_name  = _data.building_alias_name; // 楼宇运营名称
                    
                    this.form.floor_amount  = _data.floor_amount; // 楼层数量
                    this.form.building_function  = _data.building_function == 0 ? '' : _data.building_function; // 楼宇功能
                    this.form.building_structure  = _data.building_structure == 0 ? '' : _data.building_structure; // 结构类别
                    this.form.building_decoration  = _data.building_decoration == 0 ? '' : _data.building_decoration; // 装修标准
                    this.form.building_damage  = _data.building_damage == 0 ? '' : _data.building_damage; // 完损等级
                    this.form.building_area  = _data.building_area == 0 ? '' : _data.building_area; // 建筑面积
                    this.form.public_area  = _data.public_area == 0 ? '' : _data.public_area; // 公摊面积
                    this.form.usable_area  = _data.usable_area == 0 ? '' : _data.usable_area; // 使用面积
                    this.form.building_permit  = _data.building_permit; // 建筑许可证
                    this.form.presale_permit  = _data.presale_permit; // 预售许可证
                    this.form.completion  = _data.completion; // 竣工日期
                    this.form.capped  = _data.capped; // 预售许可证日期
                    this.form.remark  = _data.remark; // 备注
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
                    _postData.building_function  = this.form.building_function == '' ? 0 : this.form.building_function; // 楼宇功能
                    _postData.building_structure  = this.form.building_structure == '' ? 0 : this.form.building_structure; // 结构类别
                    _postData.building_decoration  = this.form.building_decoration == '' ? 0 : this.form.building_decoration; // 装修标准
                    _postData.building_damage  = this.form.building_damage == '' ? 0 : this.form.building_damage; // 完损等级
                    _postData.building_area  = this.form.building_area == '' ? 0 : this.form.building_area; // 建筑面积
                    _postData.public_area  = this.form.public_area == '' ? 0 : this.form.public_area; // 公摊面积
                    _postData.usable_area  = this.form.usable_area == '' ? 0 : this.form.usable_area; // 使用面积

                    _postData.floor_amount = parseInt(_postData.floor_amount);
                    if (this.id) { // 编辑
                        _postData.building_id = parseInt(this.id);
                        this.$https.post('/api/pms_base_buildings/ModifyBuilding', _postData).then((result) => {
                            if (result.data.code == 0) {
                                this.$message({
                                    type: 'success',
                                    showClose: true,
                                    message: '编辑成功',
                                    duration: 1500,
                                    onClose: () => {
                                        // 关闭当前dialog，
                                        this.closeDialog('dialogBuildingEdit');
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

                        this.$https.post('/api/pms_base_buildings/InsertBuilding', _postData).then((result) => {
                            if (result.data.code == 0) {
                                this.$message({
                                    type: 'success',
                                    showClose: true,
                                    message: '添加成功',
                                    duration: 1500,
                                    onClose: () => {
                                        // 关闭当前dialog，
                                        this.closeDialog('dialogBuildingAdd');
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
                this.$emit('closeDialog', 'dialogBuildingAdd'); // 执行父组件关闭方法
                this.$emit('closeDialog', 'dialogBuildingEdit'); // 执行父组件关闭方法
            } else {
                this.$emit('closeDialog', name); // 执行父组件关闭方法
            }
        }
    }
}
</script>
<style scoped>
</style>