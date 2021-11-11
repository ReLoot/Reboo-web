<template>
  <div class="dataList">

    <div class="dataList--hd">
      <tabs-market :tabs="tabs" :tabIdx="curTabIdx" @trigger="tabsTrigger" />
    </div>

    <div class="dataList--bd">

      <el-row class="dataList--bd_list" :gutter="20">

        <el-col 
          v-for="(item, idx) in landBoxList"
          :key="`list_${idx}`"
          :md="6" :sm="8" :xs="12"
        >
          <div class="dataList--bd_card blinebox ">
            <div class="inner">
              <h4 class="title">{{item.name}}</h4>
              <div class="element--wrap">
                <em class="element--view" />
              </div>
              <cus-btn-ein
                class="card_btn"
                @click.native="boxOpen(item.bid)"
              >OPEN</cus-btn-ein>
            </div>
          </div>
        </el-col>

        <el-col 
          v-for="(item, idx) in landBoxList"
          :key="`list_${idx}`"
          :md="6" :sm="8" :xs="12"
        >
          <div class="dataList--bd_card toolCard">
            <div class="inner">
              <h4 class="title">{{item.name}}</h4>
              <div class="element-wrap">
                <em class="element-view" />
              </div>
              <div class="info">
                <div class="l-part">
                  <img class="rank" src="/image/market/rank_1.png" />
                  <p># L8804</p>
                </div> 
                <div class="r-part">
                  <p class="item">
                    <label>Sturdy</label>
                    <span>15 %</span>
                  </p>
                  <p class="item">
                    <label>Sturdy</label>
                    <span>15 %</span>
                  </p>
                  <p class="item">
                    <label>Sturdy</label>
                    <span>15 %</span>
                  </p>
                  <p class="item">
                    <label>Sturdy</label>
                    <span>15 %</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </el-col>


      </el-row>
    </div>
  </div>
</template>

<script>
import tabsMarket from '@/components/tabs/tabs_market'
export default {
  props:['type'],
  components: {
    tabsMarket,
  },
  data(){
    return {
      curTabIdx: 0,
      tabs: [{
        type: 'domain',
        view: 'market.boxType1',
      },{
        type: 'build',
        view: 'market.boxType2'
      }],
      landBoxList: [{
        name: '领土宝箱',
        bid: '123'
      },{
        name: '领土宝箱',
        bid: '223'
      },{
        name: '领土宝箱',
        bid: '333'
      }],
      toolBox:[{
        name: '置地卡',
        view: ''
      }]
    }
  },
  methods: {
    tabsTrigger(cur) {
      this.curTabIdx = cur
    },
    boxOpen(id) {
      // console.log('a')
      console.log(id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/custom.scss';

@include b(dataList) {
  @include e(hd) {
    margin: 20px 0 40px;
  }

  @include e(bd) {
    @include clearfix();
    .el-col {
      margin-bottom: 20px;
    }
    @include m(card) {
      width: 100%;
      max-width: 237px;
      -webkit-transform-origin: center;
      transform-origin: center;
      -webkit-transition: all 0.25s;
      transition: all 0.25s;
      box-shadow: 0 0 5px 1px rgba(0,0,0,0.2);

      &:hover {
        transform: scale(1.02);
        box-shadow: 0 0 20px 1px rgba(0,0,0,0.5);
      }

      .inner {
        border-radius: 4px;
        padding-bottom: 142%;
        width: 100%;
        height: 0;
        position: relative;
        background: no-repeat center/cover;
        font-family: OrbitronRegular;
      }

      h4 {
        @include plcenter();
        width: 150px;
        height: 36px;
        line-height: 36px;
        top: 0;
        text-align: center
      }


    }
  }
}

@include b(element) {
  @include e(wrap) {
    position: absolute;
    left: 50%;
    top: 25.4%;
    width: 54%;
    margin-left: -27.5%;
  }
  @include e(view) {
    display: block;
    padding-bottom: 100%;
    width: 100%;
    // background: url(/image/box_build.png) no-repeat center/cover;
    background: no-repeat center/cover
  }
}

@include b(blinebox) {
  .inner {
    background-image: url(/image/market/box_card_bg.png) 
  }
  @include b(element) {
    @include e(view) {
      background-image: url(/image/box_build.png)
    }
  }
  .card_btn {
    width: 80%;
    height: 44px;
    line-height: 44px;
    font-size: 24px;
    position: absolute;
    bottom: 22px;
    left: 50%;
    margin-left: -40%;
    background-color: #2D8A92;
    border: 2px solid #3DB5AE;
    font-size: 18px;
  }
}

@include b(toolCard) {
  .inner {
    background-image: url(/image/market/tool_card_bg.png)
  }
  @include b(element) {
    @include m(view) {
      background-image: url(/image/box_build.png)
    }
  }
  .info {
    @include displayFlex();
    position: absolute;
    left: 0;
    bottom: 0;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: unset;
    width: 100%;
    padding: 13px;
    
    .item {
      margin-bottom: 10px;
      line-height: 125%;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .l-part {
      // width: 50%;
      img.rank {
        height: 36px;
        margin-bottom: 20px;
      }
      p {
        line-height: 100%;
      }

    }
    .r-part {
      width: 47.5%;
      font-size: 12px;
      p {
        @include displayFlex();
        justify-content: space-between;
        width: 100%;
      }
    }
  }
}

</style>