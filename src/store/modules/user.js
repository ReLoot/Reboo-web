import Vue from 'vue'
import $http from '@/utils/http'

export default {
  namespaced: true,
  state: {
    "userInfo": localStorage.getItem('USERINFO') || {},
    "account": localStorage.getItem('account') || '',
    "email": localStorage.getItem('email') || '',
    "gid": localStorage.getItem('gid') || null,
    "nickName": localStorage.getItem('nickName') || null,
    "subscribe": localStorage.getItem('subscribe') || 0,
    "nft": {},
    "nft_benefit": null,       // 0为没有权限领取
    "ido_qua": false,       // ido qua
    "ido_unpartake": true,   //no taked part in ido
    "balance": 0,
    "landBox": [],
    "buildingBox": [],
    "landCard": [],
    "buildingCard": [],
    "unsetBuildingCard": []
  },
  getters: {
    userInfo: state => state.userInfo || localStorage.getItem('USERINFO'),
    account: state => state.account || localStorage.getItem('account'),
    gid: state => state.gid || localStorage.getItem('gid'),
    email: state => state.email || localStorage.getItem('email'),
    subscribe: state => state.subscribe || localStorage.getItem('subscribe'),
    nickName: state => state.nickName || localStorage.getItem('nickName'),
    nft: state => state.nft,
    nft_benefit: state => state.nft_benefit,
    ido_qua: state=>state.ido_qua,       // ido qua
    ido_unpartake: state=>state.ido_unpartake,   // taked part in ido
    balance: state => state.balance,
    landBox: state => state.landBox,
    buildingBox: state => state.buildingBox,
    landCard: state => state.landCard,
    buildingCard: state => state.buildingCard,
    unsetBuildingCard: state => state.unsetBuildingCard,
  },
  mutations: {
    userInfo(state, options) {
      Vue.set(state, 'userInfo', options)
    },
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
    nft(state, obj) {
      // Vue.set(state, 'nft', obj)
      state.nft = {...obj}
    },
    nft_benefit(state, sta) {
      state.nft_benefit = sta
    },
    ido_qua(state, sta) {
      state.ido_qua = sta
    },
    ido_unpartake(state, sta) {
      state.ido_unpartake = !sta
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
    },
    landBoxRemain(state, num) {
      Vue.set(state, 'landBoxRemain', num)
    },
    buildBoxRemain(state, num) {
      Vue.set(state, 'buildBoxRemain', num)
    },
    unsetBuildingCard(state, arr) {
      Vue.set(state, 'unsetBuildingCard', arr)
    },
  },
  actions: {
    updateUserInfo({commit, state}, options) {
      commit('userInfo', Object.assign(state, options))
    },  
    async updateUnsetBuildingCard({commit, state}, options) {
      try {
        const res = await $http('getUsefulBuildingCard', {eth_address: state.account})
        if(res && res.data)
          commit('unsetBuildingCard', res.data)
      } catch (err) {
        console.error(err)
      }
    },
    cleanAccount({commit}){
      localStorage.clear()
      commit('account', '')
      commit('email', '')
      commit('gid', '')
      commit('nickName', '')
      commit('subscribe', 0)
      commit('nft', {})
      commit('nft_benefit', null)
      commit('ido_qua', false)
      commit('ido_unpartake', true)
      commit('balance', 0)
      commit('landBox', [])
      commit('buildingBox', [])
      commit('landCard', [])
      commit('buildingCard', [])
      commit('unsetBuildingCard', [])
    }
  }
}