import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'

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
                        title: '主页',
                        requireAuth: true
                    },
                    component: resolve => require(['../pages/Index'], resolve)
                },
                // 总监办
                {
                    name: 'DeleteApplyLists',
                    path: '/Controls/DeleteApply/Lists',
                    meta: {
                        title: '删除申请',
                        requireAuth: true
                    },
                    component: resolve => require(['../pages/Controls/DeleteApply/Lists'], resolve)
                },
                {
                    name: 'ChangeSalesmanLists',
                    path: '/Controls/ChangeSalesman/Lists',
                    meta: {
                        title: '变更业务员',
                        requireAuth: true
                    },
                    component: resolve => require(['../pages/Controls/ChangeSalesman/Lists'], resolve)
                },
                {
                    name: 'MyApply',
                    path: '/Controls/MyApply',
                    meta: {
                        title: '变更业务员',
                        requireAuth: true
                    },
                    component: resolve => require(['../pages/Controls/MyApply'], resolve)
                },
                // 楼盘管理
                {
                    name: 'EstateGuide',
                    path: '/Estate/Guide',
                    meta: {
                        title: '批量向导',
                        requireAuth: true
                    },
                    component: resolve => require(['../pages/Estate/Guide'], resolve)
                },
                {
                    name: 'EstateDossier',
                    path: '/Estate/Dossier',
                    meta: {
                        title: '房产档案',
                        requireAuth: true
                    },
                    component: resolve => require(['../pages/Estate/Dossier'], resolve)
                },
                {
                    name: 'EstateSelling',
                    path: '/Estate/Selling',
                    meta: {
                        title: '房屋放盘',
                        requireAuth: true
                    },
                    component: resolve => require(['../pages/Estate/Selling'], resolve)
                },
                // CRM
                {
                    name: 'CluesLists',
                    path: '/CRM/Clues/Lists',
                    meta: {
                        title: '线索客户',
                        requireAuth: true
                    },
                    component: resolve => require(['../pages/CRM/Clues/Lists'], resolve)
                },
                {
                    name: 'ChanceLists',
                    path: '/CRM/Chance/Lists',
                    meta: {
                        title: '机会客户',
                        requireAuth: true
                    },
                    component: resolve => require(['../pages/CRM/Chance/Lists'], resolve)
                },
                {
                    name: 'OldLists',
                    path: '/CRM/Old/Lists',
                    meta: {
                        title: '老客户',
                        requireAuth: true
                    },
                    component: resolve => require(['../pages/CRM/Old/Lists'], resolve)
                },
                {
                    name: 'PublicLists',
                    path: '/CRM/Public/Lists',
                    meta: {
                        title: '公海客户',
                        requireAuth: true
                    },
                    component: resolve => require(['../pages/CRM/Public/Lists'], resolve)
                },
                // 系统配置
                {
                    name: 'DicList',
                    path: '/System/DataDic/DicList',
                    meta: {
                        title: '数据字典',
                        requireAuth: true
                    },
                    component: resolve => require(['../pages/System/DataDic/DicList'], resolve)
                },
                {
                    name: 'FollowUpSet',
                    path: '/System/Config/FollowUpSet',
                    meta: {
                        title: '跟进配置',
                        requireAuth: true
                    },
                    component: resolve => require(['../pages/System/Config/FollowUpSet'], resolve)
                },
                {
                    name: 'StructureList',
                    path: '/System/Structure/List',
                    meta: {
                        title: '组织架构',
                        requireAuth: true
                    },
                    component: resolve => require(['../pages/System/Structure/List'], resolve)
                },
                {
                    name: 'PositionList',
                    path: '/System/Position/List',
                    meta: {
                        title: '职位管理',
                        requireAuth: true
                    },
                    component: resolve => require(['../pages/System/Position/List'], resolve)
                },
                {
                    name: 'RoleList',
                    path: '/System/Role/List',
                    meta: {
                        title: '角色管理',
                        requireAuth: true
                    },
                    component: resolve => require(['../pages/System/Role/List'], resolve)
                },
                {
                    name: 'PowerLists',
                    path: '/System/Power/Lists',
                    meta: {
                        title: '功能配置',
                        requireAuth: true
                    },
                    component: resolve => require(['../pages/System/Power/Lists'], resolve)
                },
                {
                    name: 'UserList',
                    path: '/System/User/List',
                    meta: {
                        title: '用户管理',
                        requireAuth: true
                    },
                    component: resolve => require(['../pages/System/User/List'], resolve)
                },
                {
                    name: 'CustomerLeads',
                    path: '/Customer/Leads',
                    meta: {
                        title: '销售线索管理-智领房产销售系统',
                        requireAuth: true
                    },
                    component: resolve => require(['../pages/Customer/Leads'], resolve)
                }
            ]
        },
        {
            name: 'Login',
            path: '/Login',
            meta: {
                title: '智领房产销售系统-用户登录',
                requireAuth: false
            },
            component: resolve => require(['../pages/Login'], resolve)
        },
        { path: '*', component: resolve => require(['../pages/404'], resolve) }
    ]
});
// 路由拦截
router.beforeEach((to, from, next) => {
    if (to.path === '/') {
        // 用户使用后退返回到授权页，则默认回到首页
        next('/Index')
    }

    // 路由判断是否需要登录
    if (to.meta.requireAuth) {

        // 判断是否已登录
        if (localStorage.getItem('UserAccount')) {
            next()
        } else { // 未登录
            console.log('未登录')
            next({
                path: '/Login'
            })
        }
    } else {
        next()
    }
    
})
// 配置全局的axios
Vue.prototype.$https = axios;
axios.defaults.baseURL = 'http://dev.crm.zhiling.net.cn';
axios.defaults.withCredentials = true; //让携带cookie
//axios.defaults.baseURL = 'http://localhost:49764/';
// !!! GET示例：
// this.$https.get('/api/Dicts/GetValues', {
//     params: {
//         page: this.currentPage,
//         page_size: this.pageSize,
//         type_id: this.currentDicType,
//         keyword: ''
//     }
// }).then((result) => {
//     if (result.data.code == 0) {
//         console.log(result.data);
//     } else {
//         this.$message({
//             type: 'error',
//             showClose: true,
//             message: result.data.message
//         })
//     }
// })
// .catch((error) => {
//     console.log('请求失败',error)
// })
// !!! POST示例:
// this.$https.post('/api/Dicts/AppendTypes', {
//     ParentId: this.form.ParentId,
//     TypeName: this.form.TypeName,
//     TypeCode: this.form.TypeCode,
//     SortOrder: this.form.SortOrder,
//     IsEnabled: this.form.IsEnabled,
//     IsDeleted: false,
//     TypeDesc: this.form.TypeDesc,
// }).then((result) => {
//     if (result.data.code == 0) {
//         this.$message({
//             type: 'success',
//             showClose: true,
//             message: '添加成功',
//             onClose: () => {
//                 // 关闭当前dialog，
//                 this.closeDialog();
//                 // 刷新列表
//                 this.$emit('parentGetDataList');
//             }
//         })
//     } else {
//         this.$message({
//             type: 'error',
//             showClose: true,
//             message: result.data.message
//         })
//     }
// })
// .catch((error) => {
//     console.error('请求失败',error)
// })

// 添加请求拦截器
axios.interceptors.request.use(
    (config) => {
        // config.headers['Content-Type'] = 'application/x-www-form-urlencoded' // 在拦截器中强制为，简单请求。
        // 在发送请求之前做些什么
        if (localStorage.getItem('Token')) {  // 判断是否存在token，如存在，则每个http header都加上token
            config.headers.Authorization = 'Bearer ' + localStorage.getItem('Token');
        }
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
    )

// 添加响应拦截器
axios.interceptors.response.use(
    (response) => {
        // 对响应数据做些什么
        return response;
    },
    (error) => {
        // 对响应错误做些什么
        if(error.response) {
            if(error.response.status === 401) {
                // 401 未登陆 则需跳转登陆页
                router.replace({
                    path: '/Login'
                })
            }
        }
        return Promise.reject(error.response.data);
    }
    )


// router.push('/service')
export default router
