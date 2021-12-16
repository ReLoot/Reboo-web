import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import router from '@/router'

import store from '@/store'
import http from '@/utils/http'

import {initI18n} from '@/utils/i18n'
import {appVersionCheck} from '@/utils/bootstrap'

// test code 
// import VConsole from 'vconsole'
// new VConsole()

import 'element-ui/lib/theme-chalk/display.css';
import '@/style/element-variables.scss'
import '@/style/rewrite.scss'
import '@/assets/style/font-awesome.min.css';
import '@/assets/style/font-orbitron.css';

import '@/utils/publicComponents'
import '@/utils/contract'

appVersionCheck()

const i18n = initI18n(localStorage.getItem('lang')||'en') // process.env.VUE_APP_LANG

Vue.use(ElementUI)

Vue.prototype.$http = http
Vue.prototype.$globalBus = new Vue()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
