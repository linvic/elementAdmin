<template>
    <div>
        <!-- 产业楼定制销售流程 -->
        <EstateFlow v-if="flow_type === 2" @closeDialog="closeDialog" @parentGetDataList="getDataList" :f_id="f_id" :c_id="c_id"></EstateFlow>
        <div v-else>流程加载错误</div>
    </div>
</template>

<script>

import EstateFlow from './EstateFlow' // 产业楼定制销售流程

export default {
    components: {
        EstateFlow, // 产业楼定制销售流程
    },
    props: {
        frameParame: {
            type: Object
        },
        editId: {
            type: Number()
        }
    },
    data () {
        return {
            flow_type: 2, //流程类别
            c_id: 0, // 客户ID
            f_id: 0 //流程实例ID
        }
    },
    created() {
        if(!this.frameParame) {
            alert('模板加载失败，请选择模板')
        }
        console.info(this.frameParame)
        this.flow_type = this.frameParame.flow_type;
        this.c_id = this.frameParame.c_id;
        this.f_id = this.frameParame.f_id;
    },
    watch: {
    },
    methods: {
        closeDialog(name) {
            if (!name) {
                this.$emit('closeDialog', 'FlowFrame'); // 执行父组件关闭方法
            } else {
                this.$emit('closeDialog', name); // 执行父组件关闭方法
            }
        },

        getDataList() {
            this.$emit('parentGetDataList');
        }
    }
}
</script>

<style scoped>
</style>
