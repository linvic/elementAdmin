<template>
    <div>
        <el-card>

            <!-- 待付款证明 -->
            <ProofOfPendingPayment v-if="template_code === 'ProofOfPendingPayment'" @closeDialog="closeDialog" @parentGetDataList="getDataList" :frameParame="frameParame" :editId="editId"></ProofOfPendingPayment>
            <!-- 入园登记表 -->
            <EnterParkRegistrationForm v-else-if="template_code === 'EnterParkRegistrationForm'" @closeDialog="closeDialog" @parentGetDataList="getDataList" :frameParame="frameParame" :editId="editId"></EnterParkRegistrationForm>
            <!-- 预售通知书 -->
            <AdvanceSaleNotice v-else-if="template_code === 'AdvanceSaleNotice'" @closeDialog="closeDialog" @parentGetDataList="getDataList" :frameParame="frameParame" :editId="editId"></AdvanceSaleNotice>
            <!-- 购买意向书 -->
            <PurchaseIntention v-else-if="template_code === 'PurchaseIntention'" @closeDialog="closeDialog" @parentGetDataList="getDataList" :frameParame="frameParame" :editId="editId"></PurchaseIntention>
            <div v-else>文档加载错误</div>
        </el-card>
    </div>
</template>

<script>

import ProofOfPendingPayment from './Templates/ProofOfPendingPayment' // 待付款证明
import EnterParkRegistrationForm from './Templates/EnterParkRegistrationForm' // 入园登记表
import AdvanceSaleNotice from './Templates/AdvanceSaleNotice' // 预售通知书
import PurchaseIntention from './Templates/PurchaseIntention' // 购买意向书

export default {
    components: {
        ProofOfPendingPayment, // 待付款证明
        EnterParkRegistrationForm, // 入园登记表
        AdvanceSaleNotice, // 预售通知书
        PurchaseIntention, // 购买意向书
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
            template_code: ''
        }
    },
    created() {
        if(!this.frameParame) {
            alert('模板加载失败，请选择模板')
        }
        console.info(this.template_code)
        this.template_code = this.frameParame.code;
    },
    watch: {
    },
    methods: {
        closeDialog(name) {
            if (!name) {
                this.$emit('closeDialog', 'Frame'); // 执行父组件关闭方法
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
