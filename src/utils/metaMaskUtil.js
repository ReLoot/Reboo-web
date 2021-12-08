import detectEthereumProvider from "@metamask/detect-provider"
import store from '@/store/index'
import Web3 from "web3"

import {pageInitlization} from '@/utils/bootstrap'
// import tp from 'tp-js-sdk'

import {showTipsMsg} from '@/utils/message'

export class metaMaskUtils {
  provider_
  account = store.getters["user/account"]
  
  constructor (params) {
    this.options = {
      network: process.env.VUE_APP_NETWORK
    } 

    if (typeof(params) == 'object')
      Object.assign(this.options, params)
  }

  async initlization () {
    const provider_ = await new detectEthereumProvider()
    this.provider_ = provider_

    if (this.provider_) {
      let check_ = await this.networkCheck()
      if (!check_) return false

      try { 
        const accounts = await this.provider_.request({ method: 'eth_requestAccounts' });
        this.account = new Web3().utils.toChecksumAddress(accounts[0])
        return this.account
      } catch (err) {
        console.error(err)
      }

    } else {
      const tips = 'Please install MetaMask'
      showTipsMsg(tips)
    }
  }

  async getNetworkVersion (){
    const chainId = await this.provider_.request({method: 'eth_chainId'});
    const networkId = await this.provider_.request({method: 'net_version'});
    return { chainId, networkId }
  }

  async networkCheck(){
    let {networkId} = await this.getNetworkVersion()
    if(networkId != this.options.network) {
      let tips = `Current network ${networkId} is not supported, Please switch BSC network`
      showTipsMsg(tips)
      this.clearCatch()
      return false
    }
    return true
  }

  eventRegister () {
    console.log(444)
    console.log(this.provider_.off)
    this.provider_.on('chainChanged', ()=>{this.onChainChanged()})
    this.provider_.on('accountsChanged', account => {this.onAccountChanged(account)})
    this.provider_.on('disconnect', ()=>{this.onDisconnect()})
  }

  onChainChanged() {
    this.clearCatch()
    window.location.reload()
  }

  onAccountChanged(account) {
    console.log('onAccountChanged:', account)
    // if(!account_ && account_ !== store.getters['user/account']) {

      // this.clearCatch()
      store.dispatch('user/cleanAccount')
      store.dispatch('common/cleanToken')
      pageInitlization()
      
      // window.location.reload()
    // }
  }

  onDisconnect() {
    this.clearCatch()
    window.location.reload()
  }

  clearCatch() {
    store.dispatch('user/cleanAccount')
    store.dispatch('common/cleanToken')
    store.commit('common/authentication', false)
  }

}
