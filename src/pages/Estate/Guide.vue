<template>
    <div>
        <el-card>
            <div slot="header" class="clearfix">
                <span>房产向导</span>
            </div>
            <el-steps :active="step" simple finish-status="wait" process-status="finish">
                <el-step title="新增项目(房产)" icon="el-icon-web-1"></el-step>
                <el-step title="新增楼宇" icon="el-icon-web-2"></el-step>
                <el-step title="楼层信息" icon="el-icon-web-3"></el-step>
                <el-step title="房间信息" icon="el-icon-web-4"></el-step>
            </el-steps>
            <el-form ref="project_form" :model="project_form" status-icon :rules="project_rules" label-width="100px" v-if="step === 0">
                <h3 class="form_title">输入房产的基本信息</h3>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="项目编码" prop="project_code">
                            <el-input v-model="project_form.project_code"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="项目名称" prop="project_name">
                            <el-input v-model="project_form.project_name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="楼宇数量" prop="building_amount">
                            <el-input v-model="project_form.building_amount"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item>
                    <el-button type="primary" @click="project_save()">完成</el-button>
                    <el-button @click="project_next()">保存并下一步</el-button>
                </el-form-item>
            </el-form>
            <div v-if="step === 1">
                <el-form ref="building_form" :rules="building_rules" :inline="true" :model="building_form">
                    <h3 class="form_title">配置楼宇信息</h3>

                    <el-row>
                        <el-col :span="12">
                            
                            <el-form-item label="楼宇数量：">
                                <span>{{ project_form.building_amount }}</span>
                            </el-form-item>
                            <el-form-item label="楼层数量：" prop="floor_amount">
                                <el-input v-model="building_form.floor_amount" style="width: 100px"></el-input>
                            </el-form-item>
                            <el-form-item>
                                 提示：楼宇名称或楼层数量为空的记录将不能被保存！
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" class="text-right">
                            <el-form-item label="编码格式：">
                                <el-select v-model="building_form.building_bmgs">
                                    <el-option label="B-1,B-2...B-99" value="A"></el-option>
                                    <el-option label="001,002...0099" value="B"></el-option>
                                    <el-option label="W-1,W-2...W-99" value="C"></el-option>
                                    <el-option label="G-1,G-2...G-99" value="D"></el-option>
                                    <el-option label="1,2...999" value="E"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="楼宇名称：">
                                <el-select v-model="building_form.building_lymc">
                                    <el-option label="第1栋,第2栋...第99栋" value="A"></el-option>
                                    <el-option label="1号楼,2号楼...99号楼" value="B"></el-option>
                                    <el-option label="1号仓,2号仓...99号仓" value="C"></el-option>
                                    <el-option label="1号库,2号库...99号库" value="D"></el-option>
                                    <el-option label="1号厂房,2号厂房...99号厂房" value="E"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <el-table :data="building_Table" style="width: 100%">
                    <el-table-column prop="id" label="序号"></el-table-column>
                    <el-table-column prop="building_code" label="楼宇编码" width="180"></el-table-column>
                    <el-table-column prop="building_name" label="楼宇名称"></el-table-column>
                    <el-table-column prop="floor_amount" label="楼层数量"></el-table-column>
                    <el-table-column prop="capped" label="封顶日期"></el-table-column>
                    <el-table-column prop="completion" label="竣工日期"></el-table-column>
                    <el-table-column prop="presale_permit" label="预售许可证"></el-table-column>
                    <el-table-column prop="building_permit" label="建筑许可证"></el-table-column>
                    <el-table-column prop="building_area" label="建筑面积"></el-table-column>
                    <el-table-column prop="usable_area" label="使用面积"></el-table-column>
                    <el-table-column prop="remark" label="备注"></el-table-column>
                </el-table>
                <div class="m-t">
                    <el-button type="primary" @click="building_save()">完成</el-button>
                    <el-button @click="building_next()">保存并下一步</el-button>
                </div>
            </div>
            <div v-if="step === 2">
                <el-form ref="floor_form" :inline="true" :model="floor_form">
                    <h3 class="form_title">配置楼层信息</h3>

                    <el-row>
                        <el-col :span="12">
                            
                            <el-form-item label="楼层数量：">
                                <span>{{ building_form.floor_amount }}</span>
                            </el-form-item>
                            <el-form-item label="开始房号：">
                                <el-input v-model="floor_form.room_start" style="width: 100px"></el-input>
                            </el-form-item>
                            <el-form-item label="结束房号：">
                                <el-input v-model="floor_form.room_end" style="width: 100px"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" class="text-right">
                            <el-form-item label="编码格式：">
                                <el-select v-model="floor_form.floor_bmgs">
                                    <el-option label="F-1,F-2...F-9" value="A"></el-option>
                                    <el-option label="001,002...009" value="B"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="楼层名称：">
                                <el-select v-model="floor_form.floor_lcmc">
                                    <el-option label="第1层,第2层...第99层" value="A"></el-option>
                                    <el-option label="1楼,2楼...99楼" value="B"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <el-table :data="floor_Table" style="width: 100%">
                    <el-table-column prop="id" label="序号"></el-table-column>

                    <el-table-column prop="building_code" label="楼宇编码"></el-table-column>
                    <el-table-column prop="floor_code" label="楼层编码" width="180"></el-table-column>
                    <el-table-column prop="floor_name" label="楼层名称"></el-table-column>
                    <el-table-column prop="room_start" label="开始房号"></el-table-column>
                    <el-table-column prop="room_end" label="结束房号"></el-table-column>
                    <el-table-column prop="remark" label="备注"></el-table-column>
                </el-table>
                <div class="m-t">
                    <el-button type="primary" @click="floor_save()">完成</el-button>
                    <el-button @click="floor_next()">保存并下一步</el-button>
                </div>
            </div>
            <div v-if="step === 3">
                <el-form ref="room_form" :inline="true" :model="room_form">
                    <h3 class="form_title">配置房间信息</h3>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="选择楼宇：">
                                <el-select v-model="room_form.buildingIds">
                                    <el-option label="F-1,F-2...F-9" value="A"></el-option>
                                    <el-option label="001,002...009" value="B"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="选择楼层：">
                                <el-select v-model="room_form.floorIds">
                                    <el-option label="F-1,F-2...F-9" value="A"></el-option>
                                    <el-option label="001,002...009" value="B"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="建筑面积：">
                                <el-input v-model="room_form.built_area" style="width: 100px"></el-input>
                            </el-form-item>
                            <el-form-item label="使用面积：">
                                <el-input v-model="room_form.usable_area" style="width: 100px"></el-input>
                            </el-form-item>
                            <el-form-item label="房间功能：">
                                <el-select v-model="room_form.room_feature">
                                    <el-option label="商业住房" value="商业住房"></el-option>
                                    <el-option label="居住住房" value="居住住房"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="指导单价(元/平米)：">
                                <el-input v-model="room_form.price" style="width: 100px"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <el-table :data="room_Table" style="width: 100%">
                    <el-table-column prop="id" label="序号"></el-table-column>
                    <el-table-column prop="building_code" label="楼层数"></el-table-column>
                    <el-table-column prop="floor_code" label="房间编码" width="180"></el-table-column>
                    <el-table-column prop="floor_name" label="房间名称"></el-table-column>
                    <el-table-column prop="room_start" label="建筑面积(平米)"></el-table-column>
                    <el-table-column prop="room_end" label="使用面积(平米)"></el-table-column>
                    <el-table-column prop="room_feature" label="房间功能"></el-table-column>
                    <el-table-column prop="price" label="指导单价(元/平米)"></el-table-column>
                    <el-table-column prop="remark" label="备注"></el-table-column>
                </el-table>
                <div class="m-t">
                    <el-button type="primary" @click="room_save()">完成</el-button>
                    <el-button @click="room_next()">保存并下一步</el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    components: {
    },
    data () {
        var checkAmount = (rule, value, callback) => {
            setTimeout(() => {
                var isInteger = /^[1-9]\d*$/;
                console.log(isInteger.test(value))
                if (!isInteger.test(value)) {
                    callback(new Error('请输入正整数'));
                } else {
                    callback();
                }
            },1000);
        };
        return {
            step: 0, // 步骤
            project_form: {
                project_code: '',
                project_name: '',
                building_amount: ''
            },
            project_rules: {
                project_code: [
                    { required: true, message: '请填写', trigger: 'blur' }
                ],
                project_name: [
                    { required: true, message: '请填写', trigger: 'blur' }
                ],
                building_amount: [
                    { required: true, message: '请填写', trigger: 'blur' },
                    { validator: checkAmount, trigger: 'blur' }
                ]
            },
            building_form: {
                floor_amount: 1,
                building_bmgs: 'A',
                building_lymc: 'A'
            },
            building_rules: {
                floor_amount: [
                    { required: true, message: '请填写', trigger: 'blur' }
                ]
            },
            building_Table: [],
            floor_form: {
                room_start: 1,
                room_end: 1,
                floor_bmgs: 'A',
                floor_lcmc: 'A'
            },
            floor_Table: [],
            room_form: {
                buildingIds: '',
                floorIds: 1,
                built_area: 0,
                usable_area: 0,
                room_feature: ''
            },
            room_Table: []
        }
    },
    watch: {
        building_form: {
            handler(newVal, oldVal) {
                this.building_init();
            },
            deep: true
        },
        floor_form: {
            handler(newVal, oldVal) {
                this.floor_init();
            },
            deep: true
        }
    },
    methods: {
        project_save() { // 关闭当前步骤，到第一，刷新页面
            this.$refs['project_form'].validate((valid) => {
                if (valid) {
                    this.step = 0;
                    this.project_submit();
                    this.$message({
                        message: '成功创建项目',
                        type: 'success',
                        onClose: () => {
                            window.location.reload();
                        }
                    });
                    
                } else {
                    console.error('验证不通过');
                    return false;
                }
            })
        },
        project_next() { // 保存并下一步
            this.$refs['project_form'].validate((valid) => {
                if (valid) {
                    this.step = 1;
                    this.project_submit();
                    this.building_init(); // 执行 building_init
                    this.$message({
                        message: '成功创建项目',
                        type: 'success',
                        onClose: () => {
                        }
                    });
                    
                } else {
                    console.error('验证不通过');
                    return false;
                }
            })
        },
        project_submit() {
            console.log('第一步ajax方法处');
        },
        building_init() { // 第二步初始化
            var table_item = [];
            for (var i = 0; i < this.project_form.building_amount; i++) {
                table_item[i] = {
                    id: i + 1,
                    building_code: '',
                    building_name: '',
                    floor_amount: this.building_form.floor_amount,
                    capped: this.getNewDay(),
                    completion: this.getNewDay(),
                    presale_permit: '',
                    building_permit: '',
                    building_area: '0.00',
                    usable_area: '0.00',
                    remark: ''
                }
                switch (this.building_form.building_bmgs) { // 楼宇编码
                    case 'A':
                        table_item[i].building_code = 'B-' + (i + 1);
                        break;
                    case 'B':
                        table_item[i].building_code = '00' + (i + 1);
                        break;
                    case 'C':
                        table_item[i].building_code = 'W-' + (i + 1);
                        break;
                    case 'D':
                        table_item[i].building_code = 'G-' + (i + 1);
                        break;
                    case 'E':
                        table_item[i].building_code = '' + (i + 1);
                        break;
                }
                switch (this.building_form.building_lymc) {
                    case 'A': 
                        table_item[i].building_name = '第' + (i + 1) + '栋'; // 楼宇名称
                        break;
                    case 'B':
                        table_item[i].building_name = (i + 1) + '号楼'; // 楼宇名称
                        break;
                    case 'C':
                        table_item[i].building_name = (i + 1) + '号仓'; // 楼宇名称
                        break;
                    case 'D':
                        table_item[i].building_name = (i + 1) + '号库'; // 楼宇名称
                        break;
                    case 'E':
                        table_item[i].building_name = (i + 1) + '号厂房'; // 楼宇名称
                        break;
                }
            }
            this.building_Table = table_item;
        },
        building_save() { // 关闭当前步骤，到第一，刷新页面
            this.$refs['building_form'].validate((valid) => {
                if (valid) {
                    this.step = 0;
                    this.building_submit();
                    this.$message({
                        message: '成功创建楼宇',
                        type: 'success',
                        onClose: () => {
                            window.location.reload();
                        }
                    });
                    
                } else {
                    console.error('验证不通过');
                    return false;
                }
            })
        },
        building_next() { // 保存并下一步
            this.$refs['building_form'].validate((valid) => {
                if (valid) {
                    this.step = 2;
                    this.building_submit();
                    this.floor_init(); // 执行 floor_init
                    this.$message({
                        message: '成功创建楼宇',
                        type: 'success',
                        onClose: () => {
                        }
                    });
                    
                } else {
                    console.error('验证不通过');
                    return false;
                }
            })
        },
        building_submit() {
            console.log('第二步ajax方法处');
        },
        floor_init() {
            var table_item = [];
            for (var i = 0; i < this.project_form.building_amount; i++) {
                for (var j = 0; j < this.building_form.floor_amount; j++) {

                    table_item[i * this.building_form.floor_amount + j] = {
                        id: i * this.building_form.floor_amount + j + 1,
                        building_code: this.building_Table[i].building_code, // 楼宇编码
                        floor_code: '', // 楼层编码
                        floor_name: '', // 楼层名称
                        floor_start: 1, // 开始楼层
                        floor_end: this.building_form.floor_amount, // 结束楼层
                        room_start: this.floor_form.room_start, // 开始房号
                        room_end: this.floor_form.room_end, // 结束房号
                        remark: "" // 备注
                    }

                    switch (this.floor_form.floor_bmgs) { // 楼宇编码
                        case 'A':
                            table_item[i * this.building_form.floor_amount + j].floor_code = 'F-' + (j + 1);
                            break;
                        case 'B':
                            table_item[i * this.building_form.floor_amount + j].floor_code = '00' + (j + 1);
                            break;
                    }
                    switch (this.floor_form.floor_lcmc) {
                        case 'A': 
                            table_item[i * this.building_form.floor_amount + j].floor_name = '第' + (j + 1) + '层'; // 楼宇名称
                            break;
                        case 'B':
                            table_item[i * this.building_form.floor_amount + j].floor_name = (j + 1) + '楼'; // 楼宇名称
                            break;
                    }
                }
            }
            console.log(table_item);
            this.floor_Table = table_item;
        },
        floor_save() { // 关闭当前步骤，到第一，刷新页面
            this.$refs['floor_form'].validate((valid) => {
                if (valid) {
                    this.step = 0;
                    this.floor_submit();
                    this.$message({
                        message: '成功创建楼层',
                        type: 'success',
                        onClose: () => {
                            window.location.reload();
                        }
                    });
                    
                } else {
                    console.error('验证不通过');
                    return false;
                }
            })
        },
        floor_next() { // 保存并下一步
            this.$refs['floor_form'].validate((valid) => {
                if (valid) {
                    this.step = 3;
                    this.floor_submit();
                    this.room_init(); // 执行 floor_init
                    this.$message({
                        message: '成功创建楼层',
                        type: 'success',
                        onClose: () => {
                        }
                    });
                    
                } else {
                    console.error('验证不通过');
                    return false;
                }
            })
        },
        floor_submit() {
            console.log('第三步ajax方法处');
        },
        room_init() {
            var roomNum = Number(this.floor_form.room_end) - Number(this.floor_form.room_start);

            var table_item = [];
            for (var i = this.floor_form.room_start; i <= this.floor_form.room_end; i++) {

                table_item[i] = {
                    id: i - this.floor_form.room_start + 1,
                    floor_num: this.room_form.floorIds, // 楼层数量
                    room_code: this.room_form.floorIds + '0' + i, // 房间编码
                    room_name: this.room_form.floorIds + '0' + i + '房', // 房间名称
                    built_area: this.room_form.built_area, // 兼职面积
                    usable_area: this.room_form.usable_area, // 使用面积
                    room_feature: this.room_form.room_feature, // 房间功能
                    price: this.room_form.price, // 单价
                    remark: "" // 备注
                }
            }
            this.room_Table = table_item;
        },
        getNewDay() { // 返回当天 如： 2018-08-08
            var now = new Date();
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            var day = now.getDate();
            return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
        }
    },
    computed: {
    }
}
</script>

<style scoped>
    .form_title {
        display: inline-block;
        margin-top: 30px;
        margin-bottom: 30px;
        color: #666;
        font-weight: normal;
        padding-left: 5px;
        border-left: 2px solid #4E97D9;
        line-height: 1.2;
    }
    .gray_bg {
        background: #ccc;
    }
</style>
