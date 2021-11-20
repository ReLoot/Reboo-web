import detectEthereumProvider from "@metamask/detect-provider"
import store from '@/store/index'
import {Message} from 'element-ui'

import Web3 from "web3"


export class contractBootstrap {
  constructor(option_) {
    let defaults = {
      abi: '',
      contract_address: '',
    }
    this.options = Object.assign(defaults, option_)
    this.options.account = this.accountCheck()
  }

  async contractMaker (abi, address) {
    const provider = await detectEthereumProvider()
    const web3 = new Web3(provider)
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

}
 