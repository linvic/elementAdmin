<template>
    <div class="wrapper">
        <v-header></v-header>
        <v-sidebar></v-sidebar>
        <div class="content">
                    
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>

        </div>
    </div>
</template>

<script>
    import vHeader from './Header.vue'
    import vSidebar from './Sidebar.vue'
    import '@/assets/css/home.css'
    import '../../../static/font/ElWebIcon/iconfont.css'
    export default {
        components: {
            vHeader,
            vSidebar
        },
        data() {
            return {
            }
        },
        created() {
    	}
    }
</script>
<style scoped>
    .content {
        overflow-x: auto;
    }
    .content > div {
        min-width: 800px;
    }
</style>