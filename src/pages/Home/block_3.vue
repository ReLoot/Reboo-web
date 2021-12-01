<template>
  <div class="home--bk">
    <div class="container">
      <bk-title bg="/image/home/bk_3_hd.png" title="Simulation Game" color="#FFED2C" />
      <article class="home--bk_desc">
        {{$t('home.bk3Desc')}}
      </article>

      <el-row class="cards2" :gutter="30"> 
        <template v-for="(item, idx) in cards">
          <el-col :key="`cd2_item_${idx}`" :sm="12">
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
  padding-top: 60px;
}

@include b(home) {
  @include e(bk) {
    @include m(desc) {
      font-family: OrbitronRegular;
      width: 90%;
      margin: 40px auto 50px;
    }
  }
}

$cardList: (
  $--page-xs-width: (maxwidth: 360px),
  $--page-sm-width: (maxwidth: 100%),
  $--page-md-width: (width: 630px, max-width: 100%),
  $--page-lg-width: (width: 650px, max-width: 100%),
);

$cardInner: (
  $--page-xs-width: (marginTop: 50px),
  $--page-sm-width: (marginTop: 50px),
  $--page-md-width: (marginTop: 50px),
  $--page-lg-width: (marginTop: 60px),
);
$cardInnerDesc: (
  $--page-xs-width: (paddingRight:20px, left:15px, ),
  $--page-sm-width: (paddingRight:45.25%, left:20px),
  $--page-md-width: (paddingRight:45.25%, left:30px),
  $--page-lg-width: (paddingRight:45.25%, left:30px),
);

@include b(cards2) {
  @include e(item) {
    @include mediaAdapt($cardList);
    margin-left: auto;
    margin-right: auto;
    background: no-repeat center/cover;
    opacity: 0.9;
    &:hover {
      opacity: 1;
    }

    &:hover &_inner img{
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
    }

    @include m(inner) {
       @include mediaAdapt($cardInner);
      padding-bottom: 36.2%;
      position: relative;
      height: 0;
      img {
        width: 51.25%;
        position: absolute;
        right: 0;
        bottom: 0;
        -webkit-transition: all 0.25s;
        transition: all 0.25s;
        -webkit-transform-origin: center;
        transform-origin: center;
      }
      .desc {
        @include mediaAdapt($cardInnerDesc);
        position: absolute;
        bottom: 20px;
        // padding-right: 45.25%;
        box-sizing: content-box;
        line-height: 120%;
        letter-spacing: 0;
      }
    }
  }
}

</style>
