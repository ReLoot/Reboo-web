<template>
  <div 
    class="synt--bd"
    v-loading.fullscreen.lock="loadingWarden.includes('CARD_INTERGRATE')" 
    element-loading-background="rgba(0, 0, 0, 0.8)"
    element-loading-text="Please waiting..."
  >
    <el-row class="synt--table" :gutter="20">

      <el-col :xs="24" :sm="9">
        <div class="synt--box"> 
          <div class="synt--box_ctn" @click="cardSelect(0)">
            <div class="synt--box_tl" >
              <span>{{$t('synt.main')}}</span>
            </div>
            <card-building v-if="card_main" class="synt--gamecard" :rank="card_main.rarity" :attributes="card_main.attributes" :id="card_main.token_id" />
            <div class="synt--box_back" v-else >
              <em>
                <i class="el-icon-plus"></i>
                <span>{{$t('synt.btnSelect')}}</span>
              </em>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :xs="8" :sm="5">
        <div class="synt--box">
          <div class="synt--box_ctn" @click="cardSelect(1)">
            <div class="synt--box_tl">
              <span>{{$t('synt.stuff1')}}</span>
            </div>
            <card-building v-if="card_stuff_1" class="synt--gamecard" :rank="card_stuff_1.rarity" :attributes="card_stuff_1.attributes" :id="card_stuff_1.token_id" />
            <div class="synt--box_back" v-else >
              <em>
                <i class="el-icon-plus"></i>
                <span>{{$t('synt.btnSelect')}}</span>
              </em>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :xs="8" :sm="5">
        <div class="synt--box">
          <div class="synt--box_ctn" @click="cardSelect(2)">
            <div class="synt--box_tl">
              <span>{{$t('synt.stuff2')}}</span>
            </div>
            <card-building v-if="card_stuff_2" class="gamecard" :rank="card_stuff_2.rarity" :attributes="card_stuff_2.attributes" :id="card_stuff_2.token_id" />
            <div v-else class="synt--box_back">
              <em>
                <i class="el-icon-plus"></i>
                <span>{{$t('synt.btnSelect')}}</span>
              </em>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :xs="8" :sm="5">
        <div class="synt--box">
          <div class="synt--box_ctn" @click="cardSelect(3)">
            <div class="synt--box_tl">
              <span>{{$t('synt.stuff3')}}</span>
            </div>
            <card-building v-if="card_stuff_3" class="gamecard" :rank="card_stuff_3.rarity" :attributes="card_stuff_3.attributes" :id="card_stuff_3.token_id" />
            <div v-else class="synt--box_back">
              <em>
                <i class="el-icon-plus"></i>
                <span>{{$t('synt.btnSelect')}}</span>
              </em>
            </div>
          </div>
        </div>
      </el-col>

    </el-row>

    <article class="synt--desc">
      <p>{{$t('synt.desc1')}}</p>
      <p>{{$t('synt.desc2')}}</p>
      <p>{{$t('synt.desc3')}}</p>
      <p style="margin-top:20px">{{$t('synt.desc6')}}</p>

    </article>

    <cus-divider-ein dStyle="white" />
    <div class="synt--handler" >
      <div class="inner">
        <div class="synt--handler_info">
          <p><el-checkbox v-model="checked">{{$t('synt.desc4', {fee: paymentAmount||'--'})}}</el-checkbox></p>
          <p>{{$t('synt.desc5')}} {{paymentAmount || '--'}} DKMT</p>
        </div>
        <div class="synt--handler_append">
          <cus-btn-ein 
            class="submit"
            bg="/image/market/btn_1.png"
            @click.native="mint"
          >MINT NOW</cus-btn-ein>
        </div>
      </div>
    </div>
    <cus-divider-ein dStyle="white" />
    
    <!-- dialog for select card -->
    <dialog-synt-select-card ref="dialogSyntSelect" :cardOptions="cardOptions" @updateCardOption="updateCardOption" />
    <!-- dialog for result -->
    <dialog-synt-result @statusReset="cardOptionsReset" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {integContractClass} from '@/utils/contract_integrate'

import cardBuilding from '@/components/cards/card_building'
import dialogSyntSelectCard from '@/components/dialog/settow_synt_select_card'
import dialogSyntResult from '@/components/dialog/settwo_synt_result'

import test_card_data from '@/testData/building_card_data.js'
export default {
  // components:{cardBuilding, Swiper, SwiperSlide},
  // cardBuilding,
  components:{ dialogSyntSelectCard, cardBuilding, dialogSyntResult},
  computed: {
    ...mapGetters('user', {
      account: 'account',
      unsetBuildingCard: 'unsetBuildingCard'
    }),
    ...mapGetters('common', {
      loadingWarden: 'loadingWarden',
      authentication: 'authentication',
    }),
  },
  data(){
    return {
      tabPosition: 'left',
      checked: false,
      cardOptions: new Array(3),
      card_main: null,
      card_stuff_1: null,
      card_stuff_2: null,
      card_stuff_3: null,
      integContract: null,
      paymentAmount: null
    }
  },
  watch: {
    'authentication'() {
      this.init()
    },
    'cardOptions': {
      immediate: true,
      deep: true,
      handler(arr) {
        arr.forEach((token_id, idx) => {
          if(token_id) {
            this.unsetBuildingCard.forEach(cardItem => {
              if(cardItem.token_id == token_id) {
                if(idx == 0)
                  this.card_main = cardItem
                if(idx == 1) 
                  this.card_stuff_1 = cardItem
                if(idx == 2)
                  this.card_stuff_2 = cardItem
                if(idx == 3)
                  this.card_stuff_3 = cardItem
              }
            })
          } else {
            if(idx == 0)
              this.card_main = null
            if(idx == 1)
              this.card_stuff_1 = null
            if(idx == 2)
              this.card_stuff_2 = null
            if(idx == 3)
              this.card_stuff_3 = null
          }
        })
      }
    }
  },
  created() {
      this.init()
  },
  methods: {
    async init() {
      if (!this.authentication || this.loadingWarden.includes('getUsefulBuildingCard')) return false
      this.$store.dispatch('user/updateUnsetBuildingCard')
      this.integContract = new integContractClass()
      this.paymentAmount = await this.integContract.getPaymentAmount()
    },
    cardSelect(type) {
      this.$refs['dialogSyntSelect'].viewOpen(type)
    },
    reset(num) {
      switch(num) {
        case 0:
          this.card_main = null
          break
        case 1:
          this.card_stuff_1 = null
          break
        case 2:
          this.card_stuff_2 = null
          break
        case 3:
          this.card_stuff_3 = null
          break
        default:
          this.card_main = null
          this.card_stuff_1 = null
          this.card_stuff_2 = null
          this.card_stuff_3 = null
          break
      }
    },
    updateCardOption(arr) {
      this.cardOptions = [...arr] 
    },
    async mint() {
      if(this.loadingWarden.includes('CARD_INTERGRATE') || !this.integContract) return false
      if(!this.cardOptions[0] || !this.cardOptions[1] || !this.cardOptions[2] || !this.cardOptions[3]) return false
      
      this.$store.dispatch('common/addLoading', 'CARD_INTERGRATE')
      try {
        if(!this.checked)
          await this.integContract.integrate(...this.cardOptions)
        else
          await this.integContract.advancedIntegrate(...this.cardOptions)
      } catch (err) {
        console.log(err)
      }
    },
    cardOptionsReset() {
      this.cardOptions = new Array(3)
      this.card_main = null
      this.card_stuff_1 = null
      this.card_stuff_2 = null
      this.card_stuff_3 = null
      this.$buildingContract.init()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/custom.scss';
$cardCtn: (
  $--page-xs-width:(marginLeft: auto, marginRight: auto, marginBottom: 60px),
  $--page-sm-width:(marginLeft: auto, marginRight: auto, marginBottom: 60px),
  $--page-md-width:(marginLeft: 0, marginRight: auto, marginBottom: 0),
  $--page-lg-width:(marginLeft: 0, marginRight: auto, marginBottom: 0)
);

$submit: (
  $--page-xs-width:(fontsize:12px),
  $--page-sm-width:(fontsize:14px),
  $--page-md-width:(fontsize:16px),
  $--page-lg-width:(fontsize:18px),
);
$btnHandlerAppend: (
  $--page-xs-width:(width:100%),
  $--page-sm-width:(width:auto)
);

.container {
  @include mediaAdapt($navHeight);
}

@include b(synt) {
  @include e(bd) {
    padding: 40px 0 0; 
  }

  @include e(table) {
    margin-bottom: 20px
  }

  @include e(box) {
    cursor: pointer;
    &:hover, &:focus {
      .synt--box_back {
        em, em:after {
          color: $--color-aqua;
          border-color: $--color-aqua;
        }
      }
    }

    @include m(tl){
      width: 100%;
      margin-bottom: 10px;
      white-space: nowrap;
      text-align: center;
      position: absolute;
      top: -35px;
      left: 0;
    }

    @include m(ctn) {
      @include mediaAdapt($cardCtn);
      width: 100%;
      // max-width: 250px;
      max-width: 182px;
      position: relative;
      cursor: pointer;
      background: url(/image/card_box_border.png) no-repeat center/cover;
      &::after {
        content: '';
        width: 100%;
        padding-bottom: 135.9%;
        display: block;
      }
    }

    @include m(back) {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: -1;
      em {
        @include pacenter();
        display: block;
        width: 45%;
        color: $--color-white-04;
        position: absolute;
        font-size: 12px;
        font-style: normal;
        &:after {
          content: '';
          display: block;
          padding-bottom: 100%;
          border: 1px dashed $--color-white-04;
        }
        i {
          @include pacenter();
          font-size: 3em;
          // color: $--color-white-04;
          color: inherit;
        }

        span {
          @include plcenter();
          display: inline-block;
          bottom: -2em;
          text-align: center;
          text-decoration: none;
          white-space: nowrap;
          
        }
      }
    }

    .gamecard {
      @include pacenter();
      width: 85%;

    }
  }
  
  @include e(desc) {
    padding: 30px 0;
    color: $--color-white-07;
  }

  @include e(handler) {
    .inner {
      @include displayFlex();
      padding: 20px 10px;
    }
    
    @include m(info) {
      -webkit-flex: 1;
      flex: 1;
      margin-bottom: 14px;
      p:first-child .el-checkbox{
        font-size: 18px;
        ::v-deep .el-checkbox__label{
          font-size: inherit;
          color: $--color-whitening-1;
        }
      }
      p:last-child {
        font-size: 12px;
        color: $--color-whitening-1;
      }
    }

    @include m(append) {
      // width: 100%;
      @include mediaAdapt($btnHandlerAppend);
      text-align: right;
      .submit {
        @include mediaAdapt($submit);
        font-family: OrbitronBlack;
        width: 10em;
        height: 2.625em;
      }
    }

  }
}

</style>