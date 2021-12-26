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
    if(!this.provider_) {
      const provider_ = await new detectEthereumProvider()
      this.provider_ = provider_
      this.eventRegister()
    }

    await this.networkSelect()
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

  async networkSelect () {
    const {chainId, networkId} = await this.getNetworkVersion()
    if (networkId == this.options.network) return false
    const web3_ = new Web3(),
          targetChainId = web3_.utils.toHex(this.options.network),
          isDev = process.env.NODE_ENV=='development'?1:0
    try {
      await this.provider_.request({method: 'wallet_switchEthereumChain', params:[{chainId: targetChainId}]})
    } catch (e) {
      if(e.code == 4902) {
        try {
          await this.provider_.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: targetChainId,
              chainName: 'BSC',
              nativeCurrency : {name:'BNB', symbol:'BNB', decimals:18},
              rpcUrls: isDev?['https://data-seed-prebsc-1-s2.binance.org:8545/']:['https://bsc-dataseed.binance.org/'],
              blockExplorerUrls : isDev?["https://testnet.bscscan.com"]:["https://www.bscscan.com"]
            }]
          })
          return 
        } catch (addError) {
          console.error(addError)
          return
        }
      }
    }

  }

  eventRegister () {
    this.provider_.on('chainChanged', a =>{this.onChainChanged(a)})
    this.provider_.on('accountsChanged', account => {this.onAccountChanged(account[0])})
    this.provider_.on('disconnect', ()=>{this.onDisconnect()})
  }

  onChainChanged(currentNetwork) {
    if(currentNetwork != new Web3().utils.toHex(this.options.network)) {
      this.clearCatch()
      window.location.reload()
    }
  }

  onAccountChanged(account) {
    const prevAccount = store.getters['user/account']
    this.clearCatch()
    if(prevAccount && account && account !== prevAccount) {
      pageInitlization(true)
    }
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
