import Vue from 'vue'
import App from './App'
import uView from 'uview-ui'
import $http from '@/js_sdk/app-request/requestConfig';
import store from './store/index.js'
import config from '@/api/configuration.js'
Vue.prototype.$store = store;
Vue.prototype.$http = $http; 
Vue.prototype.$cfg = config; 
Vue.use(uView)
Vue.config.productionTip = false


App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
