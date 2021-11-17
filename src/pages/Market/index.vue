<template>
  <div class="market">
    <div class="container">
      <el-row class="market--hd" >
        <el-col :lg="14" >
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

        <el-col :lg="10" >
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
// import {landContractClass, buildingContractClass} from '@/utils/contractUtils'

// const landCtr = new landContractClass()
// const buildCtr = new buildingContractClass()
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
        type: 'boxesList'
      },{
        txt: 'market.navTabItem3',
        type: 'cardList'
      }]
    }
  },
  // async created() {
  //   const balance = await landCtr.getVbnBalance()

  //   landCtr.classifyItem()
  //   buildCtr.classifyItem()
  // },
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
$navHeight: (
  $--page-xs-width:(paddingTop: 50px),
  $--page-sm-width:(paddingTop: 50px),
  $--page-md-width:(paddingTop: 63px),
  $--page-lg-width:(paddingTop: 76px),
);

.container {
  @include mediaAdapt($navHeight);
}

$marketHdList: (
  $--page-xs-width:(padding: 20px 10px 15px),
  $--page-sm-width:(padding: 20px 10px 15px),
  $--page-md-width:(padding: 25px 10px 20px),
  $--page-lg-width:(padding: 28px 10px 25px),
);

$navItem: (
  $--page-xs-width:(marginRight: 18px, fontsize: 16px, lineHeight: 24px),
  $--page-sm-width:(marginRight: 18px, fontsize: 16px, lineHeight: 24px),
  $--page-md-width:(marginRight: 20px, fontsize: 16px, lineHeight: 24px),
  $--page-lg-width:(marginRight: 28px, fontsize: 18px, lineHeight: 24px),
);
$countList: (
  $--page-xs-width:(fontsize: 16px, lineHeight: 24px),
  $--page-sm-width:(fontsize: 16px, lineHeight: 24px),
  $--page-md-width:(fontsize: 16px, lineHeight: 24px),
  $--page-lg-width:(fontsize: 18px, lineHeight: 24px),
);

@include b(market) {
  @include e(hd) {
    @include mediaAdapt($marketHdList);
    // padding: 40px 10px 30px;
    font-family: OrbitronRegular;
    line-height: 40px;
    @include m(tabs) {
      li {
        @include mediaAdapt($navItem);
        float: left;
        cursor: pointer;
        color: $--color-white-07;
        font-size: 22px;
        white-space: nowrap;
        &.active {
          color: $--color-aqua;
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