export default {
  namespaced: true,
  state: {
    'RECEIVE_NFT_AFTER_IDO':false,
    'RECEIVE_NFT_BEFORE_BIND_EMAIL': false,
    'BIND_EMAIL': false,
    'SYNT_SELECT_CARD': false,
    'SYNT_RESULT': false
  },
  getters: {
    'RECEIVE_NFT_AFTER_IDO': state => state['RECEIVE_NFT_AFTER_IDO'],
    'RECEIVE_NFT_BEFORE_BIND_EMAIL': state => state['RECEIVE_NFT_BEFORE_BIND_EMAIL'],
    'BIND_EMAIL': state => state['BIND_EMAIL'],
    'SYNT_SELECT_CARD': state => state['SYNT_SELECT_CARD'],
    'SYNT_RESULT': state => state['SYNT_RESULT']
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
    },
    SYNT_SELECT_CARD(state, status) {
      state['SYNT_SELECT_CARD'] = status
    },
    SYNT_RESULT(state, status) {
      state['SYNT_RESULT'] = status
    }
  }
}