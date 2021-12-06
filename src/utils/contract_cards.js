import { contractBootstrap } from "./contract_bootstrap"

import store from '@/store/index'
import $http from '@/utils/http'

import Web3 from "web3"

import ml_abi from '@/utils/contract/miner_card.json'
import vbn_abi from '@/utils/contract/Vib.json'

const vbn_contract_address = process.env.VUE_APP_VBN_CONTRACT
const building_contract_address = process.env.VUE_APP_BUILDING_CONTRACT
const land_contract_address = process.env.VUE_APP_LAND_CONTRACT
const BN = new Web3().utils.BN


class cardContract extends contractBootstrap{
  constructor(options) {
    super(options)
  }

  async init() {
    await this.getVbnBalance()
    await this.classifyItem()
  }

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

  async payForBox(amount) {
    const account_ = this.accountCheck()
    if (!account_) return false

    const vbn_require_amount = 1,     // get from store
          {balanceFormart} = await this.getVbnBalance(),
          vbnContract = await super.contractMaker(vbn_abi, vbn_contract_address),
          mainContract = await super.contractMaker()
    
    if (balanceFormart <= vbn_require_amount*amount) {
      super.msgLog('Not enough balance for pay')
      return false
    }

    try {
      await vbnContract.methods.approve(this.options.contract_address, new BN(String(vbn_require_amount*amount*Math.pow(10, 18)))).send({from: account_})
      let res
      if (amount <= 1) {
        res = await mainContract.methods.mint(account_).send({from: account_})
      } else {
        res = await mainContract.methods.mintMulti(account_, amount).send({from: account_})
      }

      super.msgLog('Buy successed!', 'success')
      return res
    } catch (err) {
      super.msgLog(err)
    }
  }

  async getAllList() {
    const account_ = this.accountCheck()
    if (!account_) return false

    const mainContract = await super.contractMaker()
    const nft_balance = await mainContract.methods.balanceOf(account_).call()
    const list = await mainContract.methods.getOwnerTokenIDs(account_, 0, nft_balance).call()
    return list
  }

  openBox(boxID) {
    const account_ = this.accountCheck()
    if (!account_) return false
    return $http(this.options.openBoxMethods, {token_id: boxID, account: account_})
  }

  checkCardInfo(boxID) {
    const account_ = this.accountCheck()
    if (!account_) return false
    return $http(this.options.checkCardInfoMethods, {token_id: boxID, account: account_})
  }

  async classifyItem() {
    const account_ = this.accountCheck()
    if (!account_) return false
    
    let boxList = [], cardList = []
    const allBox = await this.getAllList()
    allBox.forEach(async (item, idx) => {
      this.checkCardInfo(item)
        .then(res => {
          if (res && res.code == 0) {
            cardList.push(res.data)
          }

          if (res && res.code == -11) {
            boxList.push(item)
          }

          if(idx == allBox.length-1) {
            store.commit(this.options.storeAttr.cards, cardList)
            store.commit(this.options.storeAttr.boxes, boxList)
          }
      }).catch(err => {
        this.msgLog(err)
      })
    })
  }
}

/* 领土宝箱 | 置地卡 */
export class landContractClass extends cardContract{
  constructor() {
    super({
      abi: ml_abi,
      contract_address: land_contract_address,
      openBoxMethods: 'open_land_box',
      checkCardInfoMethods: 'info_land',
      storeAttr: {
        boxes: 'user/landBox',
        cards: 'user/landCard'
      }
    })
  }
}

/* 建筑宝箱 | 粒子探测器 */
export class buildingContractClass extends cardContract{
  constructor() {
    super({
      abi: ml_abi, 
      contract_address: building_contract_address,
      openBoxMethods: 'open_tool_box',
      checkCardInfoMethods: 'info_tool',
      storeAttr: {
        boxes: 'user/buildingBox',
        cards: 'user/buildingCard'
      }
    })
  }
}
