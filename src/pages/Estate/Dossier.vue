<template>
    <div>
        <el-card>
            <div slot="header" class="clearfix">
                <span>房产档案信息管理</span>
            </div>
            <el-tabs v-model="tabPosition" type="border-card">
                <el-tab-pane label="项目信息" name="1" disabled>
                    <el-row>
                        <el-col :span="24">
                            <el-button-group style="float: right;">
                                <el-button icon="el-icon-refresh" size="small" plain onclick="window.location.reload()">刷新</el-button>
                                <el-button type="primary" icon="el-icon-circle-plus-outline" size="small" @click="dialogProject = true">新增项目</el-button>
                            </el-button-group>
                        </el-col>
                    </el-row>
                    <el-table :data="ProjectTable" style="width: 100%">
                        <el-table-column prop="project_id" label="ID"></el-table-column>
                        <el-table-column prop="project_code" label="项目编码"></el-table-column>
                        <el-table-column prop="project_name" label="项目名称"></el-table-column>
                        <el-table-column prop="project_addr" label="地址"></el-table-column>
                        <el-table-column label="操作" width="240">
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    type="primary"
                                    @click="toBuilding(scope.row)">查看楼宇</el-button>
                                <el-button
                                    size="mini"
                                    @click="dicEdit(scope.$index, scope.row)">编辑</el-button>
                                <el-button
                                    size="mini"
                                    type="danger"
                                    @click="dicDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="楼宇信息" name="2" disabled>
                    <el-row>
                        <el-col :span="12">
                            <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height:32px;">
                                <el-breadcrumb-item>凤岗T5</el-breadcrumb-item>
                                <el-breadcrumb-item></el-breadcrumb-item>
                            </el-breadcrumb>
                        </el-col>
                        <el-col :span="12">
                            <el-button-group style="float: right;">
                                <el-button icon="el-icon-refresh" size="small" plain onclick="window.location.reload()">刷新</el-button>
                                <el-button type="primary" icon="el-icon-circle-plus-outline" size="small" @click="dialogDicAdd = true">新增楼宇</el-button>
                            </el-button-group>
                        </el-col>
                    </el-row>
                    <el-table :data="BuildingTable" style="width: 100%">
                        <el-table-column prop="building_id" label="ID"></el-table-column>
                        <el-table-column prop="building_code" label="楼宇编号"></el-table-column>
                        <el-table-column prop="building_name" label="楼宇名称"></el-table-column>
                        <el-table-column prop="building_area" label="建筑面积(平米)"></el-table-column>
                        <el-table-column prop="usable_area" label="使用面积(平米)"></el-table-column>
                        <el-table-column prop="floor_amount" label="楼层数量"></el-table-column>
                        <el-table-column prop="capped" label="预售许可证日期"></el-table-column>
                        <el-table-column prop="building_function" label="楼宇功能"></el-table-column>
                        <el-table-column label="操作" width="240">
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    type="primary"
                                    @click="toFloor(scope.row)">查看楼层</el-button>
                                <el-button
                                    size="mini"
                                    @click="dicEdit(scope.$index, scope.row)">编辑</el-button>
                                <el-button
                                    size="mini"
                                    type="danger"
                                    @click="dicDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="楼层信息" name="3" disabled>
                    <el-row>
                        <el-col :span="12">
                            <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height:32px;">
                                <el-breadcrumb-item>凤岗T5</el-breadcrumb-item>
                                <el-breadcrumb-item>S1号楼</el-breadcrumb-item>
                                <el-breadcrumb-item></el-breadcrumb-item>
                            </el-breadcrumb>
                        </el-col>
                        <el-col :span="12">
                            <el-button-group style="float: right;">
                                <el-button icon="el-icon-refresh" size="small" plain onclick="window.location.reload()">刷新</el-button>
                                <el-button type="primary" icon="el-icon-circle-plus-outline" size="small" @click="dialogDicAdd = true">新增楼层</el-button>
                            </el-button-group>
                        </el-col>
                    </el-row>
                    <el-table :data="FloorTable" style="width: 100%">
                        <el-table-column prop="floor_id" label="ID"></el-table-column>
                        <el-table-column prop="floor_code" label="楼层编号"></el-table-column>
                        <el-table-column prop="floor_name" label="楼层名称"></el-table-column>
                        <el-table-column prop="floor_start" label="开始楼层"></el-table-column>
                        <el-table-column prop="floor_end" label="结束楼层"></el-table-column>
                        <el-table-column prop="room_start" label="开始房号"></el-table-column>
                        <el-table-column prop="room_end" label="结束房号"></el-table-column>
                        <el-table-column label="操作" width="240">
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    type="primary"
                                    @click="toRoom(scope.row)">查看房间</el-button>
                                <el-button
                                    size="mini"
                                    @click="dicEdit(scope.$index, scope.row)">编辑</el-button>
                                <el-button
                                    size="mini"
                                    type="danger"
                                    @click="dicDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="房间信息" name="4" disabled>
                    <el-row>
                        <el-col :span="12">
                            <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height:32px;">
                                <el-breadcrumb-item>凤岗T5</el-breadcrumb-item>
                                <el-breadcrumb-item>S1号楼</el-breadcrumb-item>
                                <el-breadcrumb-item>8层</el-breadcrumb-item>
                                <el-breadcrumb-item></el-breadcrumb-item>
                            </el-breadcrumb>
                        </el-col>
                        <el-col :span="12">
                            <el-button-group style="float: right;">
                                <el-button icon="el-icon-refresh" size="small" plain onclick="window.location.reload()">刷新</el-button>
                                <el-button type="primary" icon="el-icon-circle-plus-outline" size="small" @click="dialogDicAdd = true">新增房间</el-button>
                            </el-button-group>
                        </el-col>
                    </el-row>
                    <el-table :data="RoomTable" style="width: 100%">
                        <el-table-column prop="room_id" label="ID"></el-table-column>
                        <el-table-column prop="room_code" label="房间编号"></el-table-column>
                        <el-table-column prop="room_name" label="房间名称"></el-table-column>
                        <el-table-column prop="room_feature" label="房间功能"></el-table-column>
                        <el-table-column prop="room_unit" label="户型"></el-table-column>
                        <el-table-column prop="room_toward" label="朝向"></el-table-column>
                        <el-table-column prop="room_decoration" label="装修"></el-table-column>
                        <el-table-column prop="property_type" label="物业类型"></el-table-column>
                        <el-table-column prop="built_area" label="建筑面积(平米)"></el-table-column>
                        <el-table-column prop="usable_area" label="使用面积(平米)"></el-table-column>
                        <el-table-column prop="is_sold" label="销售状态"></el-table-column>
                        <el-table-column prop="is_rented" label="使用状态"></el-table-column>
                        <el-table-column prop="room_price" label="指导单价(元/平米)"></el-table-column>
                        <el-table-column label="操作" width="240">
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    type="primary"
                                    @click="dicEdit(scope.$index, scope.row)">绑定电表</el-button>
                                <el-button
                                    size="mini"
                                    @click="dicEdit(scope.$index, scope.row)">编辑</el-button>
                                <el-button
                                    size="mini"
                                    type="danger"
                                    @click="dicDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <!-- 分页 -->
                <div class="text-center m-t">
                    <el-pagination
                        @size-change="pageSizeChange"
                        @current-change="currentPageChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 50, 100, 200]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                    </el-pagination>
                </div>
            </el-tabs>

        </el-card>
        <!-- dialog -->
        <el-dialog title="新增房产项目" :visible.sync="dialogProject">
            <Project v-on:changeDialog="changeDialogProject"></Project>
        </el-dialog>
    </div>
</template>

<script>
import Project from './Project'
export default {
    components: {
        Project
    },
    data () {
        return {
            currentPage: 1, // 当前页码
            tabPosition: '1', // 步骤
            dialogProject: false,
            ProjectTable: [{
                project_id: 1,
                project_code: 'code',
                project_name: 'name',
                project_addr: 'addr'
            }],
            BuildingTable: [{
                building_id: 1,
                building_code: 'code',
                building_name: 'name',
                building_area: '0.00',
                usable_area: '0.00',
                floor_amount: '3',
                capped: '2018-04-24',
                building_function: '办公'
            }],
            FloorTable: [{
                floor_id: 1,
                floor_code: 'code',
                floor_name: 'name',
                floor_start: '2',
                floor_end: '10',
                room_start: '1',
                room_end: '18'
            }],
            RoomTable: [{
                room_id: 1,
                room_code: 'code',
                room_name: 'name',
                room_feature: '商铺',
                room_unit: '二室一厅',
                room_toward: '坐北朝南',
                room_decoration: '简装',
                property_type: 'C类-免缴费',
                built_area: '104.6',
                usable_area: '95.36',
                is_sold: '已售',
                is_rented: '自用',
                room_price: '21000'
            }]
        }
    },
    watch: {
    },
    methods: {
        pageSizeChange(val) { // 分页：pageSize改变时
            console.log(`每页 ${val} 条`);
        },
        currentPageChange(val) { // 分页：当前页码改变时
            console.log(`当前页: ${val}`);
        },
        changeDialogProject(val) { // 项目新增弹层
            this.dialogProject = val;
        },
        toBuilding(row) {
            this.tabPosition = '2'; // 切换到楼宇管理
            console.log(row.project_id);
        },
        toFloor(row) {
            this.tabPosition = '3'; // 切换到楼层管理
            console.log(row.building_id);
        },
        toRoom(row) {
            this.tabPosition = '4'; // 切换到房间管理
            console.log(row.floor_id);
        }
    },
    computed: {
    }
}
</script>

<style scoped>
</style>
