import axios from 'axios'
import store from '@/store'
import router from '@/router'
import Vue from 'vue'

axios.defaults.baseURL = ''
axios.defaults.method = 'post'

axios.defaults.errorHandler = function (message) {
	Vue.prototype.$message({
		type: 'warning',
		message
	})
}

axios.defaults.loading = false
axios.defaults.withCredentials = true
// axios.defaults.headers.post['content-Type'] = 'appliction/x-www-form-urlencoded';

// 请求拦截器
axios.interceptors.request.use(function (config) {
	if(store.state.login.user.token)
		config.headers.Authorization =  'Bearer ' + store.state.login.user.token
	if(config.loading)
		config.loading.loading = true
	return config
})

// 响应拦截器
axios.interceptors.response.use(
    function (response) {
        if(response.data instanceof Blob) {
            var blob = response.data
            var contentDisposition = response.headers['content-disposition']
            var filename = contentDisposition.split('"')[1]
            createDownload(filename, blob)
            function createDownload(fileName, blob){
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = fileName;
                link.click();
                window.URL.revokeObjectURL(link.href);
            }
            return response.data 
        }
	    if(response.config.loading)
            response.config.loading.loading = false
        var code = response.data.code
        switch(code) {
            case 0:return response.data;break;
            default: axios.defaults.errorHandler(response.data.msg);return Promise.reject(response.data);
        }
    }, function (error) {
        if(error.config && error.config.loading) {
            error.config.loading.loading = false
        }
        return Promise.reject(error)
})

export default axios