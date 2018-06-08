<template>
    <div>
        <el-form ref="form" status-icon :rules="form_rules" :model="form" label-width="120px">
            <el-form-item label="所属部门" prop="org_id">
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

            <el-row>
                <el-col :span="12">
                    <el-form-item label="账号" prop="user_account">
                        <el-input v-model="form.user_account" :disabled="id !== undefined"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="手机号" prop="user_telephone">
                        <el-input v-model="form.user_telephone"></el-input>
                    </el-form-item>
                </el-col>

            </el-row>
            <el-row>
                <el-col :span="12" v-if="!id">
                    <el-form-item label="登录密码" prop="user_pwd">
                        <el-input v-model="form.user_pwd"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="姓名" prop="user_name">
                        <el-input v-model="form.user_name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="工号">
                        <el-input v-model="form.job_number"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="工作照">
                        <PhotoUploader
                            :files.sync="form.user_img">
                        </PhotoUploader>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="所属职位" prop="position_id">
                        <el-select v-model="form.position_id" no-data-text="该组织下尚未配置职位">
                            <el-option v-for="item in positions" :key="item.id" :label="item.position_name" :value="String(item.id)">{{item.position_name}}</el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="电子邮箱">
                        <el-input v-model="form.user_email"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="备注：">
                        <el-input type="textarea" v-model="form.user_desc" :rows="3"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            
            <el-form-item>
                <el-button type="primary" @click="submit()">保存</el-button>
                <el-button @click="closeDialog()">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import PhotoUploader from '@/components/uploader/PhotoUploader'
export default {
    components: {
        PhotoUploader
    },
    data () {
        return {
            form: {
                org_id: null, // 组织
                user_account: '', // 用户账号
                user_telephone: '', // 用户手机号
                user_pwd: '', // 用户密码
                user_name: '', // 用户姓名
                job_number: '', // 用户工号
                user_img: '', // 工作照
                position_id: '', // 所属职位
                user_email: '', // 电子邮箱
                user_desc: '' // 用户备注
            },
            form_rules: {
                org_id: [
                    { required: true, message: '请选择所属组织', trigger: 'change' }
                ],
                user_account: [
                    { required: true, message: '请输入用户账号', trigger: 'blur' }
                ],
                user_telephone: [
                    { required: true, message: '请输入用户手机号', trigger: 'blur' }
                ],
                user_pwd: [
                    { required: true, message: '请输入用户登录密码', trigger: 'blur' },
                    { min: 6, message: '长度不少于6位', trigger: 'blur' }
                ],
                user_name: [
                    { required: true, message: '请输入用户姓名', trigger: 'blur' }
                ],
                position_id: [
                    { required: true, message: '请选择所属职位', trigger: 'change' }
                ],
                user_desc: [
                    { required: true, message: '请输入用户备注', trigger: 'blur' }
                ]
            },
            optionsValue: [],
            options: [],
            optionsProps: {
                value: 'id',
                label: 'text',
                children: 'children'
            },
            positions: [] // 部门下的职位
        }
    },
    props: {
        id: {
            type: Number
        },
        pid: {
            type: [Number, String]
        }
    },
    created() {
        console.log(this.id)
        this.getDataTree();
    },
    computed: {
    },
    watch: {
        // 错误写法，箭头函数会影响作用域
        // 'form.org_id': (val) => {
        //     console.log(val);
        //     this.getPositions(val); // 监听到变化就更新职位列表
        // },
        'form.org_id': function(val) {
            this.getPositions(val); // 监听到变化就更新职位列表
        }
        // 另一种正确写法
        // 'form.org_id' (val) {
        //     console.log(val);
        //     this.getPositions(val); // 监听到变化就更新职位列表
        // }
    },
    methods: {
        getPositions(id) { // 根据组织id获取职位数据
            this.$https.get('/api/company_user_unit_position/page', {
                params: {
                    currentPage: 1,
                    pageSize: 999,
                    unit_id: id
                }
            }).then((result) => {
                if (result.data.code == 0) {
                    this.positions = result.data.data.Items;
                } else {
                    this.$message({
                        type: 'error',
                        showClose: true,
                        message: result.data.message
                    })
                }
            })
        },
        getDataTree() { // 获取树结构
            this.$https.get('/api/company_unit/GetUnitsTree').then((result) => {
                if (result.data.code == 0) {
                    this.options = result.data.data;
                    
                    if (this.pid && this.pid != 0) { // 新增时，取左侧已选类别
                        this.form.org_id = this.pid;
                        this.optionsValue = this.getTreeDeepArr(this.pid, this.options);
                    }
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

            this.$https.get('/api/Account/get_users_details?user_id=' + this.id).then((result) => {
                if (result.data.code == 0) {
                    let _data = result.data.data;
                    this.form.org_id = _data.org_id;
                    this.optionsValue = this.getTreeDeepArr(_data.org_id, this.options);
            
                    this.form.user_account = _data.user_account;
                    this.form.user_telephone = _data.user_telephone;

                    this.form.user_name = _data.user_name;
                    this.form.job_number = _data.job_number;
                    this.form.user_img = _data.user_img;
                    this.form.position_id = _data.position_id == 0 ? '' : _data.position_id.toString();
                    this.form.user_email = _data.user_email;
                    this.form.user_desc = _data.user_desc;
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
                    let _postData = this.form;
                    if (this.id) { // 编辑
                        _postData.user_id = parseInt(this.id);
                        this.$https.post('/api/Account/update_users', _postData).then((result) => {
                            if (result.data.code == 0) {
                                this.$message({
                                    type: 'success',
                                    showClose: true,
                                    message: '编辑成功',
                                    duration: 1500,
                                    onClose: () => {
                                        // 关闭当前dialog，
                                        this.closeDialog('dialogUserEdit');
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

                        this.$https.post('/api/Account/create_users', _postData).then((result) => {
                            if (result.data.code == 0) {
                                this.$message({
                                    type: 'success',
                                    showClose: true,
                                    message: '添加成功',
                                    duration: 1500,
                                    onClose: () => {
                                        // 关闭当前dialog，
                                        this.closeDialog('dialogUserAdd');
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
                this.$emit('closeDialog', 'dialogUserAdd'); // 执行父组件关闭方法
                this.$emit('closeDialog', 'dialogUserEdit'); // 执行父组件关闭方法
            } else {
                this.$emit('closeDialog', name); // 执行父组件关闭方法
            }
        },
        cascaderChange(value) {
            this.form.org_id = value[value.length-1];
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