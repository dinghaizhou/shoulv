import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import login from './views/login'
import user from './views/user'

export default new Vuex.Store({
    modules: {
        login,
        user
    }
})

