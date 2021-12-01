import {mergeArray, removeArrTarget} from '@/utils/tools'
import Vue from 'vue'
export default {
  namespaced: true,
  state: {
    "lang": null,
    "token": localStorage.getItem('token') || null,
    "loadingWarden": [],
    "idoMaxCandidate": 0,
    "pageMenuVisible": false,
  },
  getters: {
    lang: state => state.lang || localStorage.getItem('lang'),
    token: state => state.token,
    loadingWarden: state => state.loadingWarden,
    idoMaxCandidate: state => state.idoMaxCandidate,
    pageMenuVisible: state => state.pageMenuVisible,
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
    idoMaxCandidate(state, num) {
      Vue.set(state, 'idoMaxCandidate', num)
    },
    pageMenuVisible(state, sta) {
      Vue.set(state, 'pageMenuVisible', sta)
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
    },
    pageMenuTrigger({commit, state}) {
      let state_ = state.pageMenuVisible
      commit('pageMenuVisible', !state_)
    },
  }
}