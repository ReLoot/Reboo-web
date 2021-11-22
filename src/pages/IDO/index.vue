<template>
  <div class="ido">
    <div class="container">
      <!--  -->
      <!--  -->
      <div style="margin-bottom:30px">
        测试按钮：
        <el-button @click="TESTstepChange(0)">未开始</el-button>
        <el-button @click="TESTstepChange(1)">进行中</el-button>
        <el-button @click="TESTstepChange(2)">已结束</el-button>
      </div>
      <!--  -->
      <!--  -->
      <div class="ido--hd">
        <h2>Project key indicato</h2>
        <p class="sub">{{$t('ido.sub')}}</p>
      </div>
      <el-row class="ido--bd" :gutter="40" >
        <el-col :sm="12" :md="24" :lg="12">
          <div class="ido--bd_lpart">
            <p class="sub" >{{$t('ido.item0')}}</p>
            <h4>{{maxMember*piece}} USDT</h4>
            <ul>
              <li v-for="(item, idx) in leftItems" :key="`litem_${idx}`" >
                <label>{{$t(item.label)}}</label>
                <em />
                <span>{{item.val}}</span>
              </li>

              <template v-if="step == 0">
                <li >
                  <label>{{$t('ido.item3')}}</label>
                  <em />
                  <span style="letter-spacing:0;">11/26 2021, 12:00 PM UTC</span>
                </li>

              </template>
              <template v-if="step == 0">
                <li class="timeCountWrap">
                  <label >{{$t('ido.item4')}}</label>
                  <count-down :date="startTimeStamp" />
                </li>
              </template>

              <template v-if="step == 2">
                <li >
                  <label>{{$t('ido.item5')}}</label>
                  <em />
                  <span>{{50*price}} VBN</span>
                </li>
              </template >
              
              <template v-if="step == 1 || step == 2">
                <!-- progress -->
                <li class="progress" >
                  <label>{{$t('ido.item6')}}</label>
                  <div class="progress--wrap">
                    <em class="progress--bar" :style="{width:`${progress.percent}%`}"></em>
                    <div class="progress--append">
                      <span>{{progress.amount}}</span>
                      <span>/</span>
                      <span>{{maxMember*piece}}</span>
                    </div>
                  </div>
                </li>
              </template>

              <template v-if="step == 1">
                <li class="amountShow">
                  <el-input value="300" :disabled="true">
                    <template slot="append">
                      <span>USDT</span>
                    </template>
                  </el-input>
                </li>
              </template>
              <template v-if="step == 1 || step == 2">
                <li>
                  <!-- <el-button>BUY NOW</el-button> -->
                  <cus-btn-ein 
                    @click.native="pay"
                    class="form_submit"
                    :class="{disabled: step==2 || !ido_qua || !ido_partake || loadingWarden.indexOf('IDO_PAYING') > -1}"
                    bg="/image/account/btn_form.png"
                  >
                    <template v-if="step == 1">
                      <template v-if="loadingWarden.indexOf('IDO_PAYING') > -1">
                        {{$t('common.loading')}}
                      </template>
                      <template v-else>
                        {{$t('ido.btn1')}}
                      </template>
                    </template>
                    <template v-if="step == 2">
                      {{$t('ido.btn2')}}
                    </template>
                  </cus-btn-ein>
                </li>
              </template>


            </ul>
          </div>
        </el-col>
        <el-col :sm="12" :md="24" :lg="12">
          <div class="ido--bd_rpart">
            <table>
              <template v-for="(item, keys) in rightItems" >
                <tr  :key="`ritem_${keys}`">
                  <td>{{$t(item.label)}}</td>
                  <td>{{$t(item.val)}}</td>
                </tr>
              </template>
            </table>
          </div>
        </el-col>
      </el-row>
      <div class="ido--desc">
        <h4 class="ido--desc_title">IDO Application</h4>
        <img class="ido--desc_banner" src="/image/ido/view_1.jpg" />
        <div class="ido--desc_ctn"> 
          <p>{{$t('ido.artP1')}}</p>
          <p>{{$t('ido.artP2')}}</p>
          <p>{{$t('ido.artP3')}}</p>
          <p>{{$t('ido.artP4')}}</p>
          <p>{{$t('ido.artP5')}}</p>
        </div>
      </div>
    </div>

    <el-dialog
      class="ido--tipblock"
      :visible.sync="tipVisible"
      :append-to-body="true"
      top="25vh"
    >
      <div class="inner">
        <h4>Warn</h4>
        <p class="ido--tipblock_sub">{{$t('ido.tipSub')}}</p>
        <p class="ido--tipblock_ctn">{{account}}</p>
        <cus-btn-ein 
          @click.native="tipVisible = !tipVisible"
          class="ido--tipblock_btn"
        >Confirm</cus-btn-ein>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import countDown from '@/components/timer/countDownTurn'
import {mapGetters} from 'vuex'
export default {
  components: {countDown},
  computed: {
      ...mapGetters('user', {
          account: 'account',
          ido_qua: 'ido_qua',
          ido_partake: 'ido_partake'
      }),
      ...mapGetters('common', {
        loadingWarden: 'loadingWarden'
      })
  },
  data(){
    return {
      tipVisible: false,
      step: localStorage.getItem('test_ido_step') || 0,
      startTimeStamp: 1637899200,
      progress: {
        amount: 0,
        people: 0,
        percent: 0
      },
      maxMember: 10,
      price: 6,
      piece: 300,
      leftItems: [{
        label: 'ido.item1',
        val: 'MAX 300 USD'
      },{
        label: 'ido.item2',
        val: '6 USD'
      }],
      rightItems: [{
        label: 'ido.tbLab1',
        val: '1 VBN = 6 USD'
      },{
        label: 'ido.tbLab2',
        val: '11/23 2021, 10:00 AM'
    },{
        label: 'ido.tbLab3',
        val: '11/26 2021, 10:00 AM'
      },{
        label: 'ido.tbLab4',
        val: 'ido.tbVal'
      },{
        label: 'ido.tbLab5',
        val: 'ido.tbVal'
      },{
        label: 'ido.tbLab6',
        val: 'ido.tbVal'
      }]
    }
  },
  async mounted() {
    const p = await this.$idoContract.getProgress(this.piece, this.maxMember)
    if (p.people == this.maxMember) this.step = 2
    setTimeout(() => {
      this.progress = {...p}
    },250)
  },
  methods: {
    async pay() {
      // this.addLoading()
      if(!this.ido_partake) return false
      if(this.progress.people == this.maxMember) {
        this.$message({
          message: 'Maximum number of participants reached',
          type: 'error'
        })
        return false
      }
      if(this.loadingWarden.indexOf('IDO_PAYING') > -1) return false

      this.$store.dispatch('common/addLoading', 'IDO_PAYING')
      if (this.step == 2 || !this.ido_qua) return false
      try {
        await this.$idoContract.pay(this.piece)
        this.progress = await this.$idoContract.getProgress(this.piece, this.maxMember*this.piece)
        this.$store.dispatch('common/deleteLoading', 'IDO_PAYING')
        this.tipVisible = true
      } catch (err) {
        this.$store.dispatch('common/deleteLoading', 'IDO_PAYING')
        this.$message({
          message: err,
          type: 'error'
        })
      }
    },
    TESTstepChange(ss) {
      localStorage.setItem('test_ido_step', ss)
      window.location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/custom.scss';
$navHeight: (
  $--page-xs-width:(paddingTop: 50px*2),
  $--page-sm-width:(paddingTop: 50px*2),
  $--page-md-width:(paddingTop: 63px*2),
  $--page-lg-width:(paddingTop: 76px*2),
);

.container {
  @include mediaAdapt($navHeight);
}

@include b(ido) {
  background: url(/image/ido/bg.jpg) no-repeat top center;
  background-size: 100% auto;
  @include e(hd) {
    font-family: OrbitronRegular;
    h2 {
      font-size: 34px;
      line-height: 125%;
      margin-bottom: 15px;
    }
    p {
      font-size: 12px;
    }
  }

  @include e(bd) {
    margin-top: 36px;
    margin-bottom: 40px;
    @include m(lpart) {
      margin-bottom: 30px;
      padding: 20px 40px 40px;
      height: 437px;
      background-color: rgba(78, 96, 119, 0.2);
      border:1px solid rgba(208, 230, 238, 0.2);
      .sub {
        font-family: OrbitronRegular;
        font-size: 16px;
        margin-bottom: 8px;
      }
      h4 {
        font-family: OrbitronRegular;
        font-size: 30px;
        margin-bottom: 30px;
      }

      li {
        @include displayFlex();
        font-size: 16px;
        white-space: nowrap;
        align-items: baseline;
        margin-bottom: 6px;
        label{
          padding: 8px 8px 8px 0;
        } 
        span {
          padding: 8px 0 8px 8px;
        }

        em {
          flex: 1;
          display: inline-block;
          border-bottom: 1px dashed $--color-white;
        }
      }

      .form_submit {
        width: 100%;
        height: 54px;
        font-size: 20px;
        font-family: OrbitronRegular;
        &.disabled {
          opacity: 0.5;
          cursor: default;
          -webkit-transform: scale(1);
          transform: scale(1);
        }
      }
    }

    @include m(rpart) {
      margin-bottom: 30px;
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
      }
      td {
        border: 1px solid $--color-white-04;
        padding: 21.85px 15px;
      }
    }
  }

  @include e(desc) {
    h4 {
      font-size: 30px;
      font-family: OrbitronRegular;
      margin-bottom: 30px;
    }

    @include m(banner) {
      width: 100%;
      display: block;
      margin-bottom: 35px;
    }

    @include m(ctn) {
      line-height: 150%;
      p {
        margin-bottom: 20px;
        color: $--color-white-04;
      }
    }
  }
}

@include b(progress) {
  align-items:center !important;
  margin-bottom: 20px !important;
  @include e(wrap) {
    flex: 1;
    width: 100%;
    height: 16px;
    border: 2px solid $--color-aqua;
    position: relative;
    overflow: hidden;
  }

  @include e(bar) {
    position: absolute;
    height: 100%;
    // background: $--color-aqua;
    background-image: linear-gradient(to right,  rgba(72, 255, 250, 0.6), rgba(44, 255, 243, 1));
    -webkit-transition: 0.5s all;
    transition: 0.5s all;
    border: 0 none !important;
  }

  @include e(append) {
    @include pvcenter();
    right: 0;
    font-size: 12px;
    line-height: 100%;
    span {
      padding: 0 !important;
    }
  }
}

@include b(amountShow) {
  margin-bottom: 30px !important;
}

@include b(timeCountWrap) {
  margin-top: 30px;
}


.el-input {
  ::v-deep &-group__append, &-group__prepend {
    border-color: rgba(208, 230, 238, 0.3);
    background-color: rgba(24, 33, 44, 0.3);
    color: rgba(208, 230, 238, 0.3);
    -webkit-user-select: none;
    user-select: none;
    span {
      padding: 0 !important;
      cursor: default;
      vertical-align: -2px;
    }
  }

  &-group--append {
    ::v-deep .el-input__inner {
      border-right: 0 none;
      background-color: rgba(24, 33, 44, 0.3);
      font-size: 12px;
    }
  }
}



@include b(ido) {
  @include e(tipblock) {
    ::v-deep .el-dialog {
      width: 377px;
      max-width: 90%;
      position: relative;
      &__header { display: none; }

      &__body {
        padding: 0;
      }
    }

    .inner {
      position: relative;
      padding: 25px 40px;
      background-color: #4B5056;
      border: 2px solid #99A9BD;
      color: $--color-white;
      text-align: center;
      font-family: OrbitronRegular;
    }

    h4 {
      font-size: 24px;
      white-space: nowrap;
      font-family: OrbitronBlack;
      margin-top: 20px;
      margin-bottom: 15px;
    }

    @include m(sub) {
      margin-bottom: 8px;
      font-size: 12px;
    }

    @include m(ctn) {
      font-family: OrbitronRegular;
      line-height: 125%;
      font-size: 14px;
      color: $--color-yellow;
      word-break: break-all;
      margin-bottom: 35px;
    }


    @include m(btn) {
      width: 200px;
      height: 40px;
      background: #2D8A92;
      border: 2px solid #58DFD7;
      font-family: OrbitronRegular;
      font-size: 16px;
    }

  }
}
</style>