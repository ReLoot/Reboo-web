<template>
  <div class="test">
    <el-form ref="form" :model="formData" label-width="380px">
      <div>钱包地址：{{account}}</div>
      
      <el-form-item label="购买探测器宝箱">
        <div><el-button type="danger" @click="buyToolBox">SUBMIT</el-button></div>
        <div><pre>{{buy_tool_box}}</pre></div>
      </el-form-item>

      <el-form-item label="购买地块宝箱">
        <div><el-button type="danger" @click="buyLandBox">SUBMIT</el-button></div>
        <div><pre>{{buy_land_box}}</pre></div>
      </el-form-item>

      <el-form-item label="探测器宝箱列表">
        <div><el-button type="danger" @click="buyToolBoxList">SUBMIT</el-button></div>
        <div><pre>{{tool_box_list}}</pre></div>
      </el-form-item>

      <el-form-item label="获取地块卡宝箱列表">
        <div><el-button type="danger" @click="buyLandBoxList">SUBMIT</el-button></div>
        <div><pre>{{land_box_list}}</pre></div>
      </el-form-item>

      <el-form-item label="MINER TOKEN">
        <el-input v-model="formData.miner_token"></el-input>
      </el-form-item>

      <el-form-item label="开启探测器宝箱">
        <div><el-button type="danger" @click="openToolBox">SUBMIT</el-button></div>
        <div><pre>{{open_tool_box_res}}</pre></div>
      </el-form-item>

      <el-form-item label="LAND TOKEN">
        <el-input v-model="formData.land_token"></el-input>
      </el-form-item>

      <el-form-item label="开启地块宝箱">
        <div><el-button type="danger" @click="openLandBox">SUBMIT</el-button></div>
        <div><pre>{{open_land_box_res}}</pre></div>
      </el-form-item>

      <el-form-item label="查看探测器信息">
        <div><el-button type="danger" @click="checkToolInfo">SUBMIT</el-button></div>
        <div><pre>{{tool_info}}</pre></div>
      </el-form-item>

      <el-form-item label="查看地块信息">
        <div><el-button type="danger" @click="checkLandInfo">SUBMIT</el-button></div>
        <div><pre>{{land_info}}</pre></div>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Web3 from 'web3'
import ml_abi from '@/utils/contract/miner_card.json'
import vb_abi from '@/utils/contract/Vib.json'
import detectEthereumProvider from "@metamask/detect-provider"

const toolContractAddress = '0xf944F83eA9bC5aD8a69f1f4478e28D7c2B095525'
const landContractAddress = '0x28EdA1E0267C9Ead8040eC1BC775dDf5A59D3a48'
const vbnAddress = '0xcB944270Ae5656f25C950D3712104F3Db992C9F4'

async function getContract (abi, contract_address) {
  // const ethereumInstance = (window as any).ethereum;
  const provider = await detectEthereumProvider();
  const web3 = new Web3(provider);
  return new web3.eth.Contract(abi, contract_address);
}

// async function balanceFormal (price) {
//   const provider = await detectEthereumProvider();
//   const BN = new Web3(provider).utils.BN;
//   // const x = new BN(10).pow(18);
//   new BN(10).pow(18);
//   console.log(price)
//   // return x.multipliedBy(num).toString();
// }

export default {
  computed: {
      ...mapGetters('user', {
          account: 'account'
      }),
  },
  data(){
    return {
      formData: {
        miner_token: '',
        land_token: ''
      },
      buy_tool_box: '',
      buy_land_box: '',
      tool_box_list: '',
      land_box_list: '',
      open_tool_box_res: '',
      open_land_box_res: '',
      tool_info:'',
      land_info:'',
    }
  },
  async created(){
    this.$mu.initlization()
  },
  methods: {
    async buyToolBox(){
      let account_ = this.account
      // vbn 合约
      let vbn_contract = await getContract(vb_abi, vbnAddress)
      // minerNFT 合约
      // let tool_contract = await getContract(ml_abi,toolContractAddress)
      // const provider = await detectEthereumProvider();
      // const web3 = new Web3(provider);

      const balance = await vbn_contract.methods.balanceOf(account_).call()
      // const approve_1 = vbn_contract.methods.approve(landContractAddress, web.utils.toBN())

      // await vbn_contract.methods.approve(toolContractAddress, web3.utils.toBN(5*Math.pow(10, 18))).send({from: account_})

      // // 购买minerNFT
      // const n = await tool_contract.methods.mintMulti(account_, 2).send({from: account_})
      // this.buy_tool_box = n
    },
    async buyLandBox(){
      let account_ = this.account
      // vbn 合约
      let vbn_contract = await getContract(vb_abi, vbnAddress)
      // land NFT 合约
      let land_contract = await getContract(ml_abi,landContractAddress)

      const provider = await detectEthereumProvider();
      const web3 = new Web3(provider);

      await vbn_contract.methods.approve(landContractAddress, web3.utils.toBN(5*Math.pow(10, 18))).send({from: account_})
      // 购买landNFT
      const n = await land_contract.methods.mintMulti(account_, 2).send({from: account_})
      this.buy_land_box = n
    },
    async buyToolBoxList(){
      let account_ = this.account
      let tool_contract = await getContract(ml_abi,toolContractAddress)
      const list = await tool_contract.methods.getOwnerTokenIDs(account_, 0, 20).call()
      this.tool_box_list = list
      // tool_contract.methods.getOwnerTokenIDs
      
    },
    async buyLandBoxList(){
      let account_ = this.account
      let land_contract = await getContract(ml_abi,landContractAddress)
      const list = await land_contract.methods.getOwnerTokenIDs(account_, 0, 20).call()
      this.land_box_list = list
      // tool_contract.methods.getOwnerTokenIDs
      
    },
    openToolBox(){
      this.$http('open_tool_box', { token_id: this.formData.miner_token, account: this.account })
        .then(res => {
          this.open_tool_box_res = res  
        })
    },
    openLandBox(){
      this.$http('open_land_box', { token_id: this.formData.land_token, account: this.account })
        .then(res => {
          this.open_land_box_res = res  
        })
    },
    checkToolInfo(){
      this.$http('info_tool', { token_id: this.formData.miner_token, account: this.account  })
        .then(res => {
          this.tool_info = res  
        })
    },
    checkLandInfo(){
      this.$http('info_land', { token_id: this.formData.land_token, account: this.account  })
        .then(res => {
          this.land_info = res  
        })
    }
  }
  
}
</script>

<style lang="scss" scoped >
::v-deep .el-form {
  &-item__label{
    color: #ffffff;
    font-size: 24px;
  }
}
</style>