export default (() => {
  let routes_
  const dev_type = process.env.VUE_APP_DEV_TYPE
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
    },{
      path: '/mint',
      name: 'synths',
      component: ()=>import('@/pages/synthesize'),
      redirect: {name: 'synths_table'},
      meta: {
        view: 'header.navItem5',
      },
      children: [{
        path: 'table',
        name: 'synths_table',
        component: ()=>import('@/pages/synthesize'),
        meta: {
          auth: 1
        }
      },{
        path: 'cards',
        name: 'synths_cards',
        component: ()=>import('@/pages/synthesize'),
        meta: {
          auth: 1
        }
      },{
        path: 'records',
        name: 'synths_records',
        component: ()=>import('@/pages/synthesize'),
        meta: {
          auth: 1
        }
      }]
    },
    // {
    //   path: '/dao',
    //   name: 'dao',
    //   component: ()=>import('@/pages/Dao'),
    //   redirect: {name: 'dao_list'},
    //   meta: {
    //     view: 'DAO',
    //     auth: 1,
    //   },
    //   children:[{
    //     path: 'all',
    //     name: 'dao_list',
    //     component: () => import('@/pages/Dao/list')
    //   },{
    //     path: 'v*',
    //     name: 'dao_current',
    //     component: () => import('@/pages/Dao/vote'),
    //   }]
    // },
    // {
    //   path: '/lucky',
    //   name: 'lucky',
    //   component:()=>import('@/pages/Lucky'),
    //   redirect: {name: 'lucky_rule'},
    //   meta: {
    //     view: 'Lucky Star'
    //   },
    //   children:[{
    //     path: 'rule',
    //     name: 'lucky_rule',
    //     component:()=>import('@/pages/Lucky')
    //   },{
    //     path: 'record',
    //     name: 'lucky_record',
    //     component:()=>import('@/pages/Lucky')
    //   },{
    //     path: 'wish',
    //     name: 'lucky_wish',
    //     component:()=>import('@/pages/Lucky')
    //   }]
    // },
    // {
    //   path: '/ttt',
    //   name: 'test',
    //   component:()=>import('@/pages/Test')
    // }
    ]
  }]
  return routes_
})()