<template>
  <div class="home--bk">
    <div class="container">
      <bk-title bg="/image/home/bk_3_hd.png" title="Simulation Game" color="#FFED2C" />
      <article class="home--bk_desc">
        {{$t('home.bk3Desc')}}
      </article>

      <el-row class="cards2" :gutter="50"> 
        <template v-for="(item, idx) in cards">
          <el-col :key="`cd2_item_${idx}`" :md="12">
            <div
              class="cards2--item" 
              :style="{
                backgroundImage:`url(/image/home/${item.bg})`
              }"
            >
              <div class="cards2--item_inner">
                <img :src="`/image/home/${item.img}`" />
                <div class="desc">{{$t(item.desc)}}</div>
              </div>
            </div>
          </el-col>
        </template>
      </el-row>
    </div>
  </div>
</template>

<script>
import bkTitle from '@/components/home/bk_title'
export default {
  components: {bkTitle},
  data(){
    return {
      cards:[{
        bg: 'bk_3_itembg_1.png',
        img: 'bk_3_item_1.png',
        desc: 'home.bk3Item1'
      },{
        bg: 'bk_3_itembg_2.png',
        img: 'bk_3_item_2.png',
        desc: 'home.bk3Item2'
      },{
        bg: 'bk_3_itembg_3.png',
        img: 'bk_3_item_3.png',
        desc: 'home.bk3Item3'
      },{
        bg: 'bk_3_itembg_4.png',
        img: 'bk_3_item_4.png',
        desc: 'home.bk3Item4'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/custom.scss';
.container {
  padding-top: 100px;
}

@include b(home) {
  @include e(bk) {
    @include m(desc) {
      width: 60%;
      margin: 40px auto 50px;
    }
  }
}


$ctnList: (
  $--page-xs-width: (bottom: 35px),
  $--page-sm-width: (bottom: 35px),
  $--page-md-width: (bottom: 40px),
  $--page-lg-width: (bottom: 50px),
);

$cardList: (
  $--page-xs-width: (maxwidth: 500px),
  $--page-sm-width: (maxwidth: 550px),
  $--page-md-width: (width: 630px),
  $--page-lg-width: (width: 650px),
);

@include b(cards2) {
  @include e(item) {
    @include mediaAdapt($cardList);
    // max-width: 632px;
    // max-width: 500px;
    margin-left: auto;
    margin-right: auto;
    background: no-repeat center/cover;
    @include m(inner) {
      padding-bottom: 36.4%;
      position: relative;
      height: 0;
      margin-top: 88px;
      img {
        // width: 324px;
        // height: 300px;
        width: 51.25%;
        position: absolute;
        right: 0;
        bottom: 0;
      }
      .desc {
        // width: 326px;
        // width: 100%;
        position: absolute;
        left: 35px;
        bottom: 35px;
        padding-right: 45.25%;
        box-sizing: content-box;
      }
    }
  }
}

</style>
