<template>
  <div class="gamecard">
    <div class="gamecard--inner">
      
      <h4 class="gamecard--title">#{{id}}</h4>

      <div class="gamecard--element">
        <!-- gamecard--element--view_building -->
        <em class="gamecard--element_view " /> 
      </div>

      <div class="gamecard--ctn" >
        <div class="l-part">
          <img class="rank" :src="`/image/market/rank_${rank.length}.png`" />
        </div>
        <div class="r-part">
          <template v-for="(item, attridx) in attributes">
            <p class="item" :key="`attr_${attridx}`">
              <label v-if="isLabel">{{attridx}}</label>
              <em class="progress" :class="{noBorder: !isLabel}">
                <span class="progress--bar">
                  <i class="progress--bar_inner" :style="{width: (item?item:0)+'%'}"></i>
                  <i class="progress--bar_num">{{item}} %</i>
                </span>
              </em>
            </p>
          </template>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    /* 
      @params: rank1 -- S
      @params: rank2 -- SS
      @params: rank3 -- SSS
    */
    rank: {
      type: String,
      default: ''     
    },
    /* 
      @params: objets {}
    */
    attributes: {
      type: Object,
      default: new Object()
    },
    id: {
      type: String,
      default: ''
    },
    isLabel: {
      type: [Boolean, Number],
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/custom.scss';
$cardTitle: (
  $--page-xs-width:(fontsize: 12px),
  $--page-sm-width:(fontsize: 15px),
  $--page-md-width:(fontsize: 18px),
  $--page-lg-width:(fontsize: 21px),
);
$rank: (
  $--page-xs-width:(height: 0.16em),
  $--page-sm-width:(height: 0.22em),
  $--page-md-width:(height: 0.28em),
  $--page-lg-width:(height: 0.34em),
);
$cardCtn: (
  $--page-xs-width:(padding: 0.03em),
  $--page-sm-width:(padding: 0.06em),
  $--page-md-width:(padding: 0.09em),
  $--page-lg-width:(padding: 0.12em),
);
$cardCtnLp: (
  $--page-xs-width:(padding: 0.1em ),
  $--page-sm-width:(padding: 0.15em),
  $--page-md-width:(padding: 0.2em),
  $--page-lg-width:(padding: 0.25em),
);

@include b(gamecard) {
  font-size: 100px;
  line-height: 0;
  -webkit-user-select: none;
  user-select: none;

  width: 100%;
  max-width: 2.37em;
  -webkit-transform-origin: center;
  transform-origin: center;
  -webkit-transition: all 0.25s;
  transition: all 0.25s;
  box-shadow: 0 0 5px 1px rgba(0,0,0,0.2);
  // &:hover {
  //   transform: scale(1.02);
  //   box-shadow: 0 0 20px 1px rgba(0,0,0,0.5);
  // }
  @include e(inner) {
    position: relative;
    border-radius: 4px;
    padding-bottom: 142%;
    width: 100%;
    height: 0;
    background: no-repeat center/cover;
    background-image: url(/image/market/tool_card_bg.png);
  }
  @include e(title) {
    @include mediaAdapt($cardTitle);
    @include plcenter();
    font-size: inherit;
    white-space: nowrap;
    width: 100%;
    top: 0;
    text-align: center;
    margin-top: 0.8em;
  }
  @include e(element) {
    position: absolute;
    left: 50%;
    top: 25.4%;
    width: 54%;
    margin-left: -27.5%;
    @include m(view) {
      display: block;
      padding-bottom: 100%;
      width: 100%;
      background: no-repeat center/cover;
      background-image: url(/image/card_tool.png);
    }
  }
  @include e(ctn) {
    @include mediaAdapt($cardCtn);
    width: 100%;
    // padding: 0.13em;
    position: absolute;
    left: 0;
    bottom: 0;
    .l-part img.rank {
      margin-bottom: 0;
    }

    
    .l-part {
      // @include mediaAdapt($cardCtnLp);
      padding: 0.05em;
      text-align: left;
      img.rank {
        @include mediaAdapt($rank);
      }
      p {
        line-height: 100%;
      }
    }

    .r-part {
      width: 98%;
      font-size: 0.12em;
      display: table;
      border-spacing: 5px 2px;
      font-family: Arial, Helvetica, sans-serif;
      margin: 0 auto 5px;

      border-collapse: collapse;
      label {
        display: table-cell;
        padding: 0;
        text-align: left;
        font-size: 12px;
        -webkit-transform: scale(0.8);
        transform: scale(0.8);
        -webkit-transform-origin: left;
        transform-origin: left;
      }
      p {
        display: table-row;
        width: 100%;
        white-space: nowrap;
        text-align: right;
        &.item {
          line-height: 125%;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
      
    }

    @include b(progress) {
      display: table-cell;
      color: $--color-aqua;
      width: 100%;
      vertical-align: middle;
      &.noBorder {
        padding-left: 0.5em;
        padding-bottom: 0.3em;
        .progress--bar{
          border: 0 none;
        }
      }

      @include e(bar) {
        position: relative;
        display: block;
        height: 0.8em;
        width: 100%;
        border: 1px solid $--color-aqua;
        @include m(inner) {
          height: 100%;
          background-image: linear-gradient(to right,  rgba(72, 255, 250, 0.2), rgba(44, 255, 243, 0.6));
          display: block;
        }
        @include m(num) {
          position: absolute;
          z-index: 1;
          color: $--color-whitening-1;
          top: 50%;
          right: -4px;
          font-size: 12px;
          -webkit-transform: translateY(-50%) scale(0.6);
          transform: translateY(-50%) scale(0.6);
          // -webkit-transform-origin: right;
          // transform-origin: right;
        }
      }
    }
  }
}

</style>