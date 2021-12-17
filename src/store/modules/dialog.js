export default {
  namespaced: true,
  state: {
    'RECEIVE_NFT_AFTER_IDO':false,
    'RECEIVE_NFT_BEFORE_BIND_EMAIL': false,
    'BIND_EMAIL': false
  },
  getters: {
    'RECEIVE_NFT_AFTER_IDO': state => state['RECEIVE_NFT_AFTER_IDO'],
    'RECEIVE_NFT_BEFORE_BIND_EMAIL': state => state['RECEIVE_NFT_BEFORE_BIND_EMAIL'],
    'BIND_EMAIL': state => state['BIND_EMAIL']
  },
  mutations: {
    RECEIVE_NFT_AFTER_IDO(state, status) {
      state['RECEIVE_NFT_AFTER_IDO'] = status
    },
    RECEIVE_NFT_BEFORE_BIND_EMAIL(state, status) {
      if (status == true) {
        state['BIND_EMAIL'] = false
      } 
      state['RECEIVE_NFT_BEFORE_BIND_EMAIL'] = status
    },
    BIND_EMAIL(state, status) {
      state['BIND_EMAIL'] = status
    }
  }
}