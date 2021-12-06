import store from '@/store/index'

// const getFirstChild = (routes) => {
//   const route = routes[0]
//   if (!route.children || route.children.length === 0) {
//     return route
//   }
//   return getFirstChild(route.children)
// }
const commonRedirect = () => {
  return {name: 'home'}
}


const authenticate = (to, from, next, options) => {
  if(to.meta.auth==1 && !store.state.common.authentication) {
    const redirect = commonRedirect()
    next(redirect)
  }
  next()
}

const idRefused = (to, from, next, options) => {
  if(to.meta.id_refused==1 && !store.state.common.authentication && store.getters['user/nft']) {
    const redirect = commonRedirect()
    next(redirect)
  }
  next()
}

const idRequired = (to, from, next, options) => {
  if(to.meta.id_required==1 && (!store.state.common.authentication || store.getters['user/nft_benefit']==1)) {
    const redirect = commonRedirect()
    next(redirect)
  }
  next()
}

export default function (routes) {
  const gurads = {
    beforeEachGurads: [authenticate, idRefused, idRequired],
    afterEachGurads: []
  }

  gurads.beforeEachGurads.forEach(gurad => {
    if(gurad && typeof gurad == 'function') {
      routes.beforeEach((to, from, next, options) => gurad(to, from, next, options))
    }
  })

  gurads.afterEachGurads.forEach(gurad => {
    if(gurad && typeof gurad == 'function') {
      routes.beforeEach((to, from, next) => gurad(to, from, next))
    }
  })

}