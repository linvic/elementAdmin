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
                            <el-input v-model="project_form.building_amount" @keyup.native="onkeyupPlusInt($event)"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item>
                    <el-button type="primary" @click="project_submit('save')">完成</el-button>
                    <el-button @click="project_submit('next')">保存并下一步</el-button>
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
                                <el-input v-model="building_form.floor_amount" @keyup.native="onkeyupPlusInt($event)" style="width: 100px"></el-input>
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
                    <el-table-column prop="building_name" label="楼宇证件名称"></el-table-column>
                    <el-table-column prop="building_alias_name" label="楼宇运营名称"></el-table-column>
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
                    <el-button type="primary" @click="building_submit('save')">完成</el-button>
                    <el-button @click="building_submit('next')">保存并下一步</el-button>
                </div>
            </div>
            <div v-if="step === 2">
                <el-form ref="floor_form" :rules="floor_rules" :inline="true" :model="floor_form">
                    <h3 class="form_title">配置楼层信息</h3>

                    <el-row>
                        <el-col :span="12">
                            
                            <el-form-item label="楼层数量：">
                                <span>{{ building_form.floor_amount }}</span>
                            </el-form-item>
                            <el-form-item label="开始房号：" prop="room_start">
                                <el-input v-model="floor_form.room_start" @keyup.native="onkeyupPlusInt($event)" style="width: 100px"></el-input>
                            </el-form-item>
                            <el-form-item label="结束房号：" prop="room_end">
                                <el-input v-model="floor_form.room_end" @keyup.native="onkeyupPlusInt($event)" style="width: 100px"></el-input>
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
                    <el-button type="primary" @click="floor_submit('save')">完成</el-button>
                    <el-button @click="floor_submit('next')">保存并下一步</el-button>
                </div>
            </div>
            <div v-if="step === 3">
                <el-form ref="room_form" :rules="room_rules" :inline="true" :model="room_form">
                    <h3 class="form_title">配置房间信息</h3>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="选择楼宇：">
                                <el-select v-model="room_form.buildingIds" @change="GetFloorsTree(room_form.buildingIds)">
                                    <el-option v-for="item in buildingId" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="选择楼层：">
                                <el-select v-model="room_form.floorIds">
                                    <el-option v-for="(item, index) in floorId" :key="item.id" :label="item.text" :value="index+1"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="建筑面积：" prop="built_area">
                                <el-input v-model="room_form.built_area" @keyup.native="onkeyupPrice($event)" style="width: 100px"></el-input>
                            </el-form-item>
                            <el-form-item label="使用面积：" prop="usable_area">
                                <el-input v-model="room_form.usable_area" @keyup.native="onkeyupPrice($event)" style="width: 100px"></el-input>
                            </el-form-item>
                            <el-form-item label="房间功能：" prop="room_feature">
                                <el-select v-model="room_form.room_feature">
                                    <el-option v-for="item in estate_roomfunc" :key="item.value_id" :label="item.value_name" :value="item.value_id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="指导单价(元/平米)：" prop="guide_price">
                                <el-input v-model="room_form.guide_price" @keyup.native="onkeyupPrice($event)" style="width: 100px"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <el-table :data="room_Table" style="width: 100%">
                    <el-table-column prop="id" label="序号"></el-table-column>
                    <el-table-column prop="floor_num" label="楼层数"></el-table-column>
                    <el-table-column prop="room_code" label="房间编码" width="180"></el-table-column>
                    <el-table-column prop="room_name" label="房间名称"></el-table-column>
                    <el-table-column prop="built_area" label="建筑面积(平米)"></el-table-column>
                    <el-table-column prop="usable_area" label="使用面积(平米)"></el-table-column>
                    <el-table-column prop="room_feature" label="房间功能"></el-table-column>
                    <el-table-column prop="guide_price" label="指导单价(元/平米)"></el-table-column>
                    <el-table-column prop="remark" label="备注"></el-table-column>
                </el-table>
                <div class="m-t">
                    <el-button type="primary" @click="room_submit()">完成向导</el-button>
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
        return {
            step: 0, // 步骤
            project_id: 0, // 项目ID
            buildingId: [], // 楼宇ID
            floorId: [], // 楼层ID
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
                    { required: true, message: '请填写', trigger: 'blur' }
                ]
            },
            building_form: {
                floor_amount: '',
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
            floor_rules: {
                room_start: [
                    { required: true, message: '请填写', trigger: 'blur' }
                ],
                room_end: [
                    { required: true, message: '请填写', trigger: 'blur' }
                ]
            },
            floor_Table: [],
            estate_roomfunc: [],
            room_form: {
                buildingIds: '',
                floorIds: '',
                built_area: 0,
                usable_area: 0,
                room_feature: '',
                guide_price: ''
            },
            room_rules: {
                built_area: [
                    { required: true, message: '请填写', trigger: 'blur' }
                ],
                usable_area: [
                    { required: true, message: '请填写', trigger: 'blur' }
                ],
                room_feature: [
                    { required: true, message: '请选择', trigger: 'change' }
                ],
                guide_price: [
                    { required: true, message: '请填写', trigger: 'blur' }
                ]
            },
            room_Table: [],
            floorsObj: []
        }
    },
    created() {
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
        },
        room_form: {
            handler(newVal, oldVal) {
                this.roomList_init();
            },
            deep: true
        }
    },
    methods: {
        project_submit(_submitType) {
            
            this.$refs['project_form'].validate((valid) => {
                if (valid) {

                    let _postData = {
                        project_code: this.project_form.project_code, // 项目编码
                        project_name: this.project_form.project_name, // 项目名称
                        building_amount: this.project_form.building_amount, // 楼宇数量
                        total_area: 0, // 占地面积
                        built_area: 0, // 建筑面积
                        green_space: 0, // 绿地面积
                        road_space: 0, // 道路面积
                        charge: "", // 负责人
                        project_addr: "", // 项目地址
                        dev_company: "", // 开发商 公司名称
                        dev_legal: "", // 开发商 法人代表
                        dev_contact: "", // 开发商 联系人
                        dev_mobile: "", // 开发商 联系电话
                        dev_addr: "", // 开发商 联系地址
                        remark: "", // 开发商 备注
                    }
                    this.$https.post('/api/pms_base_projects/AppendProject', _postData).then((result) => {
                        if (result.data.code == 0) {
                            if (_submitType == 'save') {
                                // 关闭当前步骤，刷新页面
                                this.$message({
                                    type: 'success',
                                    showClose: true,
                                    message: '成功创建项目!',
                                    duration: 1500,
                                    onClose: () => {
                                        window.location.reload();
                                    }
                                })
                            } else {
                                // 保存并下一步
                                this.project_id = result.data.data; // 保存创建的项目ID
                                this.$message({
                                    type: 'success',
                                    showClose: true,
                                    message: '成功创建项目，您将继续新增楼宇信息',
                                    duration: 1500
                                })
                                this.step = 1;
                                this.building_init(); // 执行 building_init
                                }
                        } else {
                            this.$message({
                                type: 'error',
                                showClose: true,
                                message: result.data.message
                            })
                        }
                    })
                    
                } else {
                    console.error('验证不通过');
                    return false;
                }
            })
        },
        building_init() { // 第二步初始化
            var table_item = [];
            for (var i = 0; i < this.project_form.building_amount; i++) {
                table_item[i] = {
                    id: i + 1,
                    building_code: '', // 楼宇编码
                    building_name: '', // 楼宇证件名称
                    building_alias_name: '', // 楼宇运营名称
                    floor_amount: this.building_form.floor_amount, // 楼层数量
                    building_function: 0, // 楼宇功能
                    building_structure: 0, // 结构类别
                    building_decoration: 0, // 装修标准
                    building_damage: 0, // 完损等级
                    capped: this.getNewDay(), // 预售许可证日期
                    completion: this.getNewDay(), // 竣工日期
                    presale_permit: '', // 预售许可证
                    building_permit: '', // 建筑许可证
                    building_area: 0, // 建筑面积
                    public_area: 0, // 公摊面积
                    usable_area: 0, // 使用面积
                    remark: '' // 备注
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
                table_item[i].building_alias_name = table_item[i].building_name;
            }
            this.building_Table = table_item;
        },
        building_submit(_submitType) {

            this.$refs['building_form'].validate((valid) => {
                if (valid) {

                    let _postData = {
                        project_id: this.project_id, // 项目ID
                        buildings: this.building_Table, // 项目名称
                    }
                    this.$https.post('/api/pms_base_buildings/AppendBuilding', _postData).then((result) => {
                        if (result.data.code == 0) {
                            if (_submitType == 'save') {
                                // 关闭当前步骤，到第一，刷新页面
                                this.$message({
                                    type: 'success',
                                    showClose: true,
                                    message: '成功创建楼宇!',
                                    duration: 1500,
                                    onClose: () => {
                                        this.step = 1;
                                        window.location.reload();
                                    }
                                })
                            } else {
                                // 保存并下一步
                                this.$message({
                                    type: 'success',
                                    showClose: true,
                                    message: '成功创建楼宇，您将继续新增楼层信息',
                                    duration: 1500
                                })
                                this.step = 2;
                                this.floor_init(); // 执行 floor_init
                                }
                        } else {
                            this.$message({
                                type: 'error',
                                showClose: true,
                                message: result.data.message
                            })
                        }
                    })
                    
                } else {
                    console.error('验证不通过');
                    return false;
                }
            })
        },
        floor_init() {
            this.$https.get('/api/pms_base_buildings/GetBuildingsTree?project_id=' + this.project_id).then((result) => {
                if (result.data.code == 0) {
                    let _data = result.data.data;
                    for (var k = 0; k < _data.length; k++) {
                        this.buildingId[k] = {
                            id: _data[k].id,
                            name: _data[k].text
                        }
                    }

                    var table_item = [];
                    for (var i = 0; i < this.project_form.building_amount; i++) {
                        for (var j = 0; j < this.building_form.floor_amount; j++) {

                            table_item[i * this.building_form.floor_amount + j] = {
                                id: i * this.building_form.floor_amount + j + 1,
                                building_id: this.buildingId[i].id, // 项目Id
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
                    this.floor_Table = table_item;

                } else {
                    this.$message({
                        type: 'error',
                        showClose: true,
                        message: result.data.message
                    })
                }
            })
        },
        floor_submit(_submitType) {
            
            this.$refs['floor_form'].validate((valid) => {
                if (valid) {

                    let _postData = {
                        project_id: this.project_id, // 项目ID
                        floors: this.floor_Table, // 
                    }
                    this.$https.post('/api/pms_base_floors/UpdateFloor', _postData).then((result) => {
                        if (result.data.code == 0) {
                            if (_submitType == 'save') {
                                // 关闭当前步骤，到第一，刷新页面
                                this.$message({
                                    type: 'success',
                                    showClose: true,
                                    message: '成功创建楼层!',
                                    duration: 1500,
                                    onClose: () => {
                                        this.step = 1;
                                        window.location.reload();
                                    }
                                })
                            } else {
                                // 保存并下一步
                                this.$message({
                                    type: 'success',
                                    showClose: true,
                                    message: '成功创建楼层，您将继续新增房间信息',
                                    duration: 1500
                                })
                                this.step = 3;
                                this.room_init(); // 执行 room_init
                                }
                        } else {
                            this.$message({
                                type: 'error',
                                showClose: true,
                                message: result.data.message
                            })
                        }
                    })
                    
                } else {
                    console.error('验证不通过');
                    return false;
                }
            })
        },
        room_init() {
            // 获取数据 - 提交需要用到
            for (var j = 0; j < this.project_form.building_amount; j++) { // 遍历楼宇
                this._getFloorsTree(j);
            }
            var _this = this;
            // 获取字典 - 房产 - 房间功能
            this.$https.get('/api/Dicts/GetValues?type_code=pms_type_roomfunc').then((result) => {
                if (result.data.code == 0) {
                    this.estate_roomfunc = result.data.data;
                    // 设置字典默认值
                    for (var item of this.estate_roomfunc) {
                        if (item.is_default === 1) {
                            this.room_form.room_feature = item.value_id;
                        }
                    }
                } else {
                    this.$message({
                        type: 'error',
                        showClose: true,
                        message: result.data.message
                    })
                }
            })
            // 设置楼宇默认值
            this.room_form.buildingIds = this.buildingId[0].id;
            this.GetFloorsTree(this.room_form.buildingIds);
        },
        // 房间列表
        roomList_init() {

            var roomNum = Number(this.floor_form.room_end) - Number(this.floor_form.room_start);
            var table_item = [];
            for (var i = 0; i <= roomNum; i++) {

                table_item[i] = {
                    id: i + 1,
                    floor_num: this.building_form.floor_amount, // 楼层数量
                    room_code: this.room_form.floorIds + '0' + (this.floor_form.room_start + i), // 房间编码
                    room_name: this.room_form.floorIds + '0' + (this.floor_form.room_start + i) + '房', // 房间名称
                    built_area: this.room_form.built_area, // 兼职面积
                    usable_area: this.room_form.usable_area, // 使用面积
                    room_feature: this.getDicVal(this.room_form.room_feature, this.estate_roomfunc), // 房间功能
                    guide_price: this.room_form.guide_price, // 单价
                    remark: "" // 备注
                }
            }
            this.room_Table = table_item;
        },
        getDicVal(key, dic){
            let text = '';
            for(var item of dic) {
                if (key == item.value_id) {
                    text = item.value_name;
                }
            }
            return text;
        },
        room_submit() {
            
            this.$refs['room_form'].validate((valid) => {
                if (valid) {

                    let _roomList = []; // 存放房间list
                    let _floorId = []; // 存放楼层信息
                    let _buildingAmount = this.project_form.building_amount; // 楼宇数量
                    let _floorAmount = this.building_form.floor_amount; // 楼层数量

                    let _room_startNum = this.floor_form.room_start; // 开始房号
                    let _room_endNum = this.floor_form.room_end; // 结束
                    let _roomAmount = _room_endNum - _room_startNum + 1;

                    let _this = this;
                    
                    for (var j = 0; j < _buildingAmount; j++) { // 遍历楼宇
                        

                        _floorId = [];
                        let _data = this.floorsObj[j];
                        for (var k = 0; k < _data.length; k++) {
                            _floorId[k] = {
                                id: _data[k].id,
                                text: _data[k].text
                            }
                        }
                        for (var k = 0; k < _floorAmount; k++) {

                            for (var m = _room_startNum; m <= _room_endNum; m++) {

                                // 拼房间全名 full_name ： code开始
                                let _all_name = this.project_form.project_name + '#';
                                switch (this.building_form.building_lymc) {
                                    case 'A': 
                                        _all_name += '第' + (j + 1) + '栋#'; // 楼宇名称
                                        break;
                                    case 'B':
                                        _all_name += (j + 1) + '号楼#'; // 楼宇名称
                                        break;
                                    case 'C':
                                        _all_name += (j + 1) + '号仓#'; // 楼宇名称
                                        break;
                                    case 'D':
                                        _all_name += (j + 1) + '号库#'; // 楼宇名称
                                        break;
                                    case 'E':
                                        _all_name += (j + 1) + '号厂房#'; // 楼宇名称
                                        break;
                                }
                                switch (this.floor_form.floor_lcmc) {
                                    case 'A': 
                                        _all_name += '第' + (k + 1) + '层#'; // 楼宇名称
                                        break;
                                    case 'B':
                                        _all_name += (k + 1) + '楼#'; // 楼宇名称
                                        break;
                                }
                                // 拼房间全名 full_name ： code结束

                                _roomList[j * _floorAmount * _roomAmount + k * _roomAmount + (m - _room_startNum)] = {
                                    building_id: this.buildingId[j].id,
                                    floor_id: _floorId[k].id,
                                    room_code: (k+1) + '0' + m,// 房间编码
                                    room_name: (k+1) + '0' + m +'房', // 房间名称
                                    full_name: _all_name + (k+1) + '0' + m +'房',
                                    room_feature: this.room_form.room_feature, // 房间功能
                                    num_floor: (k + 1), // 楼层数
                                    built_area: this.room_form.built_area, // 建筑面积
                                    usable_area: this.room_form.usable_area, // 使用面积
                                    guide_price: this.room_form.guide_price, // 单价
                                    room_decoration: 0, // 装修
                                    room_unit: 0, // 户型
                                    room_toward: 0, // 朝向
                                    parking_area: 0, // 车位面积
                                    garage_area: 0, // 车库面积
                                    is_rented: 0, // 已租
                                    is_sold: false, // 已售
                                    room_length: 0, // 长度
                                    room_width: 0, // 宽度
                                    location: 0, // 区域
                                    space_usage: 0, // 用途
                                    property_type: 0, // 物业类型
                                    room_nature: 0, // 房间性质
                                    remark: "" // 备注
                                }
                            }
                        }
                    }

                    let _postData = {
                        project_id: this.project_id, // 项目ID
                        rooms: _roomList, // 
                    }
                    
                    this.$https.post('/api/pms_base_rooms/UpdateRoom', _postData).then((result) => {
                        if (result.data.code == 0) {
                            // 关闭当前步骤，到第一，刷新页面
                            this.$message({
                                type: 'success',
                                showClose: true,
                                message: '成功创建房间，您已完成批量新增向导!',
                                duration: 1500,
                                onClose: () => {
                                    this.step = 1;
                                    window.location.reload();
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
                    
                } else {
                    console.error('验证不通过');
                    return false;
                }
            })
        },
        getNewDay() { // 返回当天 如： 2018-08-08
            var now = new Date();
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            var day = now.getDate();
            return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
        },
        GetFloorsTree(_buildId) {
            this.$https.get('/api/pms_base_floors/GetFloorsTree?project_id=' + this.project_id + '&building_id=' + _buildId).then((result) => {
                if (result.data.code == 0) {
                    this.floorId = result.data.data;
                    this.room_form.floorIds = 1; // 设置默认值
                    this.roomList_init();
                } else {
                    this.$message({
                        type: 'error',
                        showClose: true,
                        message: result.data.message
                    })
                }
            })
        },
        _getFloorsTree(key) {
            this.$https.get('/api/pms_base_floors/GetFloorsTree',{
                params: {
                    project_id: this.project_id,
                    building_id: this.buildingId[key].id
                }
            }).then((result) => {
                if (result.data.code == 0) {
                    this.floorsObj[key] = result.data.data;
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
