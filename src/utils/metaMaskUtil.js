import detectEthereumProvider from "@metamask/detect-provider"
import storage from '@/store/index'
import {Message} from 'element-ui'
import Web3 from "web3"
// import { Store } from "vuex"

export default class metaMaskUtils {
  provider_
  account = storage.getters["user/account"]
  
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
      
      const w3 = new Web3()
      console.log(w3)

      try { 
        const accounts = await this.provider_.request({ method: 'eth_requestAccounts' });
        this.account = new Web3().utils.toChecksumAddress(accounts[0])
        storage.commit('user/account', this.account)
        this.eventRegister()
      } catch (err) {
        console.error(err)
      }

    } else {
      const tips = 'Please install MetaMask'
      this.showError(tips)
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
      this.showError(tips)
      this.clearCatch()
      return false
    }
    return true
  }

  eventRegister () {
    if (!this.provider_) return false
    this.provider_.on('chainChanged', ()=>{
      this.onChainChanged()
    })
    this.provider_.on('accountsChanged', ()=>{
      this.onAccountChanged()
    })
    this.provider_.on('disconnect', ()=>{
      this.onDisconnect()
    })
  }

  onChainChanged() {
    this.clearCatch()
    window.location.reload()
  }

  onAccountChanged(account_) {
    // account is not in catch
    if(!account_ || account_.length == 0 || account_[0] !== storage.getters['user/account']) {
      this.clearCatch()
      window.location.reload()
    }
  }

  onDisconnect() {
    this.clearCatch()
    window.location.reload()
  }

  clearCatch() {
    // clear cookie \\ clear stroage
    localStorage.removeItem('account')
    storage.dispatch('user/cleanAccount')
    // storage.commit('user/account', '')
  }

  showError(err) {
    Message({
        showClose: true,
        message: typeof(err)=='object'?JSON.stringify(err['message']||err):err,
        type: 'error'
    })
    console.error(err)
  }


}
