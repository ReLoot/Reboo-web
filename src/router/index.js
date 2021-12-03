import Vue from 'vue'
import Router from 'vue-router'
import routes from './config'
import routerGuard from './guards'

/* debug for error taost redict route */
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)
const RouterOption = new Router({mode:'history', routes})
routerGuard(RouterOption)


export default RouterOption