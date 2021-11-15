import Vue from 'vue'
export default {
  namespaced: true,
  state: {
    "account": localStorage.getItem('account') || '',
    "email": localStorage.getItem('email') || '',
    "gid": localStorage.getItem('gid') || null,
    "nickName": localStorage.getItem('nickName') || null,
    "subscribe": localStorage.getItem('subscribe') || 0,
    "enableRecived": localStorage.getItem('enableRecived') || true,
    "balance": 0,
    "landBox": [],
    "buildingBox": [],
    "landCard": [],
    "buildingCard": []
  },
  getters: {
    account: state => state.account || localStorage.getItem('account'),
    gid: state => state.gid || localStorage.getItem('gid'),
    email: state => state.email || localStorage.getItem('email'),
    subscribe: state => state.subscribe || localStorage.getItem('subscribe'),
    nickName: state => state.nickName || localStorage.getItem('nickName'),
    enableRecived: state => state.enableRecived,
    balance: state => state.balance,
    landBox: state => state.landBox,
    buildingBox: state => state.buildingBox,
    landCard: state => state.landCard,
    buildingCard: state => state.buildingCard
  },
  mutations: {
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
    enableRecived(state, sta) {
      localStorage.setItem('enableRecived', sta)
      Vue.set(state, 'enableRecived', sta)
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
    cleanAccount({commit}){
      let account_ = ''
      localStorage.removeItem('account')
      localStorage.removeItem('email')
      localStorage.removeItem('gid')
      localStorage.removeItem('nickName')
      commit('account', account_)
      commit('email', account_)
      commit('subscribe', 0)
      commit('gid', 0)
    }
  }
}