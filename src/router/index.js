import Vue from 'vue'
import Router from 'vue-router'
// import options from './config'
import store from '@/store/index'

/* debug for error taost redict route */
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const routes = (() => {
  let routes_
  const dev_type = process.env.VUE_APP_DEV_TYPE
  if (dev_type && dev_type == 'api_test') {
    routes_ = [{
      path: '*',
      name: '404',
      // component: ()=>import('@/pages/404')
      redirect: '/eins'
    },{
      path: '/',
      component: ()=>import('@/components/template_2.vue'),
      redirect: '/eins',
      children: [{
        path: 'eins',
        component: ()=>import('@/pages/api_test')
      }]
    }]
  } else {
    routes_ = [{
      path: '*',
      name: '404',
      // component: ()=>import('@/pages/404')
      redirect: {name: 'home'}
    },{
      path: '/',
      component: ()=>import('@/components/template_1.vue'),
      redirect: {name: 'home'},
      children: [{
        path: '/home',
        name: 'home',
        component: ()=>import('@/pages/Home'),
        meta: {
          view: 'header.navItem1'
        }
      },{
        path: '/roadmap',
        name: 'roadmap',
        component: ()=>import('@/pages/Roadmap'),
        meta: {
          view: 'header.navItem2'
        }
      },{
        path: '/token',
        name: 'token',
        component: ()=>import('@/pages/Token'),
        meta: {
          view: 'header.navItem3'
        }
      },{
        path: '/market',
        name: 'market',
        component: ()=>import('@/pages/Market'),
        meta: {
          view: 'header.navItem4'
        },
        children: [{
          path: 'boxes',
          name: 'boxesList',
          component: ()=>import('@/pages/Market'),
        },{
          path: 'cards',
          name: 'cardList',
          component: ()=>import('@/pages/Market'),
        }]
      },{
        path: '/personalInfo',
        name: 'personalInfo',
        component: ()=>import('@/pages/Account/personalInfo'),
      },{
        path: '/idCard',
        name: 'idcard',
        component: ()=>import('@/pages/Account/idCard'),
        meta: {
          ido: 1,
        }
      },{
        path: '/receiveNFT',
        name: 'receivenft',
        component: ()=>import('@/pages/Account/receive'),
        meta: {
          ido: 1,
          nft_recieved: 1
        }
      },{
        path: '/ido',
        name: 'ido',
        component: ()=>import('@/pages/IDO'),
        meta: {
          view: 'IDO'
        }
      }]
    }]
  }
  return routes_
})()

const RouterOption = new Router({mode:'history', routes})
RouterOption.beforeEach((to, from, next) => {
  // const ido_unpartake = store.getters['user/ido_unpartake']
  // if(to.meta.ido == 1 && ido_unpartake) {
  //   next({name: 'home'})
  // }
  
  // if(to.meta.nft_recieved == 1 && nft_benefit == 0) {
  //   next({name: 'idcard'})
  // }
  next()
})


export default RouterOption