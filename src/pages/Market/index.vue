<template>
  <div class="market">
    <div class="container">
      <el-row class="market--hd" >
        <el-col :sm="14" :xs="14">
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
        <el-col :sm="10" :xs="10">
        <div class="market--count">
          <span>{{$t('market.balance')}}: </span>
          <span class="num" :style="{color:'#D0E6EE'}">0.00 VBN</span>
        </div>
        </el-col>
      </el-row>
      <cus-divider dStyle="white" />

      <template v-if="curIdx == 0">
        <cus-store />
      </template>
      
      <template v-if="curIdx == 1">
        <cus-list typ="box" />
      </template>
      
      <template v-if="curIdx == 2">
        <cus-list typ="card" />
      </template>


    </div> 
  </div>
</template>

<script>
import cusStore from './store'
import cusList from './list'
export default {
  components: {cusStore, cusList},
  data(){
    return {
      curIdx: 0,
      tabs: [{
        txt: 'market.navTabItem1',
        type: 'store'
      },{
        txt: 'market.navTabItem2',
        type: 'boxList'
      },{
        txt: 'market.navTabItem3',
        type: 'cardList'
      }]
    }
  },
  methods: {
    tabsTrigger(cur) {
      this.curIdx = cur
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/custom.scss';
.container {
  padding-top: 100px;
}

$marketHdList: (
  $--page-xs-width:(padding: 20px 10px 20px),
  $--page-sm-width:(padding: 25px 10px 20px),
  $--page-md-width:(padding: 30px 10px 25px),
  $--page-lg-width:(padding: 40px 10px 30px),
);
$navItem: (
  $--page-xs-width:(marginRight: 40px),
  $--page-sm-width:(marginRight: 40px),
  $--page-md-width:(marginRight: 40px),
  $--page-lg-width:(marginRight: 80px),
);
$countList: (
  $--page-xs-width:(fontsize: 20px, lineHeight: 25px),
  $--page-sm-width:(fontsize: 23px, lineHeight: 28px),
  $--page-md-width:(fontsize: 25px, lineHeight: 32px),
  $--page-lg-width:(fontsize: 28px, lineHeight: 40px),
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
    .num {
      font-family: OrbitronRegular;
    }
  }
}

</style>