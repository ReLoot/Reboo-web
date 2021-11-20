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
            <h4>{{poolTotal}} USDT</h4>
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
                  <span>-- VBN</span>
                </li>
              </template >

                
              
              <template v-if="step == 1 || step == 2">
                <!-- progress -->
                <li class="progress" >
                  <label>{{$t('ido.item6')}}</label>
                  <div class="progress--wrap">
                    <em class="progress--bar" :style="{width:`${progress}%`}"></em>
                    <div class="progress--append">
                      <span>{{progress}}</span>
                      <span>/</span>
                      <span>{{poolTotal}}</span>
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
                    :class="{disabled: step==2}"
                    bg="/image/account/btn_form.png"
                  >
                    <template v-if="step == 1">
                      {{$t('ido.btn1')}}
                    </template>
                    <template v-else>
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
          <p>Thank you for your interest in the Vibranium LaunchPad.</p>
          <p>Please fill out the application form. All information provided must be a true and accurate representation of the project and organisation. There are no costs associated with the application and interview process.</p>
          <p>Once you submit the application, a member of our team will contact you regarding next steps.</p>
          <p>Discord: <a>https://discord.com/invite/kERPbw3EhR</a></p>
          <p>Twitter: <a>https://twitter.com/Vibranium_VBN</a></p>
          <p>Tg:<a>https://t.me/Vibranium_VBN</a></p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import countDown from '@/components/timer/countDownTurn'
export default {
  components: {countDown},
  data(){
    return {
      step: localStorage.getItem('test_ido_step') || 0,
      startTimeStamp: 1637899200,
      poolTotal: 300000,
      progress: 0,
      piece: 300,
      leftItems: [{
        label: 'ido.item1',
        val: 'MAX 300 USDT'
      },{
        label: 'ido.item2',
        val: '$ 0.135'
      }],
      rightItems: [{
        label: 'ido.tbLab1',
        val: '1 VBN = $ 0.135 '
      },{
        label: 'ido.tbLab2',
        val: '11/26 2021, 12:00 PM'
      },{
        label: 'ido.tbLab3',
        val: '11/26 26th 2021, 12:00 PM'
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
    // console.log(this.$idoContract.checkQualification)
    const p = await this.$idoContract.getProgress()
    setTimeout(() => {
      this.progress = p.progress
    },250)
  },
  methods: {
    async pay() {
      if (this.step == 2) return false
      try {
        const res = await this.$idoContract.pay(this.piece)
      } catch (err) {
        this.$message({
          message: err,
          type: 'error'
        })
      }
      // const qua = await this.$idoContract.checkQualification()
      // if(qua) {
      //   return true
      // } else {
      //   this.$message({
      //     message: 'You are not eligible to buy',
      //     type: 'warning'
      //   })
      // }
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
        label, span {
          padding: 8px;
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
</style>