import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import router from '@/router'

import cusBtnEin from '@/components/button/btn_style_ein'
import cusDivider from '@/components/divider/divider_ein'

import store from '@/store'
import mu from '@/utils/metaMaskUtil'
import {initI18n} from '@/utils/i18n'
import cus_http from '@/utils/http'

import 'element-ui/lib/theme-chalk/display.css';
import '@/style/element-variables.scss'
import '@/style/rewrite.scss'
import '@/assets/style/font-awesome.min.css';
import '@/assets/style/font-orbitron.css';

Vue.use(ElementUI)

Vue.component('cusBtnEin', cusBtnEin)
Vue.component('cusDivider', cusDivider)


Vue.config.productionTip = false

Vue.prototype.$http = cus_http
Vue.prototype.$mu = new mu()

// const i18n = initI18n('zh') //jsCookie.get('lang')?jsCookie.get('lang'):process.env.VUE_APP_LANG
const i18n = initI18n('en') //jsCookie.get('lang')?jsCookie.get('lang'):process.env.VUE_APP_LANG

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
