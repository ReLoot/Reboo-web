import {mergeArray, removeArrTarget} from '@/utils/tools'
import Vue from 'vue'
export default {
  namespaced: true,
  state: {
    "lang": null,
    "token": localStorage.getItem('token') || null,
    "loading": []
  },
  getters: {
    lang: state => state.lang || localStorage.getItem('lang'),
    token: state => state.token,
    loading: state => state.loading
  },
  mutations: {
    lang(state, str) {
        localStorage.setItem('lang', str)
        state.lang = str
    },
    token(state, str) {
      localStorage.setItem('token', str)
      state.token = str
    },
    loading (state, arr) {
      Vue.set(state, 'loading', arr)
    },
  },
  actions: {
    cleanToken({commit}){
      localStorage.removeItem('token')
      commit('token', '')
    },
    addLoading({commit, state}, obj) {
      let arr
      if (typeof obj == 'string')
        arr = new Array().push(obj)
      else
        arr = obj
      commit('loading', mergeArray(state.loading, arr))
    },
    deleteLoading({commit, state}, obj) {
      let arr
      if (typeof obj == 'string')
        arr = new Array().push(obj)
      else 
        arr = obj
      commit('loading', removeArrTarget(state.loading, arr))
    }
  }
}