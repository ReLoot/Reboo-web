import { contractBootstrap } from "./contract_bootstrap"
import store from "@/store/index"
import Web3 from "web3"

import abi from '@/utils/contract/VibraniumIDO_abi.json'
// import vbn_abi from '@/utils/contract/Vib.json'
import busd_abi from '@/utils/contract/Busd_abi.json'

const contract_address = process.env.VUE_APP_IDO_CONTRACT
// const vbn_contract_address = process.env.VUE_APP_VBN_CONTRACT
const busd_contract_address = process.env.VUE_APP_BUSD_CONTRACT

const BN = new Web3().utils.BN

export class idoContractClass extends contractBootstrap {
  constructor() {
    super({
      abi: abi,
      contract_address: contract_address
    })
  }

  async getTotal() {
    const mainContract = await super.contractMaker()
    return await mainContract.methods._maxCandidate().call()
  }

  // 获取VBN数量
  async getVbnBalance () {
    const account_ = this.accountCheck()
    if (!account_) return false

    const busdContract = await super.contractMaker(busd_abi, busd_contract_address),
          balance = await busdContract.methods.balanceOf(account_).call(),
          unit = Math.pow(10, 9),
          balance_ = new BN(balance).div(new BN(unit)).div(new BN(unit)).toString()

    store.commit('user/balance', balance_)
    return {
      balance,
      balanceFormart: balance_
    }
  }
 
  // 是否有参与IDO资格
  async checkQualification() {
    const account_ = super.accountCheck()

    if(!account_) return false
    
    const mainContract = await super.contractMaker()
    const qua = await mainContract.methods.candidate().call({from: account_})
    store.commit('user/ido_unpartake', qua)
    return qua
  }
  
  // 发行总量
  async pay(amount) {
    const account_ = super.accountCheck()
    if(!account_) return false
    
    store.dispatch('common/addLoading', 'IDO_PAYING')

    // const mainContract = await super.contractMaker(),
    //       vbnContract = await super.contractMaker(vbn_abi, vbn_contract_address),
    //       {balanceFormart} = await this.getVbnBalance()
    const mainContract = await super.contractMaker(),
          busdContract = await super.contractMaker(busd_abi, busd_contract_address),
          {balanceFormart} = await this.getVbnBalance()
    
    if (balanceFormart < amount) {
      super.msgLog('Not enough balance for pay')
      store.dispatch('common/deleteLoading', 'IDO_PAYING')
      return false
    }

    const qua_ = await this.checkQualification()
    if(qua_) {
      super.msgLog('Each account is only allowed to claim once','warning')
      store.dispatch('common/deleteLoading', 'IDO_PAYING')
      return false
    }
    
    try {
      const amount_ = new BN(String(amount*Math.pow(10, 18)))
      let res
      await busdContract.methods.approve(this.options.contract_address,amount_).send({from: account_})
      res = await mainContract.methods.buyShares(amount_).send({from: account_})
      await this.checkQualification()
      store.dispatch('common/deleteLoading', 'IDO_PAYING')
      return res
    } catch (err) {
      store.dispatch('common/deleteLoading', 'IDO_PAYING')
      super.msgLog(err)
    }
  }

  async getProgress(piece) {
    const account_ = super.accountCheck()
    if(!account_) return false
    
    const maxMember = await this.getTotal()
    const mainContract = await super.contractMaker()
    let participantAmount = await mainContract.methods.totalCandidates().call()
    participantAmount = parseInt(participantAmount)
    return {
      amount: participantAmount*piece || 0,
      people: participantAmount,
      percent: participantAmount/maxMember*100 || 0,
      maxMember: maxMember
    }
  }

}

