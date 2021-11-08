export default {
  namespaced: true,
  state: {
    "lang": null,
  },
  getters: {
    lang: state => localStorage.getItem('lang') || state.lang
  },
  mutations: {
    lang(state, str) {
        localStorage.setItem('lang', str)
        state.lang = str
    }
  }
}