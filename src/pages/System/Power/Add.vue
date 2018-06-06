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
            <el-form-item label="功能名称：" prop="module_name">
                <el-input v-model="form.module_name"></el-input>
            </el-form-item>
            <el-form-item label="功能编号：" prop="module_code">
                <el-input v-model="form.module_code"></el-input>
            </el-form-item>
            <el-form-item label="排序：" prop="sort_order">
                <el-input v-model="form.sort_order" type="number"></el-input>
            </el-form-item>
            <el-form-item label="模块图标：" prop="img_path">
                <el-input v-model="form.img_path">
                    <template slot="append">
                        <a href="/static/font/ElWebIcon/demo_fontclass.html" target="_blank" style="color:#409EFF">图标库</a>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="模块路径：" prop="location">
                <el-input v-model="form.location"></el-input>
            </el-form-item>
            <el-form-item label="是否显示：">
                <el-switch v-model="form.is_show" active-value="1" inactive-value="0"></el-switch>
            </el-form-item>
            <el-form-item label="是否认证：">
                <el-switch v-model="form.authen_type" active-value="1" inactive-value="0"></el-switch>
            </el-form-item>
            <el-form-item label="是否启用：">
                <el-switch v-model="form.status" active-value="1" inactive-value="0"></el-switch>
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
                parent_id: '', // 父级标识
                module_name: '', // 模块名称
                module_code: '', // 模块代码
                module_type: 0, // 模块类型，0、公有模块，1：WEB端模块，2：APP端模块
                sort_order: '', // 模块排序
                img_path: 'el-icon', // 模块图标路径
                location: '/', // 跳转链接
                status: '1', // 模块状态，0、停用，1、启用
                authen_type: '1', // 认证类型(0不控制1授权功能)
                is_show: '1', // 是否显示，1、显示，0、不显示
            },
            form_rules: {
                module_name: [
                    { required: true, message: '请输入模块名称', trigger: 'blur' }
                ],
                module_code: [
                    { required: true, message: '请输入模块编号', trigger: 'blur' }
                ],
                sort_order: [
                    { required: true, message: '模块排序不能为空', trigger: 'blur' }
                ],
                img_path: [
                    { required: true, message: '模块图标不能为空', trigger: 'blur' }
                ],
                location: [
                    { required: true, message: '模块路径不能为空', trigger: 'blur' }
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
            this.$https.get('/api/company_role/list_module?status=1&parent_id=0').then((result) => {
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

            this.$https.get('/api/company_role/get_moduledetails?module_id=' + this.id).then((result) => {
                if (result.data.code == 0) {
                    let _data = result.data.data;

                    this.form.parent_id = _data.parent_id == 0 ? '' : _data.parent_id;
                    this.optionsValue = this.getTreeDeepArr(this.form.parent_id, this.options);
            
                    this.form.module_name = _data.module_name;
                    this.form.module_code = _data.module_code;
                    this.form.sort_order = _data.sort_order;
                    this.form.img_path = _data.img_path;
                    this.form.location = _data.location;
                    this.form.status = _data.status.toString();
                    this.form.is_show = (_data.is_show ? '1' : '0');
                    this.form.authen_type = _data.authen_type.toString();

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
                    _postData.parent_id = ((!this.form.parent_id || this.form.parent_id == '') ? 0 : this.form.parent_id);
                    _postData.is_show = Number(_postData.is_show);
                    _postData.authen_type = Number(_postData.authen_type);
                    
                    _postData.status = Number(_postData.status);
                    
                    if (this.id) { // 编辑
                        _postData.module_id = parseInt(this.id);
                        this.$https.post('/api/company_role/update_module', _postData).then((result) => {
                            if (result.data.code == 0) {
                                this.$message({
                                    type: 'success',
                                    showClose: true,
                                    message: '编辑成功',
                                    duration: 1500,
                                    onClose: () => {
                                        // 关闭当前dialog，
                                        this.closeDialog('dialogPowerEdit');
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

                        this.$https.post('/api/company_role/create_module', _postData).then((result) => {
                            if (result.data.code == 0) {
                                this.$message({
                                    type: 'success',
                                    showClose: true,
                                    message: '添加成功',
                                    duration: 1500,
                                    onClose: () => {
                                        // 关闭当前dialog，
                                        this.closeDialog('dialogPowerAdd');
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
                this.$emit('closeDialog', 'dialogPowerAdd'); // 执行父组件关闭方法
                this.$emit('closeDialog', 'dialogPowerEdit'); // 执行父组件关闭方法
            } else {
                this.$emit('closeDialog', name); // 执行父组件关闭方法
            }
        },
        cascaderChange(value) {
            this.form.parent_id = value[value.length-1];
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