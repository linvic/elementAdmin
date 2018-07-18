<template>
    <div>
        <el-tabs :value="house_type" type="card" @tab-click="handleClick">
            <el-tab-pane label="园区内房源" name="0" :disabled="!!id"></el-tab-pane>
            <el-tab-pane label="园区外房源" name="1" :disabled="!!id"></el-tab-pane>
        </el-tabs>
        <el-form ref="form" :rules="form_rules" :model="form" label-width="80px" size="small">
            <div v-show="house_type === '0' && !id">

                <el-form-item label="房源" prop="room_id"> 
                    <el-cascader
                        clearable
                        :options="estate"
                        v-model="estateVal"
                        separator="#"
                        @active-item-change="handleItemChange"
                        @change="handleChange"
                        >
                    </el-cascader>
                </el-form-item>
            </div>
            <el-form-item label="房源" v-show="house_type === '0' && id"> 
                <p>{{form.resource_name}}</p>
            </el-form-item>
            <div v-show="house_type === '1'">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="城区"> 
                            <el-input v-model="form.city" placeholder="请输入"></el-input> 
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="片区"> 
                            <el-input v-model="form.region" placeholder="请输入"></el-input> 
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="物业名" prop="resource_name"> 
                            <el-input v-model="form.resource_name" placeholder="请输入"></el-input> 
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="楼栋"> 
                            <el-input v-model="form.building" placeholder="请输入"></el-input> 
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="单元"> 
                            <el-input v-model="form.unit" placeholder="请输入"></el-input> 
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="楼层"> 
                            <el-input v-model="form.floor" placeholder="请输入"></el-input> 
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="房号"> 
                            <el-input v-model="form.roomno" placeholder="请输入"></el-input> 
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="18">
                        <el-form-item label="地址"> 
                            <el-input v-model="form.addr" placeholder="请输入"></el-input> 
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="期数"> 
                            <el-input v-model="form.period" placeholder="请输入"></el-input> 
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            
            <div class="hr-line-dashed"></div>        
            <el-row>
                <el-col :span="12">
                    <el-form-item label="户型">
                        <el-select v-model="form.room_unit">
                            <el-option label="请选择户型" value=""></el-option>
                            <el-option v-for="item in room_unit" :key="item.value_id" :label="item.value_name" :value="item.value_id.toString()"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="装修">
                        <el-select v-model="form.room_decoration">
                            <el-option label="请选择装修" value=""></el-option>
                            <el-option v-for="item in room_decoration" :key="item.value_id" :label="item.value_name" :value="item.value_id.toString()"></el-option>
                        </el-select> 
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="朝向">
                        <el-select v-model="form.room_toward">
                            <el-option label="请选择朝向" value=""></el-option>
                            <el-option v-for="item in room_toward" :key="item.value_id" :label="item.value_name" :value="item.value_id.toString()"></el-option>
                        </el-select> 
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="房间功能" prop="room_feature">
                        <el-select v-model="form.room_feature">
                            <el-option label="请选择房间功能" value=""></el-option>
                            <el-option v-for="item in room_feature" :key="item.value_id" :label="item.value_name" :value="item.value_id.toString()"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="建筑面积"> 
                        <el-input v-model="form.built_area" @keyup.native="onkeyupPrice($event)" placeholder="数字，小数点两位，单位平米" type="number" style="width: 150px"></el-input> 平米
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="使用面积">
                        <el-input v-model="form.usable_area" @keyup.native="onkeyupPrice($event)" placeholder="数字，小数点两位，单位平米" type="number" style="width: 150px"></el-input> 平米
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="建筑年代"> 
                        <el-input v-model="form.building_age" placeholder="请输入"></el-input> 
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="管理费">
                        <el-input v-model="form.manage_cost" @keyup.native="onkeyupPrice($event)" placeholder="数字，小数点两位，单位元/平米" type="number" style="width: 150px"></el-input> 元/平米
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="产权"> 
                        <el-input v-model="form.property_right" placeholder="请输入"></el-input> 
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="来源"> 
                        <el-input v-model="form.come_from" placeholder="请输入"></el-input> 
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="收佣情况"> 
                        <el-input v-model="form.brokerage" placeholder="请输入"></el-input> 
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="到期时间"> 
                        <el-date-picker v-model="form.expiration" type="date" placeholder="选择到期时间"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="看房方式"> 
                        <el-input v-model="form.check_way" placeholder="请输入"></el-input> 
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="委托方式"> 
                        <el-input v-model="form.entrust_way" placeholder="请输入"></el-input> 
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="状态" prop="status">
                        <el-select v-model="form.status">
                            <el-option v-for="item in statusBase" :key="item.value" :label="item.name" :value="item.value.toString()"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="租价" prop="rent_charge">
                        <el-input v-model="form.rent_charge1" @keyup.native="onkeyupPrice($event)" placeholder="0.00" type="number" style="width: 100px"></el-input> ~
                        <el-input v-model="form.rent_charge2" @keyup.native="onkeyupPrice($event)" placeholder="0.00" type="number" style="width: 100px"></el-input> 元/平米
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="售价" prop="sale_charge">
                        <el-input v-model="form.sale_charge1" @keyup.native="onkeyupPrice($event)" placeholder="0.00" type="number" style="width: 100px"></el-input> ~
                        <el-input v-model="form.sale_charge2" @keyup.native="onkeyupPrice($event)" placeholder="0.00" type="number" style="width: 100px"></el-input> 元/平米
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="底价">
                        <el-input v-model="form.base_charge" @keyup.native="onkeyupPrice($event)" placeholder="数字，小数点两位，单位平方米" type="number" style="width: 150px"></el-input> 元/平米
                    </el-form-item>
                </el-col>
            </el-row>
                    
            <div class="hr-line-dashed"></div>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="业主">
                        <el-input v-model="form.user_name1" placeholder="业主姓名" type="text" style="width: 240px"></el-input>
                        <el-input v-model="form.user_mobile1" placeholder="业主联系电话" type="text" style="width: 240px"></el-input>
                        <el-input v-model="form.remark1" placeholder="业主备注" type="text" style="width: 240px"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="联系人">
                        <el-input v-model="form.user_name2" placeholder="联系人姓名" type="text" style="width: 240px"></el-input>
                        <el-input v-model="form.user_mobile2" placeholder="联系人联系电话" type="text" style="width: 240px"></el-input>
                        <el-input v-model="form.remark2" placeholder="联系人备注" type="text" style="width: 240px"></el-input>
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
export default {
    data () {

        let validate_room_id = (rule, value, callback) => {

            if (this.form.room_id === '' && this.house_type === '0') { // 可租 且为空
                callback(new Error('房源不能为空'));
            } else {
                callback();
            }
        };
        let validate_rent_charge = (rule, value, callback) => {

            if ((this.form.status === '0' || this.form.status === '2') && this.form.rent_charge1 === '') { // 可租 且为空
                callback(new Error('请填写完整租价区间'));
            } else if ( (this.form.rent_charge1 !== '' && this.form.rent_charge2 !== '') || (this.form.rent_charge1 === '' && this.form.rent_charge2 === '') ) {
                callback();
            } else {
                callback(new Error('请填写完整租价区间'));
            }
        };
        let validate_sale_charge = (rule, value, callback) => {
            
            if ((this.form.status === '1' || this.form.status === '2') && this.form.sale_charge1 === '') { // 可售 且为空
                callback(new Error('请填写完整售价区间'));
            } else if ( (this.form.sale_charge1 !== '' && this.form.sale_charge2 !== '') || (this.form.sale_charge1 === '' && this.form.sale_charge2 === '') ) {
                console.log('xxx')
                callback();
            } else {
                callback(new Error('请填写完整售价区间'));
            }
        };
        return {
            house_type: '0',
            form: {
                resource_name: '', // 物业名或小区名或项目名称
                city: '', // 城区
                region: '', // 片区
                building: '', // 楼栋
                roomno: '', // 房号
                unit: '', // 单元
                floor: '', // 楼层
                addr: '', // 地址
                period: '', // 期数

                room_id: '', // 房产标识

                room_unit: '', // 户型
                room_decoration: '', // 装修
                room_toward: '', // 朝向
                built_area: '', // 建筑面积
                usable_area: '', // 使用面积
                room_feature: '', // 房间功能
                building_age: '', // 建筑年代
                manage_cost: '', // 管理费
                property_right: '', // 产权
                come_from: '', // 来源
                brokerage: '', // 收佣情况
                expiration: '', // 到期时间
                check_way: '', // 看房方式
                entrust_way: '', // 委托方式
                rent_charge1: '', // 租价，价格区间用~分隔，单位元/月
                rent_charge2: '', // 租价，价格区间用~分隔，单位元/月
                sale_charge1: '', // 售价，价格区间用~分隔，单位元/月
                sale_charge2: '', // 售价
                base_charge: '', // 底价
                status: '0', // 状态，0、可租，1、可售，2、租售，3、已租，4、已售，5、被成交，6、暂缓
                uid1: 0,
                user_name1: '', // 业主 姓名
                user_mobile1: '', // 业主 联系电话
                remark1: '', // 业主 备注
                uid2: 0,
                user_name2: '', // 联系人 姓名
                user_mobile2: '', // 联系人 联系电话
                remark2: '', // 联系人 备注
            },
            form_rules: {
                room_id: [
                    { validator: validate_room_id, trigger: 'change'}
                ],
                resource_name: [
                    { required: true, message: '请输入物业名', trigger: 'change'}
                ],
                room_feature: [
                    { required: true, message: '请选择房间功能', trigger: 'change'}
                ],
                rent_charge: [
                    { validator: validate_rent_charge, trigger: 'blur'}
                ],
                sale_charge: [
                    { validator: validate_sale_charge, trigger: 'blur'}
                ]
            },
            room_decoration: [], // 装修
            room_feature: [], // 字典 - 功能
            room_toward: [], // 字典 - 朝向
            room_unit: [], // 字典 - 户型
            estateVal: [], // 房源选中值
            estate: [], // 房产数据
            statusBase: [{
                name: '可租',
                value: 0
            },{
                name: '可售',
                value: 1
            },{
                name: '租售',
                value: 2
            },{
                name: '已租',
                value: 3
            },{
                name: '已售',
                value: 4
            },{
                name: '被成交',
                value: 5
            },{
                name: '暂缓',
                value: 6
            }]
        }
    },
    props: {
        id: {
            type: Number
        }
    },
    created() {
        let _this = this;
        this.$https.all([
            this.getDic('pms_type_decoration', 'room_decoration'), // 装修
            this.getDic('pms_type_roomfunc', 'room_feature'), // 功能
            this.getDic('pms_type_direction', 'room_toward'), // 朝向
            this.getDic('pms_type_unit', 'room_unit'), // 户型
            this.getProjects()
        ]).then(this.$https.spread(function (acct, perms) {
            if (_this.id) { // 编辑
                _this.getOldData();
            }
        }))
    },
    watch: {
    },
    methods: {
        handleClick(tab) {
            this.house_type = tab.name;
        },
        getProjects() { // 获取房产项目
            this.$https.get('/api/pms_base_projects/GetProjects', {
                params: {
                    page: 1,
                    page_size: 999,
                }
            }).then((result) => {
                if (result.data.code == 0) {
                    for(var item of result.data.data.Items) {
                        let _item = {
                            value: item.project_id,
                            label: item.project_name,
                            children: []
                        }
                        this.estate.push(_item);
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
        getBuildings(project_id) { // 获取楼宇
            this.$https.get('/api/pms_base_buildings/GetBuildings', {
                params: {
                    page: 1,
                    page_size: 999,
                    project_id: project_id
                }
            }).then((result) => {
                if (result.data.code == 0) {
                    // 遍历项目
                    for(let i = 0; i < this.estate.length; i++) {
                        // 如果项目值与选中的 id 相等 则遍历楼宇列表填充到当前项目的 children 中
                        if (this.estate[i].value === project_id) {
                            this.estate[i].children = []; // 每次遍历前置空
                            for(let item of result.data.data.Items) {
                                let _item = {
                                    value: item.building_id,
                                    label: item.building_name,
                                    children: []
                                }
                                this.estate[i].children.push(_item);
                            }
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
        },
        getFloors(project_id, building_id) { // 获取房间
            this.$https.get('/api/pms_base_floors/GetFloors', {
                params: {
                    page: 1,
                    page_size: 999,
                    building_id: building_id
                }
            }).then((result) => {
                if (result.data.code == 0) {

                    // 遍历项目
                    for(let i = 0; i < this.estate.length; i++) {

                        // 如果项目值与选中的项目 id 相等 则遍历楼宇列表
                        if (this.estate[i].value === project_id) {

                            for (let j = 0; j <this.estate[i].children.length; j++) {
                                // 如果楼宇值与选中的楼宇 ID 相等
                                if (this.estate[i].children[j].value === building_id) {
                                    // 则遍历结果 添加到 当前楼宇
                                    this.estate[i].children[j].children = []; // 每次遍历前置空
                                    for(let item of result.data.data.Items) {
                                        let _item = {
                                            value: item.floor_id,
                                            label: item.floor_name,
                                            children: []
                                        }
                                        this.estate[i].children[j].children.push(_item);
                                    }
                                }
                            }
                            
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
        },
        getRooms(project_id, building_id, floor_id) { // 获取房间

            this.$https.get('/api/pms_base_rooms/GetRooms', {
                params: {
                    page: 1,
                    page_size: 999,
                    floor_id: floor_id
                }
            }).then((result) => {
                if (result.data.code == 0) {
                    
                    // 遍历项目
                    for(let i = 0; i < this.estate.length; i++) {

                        // 如果项目值与选中的项目 id 相等 则遍历楼宇列表
                        if (this.estate[i].value === project_id) {

                            for (let j = 0; j <this.estate[i].children.length; j++) {
                                // 如果楼宇值与选中的楼宇 ID 相等
                                if (this.estate[i].children[j].value === building_id) {

                                    // 则遍历楼层信息
                                    for (let k = 0; k <this.estate[i].children[j].children.length; k++) {

                                        // 如果楼宇值与选中的楼层 ID 相等
                                        if (this.estate[i].children[j].children[k].value === floor_id) {
                                            // 则遍历结果 添加到 当前楼宇
                                            this.estate[i].children[j].children[k].children = []; // 每次遍历前置空
                                            for(let item of result.data.data.Items) {
                                                let _item = {
                                                    value: item.room_id,
                                                    label: item.room_name
                                                }
                                                this.estate[i].children[j].children[k].children.push(_item);
                                            }
                                        }
                                    }
                                }
                            }
                            
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
        },
        handleItemChange(val) {
            let activeItemLen = val.length;

            if (activeItemLen === 1) {
                this.getBuildings(val[0]);
            } else if (activeItemLen === 2) {
                this.getFloors(val[0], val[1]);
            } else if (activeItemLen === 3) {
                this.getRooms(val[0], val[1], val[2]);
            } else if (activeItemLen === 4) {

            }
        },
        handleChange() {
            let selectObj = this.getCascaderObj(this.estateVal, this.estate);
            this.form.resource_name = selectObj[0].label + '#' + selectObj[1].label + '#' + selectObj[2].label + '#' + selectObj[3].label; // 取项目名称 = 物业名
            this.form.room_id = this.estateVal[3]; // 取房间ID
            // 根据 room_id 取出相应数据
            this.$https.get('/api/pms_base_rooms/GetRoomDetail?room_id=' + this.form.room_id).then((result) => {
                if (result.data.code == 0) {
                    let _data = result.data.data;
                    this.form.room_feature = _data.room_feature == 0 ? '' :_data.room_feature.toString(); // 房间功能
                    this.form.room_decoration = _data.room_decoration == 0 ? '' :_data.room_decoration.toString(); // 装修
                    this.form.room_unit = _data.room_unit == 0 ? '' :_data.room_unit.toString(); // 户型
                    this.form.room_toward = _data.room_toward == 0 ? '' :_data.room_toward.toString(); // 朝向
                    this.form.built_area = _data.built_area == 0 ? '' :_data.built_area.toString(); // 建筑面积
                    this.form.usable_area = _data.usable_area == 0 ? '' :_data.usable_area.toString(); // 使用面积
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

            this.$https.get('/api/rent_base_resources/GetResource?resource_id=' + this.id).then((result) => {
                if (result.data.code == 0) {
                    let _data = result.data.data;
                    if (!_data.room_id) {
                        this.house_type = '1';
                        this.form.resource_name = _data.resource_name; // 物业名或小区名或项目名称
                        this.form.city = _data.city; // 城区
                        this.form.region = _data.region; // 片区
                        this.form.building = _data.building; // 楼栋
                        this.form.roomno = _data.roomno; // 房号
                        this.form.unit = _data.unit; // 单元
                        this.form.floor = _data.floor; // 楼层
                        this.form.addr = _data.addr; // 地址
                        this.form.period = _data.period; // 期数
                    } else {
                        this.form.room_id = _data.room_id; // 房产标识
                        this.form.resource_name = _data.resource_name; // 物业名或小区名或项目名称
                    }
                    this.form.room_unit = _data.room_unit.toString(); // 户型
                    this.form.room_decoration = _data.room_decoration.toString(); // 装修
                    this.form.room_toward = _data.room_toward.toString(); // 朝向
                    this.form.built_area = _data.built_area == 0 ? '' : _data.built_area.toString(); // 建筑面积
                    this.form.usable_area = _data.usable_area == 0 ? '' : _data.usable_area.toString(); // 使用面积
                    this.form.room_feature = _data.room_feature.toString(); // 房间功能
                    console.log(this.form.room_feature)
                    this.form.building_age = _data.building_age; // 建筑年代
                    this.form.manage_cost = _data.manage_cost; // 管理费
                    this.form.property_right = _data.property_right; // 产权
                    this.form.come_from = _data.come_from; // 来源
                    this.form.brokerage = _data.brokerage; // 收佣情况
                    this.form.expiration = _data.expiration; // 到期时间
                    this.form.check_way = _data.check_way; // 看房方式
                    this.form.entrust_way = _data.entrust_way; // 委托方式
                    if (_data.rent_charge || _data.rent_charge !== '~') {
                        this.form.rent_charge1 = _data.rent_charge.split('~')[0]; // 租价，价格区间用~分隔，单位元/月
                        this.form.rent_charge2 = _data.rent_charge.split('~')[0]; // 租价，价格区间用~分隔，单位元/月
                    }
                    if (_data.sale_charge || _data.sale_charge !== '~') {
                        this.form.sale_charge1 = _data.sale_charge.split('~')[0]; // 售价，价格区间用~分隔，单位元/月
                        this.form.sale_charge2 = _data.sale_charge.split('~')[0]; // 售价，价格区间用~分隔，单位元/月
                    }
                    this.form.base_charge = _data.base_charge; // 底价
                    this.form.status = _data.status.toString(); // 状态，0、可租，1、可售，2、租售，3、已租，4、已售，5、被成交，6、暂缓
                    switch (_data.status) {
                        case 0:
                            this.statusBase = [{name: '可租',value: 0},{name: '可售',value: 1},{name: '租售',value: 2},{name: '被成交',value: 5},{name: '暂缓',value: 6}]
                            break;
                        case 1:
                            this.statusBase = [{name: '可租',value: 0},{name: '可售',value: 1},{name: '租售',value: 2},{name: '被成交',value: 5},{name: '暂缓',value: 6}]
                            break;
                        case 2:
                            this.statusBase = [{name: '可租',value: 0},{name: '可售',value: 1},{name: '租售',value: 2},{name: '被成交',value: 5},{name: '暂缓',value: 6}]
                            break;
                        case 3:
                            this.statusBase = [{name: '已租',value: 3}]
                            break;
                        case 4:
                            this.statusBase = [{name: '已售',value: 4}]
                            break;
                        case 5:
                            this.statusBase = [{name: '可租',value: 0},{name: '可售',value: 1},{name: '租售',value: 2},{name: '被成交',value: 5},{name: '暂缓',value: 6}]
                            break;
                        case 6:
                            this.statusBase = [{name: '可租',value: 0},{name: '可售',value: 1},{name: '租售',value: 2},{name: '被成交',value: 5},{name: '暂缓',value: 6}]
                            break;
                        default:
                            this.statusBase = [{name: '可租',value: 0},{name: '可售',value: 1},{name: '租售',value: 2},{name: '已租',value: 3},{name: '已售',value: 4},{name: '被成交',value: 5},{name: '暂缓',value: 6}]
                            break;
                    }
                    
                    if (_data.resource_users || _data.resource_users.length !== 0) {
                        for(let item of _data.resource_users) {
                            console.log(item.uid)
                            if (item.user_type === 1) {
                                this.form.uid1 = item.uid;
                                this.form.user_name1 = item.user_name;
                                this.form.user_mobile1 = item.user_mobile;
                                this.form.remark1 = item.remark;
                            } else {
                                this.form.uid2 = item.uid;
                                this.form.user_name2 = item.user_name;
                                this.form.user_mobile2 = item.user_mobile;
                                this.form.remark2 = item.remark;
                            }
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
        },
        submit() { // 提交
            this.$refs.form.validate((valid) => {
                if (valid) {
                    let _postData = {
                        room_unit: this.form.room_unit, // 户型
                        room_decoration: this.form.room_decoration, // 装修
                        room_toward: this.form.room_toward, // 朝向
                        room_feature: this.form.room_feature, // 房间功能
                        built_area: this.form.built_area == '' ? 0 : this.form.built_area, // 建筑面积
                        usable_area: this.form.usable_area == '' ? 0 : this.form.usable_area, // 使用面积
                        building_age: this.form.building_age, // 建筑年代
                        manage_cost: this.form.manage_cost, // 管理费
                        property_right: this.form.property_right, // 产权
                        come_from: this.form.come_from, // 来源
                        brokerage: this.form.brokerage, // 收佣情况
                        expiration: this.form.expiration, // 到期时间
                        check_way: this.form.check_way, // 看房方式
                        entrust_way: this.form.entrust_way, // 委托方式
                        rent_charge: this.form.rent_charge1 + '~' + this.form.rent_charge2, // 租价，价格区间用~分隔，单位元/月
                        sale_charge: this.form.sale_charge1 + '~' + this.form.sale_charge2, // 售价
                        base_charge: this.form.base_charge, // 底价
                        status: this.form.status // 状态，0、可租，1、可售，2、租售，3、已租，4、已售，5、被成交，6、暂缓
                    }
                    if (this.house_type === '0') { // 园区内房产
                        _postData.room_id = this.form.room_id;
                        _postData.resource_name = this.form.resource_name; // 物业名或小区名或项目名称
                    } else { // 园区外房产
                        _postData.resource_name = this.form.resource_name; // 物业名或小区名或项目名称
                        _postData.city = this.form.city; // 城区
                        _postData.region = this.form.region; // 片区
                        _postData.building = this.form.building; // 楼栋
                        _postData.roomno = this.form.roomno; // 房号
                        _postData.unit = this.form.unit; // 单元
                        _postData.floor = this.form.floor; // 楼层
                        _postData.addr = this.form.addr; // 地址
                        _postData.period = this.form.period; // 期数
                    }
                    _postData.resource_users = [{
                        resource_id: 0,
                        user_type: 1,// 1、业主，2、一般联系人
                        user_name: this.form.user_name1, // 业主 姓名
                        user_mobile: this.form.user_mobile1, // 业主 联系电话
                        remark: this.form.remark1 // 业主 备注
                    },{
                        resource_id: 0,
                        user_type: 2,// 1、业主，2、一般联系人
                        user_name: this.form.user_name2, // 业主 姓名
                        user_mobile: this.form.user_mobile2, // 业主 联系电话
                        remark: this.form.remark2 // 业主 备注
                    }];
                    console.log(this.form)
                    if (this.id) { // 编辑
                        _postData.resource_id = parseInt(this.id);
                        _postData.resource_users[0].uid = this.form.uid1;
                        _postData.resource_users[1].uid = this.form.uid2;
                        _postData.resource_users[0].resource_id = parseInt(this.id);
                        _postData.resource_users[1].resource_id = parseInt(this.id);
                        this.$https.post('/api/rent_base_resources/UpdateResource', _postData).then((result) => {
                            if (result.data.code == 0) {
                                this.$message({
                                    type: 'success',
                                    showClose: true,
                                    message: '编辑成功',
                                    duration: 1500,
                                    onClose: () => {
                                        // 关闭当前dialog，
                                        this.closeDialog('dialogRentingEdit');
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

                        this.$https.post('/api/rent_base_resources/CreateResource', _postData).then((result) => {
                            if (result.data.code == 0) {
                                this.$message({
                                    type: 'success',
                                    showClose: true,
                                    message: '添加成功',
                                    duration: 1500,
                                    onClose: () => {
                                        // 关闭当前dialog
                                        this.closeDialog('dialogRentingAdd');
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
        getTreeDeepArr(key, treeData) { // 获取数组深度

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
        },
        closeDialog(name) { // 关闭当前
            // this.$refs.form.resetFields(); // 重置表单
            if (!name) {
                this.$emit('closeDialog', 'dialogRentingAdd'); // 执行父组件关闭方法
                this.$emit('closeDialog', 'dialogRentingEdit'); // 执行父组件关闭方法
            } else {
                this.$emit('closeDialog', name); // 执行父组件关闭方法
            }
        }
    }
}
</script>
<style scoped>
.el-tag {
    margin-right: 10px;
}
</style>