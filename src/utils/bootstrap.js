import store from '@/store/index'
import $http from '@/utils/http'
import {metaMaskUtils} from '@/utils/metaMaskUtil'
import {showTipsMsg} from '@/utils/message'

const UA = navigator.userAgent.toLowerCase()

export const appVersionCheck = async () => {
  // const appVer = localStorage.getItem('APP_VERSION')
  // appVer != process.env.VUE_APP_VERSION ||
  // if(UA.match(/mobile/g)) {
  //   // localStorage.clear()
  //   store.dispatch('user/cleanAccount')
  //   store.dispatch('common/cleanToken')
  // }
  return
}

export const pageInitlization = async (type) => {
  const MU = new metaMaskUtils()
  const AUTH_TOKEN = localStorage.getItem('token')
  let account
  
  if (type || AUTH_TOKEN || UA.match(/mobile/g)) {
    account = await MU.initlization()
    // MU.eventRegister()
  }

  try {
    if(account){
      let params = {eth_address: account}
      store.dispatch('common/addLoading', 'commonAuthLoading')
      if (AUTH_TOKEN) {
        console.log('get user info ----------------')

        const userInfo = await $http('user_info', params)
        if(userInfo && userInfo.data) {
          store.commit('user/email', userInfo.data.email)
          store.commit('user/subscribe', userInfo.data.subscribe)
          store.commit('user/gid', userInfo.data.game_no)
          store.commit('user/nft', userInfo.data.nft || null)
          store.commit('user/nft_benefit', userInfo.data.nft_benefit)
          store.commit('user/nickName', userInfo.data.name)
        }

        const whiteList = await $http('whiteList', params)
        if (whiteList && whiteList.data) {
          store.commit('user/ido_qua', Boolean(parseInt(whiteList.data.is_white)))
        }
        store.dispatch('common/deleteLoading', 'commonAuthLoading')
        store.commit('common/authentication', true)
      } else {
        const authInfo = await $http('login', {eth_address: account})
        if(authInfo && authInfo.data) {
          // when login successed catched the account
          store.commit('user/account', account)

          store.commit('common/token', authInfo.data.token)
          store.commit('user/subscribe', authInfo.data.user_info.subscribe)
          store.commit('user/email', authInfo.data.user_info.email || '')
          pageInitlization()
        } else {
          showTipsMsg('Get auth information failed, please login again')
        }
      }
      // set app version
      localStorage.setItem('APP_VERSION', process.env.VUE_APP_VERSION)
    }
  } catch (err) {
    store.dispatch('common/deleteLoading', 'commonAuthLoading')
    console.error(err)
  }
}