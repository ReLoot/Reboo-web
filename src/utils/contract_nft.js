import { contractBootstrap } from "./contract_bootstrap"
import store from "@/store/index"

import nft_abi from '@/utils/contract/VibraniumGameCrad_abi.json'
const nft_contract_address = process.env.VUE_APP_GAME_CONTRACT

export class nftContractClass extends contractBootstrap {
  constructor() {
    super({
      abi: nft_abi,
      contract_address: nft_contract_address
    })
  }

  async claim() {
    const account_ = super.accountCheck()
    if(!account_) return false

    const gid = store.getters["user/gid"]
    if (parseInt(gid) !== 0) {
      try {
        const nftContract = await super.contractMaker()
        const token = await nftContract.methods.claim(gid).send({from: account_})
        super.msgLog("Claim NFT Successed", "success")
        return token
      } catch (err) {
        super.msgLog(err)
      }
    } else {
      return false
    }
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

