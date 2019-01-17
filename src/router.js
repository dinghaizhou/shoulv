import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from '@/store'

Vue.use(Router)

export const baseRoutes = [
    {
        path: '/login',
        component: () => import('./views/login/Login.vue'),
    }
]

export const asyncRouterMap = [
    {
        path: '/',
        name: 'home',
        component: Home,
        redirect: '/user',
        meta: {
            title: '首页'
        },
        children: [
            {
                name: 'user',
                path: 'user',
                component: () => import('./views/user/User.vue'),
                meta: {
                    title: '用户中心'
                }
            },
            {
                name: 'selected',
                path: 'selected',
                component: () => import('./views/selected/Selected.vue'),
                meta: {
                    title: '人群优选'
                }
            },
            {
                name: 'insight',
                path: 'insight',
                component: () => import('./views/insight/Insight.vue'),
                meta: {
                    title: '用户洞察',
                }
            },
            {
                path: '/setting',
                component: () => import('./views/setting/Setting.vue'),
                name: 'setting',
                meta: { 
                    title: '权限测试',
                    role: ['admin', 'super'] 
                }, //页面需要的权限
            }
        ]
    },
    {
        path: '*',
        redirect: '/'
    }
];
  
let router = new Router({
    mode: 'hash',
    // base: process.env.BASE_URL,
    routes: baseRoutes
})

router.beforeEach((to, from, next) => {
    if(store.state.login.user.token) {
        if(to.path === '/login') {
            next({path: '/'})
        } else {
            if (store.state.login.user.roles.length === 0) {
                store.dispatch('GetInfo').then(res => { 
                    // 拉取info
                    const roles = res.roles;
                    store.dispatch('GenerateRoutes', roles).then(() => { // 生成可访问的路由表
                        router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
                        next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                    })
                  }).catch(err => {
                    console.log(err);
                  });
            }  else {
                next()
            }
        }
    } else {
        if(to.path === '/login') {
            next()
        } else {
            next('/login')
        }
    }
});
export default router
