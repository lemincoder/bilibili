import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css';
import less from 'less'
import http from "./network/http";
import {Toast} from 'vant'
import '@/assets/style.css'

Vue.prototype.$http = http
Vue.prototype.$msg = Toast

Vue.config.productionTip = false
//
Vue.use(Vant);
Vue.use(less)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
