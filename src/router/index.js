import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
    mode: 'history',
    routes: [
        {
            name: 'Home',
            path: '/',
            meta: {
                title: '智领房产销售系统'
            },
            redirect: '../Index',
            component: resolve => require(['../components/common/Home'], resolve),
            children:[
                {
                    name: 'Index',
                    path: '/Index',
                    meta: {
                        title: '主页'
                    },
                    component: resolve => require(['../pages/Index'], resolve)
                },
                {
                    name: 'DicList',
                    path: '/System/DataDic/DicList',
                    meta: {
                        title: '数据字典'
                    },
                    component: resolve => require(['../pages/System/DataDic/DicList'], resolve)
                },
                {
                    name: 'CustomerLeads',
                    path: '/Customer/Leads',
                    meta: {
                        title: '销售线索管理-智领房产销售系统'
                    },
                    component: resolve => require(['../pages/Customer/Leads'], resolve)
                }
            ]
        },
        { path: '*', component: resolve => require(['../pages/NotFind'], resolve) }
    ]
});
// 路由拦截
router.beforeEach((to, from, next) => {
    if (to.path === '/') {
        // 用户使用后退返回到授权页，则默认回到首页
        next('/Index')
        return false
    }
    next()
})

// router.push('/service')
export default router
