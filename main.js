import Vue from 'vue'
import App from './App'
import uView from 'uview-ui'
import $http from '@/js_sdk/app-request/requestConfig';
import store from './store/index.js'
Vue.prototype.$store = store;
Vue.prototype.$http = $http; 
Vue.use(uView)
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
