import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/index.scss';
import echarts from 'echarts'
import http from  './utils/http'
import Cookies from 'js-cookie';

import VueAwesomeSwiper from 'vue-awesome-swiper'
import '@/assets/css/swiper.css'
Vue.use(VueAwesomeSwiper)

Vue.prototype.$echarts = echarts
Vue.prototype.$http = http
Vue.prototype.$Cookies = Cookies

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
