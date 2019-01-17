import { asyncRouterMap, baseRoutes } from '@/router'

function hasPermission(roles, route) {
    if (route.meta && route.meta.role) {
      return roles.some(role => route.meta.role.indexOf(role) >= 0)
    } else {
      return true
    }
}

export default {
    state: {
        title: '33',
        user: {
            token: localStorage.getItem('token'),
            id: '',
            roles: [],
        },  
        addRoute: [],
        router: []
    },
    mutations: {
        login(state, identity) {
            state.user.token = identity.token
            localStorage.setItem('token', identity.token)
        },
        loginOut(state) {
            state.user.token = null
            localStorage.removeItem('token')
        },
        changePageTile(state, data) {
            state.title = data
        },
        SET_ROLES(state, data) {
            state.user.roles = data
        },
        SET_ROUTERS(state, data) {
            state.addRoute = data
            state.router = baseRoutes.concat(data)
        }
    },
    actions: {
        GetInfo({commit}) {
            return new Promise((resolve, reject) => {
                // 模拟请求用户信息 roles
                let token = localStorage.getItem('token')
                var data = {}
                if (token == 1) {
                    data.roles = ['admin']
                } else {
                    data.roles = ['normal']
                }
                commit('SET_ROLES', data.roles)
                resolve(data)
            })
        },
        GenerateRoutes(context, roles) {
            return new Promise((resolve) => {
                const accessedRouters = asyncRouterMap.filter(item => {
                // 超级管理员，全部添加
                if (roles.indexOf('admin') >= 0) return true;
                
                if (hasPermission(roles, item)) {
                    if (item.children && item.children.length > 0) {
                            item.children = item.children.filter(child => {
                                if (hasPermission(roles, child)) {
                                    return true
                                }
                                return false;
                            });
                            return true
                        }
                        return true
                    } else {
                        return false
                    }
                });
                context.commit('SET_ROUTERS',accessedRouters)
                resolve()
            })
        }
    },
    getters: {
        addRouters(state) {

            return state.addRoute
        }
    }
}