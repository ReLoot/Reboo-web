import { contractBootstrap } from "./contract_bootstrap"
import store from "@/store/index"
import Web3 from "web3"

import abi from '@/utils/contract/VibraniumIDO_abi.json'
import vbn_abi from '@/utils/contract/Vib.json'

const contract_address = process.env.VUE_APP_IDO_CONTRACT
const vbn_contract_address = process.env.VUE_APP_VBN_CONTRACT

const BN = new Web3().utils.BN

export class idoContractClass extends contractBootstrap {
  constructor() {
    super({
      abi: abi,
      contract_address: contract_address
    })
  }

  /* 获取VBN数量 */
  async getVbnBalance () {
    const account_ = this.accountCheck()
    if (!account_) return false

    const vbnContract = await super.contractMaker(vbn_abi, vbn_contract_address),
          balance = await vbnContract.methods.balanceOf(account_).call(),
          unit = Math.pow(10, 9),
          balance_ = new BN(balance).div(new BN(unit)).div(new BN(unit)).toString()
          
    store.commit('user/balance', balance_)
    return {
      balance,
      balanceFormart: balance_
    }
  }

  // 是否有资格购买
  async checkQualification() {
    const account_ = super.accountCheck()
    if(!account_) return false
    
    const mainContract = await super.contractMaker()
    return await mainContract.methods.candidate().call({from: account_})
  }
  
  // 发行总量
  async pay(amount) {
    const account_ = super.accountCheck()
    if(!account_) return false
    
    const mainContract = await super.contractMaker(),
          vbnContract = await super.contractMaker(vbn_abi, vbn_contract_address),
          {balanceFormart} = await this.getVbnBalance()
    
    if (balanceFormart <= amount) {
      super.msgLog('Not enough balance for pay')
      return false
    }
    
    // amount 300
    await vbnContract.methods.approve(this.options.contract_address,new BN(String(amount*Math.pow(10, 18)))).send({from: account_})
    mainContract.methods.buyShares(new BN(amount)).send({from: account_})
    // 300,0001
  }

  async getProgress(piece, total) {
    const account_ = super.accountCheck()
    if(!account_) return false
    
    const mainContract = await super.contractMaker()
    let participantAmount = await mainContract.methods.totalCandidates().call()
    participantAmount = parseInt(participantAmount)
    return {
      amount: participantAmount*piece || 0,
      people: participantAmount,
      progress: participantAmount*piece/total*100 || 0
    }
  }

}

