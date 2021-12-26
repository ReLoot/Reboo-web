<template>
  <div class="market">
    <div class="container">
      <el-row class="market--hd" >
        <el-col :md="14" >
        <ul class="market--hd_tabs">
          <li 
            v-for="(item, key) in tabs" 
            :key="`market_tabs_${key}`" 
            @click="tabsTrigger(key)"
            :class="{'active': curIdx == key}"
          >
            {{ $t(item.txt) }}
          </li>
        </ul>
        </el-col>

        <el-col :md="10" >
          <div class="market--count">
            <span>{{$t('market.balance')}}: </span>
            <span class="num" :style="{color:'#D0E6EE'}">{{balance}} VBN</span>
          </div>
        </el-col>
      </el-row>
      <cus-divider-ein dStyle="white" />
      <template v-if="curIdx == 0">
        <cus-store />
      </template>
      
      <template v-if="curIdx == 1">
        <box-list />
      </template>
      
      <template v-if="curIdx == 2">
        <card-list />
      </template>


    </div> 
  </div>
</template>

<script>
import cusStore from './store'
import boxList from './boxlist'
import cardList from './cardlist'

import {mapGetters} from 'vuex'
export default {
  computed: {
      ...mapGetters('user', {
          balance: 'balance'
      }),
  },
  components: {cusStore, boxList, cardList},
  data(){
    return {
      curIdx: 0,
      tabs: [{
        txt: 'market.navTabItem1',
        type: 'market'
      },{
        txt: 'market.navTabItem2',
        type: 'market_boxesList'
      },{
        txt: 'market.navTabItem3',
        type: 'market_cardList'
      }]
    }
  },
  methods: {
    tabsTrigger(cur) {
      this.curIdx = cur
      this.$router.push({name: this.tabs[cur]['type']})
    },
  },
  
}
</script>

<style lang="scss" scoped>
@import '@/style/custom.scss';
.container {
  @include mediaAdapt($navHeight);
}

$marketHdList: (
  $--page-xs-width:(padding: 20px 10px 15px),
  $--page-sm-width:(padding: 20px 10px 15px),
  $--page-md-width:(padding: 25px 10px 20px),
  $--page-lg-width:(padding: 28px 10px 25px),
);

$nav: (
  $--page-xs-width:(textAlign: center),
  $--page-sm-width:(textAlign: center),
  $--page-md-width:(textAlign: left),
  $--page-lg-width:(textAlign: left),
);

$navItem: (
  $--page-xs-width:(marginRight: 18px, fontsize: 12px, lineHeight: 24px),
  $--page-sm-width:(marginRight: 18px, fontsize: 14px, lineHeight: 24px),
  $--page-md-width:(marginRight: 20px, fontsize: 16px, lineHeight: 24px),
  $--page-lg-width:(marginRight: 28px, fontsize: 18px, lineHeight: 24px),
);
$countList: (
  $--page-xs-width:(fontsize: 16px, lineHeight: 24px, marginTop:10px, textAlign: center),
  $--page-sm-width:(fontsize: 16px, lineHeight: 24px, marginTop:10px, textAlign: center),
  $--page-md-width:(fontsize: 16px, lineHeight: 24px, marginTop:0, textAlign: right),
  $--page-lg-width:(fontsize: 18px, lineHeight: 24px, marginTop:0, textAlign: right),
);

@include b(market) {
  @include e(hd) {
    @include mediaAdapt($marketHdList);
    // padding: 40px 10px 30px;
    font-family: OrbitronRegular;
    line-height: 40px;
    @include m(tabs) {
      @include mediaAdapt($nav);
      font-size: 0;
      line-height: 1;

      li {
        @include mediaAdapt($navItem);
        // float: left;
        cursor: pointer;
        display: inline-block;
        color: $--color-white-07;
        white-space: nowrap;
        &.active {
          color: $--color-aqua;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  @include e(count) {
    @include mediaAdapt($countList);
    text-align: right;
    // font-size: 28px;
    white-space: nowrap;
    .num {
      font-family: OrbitronRegular;
    }
  }
}

</style>