export default (() => {
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
          name: 'market_boxesList',
          component: ()=>import('@/pages/Market'),
        },{
          path: 'cards',
          name: 'market_cardList',
          component: ()=>import('@/pages/Market'),
        }]
      },{
        path: '/personalInfo',
        name: 'personalInfo',
        component: ()=>import('@/pages/Account/personalInfo'),
        meta: {
          auth: 1,
        }
      },{
        path: '/idCard',
        name: 'idcard',
        component: ()=>import('@/pages/Account/idCard'),
        meta: {
          auth: 1,
          id_required: 1
        }
      },{
        path: '/receiveNFT',
        name: 'receivenft',
        component: ()=>import('@/pages/Account/receive'),
        meta: {
          auth: 1,
          id_refused: 1
        }
      },{
        path: '/ido',
        name: 'ido',
        component: ()=>import('@/pages/IDO'),
        meta: {
          view: 'IDO',
          ido_unpartake: 1
        }
      }]
    }]
  }
  return routes_
})()