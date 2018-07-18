<template>
    <div>
        <el-tabs :value="house_type" type="card">
            <el-tab-pane label="园区内房源" name="0" v-if="house_type === '0'"></el-tab-pane>
            <el-tab-pane label="园区外房源" name="1" v-else></el-tab-pane>
        </el-tabs>
        <el-form ref="form" ::model="form" label-width="100px" size="small" label-suffix="：">
            <el-form-item label="房源" v-show="house_type === '0' && id"> 
                <p>{{form.resource_name}}</p>
            </el-form-item>
            <div v-show="house_type === '1'">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="城区">
                            <p>{{form.city}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="片区">
                            <p>{{form.region}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="物业名">
                            <p>{{form.resource_name}}</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="楼栋">
                            <p>{{form.building}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="单元">
                            <p>{{form.unit}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="楼层">
                            <p>{{form.floor}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="房号">
                            <p>{{form.roomno}}</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="18">
                        <el-form-item label="地址">
                            <p>{{form.addr}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="期数">
                            <p>{{form.period}}</p>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            
            <div class="hr-line-dashed"></div>        
            <el-row>
                <el-col :span="12">
                    <el-form-item label="户型">
                        <p>{{getDicVals(form.room_unit, 'room_unit')}}</p>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="装修">
                        <p>{{getDicVals(form.room_decoration, 'room_decoration')}}</p>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="朝向">
                        <p>{{getDicVals(form.room_toward, 'room_toward')}}</p> 
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="房间功能" prop="room_feature">
                        <p>{{getDicVals(form.room_feature, 'room_feature')}}</p>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="建筑面积"> 
                        <p>{{form.built_area}} 平米</p>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="使用面积">
                        <p>{{form.usable_area}} 平米</p>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="建筑年代">
                        <p>{{form.building_age}}</p>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="管理费">
                        <p>{{form.manage_cost}} 元/平米</p>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="产权">
                        <p>{{form.property_right}}</p>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="来源">
                        <p>{{form.come_from}}</p>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="收佣情况">
                        <p>{{form.brokerage}}</p>
                    </el-form-item>
                        
                </el-col>
                <el-col :span="12">
                    <el-form-item label="到期时间">
                        <p>{{form.expiration}}</p>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="看房方式">
                        <p>{{form.check_way}}</p>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="委托方式">
                        <p>{{form.entrust_way}}</p>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="状态">
                        <p v-if="form.status === 0">可租</p>
                        <p v-else-if="form.status === 1">可售</p>
                        <p v-else-if="form.status === 2">租售</p>
                        <p v-else-if="form.status === 3">已租</p>
                        <p v-else-if="form.status === 4">已售</p>
                        <p v-else-if="form.status === 5">被成交</p>
                        <p v-else-if="form.status === 6">被成交</p>
                        <p v-else></p>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="租价">
                        <p>{{form.rent_charge}} 元/平米</p>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="售价">
                        <p>{{form.sale_charge}} 元/平米</p>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="底价">
                        <p>{{form.base_charge}} 元/平米</p>
                    </el-form-item>
                </el-col>
            </el-row>
                    
            <div class="hr-line-dashed"></div>
            <el-row>
                <el-col :span="24">
                    <table class="renting-details-table">
                        <tr>
                            <td width="100"></td>
                            <td>姓名</td>
                            <td>联系电话</td>
                            <td>备注</td>
                        </tr>
                        <tr>
                            <td>业主</td>
                            <td>{{form.user_name1}}</td>
                            <td>{{form.user_mobile1}}</td>
                            <td>{{form.remark1}}</td>
                        </tr>
                        <tr>
                            <td>联系人</td>
                            <td>{{form.user_name2}}</td>
                            <td>{{form.user_mobile2}}</td>
                            <td>{{form.remark2}}</td>
                        </tr>
                    </table>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
export default {
    data () {
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
            room_decoration: [], // 装修
            room_feature: [], // 字典 - 功能
            room_toward: [], // 字典 - 朝向
            room_unit: [], // 字典 - 户型
            estateVal: [], // 房源选中值
            estate: [] // 房产数据
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
            this.getDic('pms_type_unit', 'room_unit') // 户型
        ]).then(this.$https.spread(function (acct, perms) {
            if (_this.id) { // 编辑
                _this.getOldData();
            }
        }))
    },
    watch: {
    },
    methods: {
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
                        this.form.rent_charge = _data.rent_charge; // 租价，价格区间用~分隔，单位元/月
                    }
                    if (_data.sale_charge || _data.sale_charge !== '~') {
                        this.form.sale_charge = _data.sale_charge; // 售价，价格区间用~分隔，单位元/月
                    }
                    this.form.base_charge = _data.base_charge; // 底价
                    this.form.status = _data.status; // 状态，0、可租，1、可售，2、租售，3、已租，4、已售，5、被成交，6、暂缓

                    if (_data.resource_users || _data.resource_users.length !== 0) {
                        for(let item of _data.resource_users) {
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
                this.$emit('closeDialog', 'dialogRentingAdd'); // 执行父组件关闭方法
                this.$emit('closeDialog', 'dialogRentingEdit'); // 执行父组件关闭方法
            } else {
                this.$emit('closeDialog', name); // 执行父组件关闭方法
            }
        },
        getDicVals(keys, dic) { // 根据字典值匹配字典名
            let texts = [];
            let keysArr = keys.toString().split(',');
            for(var keyItem of keysArr) {
                for(var item of this[dic]) {
                    if (keyItem == item.value_id) {
                        texts.push(item.value_name);
                    }
                }
            }
            return texts.join(', ');
        }
    }
}
</script>
<style scoped>
    .renting-details-table {
        width: 100%;
        border-spacing: 0;
        border-collapse: collapse;
    }
    .renting-details-table td{
        border: 1px solid #eee;
        padding: 8px;
    }
</style>