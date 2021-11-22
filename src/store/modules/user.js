import Vue from 'vue'
export default {
  namespaced: true,
  state: {
    "userInfo": localStorage.getItem('USERINFO') || {},
    "account": localStorage.getItem('account') || '',
    "email": localStorage.getItem('email') || '',
    "gid": localStorage.getItem('gid') || null,
    "nickName": localStorage.getItem('nickName') || null,
    "subscribe": localStorage.getItem('subscribe') || 0,
    "nft": '',
    "nft_benefit": 0,       // 0为没有权限领取
    "ido_qua": false,       // ido qua
    "ido_partake": false,   // taked part in ido
    "balance": 0,
    "balance_ntf": 0,
    "landBox": [],
    "buildingBox": [],
    "landCard": [],
    "buildingCard": []
  },
  getters: {
    userInfo: state => state.userInfo || localStorage.getItem('USERINFO'),
    account: state => state.account || localStorage.getItem('account'),
    gid: state => state.gid || localStorage.getItem('gid'),
    email: state => state.email || localStorage.getItem('email'),
    subscribe: state => state.subscribe || localStorage.getItem('subscribe'),
    nickName: state => state.nickName || localStorage.getItem('nickName'),
    nft: state => state.nft,
    nft_benefit: state => state.nft_benefit,
    ido_qua: state=>state.ido_qua,       // ido qua
    ido_partake: state=>state.ido_partake,   // taked part in ido
    balance: state => state.balance,
    landBox: state => state.landBox,
    buildingBox: state => state.buildingBox,
    landCard: state => state.landCard,
    buildingCard: state => state.buildingCard
  },
  mutations: {
    userInfo(state, options) {
      Vue.set(state, 'userInfo', options)
    },
    account(state, str) {
      localStorage.setItem('account', str)
      Vue.set(state, 'account', str)
    },
    gid(state, num) {
      localStorage.setItem('gid', num)
      Vue.set(state, 'gid', num)
    },
    email(state, str) {
      localStorage.setItem('email', str)
      Vue.set(state, 'email', str)
    },
    nickName(state, str) {
      localStorage.setItem('nickName', str)
      Vue.set(state, 'nickName', str)
    },
    subscribe(state, sta) {
      localStorage.setItem('subscribe', sta)
      Vue.set(state, 'subscribe', sta)
    },
    nft(state, obj) {
      // Vue.set(state, 'nft', obj)
      state.nft = {...obj}
    },
    nft_benefit(state, sta) {
      state.nft_benefit = sta
    },
    ido_qua(state, sta) {
      state.ido_qua = sta
    },
    ido_partake(state, sta) {
      state.ido_partake = !sta
    },
    balance(state, num) {
      Vue.set(state, 'balance', parseFloat(num))
    },
    landBox(state, arr) {
      Vue.set(state, 'landBox', arr)
    },
    buildingBox(state, arr) {
      Vue.set(state, 'buildingBox', arr)
    },
    landCard(state, arr) {
      Vue.set(state, 'landCard', arr)
    },
    buildingCard(state, arr) {
      Vue.set(state, 'buildingCard', arr)
    }
  },
  actions: {
    updateUserInfo({commit, state}, options) {
      commit('userInfo', Object.assign(state, options))
    },  
    cleanAccount({commit}){
      localStorage.clear()
      // window.location.reload()    // temporary
      // let account_ = ''
      // localStorage.removeItem('account')
      // localStorage.removeItem('email')
      // localStorage.removeItem('gid')
      // localStorage.removeItem('nickName')
      // commit('account', account_)
      // commit('email', account_)
      // commit('subscribe', 0)
      // commit('gid', 0)
    }
  }
}