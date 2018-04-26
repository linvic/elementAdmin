<template>
    <div>
        <el-form ref="form" :model="form" label-width="100px" size="small">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="项目编码">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="项目名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="占地面积">
                        <el-input v-model="form.name">
                            <template slot="append">平方米</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="建筑面积">
                        <el-input v-model="form.name">
                            <template slot="append">平方米</template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="绿地面积">
                        <el-input v-model="form.name">
                            <template slot="append">平方米</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="道路面积">
                        <el-input v-model="form.name">
                            <template slot="append">平方米</template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="楼宇数量">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="负责人">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="项目地址">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="公司名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="法人代表">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="联系人">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="联系电话">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="联系地址">
                        <el-input v-model="form.name"></el-input>
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
                <el-button type="primary">立即创建</el-button>
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
                name: '',
                value: '',
                order: '',
                isdefault: true,
                remark: ''
            }
        }
    },
    methods: {
        cascaderChange: function(value){
            console.log(value[value.length - 1]);
        }
    }
}
</script>
<style scoped>
</style>