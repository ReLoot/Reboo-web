import { contractBootstrap } from "./contract_bootstrap"
import store from "@/store/index"
import Web3 from "web3"
// import { buildingContractClass } from "./contract_cards"

import $http from '@/utils/http'

import integrate_abi from '@/utils/contract/Integrate_abi.json'
import payment_abi from '@/utils/contract/DK_abi.json'
import ml_abi from '@/utils/contract/miner_card.json'
const integrate_contract_address = process.env.VUE_APP_INTEGRATE_CONTRACT
// const vbn_contract_address = process.env.VUE_APP_VBN_CONTRACT
const payment_contract_address = process.env.VUE_APP_DKMT_CONTRACT
const building_contract_address = process.env.VUE_APP_BUILDING_CONTRACT

const BN = new Web3().utils.BN
// const buildingCardContract = new buildingContractClass()

export class integContractClass extends contractBootstrap {
  constructor() {
    super({
      abi: integrate_abi,
      contract_address: integrate_contract_address
    })
  }

  async integrate(main_id, stuff_1, stuff_2, stuff_3) {
    const account_ = this.accountCheck()
    if (!account_) return false

    const buildCardContract = await super.contractMaker(ml_abi, building_contract_address),
          mainContract = await super.contractMaker()
    
    try {
      // nft approve
      const card_allow = await buildCardContract.methods.isApprovedForAll(account_, this.options.contract_address).call()
      if(!card_allow) {
        await buildCardContract.methods.setApprovalForAll(this.options.contract_address, true).send({from: account_})
      }
      mainContract.methods.integrate(building_contract_address, main_id, [stuff_1, stuff_2, stuff_3])
        .send({from: account_})
        .on('transactionHash', hash => {
          this.sendData('integrate', {eth_address:account_, tx_hash:hash, card_id:main_id, card_ids:[stuff_1, stuff_2, stuff_3], type:0})
        }).on('receipt', async receipt => {
          try {
            let integerRes = await this.sendData('integrateResult', {eth_address:account_, tx_hash:receipt.transactionHash, card_id:main_id, card_ids:[stuff_1, stuff_2, stuff_3], type:0})
            if(integerRes && integerRes.data.result == 1) {
              store.commit('dialog/SYNT_RESULT', 1)
            } else {
              store.commit('dialog/SYNT_RESULT', 2)
            }
            store.dispatch('user/updateUnsetBuildingCard')
            store.dispatch('common/deleteLoading', 'CARD_INTERGRATE')
          } catch (err) {
            store.dispatch('common/deleteLoading', 'CARD_INTERGRATE')
            super.msgLog(err)
          }
        }).on('error', item => {
          store.dispatch('common/deleteLoading', 'CARD_INTERGRATE')
        })
      
    } catch (err) {
      store.dispatch('common/deleteLoading', 'CARD_INTERGRATE')
      super.msgLog(err)
    }
  }


  async advancedIntegrate(main_id, stuff_1, stuff_2, stuff_3) {
    const account_ = this.accountCheck()
    if (!account_) return false

    const feeContract = await super.contractMaker(payment_abi, payment_contract_address),
          buildCardContract = await super.contractMaker(ml_abi, building_contract_address),
          mainContract = await super.contractMaker(),
          getPaymentAmount = await this.getPaymentAmount(),
          getPaymentBalance = await this.getPaymentBalance(account_),
          wei_ = this.wei

    try {
      if(parseFloat(getPaymentAmount.amountFormat) > parseFloat(getPaymentBalance.amountFormat)) {
        throw new Error('Not enough balance for pay')
      }

      const paymentAllow = await feeContract.methods.allowance(account_, this.options.contract_address).call()
      if (parseFloat(new BN(paymentAllow).div(new BN(wei_)).toString())/wei_ < parseFloat(getPaymentAmount.amountFormat)) {
        await feeContract.methods.approve(this.options.contract_address, new BN(String(getPaymentBalance.amount))).send({from: account_})
      }
      
      // nft approve
      const card_allow = await buildCardContract.methods.isApprovedForAll(account_, this.options.contract_address).call()
      if(!card_allow) {
        await buildCardContract.methods.setApprovalForAll(this.options.contract_address, true).send({from: account_})
      }

      mainContract.methods.advancedIntegrate(building_contract_address, main_id, [stuff_1, stuff_2, stuff_3])
        .send({from: account_})
        .on('transactionHash', hash => {
          this.sendData('integrate', {eth_address:account_, tx_hash:hash, card_id:main_id, card_ids:[stuff_1, stuff_2, stuff_3], type:1})
        }).on('receipt', async receipt => {
          try {
            let integerRes = await this.sendData('integrateResult', {eth_address:account_, tx_hash:receipt.transactionHash, card_id:main_id, card_ids:[stuff_1, stuff_2, stuff_3], type:1})
            if(integerRes && integerRes.data.result == 1) {
              store.commit('dialog/SYNT_RESULT', 1)
            } else {
              store.commit('dialog/SYNT_RESULT', 2)
            }
            store.dispatch('user/updateUnsetBuildingCard')
            store.dispatch('common/deleteLoading', 'CARD_INTERGRATE')
          } catch (err) {
            store.dispatch('common/deleteLoading', 'CARD_INTERGRATE')
            super.msgLog(err)
          }
        }).on('error', item => {
          store.dispatch('common/deleteLoading', 'CARD_INTERGRATE')
        })
    } catch (err) {
      store.dispatch('common/deleteLoading', 'CARD_INTERGRATE')
      super.msgLog(err)
    }
  }

  async getPaymentAmount() {
    const mainContract = await super.contractMaker()
    const amount = await mainContract.methods.getPaymentAmount().call()
    const wei_ = this.wei
    // return new BN(amount).div(new BN(Math.pow(10, 9))).div(new BN(Math.pow(10, 9))).toString()
    return {
      amount,
      amountFormat: parseFloat(new BN(amount).div(new BN(wei_)).toString())/wei_
    }
  }

  async getPaymentBalance(account) {
    const feeContract = await super.contractMaker(payment_abi, payment_contract_address)
    const amount = await feeContract.methods.balanceOf(account).call()
    const wei_ = this.wei
    return {
      amount,
      amountFormat: parseFloat(new BN(amount).div(new BN(wei_)).toString())/wei_
    }
  }
  
  /* 
    @params requestAction | integrate | integrateResult
    @params eth_address
    @params tx_hash:transcation hahs
    @params card_id:main card id
    @params stuff 1 id
    @params stuff 2 id
    @params type  | common integrate set 0 | advance integrate set 1
  */
  sendData(action, {eth_address, tx_hash, card_id, card_ids, type}) {
    const params = {eth_address, tx_hash, card_id:String(card_id), card_ids:String(card_ids), type}
    return $http(action, params)
  }

}


