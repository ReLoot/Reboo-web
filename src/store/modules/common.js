import {mergeArray, removeArrTarget} from '@/utils/tools'
import Vue from 'vue'
export default {
  namespaced: true,
  state: {
    "lang": null,
    "token": localStorage.getItem('token') || null,
    "loadingWarden": []
  },
  getters: {
    lang: state => state.lang || localStorage.getItem('lang'),
    token: state => state.token,
    loadingWarden: state => state.loadingWarden
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
    loadingWarden (state, arr) {
      Vue.set(state, 'loadingWarden', arr)
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
        arr = [obj]
      else
        arr = obj
      commit('loadingWarden', mergeArray(state.loadingWarden, arr))
    },
    deleteLoading({commit, state}, obj) {
      let arr
      if (typeof obj == 'string')
        arr = new Array().push(obj)
      else 
        arr = obj
      commit('loadingWarden', removeArrTarget(state.loadingWarden, arr))
    }
  }
}