import Vue from 'vue'
export default {
  namespaced: true,
  state: {
    'VOTE_DATA': null
  },
  getters: {
    'VOTE_DATA': state => state['VOTE_DATA']
  },
  mutations: {
    'VOTE_DATA'(state, list) {
      Vue.$set(state, 'VOTE_DATA', list)
    }
  }
}