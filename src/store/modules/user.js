import Vue from 'vue'
export default {
  namespaced: true,
  state: {
    "account": null,
    "balance": 0,
    "territoryBox": [],
    "buildingBox": [],
    "landCard": [],
    "toolsCard": []
  },
  getters: {
    account: state => state.account || localStorage.getItem('account'),
    territoryBox: state => state.territoryBox,
    buildingBox: state => state.buildingBox,
    landCard: state => state.landCard,
    toolsCard: state => state.toolsCard
  },
  mutations: {
    account(state, str) {
      localStorage.setItem('account', str)
      Vue.set(state, 'account', str)
    },
    balance(state, num) {
      Vue.set(state, 'balance', num)
    },
    territoryBox(state, arr) {
      Vue.set(state, 'territoryBox', arr)
    },
    buildingBox(state, arr) {
      Vue.set(state, 'buildingBox', arr)
    },
    landCard(state, arr) {
      Vue.set(state, 'landCard', arr)
    },
    toolsCard(state, arr) {
      Vue.set(state, 'toolsCard', arr)
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