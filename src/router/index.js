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
            component: resolve => require(['../components/common/Home'], resolve),
            children:[
                {
                    name: 'index',
                    path: '/index',
                    meta: {
                        title: '主页'
                    },
                    component: resolve => require(['../pages/index'], resolve)
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
        }
    ]
})


// router.push('/service')
export default router
