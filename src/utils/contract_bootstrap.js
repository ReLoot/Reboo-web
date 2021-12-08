import detectEthereumProvider from "@metamask/detect-provider"
import store from '@/store/index'
import {Message} from 'element-ui'

import Web3 from "web3"

const BN = new Web3().utils.BN
export class contractBootstrap {
  constructor(option_) {
    let defaults = {
      abi: '',
      contract_address: '',
    }
    this.options = Object.assign(defaults, option_)
    this.options.account = this.accountCheck()
  }

  async providerMaker () {
    const provider = await detectEthereumProvider()
    return new Web3(provider)
  }

  async contractMaker (abi, address) {
    const web3 = await this.providerMaker()
    return new web3.eth.Contract(abi||this.options.abi, address||this.options.contract_address)
  }

  msgLog(msg, type="error") {
    Message({
      'message':JSON.stringify(msg['message']||msg),
      'type': type
    })
  }

  accountCheck() {
    const account = store.getters["user/account"] || localStorage.getItem("account")
    if(account) {
      return account
    } else {
      return null
    }
  }

  gasOptions() {
    const gasPrice = 11*Math.pow(10, 9)
          // gas = 66312
    return {gasPrice}
  }

}
 