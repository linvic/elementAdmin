<template>
    <div>
        <el-form ref="stepOne_form" :model="stepOne_form" status-icon :rules="stepOne_rules" label-width="120px" v-show="step === 0 || isEdit">
            <el-form-item label="放盘名称/批次：" prop="name">
                <el-input v-model="stepOne_form.name"></el-input>
            </el-form-item>
            <el-form-item label="项目名称：" prop="project">
                <el-select v-model="stepOne_form.project">
                    <el-option label="天安数码城T5" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="楼宇名称：" prop="floor">
                <el-select v-model="stepOne_form.floor">
                    <el-option label="S1号楼" value="2"></el-option>
                    <el-option label="S2号楼" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="适用销售流程：" prop="type">
                <el-select v-model="stepOne_form.type">
                    <el-option label="业务类型A" value="业务类型A"></el-option>
                    <el-option label="业务类型B" value="业务类型B"></el-option>
                    <el-option label="业务类型C" value="业务类型C"></el-option>
                    <el-option label="业务类型D" value="业务类型D"></el-option>
                    <el-option label="业务类型E" value="业务类型E"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click="stepOne_next()">下一步</el-button>
            </el-form-item>
        </el-form>
        <div v-show="step === 1 || isEdit">
            <ul class="statusTag">
                <li><i class="el-icon-web-stop" style="color: #fff;"></i> 未放盘</li>
                <li><i class="el-icon-web-stop" style="color: #ddd;"></i> 已放盘</li>
                <li><i class="el-icon-web-stop" style="color: #409EFF;"></i> 可售</li>
                <li><i class="el-icon-web-stop" style="color: #67c23a;"></i> 预留</li>
            </ul>
            <table class="selling-table" style="width:100%">
                <thead>
                    <tr>
                        <th>
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        </th>
                        <th colspan="999">S1号楼</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="lists in roomList">
                        <td><el-checkbox v-model="checkedRow" :label="lists.floor" :key="lists.floor" name="floor">{{lists.floor}}层</el-checkbox></td>
                        <td
                        v-for="list in lists.rooms"
                        :class="{'active': list.active === true ,'room': list.status === 0,'disabled': list.status !== 0}"
                        @click="checkedRoom(list)"
                        >
                            <p>{{list.name}}</p>
                            <em>￥{{list.price}}</em>
                        </td>
                        <td v-for="list in (roomMaxLength - lists.rooms.length)"></td>
                    </tr>
                </tbody>
            </table>
            <div class="m-t">
                <el-button type="primary" @click="stepTwo_save()">完成</el-button>
            </div>
        </div>
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
            step: 1, // 步骤
            isEdit: false, // 是否编辑模式
            stepOne_form: {
                name: '',
                project: '',
                floor: '',
                type: ''
            },
            stepOne_rules: {
                name: [
                    { required: true, message: '请填写', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '请填写', trigger: 'blur' }
                ]
            },
            checkAll: false, // 全选
            checkedRow: [],
            isIndeterminate: false,

            roomMaxLength: 6,
            roomSelected: [],
            roomList: [
                {
                    floor: 1,
                    rooms: [
                        {
                            name: '101',
                            price: '100.00',
                            status: 0
                        },
                        {
                            name: '102',
                            price: '10.00',
                            status: 1
                        }
                    ]
                },
                {
                    floor: 2,
                    rooms: [
                        {
                            name: '201',
                            price: '100.00',
                            status: 0
                        },
                        {
                            name: '202',
                            price: '10.00',
                            status: 1
                        }
                    ]
                },
                {
                    floor: 3,
                    rooms: [
                        {
                            name: '301',
                            price: '100.00',
                            status: 0
                        },
                        {
                            name: '302',
                            price: '10.00',
                            status: 1
                        },
                        {
                            name: '303',
                            price: '10.00',
                            status: 1
                        },
                        {
                            name: '304',
                            price: '10.00',
                            status: 1
                        },
                        {
                            name: '305',
                            price: '10.00',
                            status: 1
                        },
                        {
                            name: '306',
                            price: '10.00',
                            status: 1
                        }
                    ]
                }
            ]
        }
    },
    created() {
        this.getList();
    },
    watch: {
    },
    methods: {
        stepOne_next() { // 下一步
            this.$refs['stepOne_form'].validate((valid) => {
                if (valid) {
                    this.step = 1;
                    
                } else {
                    console.error('验证不通过');
                    return false;
                }
            })
        },
        handleCheckAllChange(val) { // 全选
            this.checkedRow = val ? this.RowAll : [];
            this.isIndeterminate = false;
            console.log(this.checkedRow);
        },
        // 获取数据
        getList(){
            this.roomList.map(item => {
                item.rooms.map(items => {
                    this.$set(items, 'active', false);
                })
            })
            
        },
        // 选中需要操作的
        checkedRoom(item) {
            // 1.判断 val 是否存在选中的数组中
            // 2. 如果存在数组中
            // 3. 否则 添加到数组
            let selegth = this.roomSelected.length + 1;
            if (item.status === 0) { // 状态为O才可以选择

                let index_of = this.roomSelected.indexOf(item, -selegth);
                if (index_of === -1 ) { 
                    // 未选中
                    this.roomSelected.push(item);
                    // 添加active
                } else {
                    this.roomSelected.splice(index_of, 1);
                }
                // 控制 active
                item.active = !item.active;

            }
            console.info(this.roomSelected);
        }
    },
    computed: {
    }
}
</script>

<style scoped>
    .statusTag {
        display: block;
        list-style: none;
        text-align: right;
    }
    .statusTag li {
        display: inline-block;
        margin-left: 5px;
    }
    .statusTag li i {
        border:1px solid #ebeef5;
    }
    .selling-table {
        border-spacing: 0;
        border-collapse: collapse;
        text-align: center;
    }
    .selling-table th {
        text-align: left;
    }
    .selling-table tr td:first-child {
        text-align: left;
        border: none; 
    }
    .selling-table th {
        padding: 2px;
    }
    .selling-table td {
        border: 1px solid #ebeef5;
        padding: 2px;
    }
    .selling-table td.room {
        cursor: pointer;
    }

    /* 状态 0-未放盘 1-可售 2-预留 disabled-已放盘 */ 
    .room.status0 {
        /* 未放盘 */
        background-color: #fff;
        color: #606266;
    }
    .room.status1 {
        /* 可售 */
        background-color: #409EFF;
        color: #fff;
    }
    .room.status2 {
        /* 预留 */
        background-color: #67c23a;
        color: #fff;
    }
    td.disabled {
        /* 已放盘 */
        background-color: #ddd;
        color: #fff;
    }
    .room.active {
        /* 预留 */
        background-color: #FFB840;
        color: #fff;
    }
</style>
