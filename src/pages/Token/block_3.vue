<template>
  <div class="token--bk">
    <div class="container">
      <bk-title bg="/image/token/bk_3_hd.png" title="Dual Token Model" color="#FFE02C" />
      <p class="token--bk_desc">{{$t('token.bk3Desc')}}</p>
      <div class="tk--pie hidden-sm-and-down">
        <div class="tk--pie_inner">
          <div class="tk--pie_view">
            <span class="unit">VBN</span>
          </div>
          <!-- <div class="tk--pie_item tk--pie_item_00">
            <p>
              <span>{{$t('token.bk3Pie1Item0')}} </span>
              <span class="num">1%</span>
            </p>
            <div class="stick">
              <em></em>
            </div>
          </div> -->

          <div class="tk--pie_item tk--pie_item_01">
            <p>
              <span>{{$t('token.bk3Pie1Item1')}} </span>
              <span class="num">5%</span>
            </p>
            <div class="stick">
              <em></em>
            </div>
          </div>
          <div class="tk--pie_item tk--pie_item_02">
            <p><span>{{$t('token.bk3Pie1Item2')}} </span><span class="num">5%</span></p>
            <div class="stick">
              <em></em>
            </div>
          </div>
          <div class="tk--pie_item tk--pie_item_03">
            <p><span>{{$t('token.bk3Pie1Item3')}} </span><span class="num">10%</span></p>
            <div class="stick">
              <em></em>
            </div>
          </div>
          <div class="tk--pie_item tk--pie_item_04">
            <p><span>{{$t('token.bk3Pie1Item4')}} </span><span class="num">80%</span></p>
            <div class="stick">
              <em></em>
            </div>
          </div>
        </div>
      </div>

      <div class="tk--pie tk--pie02 hidden-sm-and-down">
        <div class="tk--pie_inner">
          <div class="tk--pie_view">
            <span class="unit">DKMT</span>
          </div>
          <div class="tk--pie_desc">
            <span>{{$t('token.bk3Pie2desc')}}</span>
          </div>
          <div class="tk--pie_item tk--pie_item_01">
            <p>
              <span>{{$t('token.bk3Pie2Item1')}} </span>
              <span class="num">100%</span>
            </p>
            <div class="stick">
              <em></em>
            </div>
          </div>
          
        </div>
      </div>

    </div>
  </div>
</template>


<script>
import bkTitle from '@/components/home/bk_title'
export default {
  components: {bkTitle},
}
</script>

<style lang="scss" scoped>
@import '@/style/custom.scss';

@include b(token) {
  @include e(bk) {
    @include m(desc) {
      width: 90%;
      margin: 40px auto 100px;
      line-height: 150%;
      font-family: OrbitronRegular;
    }
  }
}

$pieList: (
  $--page-xs-width:(fontsize: 70px),
  $--page-sm-width:(fontsize: 70px),
  $--page-md-width:(fontsize: 70px),
  $--page-lg-width:(fontsize: 75px),
);

@include b(tk) {
  @include e(pie) {
    @include clearfix();
    margin-bottom: 1em;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    &:last-child {
      margin-bottom: 0;
    }
    @include mediaAdapt($pieList);
    @include m(inner) {
      position: relative;
      float: left;
    }

    @include m(view) {
      width: 7em;
      height: 7em;
      background: url(/image/token/pie_1.jpg) no-repeat center/cover;
      .unit {
        @include pacenter();
        font-size: 0.5em;
        font-family: OrbitronBlack;
        color: $--color-yellow;
      }
    }
    
    @include m(item) {
      @include displayFlex();
      position: absolute;
      right: -5.4em;
      p {
        width: 8em;
        text-align: right;
        height: 1em;
        word-break: break-all;
        position: absolute;
        bottom: -0.4em;
        right: 0;
        span {
          font-size: 0.26em;
          vertical-align: baseline;
          line-height: 100%;
          &.num {
            font-size: 0.4em;
            font-family: OrbitronBlack;
            vertical-align: baseline;
            color: $--color-yellow;
          }
        }
      }

      .stick {
        position: absolute;
        right: 0;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% auto;
      }
    }
    
    @include m(item_00) {
      top: 0;
      .stick {
        height: 1.3em;
        width: 7.5em;
        top: 0.0em;
        background-image: url(/image/token/pie_1_stick_0.png);
      }
    }
    
    @include m(item_01) {
      top: 0.9em;
      .stick {
        height: 0.7em;
        width: 7.1em;
        top: 0.0em;
        background-image: url(/image/token/pie_1_stick_1.png);
      }
    }

    @include m(item_02) {
      top: 1.8em;
      .stick {
        height: 0.6em;
        width: 6.5em;
        top: 0em;
        background-image: url(/image/token/pie_1_stick_2.png);
      }
    }

    @include m(item_03) {
      top: 3.52em;
      .stick {
        top: -0.3em;
        width: 6.22em;
        height: 0.54em;
        background-image: url(/image/token/pie_1_stick_3.png);
      }
    }
    
    @include m(item_04) {
      top: 6.1em;
      .stick {
        top: -0.3em;
        width: 7.52em;
        height: 0.64em;
        background-image: url(/image/token/pie_1_stick_4.png);
      }
    }
  }
}
.tk--pie02 {
  width: 100%;
  @include mediaAdapt($pieList);
  .tk--pie_inner {
    float: right;
  }

  .tk--pie_view {
    background-image: url(/image/token/pie_2.jpg);
    .unit {
      @include pacenter();
      color: $--color-blue;
    }
  }

  .tk--pie_desc {
    position: absolute;
    width: 4.52em;
    height: 0.83em;
    // top: 2.6em;
    top: 1em;
    left: -4.92em;
    line-height: 0;
    span {
      line-height: 1.25;
      font-size: 16px;
    }
  }

  .tk--pie_item {
    @include displayFlex();
    position: absolute;
    top: 5.38em;
    right: auto;
    left: -4.92em;
    p {
      right: auto;
      width: 6.22em;
      left: 0;
      text-align: left;
    }
    
    span.num {
      color: $--color-blue;
    }

    .stick {
      top: -0.4em;
      right: auto;
      left: 0;
      width: 6.22em;
      height: 0.64em;
      background-image: url(/image/token/pie_2_stick_1.png);
    }
  }
}

</style>