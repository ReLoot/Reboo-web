<template>
  <div class="store" 
    v-loading.fullscreen.lock="pageLoading" 
    element-loading-background="rgba(0, 0, 0, 0.8)"
    element-loading-text="Please waiting..."
  >
    <div class="store--hd">
      <tabs-market :tabs="tabs" :tabIdx="curTabIdx" @trigger="tabsTrigger" />
    </div>

    <div class="store--bd">
      <el-row :gutter="20">
        <el-col :md="8">
          <div class="store--viewbox">
            <div class="store--viewbox_bg"></div>
            <div class="store--viewbox_box" :class="`store--viewbox_box_${tabs[curTabIdx]['type']}`"></div>
          </div>
        </el-col>
        <el-col :md="16">
          <div class="store--ctn">
            
            <el-row class="store--ctn_top">
              <el-col :md="18">
                <h2>{{$t(tabs[curTabIdx]['view'])}}</h2>
              </el-col>
            </el-row>

            <div class="store--price">
              <span>{{$t('common.price')}}</span>
              <span class="num">{{price|tofixed2}} VBN</span>
            </div>
            <p class="store--desc" v-if="curTabIdx == 0" >{{$t('market.storeTab1Desc')}}</p>
            <p class="store--desc" v-else >{{$t('market.storeTab2Desc')}}</p>
            <table class="store--rank" >
              <tr>
                <template v-for="(item, idx) in rankList" >
                  <td :key="`rank_${idx}`" >
                    <template v-if="idx == 0">
                      {{$t(item[curTabIdx])}}
                    </template>
                    <template v-else>
                      {{item}}
                    </template>
                  </td>
                </template>
              </tr>
              <tr>
                <template v-for="(item, idx) in processList">
                  <td :key="`process_${idx}`" >
                    <template v-if="idx == 0">
                      {{$t(item[curTabIdx])}}
                    </template>
                    <template v-else>
                      {{item[curTabIdx]}}%
                    </template>
                  </td>
                </template>
              </tr>
            </table>

            <!-- quatity -->
            <div class="store--quantity">
              <h4 class="">{{$t('common.quantity')}} : (up to {{max}})</h4>
              <div class="store--quantity_formItems">
                <el-input-number 
                  class="store--quantity_count" 
                  v-model="num" 
                  :min="min" 
                  :max="max"
                ></el-input-number>
                <el-button plain class="store--quantity_btn" @click="num = max">MAX</el-button>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>

      <cus-divider-ein dStyle="white" />
      <div class="store--pay">
        <div class="store--pay_preview">
          <span>{{$t('common.total')}}: </span>
          <span>{{num*price|tofixed2}} VBN</span>
        </div>
        <div class="store--pay_append">
          <cus-btn-ein 
            class="pay"
            bg="/image/market/btn_1.png"
            v-show="!pageLoading"
            @click.native="pay"
          >BUY NOW</cus-btn-ein>
           <!-- v-if="pageLoading" -->
          <span v-if="pageLoading" class="pause">{{$t('market.storePaying')}}</span>
        </div>
      </div>
      <cus-divider-ein dStyle="white" style="margin-bottom: 40px" />
    </div>
  </div>
</template>

<script>
import tabsMarket from '@/components/tabs/tabs_market'
import {mapGetters} from 'vuex'
export default {
  filters: {
    tofixed2:(num)=>parseFloat(num).toFixed(2)
  },
  computed: {
    ...mapGetters('user', {
      account: 'account',
      email: 'email',
    }),
    ...mapGetters('common', {
      authentication: 'authentication'
    }),
    price() {
      return this.curTabIdx == 0?0.1:1
    }
  },
  components: {
    tabsMarket,
  },
  data(){
    return {
      curTabIdx: 0,
      pageLoading: false,
      tabs: [{
        type: 'domain',
        view: 'market.boxType1',
      },{
        type: 'build',
        view: 'market.boxType2'
      }],
      rankList: [['market.tr1Cell1','market.tr1Cell2'], 'S', 'SS', 'SSS'],
      processList: [['market.tr2Cell1', 'market.tr2Cell2'], [50, 60], [35, 30], [15, 10]],
      // price: 10,
      num: 0,
      min: 0,
      max: 0,
    }
  },
  watch:{
    authentication() {
      this.init()
    }
  },
  async created() {
    this.init()
  },
  methods: {
    async init() {
      if (this.authentication) {
        const checkDomain = await this.$http('boxCount', {eth_address: this.account, type: this.curTabIdx+1})
        this.max = checkDomain.data.remain >= 10?10:checkDomain.data.remain
        this.num = checkDomain.data.remain >= 0?1:0
        this.min = 1
      }
    },
    async tabsTrigger(cur) {
      this.curTabIdx = cur
      this.num = this.min
      const checkDomain = await this.$http('boxCount', {eth_address: this.account, type: this.curTabIdx+1})
      this.max = checkDomain.data.remain >= 10?10:checkDomain.data.remain
    },
    async pay() {
      if (this.pageLoading) return false
      if(!this.account) {
        this.$message({ message: this.$t('common.nopermission'), type: 'error' })
        return false
      }

      this.pageLoading = true
      try {
        const checkDomain = await this.$http('boxCount', {eth_address: this.account, type: this.curTabIdx+1})
        if (checkDomain.data.remain == 0) {
          this.pageLoading = false
          this.$message({ message:'You have reached your daily limit today', type: 'warning'})
          return false
        }

        let payOptions
        if(this.curTabIdx == 0) {
          await this.$landContract.payForBox(this.num, this.price, this.boxPurchaseRequest)
          await this.$landContract.init()
        }
        if(this.curTabIdx == 1) {
          await this.$buildingContract.payForBox(this.num, this.price, this.boxPurchaseRequest)
          await this.$buildingContract.init()
        }
        
        if (payOptions) {
          console.log(payOptions)
          debugger
          const pusreObj = await this.$http('boxPurchase', { 
            eth_address: this.account, 
            transactionHash:payOptions.transactionHash, 
            blockNumber:String(payOptions.blockNumber), 
            box_num: this.num,
            type: this.curTabIdx+1 
          })
          this.max = pusreObj.data.remain
          this.num = 1
          if(pusreObj.data.remain == 0) {
            this.min = pusreObj.data.remain
            this.num = pusreObj.data.remain
          }
          
        }

        this.pageLoading = false
      } catch (err) {
        this.pageLoading = false
        console.error(err)
      }
    },
    boxPurchaseRequest(tx) {
      console.log(tx)
      console.log(this)
      this.$http('boxPurchase', { 
        eth_address: this.account, 
        transactionHash:tx, 
        // blockNumber:String(tx.blockNumber), 
        box_num: this.num,
        type: this.curTabIdx+1 
      }).then(res => {
        if(res) {
          this.max = res.data.remain
          this.num = res.data.remain==0?res.data.remain:1
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/custom.scss';
$boxTitle: (
  $--page-xs-width:(fontsize: 24px, marginBottom: 15px),
  $--page-sm-width:(fontsize: 24px, marginBottom: 15px),
  $--page-md-width:(fontsize: 26px, marginBottom: 18px),
  $--page-lg-width:(fontsize: 28px, marginBottom: 20px),
);
$price: (
  $--page-xs-width:(fontsize: 18px),
  $--page-sm-width:(fontsize: 18px),
  $--page-md-width:(fontsize: 20px),
  $--page-lg-width:(fontsize: 22px),
);
$cell: (
  $--page-xs-width:(height: 32px, lineHeight: 32px),
  $--page-sm-width:(height: 32px, lineHeight: 32px),
  $--page-md-width:(height: 40px, lineHeight: 40px),
  $--page-lg-width:(height: 48px, lineHeight: 48px),
);

$quantityBtn: (
  $--page-xs-width:(height: 30px, fontsize: 14px),
  $--page-sm-width:(height: 30px, fontsize: 14px),
  $--page-md-width:(height: 36px, fontsize: 16px),
  $--page-lg-width:(height: 42px, fontsize: 18px),
);

$pay: (
  $--page-xs-width:(fontsize:14px, margin:15px 0, lineheight:40),
  $--page-sm-width:(fontsize:16px, margin:15px 0, lineheight:40),
  $--page-md-width:(fontsize:18px, margin:18px 0, lineheight:49),
  $--page-lg-width:(fontsize:20px, margin:22px 0, lineheight:58),
);

$payBtn: (
  $--page-xs-width:(fontsize:12px),
  $--page-sm-width:(fontsize:14px),
  $--page-md-width:(fontsize:16px),
  $--page-lg-width:(fontsize:18px),
);

$viewbox: (
  $--page-xs-width:(marginLeft: auto, marginRight: auto, maxwidth: 200px),
  $--page-sm-width:(marginLeft: auto, marginRight: auto, maxwidth: 280px),
  $--page-md-width:(marginLeft: 0, marginRight: auto, maxwidth: 300px),
  $--page-lg-width:(marginLeft: 0, marginRight: auto, maxwidth: 317px),
);

@include b(store) {
  @include e(hd) {
    margin: 20px 0 40px;
  }

  @include e(bd) {
    & > .el-row {
      margin-bottom: 20px;
    }
  }

  @include e(viewbox) {
    @include mediaAdapt($viewbox);
    // max-width: 317px;
    position: relative;
    margin-bottom: 30px;
    @include m(bg) {
      width: 100%;
      height: 100%; 
      // position: absolute;
      padding-bottom: 134%;
      top: 0;
      left: 0;
      background: url(/image/token/card_bg.png) no-repeat center/cover;
    }
    @include m(box) {
      @include pacenter();
      width: 63%;
      padding-bottom: 63%;
      background: no-repeat center/cover;
      &_domain {
        background-image: url(/image/box_domain.png);
      }
      &_build {
        background-image: url(/image/box_build.png);
      }
    }
  }

  @include e(ctn) {
    @include m(top) {
      h2 {
        @include mediaAdapt($boxTitle);
        // font-size: 35px;
        font-family: OrbitronBlack;
        margin-bottom: 15px;
      }
    }
  }

  @include e(price) {
    // font-size: 28px;
    @include mediaAdapt($price);
    font-family: OrbitronRegular;
    margin-bottom: 15px;
    span {
      margin-right: 10px;
      &.num {
        color: $--color-aqua;
      }
    }
  }

  @include e(desc) {
    margin-bottom: 15px;
    font-size: 14px;
    color: $--color-white-07;
    line-height: 125%;
    font-family: OrbitronRegular;
  }

  @include e(rank) {
    // width: 696px;
    width: 100%;
    background-color: #18212C;
    border-collapse: collapse;
    margin-bottom: 15px;
    tr {
      &:first-child {
        td:not(:first-child){
          color: #D0E6EE;
          font-size: 20px;
          font-weight: 800;
          font-style: italic;
          font-family: OrbitronBlack;

        }
      }

      &:last-child {
        td:not(:first-child) {
          font-family: OrbitronRegular;
        }
      }

    }
    td {
      @include mediaAdapt($cell);
      width: 20%;
      // height: 62px;
      border: 1px solid rgba(255,255,255,0.3);
      text-align: center;
      &:first-child {
        width: 30%;
        background-color: $--color-white-01;
        font-family: OrbitronRegular;
        
      }
    }
  }

  @include e(quantity) {
    h4 {
      margin-bottom: 10px;
      font-family: OrbitronBlack;
    }
    @include m(count){
      // background-color: $--color-white-01;
      background-color: transparent;
    }
    @include m(btn) {
      @include mediaAdapt($quantityBtn);
      border-radius: 0;
      border-width: 2px;
      border-style: solid;
      border-color: $--color-aqua;
      color: $--color-aqua;
      background-color: #232E3B;
      vertical-align: middle;
      font-family: OrbitronRegular;
      padding-top: 0;
      padding-bottom: 0;
      margin-left: 10px;
      &:hover, &:active, &:focus {
        background-color: rgba(0,0,0,0.2);
      }
    }
  }
  @include e(pay) {
    @include displayFlex();
    @include mediaAdapt($pay);
    // margin: 30px 0;
    padding: 0 13px;
    // font-size: 28px;
    align-items: center;
    @include m(preview){
      -webkit-flex: 1;
      flex: 1;
      font-family: OrbitronBlack;
      // line-height: 40px;
    }
    
    @include m(append) {
      .pay {
        @include mediaAdapt($payBtn);
        font-family: OrbitronBlack;
        width: 10em;
        height: 2.625em;
      }
      .pause {
        font-family: OrbitronBlack;
      }
    }
  }
}

$number: (
  $--page-xs-width:(width: 167px, lineHeight: 30px),
  $--page-sm-width:(width: 167px, lineHeight: 30px),
  $--page-md-width:(width: 167px, lineHeight: 36px),
  $--page-lg-width:(width: 200px, lineHeight: 42px),
);

$numberHandler: (
  $--page-xs-width:(lineHeight: 30px, width: 30px, fontsize: 20px),
  $--page-sm-width:(lineHeight: 30px, width: 30px, fontsize: 20px),
  $--page-md-width:(lineHeight: 36px, width: 40px, fontsize: 24px),
  $--page-lg-width:(lineHeight: 42px, width: 50px, fontsize: 30px),
);
$numberInner: (
  $--page-xs-width:(height: 30px, fontsize: 16px),
  $--page-sm-width:(height: 30px, fontsize: 16px),
  $--page-md-width:(height: 36px, fontsize: 18px),
  $--page-lg-width:(height: 42px, fontsize: 20px),
);

.el-input-number {
  @include mediaAdapt($number);
  border-radius: 0;
  vertical-align: middle;
  ::v-deep span[role=button] {
    @include mediaAdapt($numberHandler);
    // width: 75px;
    border-radius: 0;
    border-color: $--color-white-01;
    background-color: $--color-white-01;
    // font-size: 30px;
    font-weight: 800;
    color: $--color-white;
    // line-height: $-elem-h;
    &.is-disabled {
      color: $--color-white-04;
      background-color: rgba(0,0,0,0.1);
    }
  }

  ::v-deep .el-input {
    &__inner {
      @include mediaAdapt($numberInner);
      border-color: $--color-white-01 !important; 
      background-color: #18212C;
      color: $--color-white;
      border-radius: 0;
      // height: $-elem-h + 2;
      // font-size: 30px;
      font-weight: 800;
      font-family: OrbitronBlack;
    }
  }
}
</style>