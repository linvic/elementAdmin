<template>
    <div>
        <el-form ref="form" status-icon :rules="form_rules" :model="form" label-width="120px">
            <el-form-item label="父级：">
                <el-cascader
                :options="options"
                :props="optionsProps"
                :show-all-levels="false"
                v-model="optionsValue"
                change-on-select
                clearable
                @change="cascaderChange"
                ></el-cascader>
            </el-form-item>
            <el-form-item label="组织名称：" prop="unit_name">
                <el-input v-model="form.unit_name"></el-input>
            </el-form-item>
            <el-form-item label="组织编号：" prop="unit_code">
                <el-input v-model="form.unit_code"></el-input>
            </el-form-item>
            <el-form-item label="负责人：">

                <el-select
                    v-model="form.manager_id"
                    filterable
                    remote
                    clearable
                    :remote-method="remoteMethod"
                    placeholder="输入关键词检索">
                    <el-option
                        v-for="item in userlists"
                        :key="item.user_id"
                        :label="item.user_name"
                        :value="item.user_id">
                    </el-option>
                </el-select>

            </el-form-item>
            
            <el-form-item label="备注：">
                <el-input type="textarea" v-model="form.unit_desc" :rows="3"></el-input>
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
    data () {
        return {
            form: {
                parentid: 0,
                unit_name: '',
                unit_code: '',
                manager_id: '',
                unit_desc: ''
            },
            userlists: [],
            form_rules: {
                unit_name: [
                    { required: true, message: '请输入组织名称', trigger: 'blur' }
                ],
                unit_code: [
                    { required: true, message: '请输入组织编号', trigger: 'blur' }
                ]
            },
            optionsValue: [],
            options: [],
            optionsProps: {
                value: 'id',
                label: 'text',
                children: 'children'
            }
        }
    },
    props: {
        id: {
            type: Number
        }
    },
    created() {
        this.getDataTree();
    },
    methods: {
        remoteMethod(query) { // 检索用户
            if (query !== '') {
                this.$https.get('/api/Account/page_users_seach_user_account_name?currentPage=1&pageSize=10&keyword=' + query).then((result) => {
                    if (result.data.code == 0) {
                        this.userlists = result.data.data.Items;
                    } else {
                        this.$message({
                            type: 'error',
                            showClose: true,
                            message: result.data.message
                        })
                    }
                })
            }
        },
        getDataTree() { // 获取树结构
            this.$https.get('/api/company_unit/GetUnitsTree').then((result) => {
                if (result.data.code == 0) {
                    this.options = result.data.data;
                    if (this.id) { // 编辑
                        this.getOldData();
                    }
                } else {
                    this.$message({
                        type: 'error',
                        showClose: true,
                        message: result.data.message
                    })
                }
            })
            
        },
        getOldData() { // 获取编辑数据

            this.$https.get('/api/company_unit/GetCompanyUnitDetail?unit_id=' + this.id).then((result) => {
                if (result.data.code == 0) {
                    let _data = result.data.data;
                    this.form.parentid = _data.parentid == 0 ? '' : _data.parentid;
                    this.optionsValue = this.getTreeDeepArr(this.form.parentid, this.options);
            
                    this.form.unit_name = _data.unit_name;
                    this.form.manager_id = _data.manager_id == 0 ? '' : _data.manager_id;
                    if (_data.manager_id == 0) {
                        this.form.manager_id = '';
                    } else {
                        let _item = {
                            user_id: _data.manager_id,
                            user_name: _data.manager_name,
                        }
                        this.userlists.push(_item);
                        this.form.manager_id = _data.manager_id;
                    }
                    this.form.unit_code = _data.unit_code;
                    this.form.unit_desc = _data.unit_desc;

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
                    let _postData = {
                        parentid: ((!this.form.parentid || this.form.parentid == '') ? 0 : this.form.parentid),
                        unit_name: this.form.unit_name,
                        unit_code: this.form.unit_code,
                        manager_id: ((!this.form.manager_id || this.form.manager_id == '') ? 0 : this.form.manager_id),

                        unit_desc: this.form.unit_desc,
                    }
                    if (this.id) { // 编辑
                        _postData.unit_id = parseInt(this.id);
                        this.$https.post('/api/company_unit/UpdateCompanyUnit', _postData).then((result) => {
                            if (result.data.code == 0) {
                                this.$message({
                                    type: 'success',
                                    showClose: true,
                                    message: '编辑成功',
                                    duration: 1500,
                                    onClose: () => {
                                        // 关闭当前dialog，
                                        this.closeDialog('dialogStructureEdit');
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

                        this.$https.post('/api/company_unit/AppendCompanyUnit', _postData).then((result) => {
                            if (result.data.code == 0) {
                                this.$message({
                                    type: 'success',
                                    showClose: true,
                                    message: '添加成功',
                                    duration: 1500,
                                    onClose: () => {
                                        // 关闭当前dialog，
                                        this.closeDialog('dialogStructureAdd');
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
                this.$emit('closeDialog', 'dialogStructureAdd'); // 执行父组件关闭方法
                this.$emit('closeDialog', 'dialogStructureEdit'); // 执行父组件关闭方法
            } else {
                this.$emit('closeDialog', name); // 执行父组件关闭方法
            }
        },
        cascaderChange(value) {
            console.log(value[value.length-1]);
            this.form.parentid = value[value.length-1];
        },
        getTreeDeepArr(key, treeData) {

            let arr = []; // 在递归时操作的数组
            let returnArr = []; // 存放结果的数组
            let depth = 0; // 定义全局层级
            // 定义递归函数
            function childrenEach(childrenData, depthN) {

                for (var j = 0; j < childrenData.length; j++) {

                    depth = depthN; // 将执行的层级赋值 到 全局层级

                    arr[depthN] = (childrenData[j].id);
                    
                    if (childrenData[j].id == key) {

                        // returnArr = arr; // 原写法不行, 因 此赋值存在指针关系
                        returnArr = arr.slice(0, depthN+1); //将目前匹配的数组，截断并保存到结果数组，
                        break

                    } else {

                        if (childrenData[j].children) {

                            depth ++;
                            childrenEach(childrenData[j].children, depth);

                        }
                    }

                }
                return returnArr;
            }
            return childrenEach(treeData, depth);
        }
    }
}
</script>
<style scoped>
</style>