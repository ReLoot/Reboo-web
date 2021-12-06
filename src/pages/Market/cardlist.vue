<template>
  <div class="dataList">

    <div class="dataList--hd">
      <tabs-market :tabs="tabs" :tabIdx="listType" @trigger="tabsTrigger" />
    </div>

    <div class="dataList--bd">

        <el-row class="dataList--bd_list" :gutter="20" v-if="viewList.length > 0">
          <el-col 
            v-for="(item, idx) in viewList"
            :key="`tool_list_${idx}`"
            :md="6" :sm="8" :xs="12"
          >
            <div class="dataList--bd_card toolCard">
              <div class="inner">
                <h4 class="title">
                  <span v-if="listType == 0">Landcard</span>
                  <span v-else># {{item.token_id}}</span>
                </h4>
                <div class="element--wrap">
                  <em 
                    class="element--view" 
                    :class="{
                      'element--view_land': listType == 0,
                      'element--view_building': listType == 1
                    }"
                  />
                </div>
                <div class="info" :class="{'land': listType==0, 'building': listType==1}">
                  <div class="l-part">
                    <img v-if="item.rarity == 'S'" class="rank" src="/image/market/rank_1.png" />
                    <img v-if="item.rarity == 'SS'" class="rank" src="/image/market/rank_2.png" />
                    <img v-if="item.rarity == 'SSS'" class="rank" src="/image/market/rank_3.png" />
                    <p v-if="listType==0"># {{item.token_id}}</p>
                  </div> 
                  <div class="r-part"  v-if="item.attributes">
                    <template v-for="(attr, key) in item.attributes" >
                      <p class="item" :key="`attr_${key}`">
                        <label>{{attrArrs[key]}}</label>
                        <!-- <span>{{attr}} %</span> -->
                        <em class="progress">
                          <span class="progress-bar">
                            <i class="progress-bar-inner" :style="{width: attr+'%'}"></i>
                            <i class="progress-bar-num">{{attr}} %</i>
                          </span>
                        </em>
                      </p>
                    </template>
                  </div>
                </div>

                <!-- <div class="info" :class="{'land': listType==0, 'building': listType==1}">
                  <div class="l-part">
                    <img v-if="item.rarity == 'S'" class="rank" src="/image/market/rank_1.png" />
                    <img v-if="item.rarity == 'SS'" class="rank" src="/image/market/rank_2.png" />
                    <img v-if="item.rarity == 'SSS'" class="rank" src="/image/market/rank_3.png" />
                  </div> 
                  <div class="r-part hidden-sm-and-down"  v-if="item.attributes">
                    <template v-for="(attr, key) in item.attributes" >
                      <p class="item" :key="`attr_${key}`">
                        <label>{{attrArrs[key]}}</label>
                        <em class="progress">
                          <span class="progress-bar">
                            <i class="progress-bar-inner" :style="{width: attr+'%'}"></i>
                          </span>
                        </em>
                      </p>
                    </template>
                  </div>
                </div> -->


              </div>
            </div>
          </el-col>
        </el-row>
        <cus-nodata v-else />

    </div>
  </div>
</template>

<script>
import tabsMarket from '@/components/tabs/tabs_market'
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters('user', {
      landCard: 'landCard',
      buildingCard: 'buildingCard'
    }),
  },
  components: {
    tabsMarket,
  },
  watch:{
    landCard(n) {
      if (n && this.listType == 0) 
        this.viewList = n
    },
    buildingCard(n) {
      if (n && this.listType == 1) 
        this.viewList = n
    }
  },
  data(){
    return {
      listType: 0,     // land 0 \ building 1
      tabs: [{
        type: 'domain',
        view: 'market.cardType1',
      },{
        type: 'build',
        view: 'market.cardType2'
      }],
      attrArrs: {
        'power': 'Power',
        'strong': 'Durability',
        'energy': 'Energy',
        'efficiency': 'Efficiency'
      },
      viewList: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.listType == 0) 
        this.viewList = this.landCard
      else
        this.viewList = this.buildingCard
    })
  },
  methods: {
    tabsTrigger(cur) {
      this.listType = cur
      if (cur == 0) {
        this.viewList = this.landCard
      } else {
        this.viewList = this.buildingCard
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/custom.scss';
$rank: (
  $--page-xs-width:(height: 22px),
  $--page-sm-width:(height: 28px),
  $--page-md-width:(height: 32px),
  $--page-lg-width:(height: 36px),
);


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
        white-space: nowrap;
        width: 100%;
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
    background: no-repeat center/cover
  }
}

@include b(toolCard) {
  .inner {
    background-image: url(/image/market/tool_card_bg.png)
  }
  @include b(element) {
    @include e(view_land) {
      background-image: url(/image/card_land.png)
    }
    @include e(view_building) {
      background-image: url(/image/card_tool.png)
    }
  }
  .info {
    width: 100%;
    padding: 13px;
    &.land {
      @include displayFlex();
      position: absolute;
      left: 0;
      bottom: 0;
      align-items: flex-end;
      justify-content: space-between;
      flex-wrap: unset;
      .l-part img.rank {
        margin-bottom: 20px;
      }
      .r-part {
        width: 47.5%;
      }
    }

    &.building {
      position: absolute;
      left: 0;
      bottom: 0;
      .l-part img.rank {
        margin-bottom: 0;
      }
      .r-part {
        width: 100%;
        font-size: 12px;
        display: table;
        border-spacing: 5px 2px;
        font-family: Arial, Helvetica, sans-serif;
        label {
          display: table-cell;
          padding: 0;
          text-align: left;
          font-size: 12px;
        }

        p {
          display: table-row;
          width: 100%;
          white-space: nowrap;
          text-align: right;
        }

        .progress {
          display: table-cell;
          margin-left: 5px;
          color: $--color-aqua;
          width: 100%;
          vertical-align: middle;
          &-bar {
            position: relative;
            display: block;
            height: 0.8em;
            width: 100%;
            border: 1px solid $--color-aqua;
            &-inner {
              height: 100%;
              background-image: linear-gradient(to right,  rgba(72, 255, 250, 0.2), rgba(44, 255, 243, 0.6));
              display: block;
            }
            &-num {
              position: absolute;
              z-index: 1;
              color: $--color-white;
              top: 50%;
              right: -4px;
              margin-top: -0.5em;
              font-size: 12px;
              -webkit-transform: translateY(-50%) scale(0.6);
              transform: translateY(-50%) scale(0.6);
            }
          }
        }
      }
    }


    .item {
      margin-bottom: 10px;
      line-height: 125%;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .l-part {
      img.rank {
        // height: 36px;
        @include mediaAdapt($rank);
        margin-bottom: 20px;
      }
      p {
        line-height: 100%;
      }
    }
  }
}

</style>