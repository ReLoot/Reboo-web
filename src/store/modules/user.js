import Vue from 'vue'
export default {
  namespaced: true,
  state: {
    "account": null,
  },
  getters: {
    account: state => state.account || localStorage.getItem('account')
  },
  mutations: {
    account(state, str) {
      localStorage.setItem('account', str)
      Vue.set(state, 'account', str)
    }
  },
  actions: {
    cleanAccount({commit}){
      let account_ = ''
      localStorage.removeItem('account')
      commit('account', account_)
    }
  }
}