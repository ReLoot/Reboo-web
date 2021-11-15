import detectEthereumProvider from "@metamask/detect-provider"
import storage from '@/store/index'
import {Message} from 'element-ui'
import Web3 from "web3"
// import ml_abi from '@/utils/contract/miner_card.json'
// import vb_abi from '@/utils/contract/Vib.json'

// const vbn_contract = process.env.VUE_APP_VBNcxzk
// const building_contract = process.env.VUE_APP_BUILDING_CONTRACT
// const land_contract = process.env.VUE_APP_LAND_CONTRACT

export class metaMaskUtils {
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

      try { 
        const accounts = await this.provider_.request({ method: 'eth_requestAccounts' });
        this.account = new Web3().utils.toChecksumAddress(accounts[0])
        storage.commit('user/account', this.account)
        this.eventRegister()
        // window.location.reload()
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
    this.provider_.on('chainChanged', ()=>{
      this.onChainChanged()
    })
    this.provider_.on('accountsChanged', ()=>{
      this.onAccountChanged(this.account)
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
    // console.log(!account_ , account_, storage.getters['user/account'])
    // if(!account_ && account_ !== storage.getters['user/account']) {
      this.clearCatch()
      window.location.reload()
    // }
  }

  onDisconnect() {
    this.clearCatch()
    window.location.reload()
  }

  clearCatch() {
    localStorage.removeItem('account')
    storage.dispatch('user/cleanAccount')
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
