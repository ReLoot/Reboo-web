import { contractBootstrap } from "./contract_bootstrap"
import store from "@/store/index"
import Web3 from "web3"

import nft_abi from '@/utils/contract/VibraniumGameCrad_abi.json'
const nft_contract_address = process.env.VUE_APP_GAME_CONTRACT

const BN = new Web3().utils.BN

export class nftContractClass extends contractBootstrap {
  constructor() {
    super({
      abi: nft_abi,
      contract_address: nft_contract_address
    })
  }

  async claim(game_id) {
    const account_ = super.accountCheck()
    if(!account_) return false

    const gid = game_id || store.getters["user/gid"]
    if (parseInt(gid) !== 0) {
      try {
        const nftContract = await super.contractMaker()
        const gas_claim = await nftContract.methods.claim(new BN(gid)).estimateGas({from: account_})
        const token = await nftContract.methods.claim(new BN(gid)).send({from: account_, gas: gas_claim})
        super.msgLog("Claim NFT Successed", "success")
        return token
      } catch (err) {
        super.msgLog(err)
      }
    } else {
      return false
    }
  }

  async currentAmount() {
    const account_ = super.accountCheck()
    if(!account_) return false

    const nftContract = await super.contractMaker()
    return await nftContract.methods.totalSupply().call()
  }

  async getCardInfo() {
    const account_ = super.accountCheck()
    if(!account_) return false
    
    const nftContract = await super.contractMaker()
    // const res = await nftContract.methods.getCardInfo().send({from: account_})
    const res = await nftContract.methods.getCardInfo().call({from: account_})
    return res
  }
}

