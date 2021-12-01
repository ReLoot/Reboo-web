<template>
  <div class="home--bk">
    <div class="container">
      <bk-title bg="/image/home/bk_2_hd.png" title="In-game DAO" color="#2CFFF3" />
      <article class="home--bk_desc">
        {{$t('home.bk2Desc')}}
      </article>

      <div class="cards">
        <el-row class="cards-wrap" :gutter="50">
          <el-col :sm="12" :md="12">
            <div class="cards--item" style="background-image: url(/image/home/bk_2_itembg_1.png);">
              <div class="cards--item_toy" >
                <em style="background-image:url(/image/home/bk_2_item_1.png)"></em>
              </div>
              <div class="cards--item_ctn">
                <h4 style="color:#2CFFF3">{{$t('home.bk2Item1Hd')}}</h4>
                <div class="desc">{{$t('home.bk2Item1')}}</div>
              </div>
              
            </div>
          </el-col>
          <el-col :sm="12" :md="12">
            <div class="cards--item" style="background-image: url(/image/home/bk_2_itembg_2.png);">
              <div class="cards--item_toy" >
                <em style="background-image:url(/image/home/bk_2_item_2.png)"></em>
              </div>
              <div class="cards--item_ctn">
                <h4 style="color:#FFED2C">{{$t('home.bk2Item2Hd')}}</h4>
                <div class="desc">{{$t('home.bk2Item2')}}</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import bkTitle from '@/components/home/bk_title'
export default {
  components: {bkTitle}
}
</script>

<style lang="scss" scoped>
@import '@/style/custom.scss';
$container: (
  $--page-xs-width: (paddingTop: 60px),
  $--page-sm-width: (paddingTop: 60px),
  $--page-md-width: (paddingTop: 80px),
  $--page-lg-width: (paddingTop: 80px),
);
$cardList: (
  $--page-xs-width: (width:320px, height:279px, paddingTop: 178.7px),
  $--page-sm-width: (width:385px, height:336px, paddingTop: 215px),
  $--page-md-width: (width:385px, height:336px, paddingTop: 215px),
  $--page-lg-width: (width:465px, height:407px, paddingTop: 270px),
); 
$ctnList: (
  // $--page-xs-width: (top: 95px),
  // $--page-sm-width: (top: 95px),
  $--page-xs-width: (top: 110px),
  $--page-sm-width: (top: 187px),
  $--page-md-width: (top: 187px),
  $--page-lg-width: (top: 230px),
);

$itemTitle: (
  $--page-xs-width: (fontsize: 17px, marginBottom: 8px),
  $--page-sm-width: (fontsize: 20px, marginBottom: 8px),
  $--page-md-width: (fontsize: 23px, marginBottom: 12px),
  $--page-lg-width: (fontsize: 26px, marginBottom: 16px),
);
.container {
  @include mediaAdapt($container);
}

@include b(home) {
  @include e(bk) {
    @include m(desc) {
      width: 90%;
      margin: 40px auto 20px;
      font-family: OrbitronRegular;
    }
  }
}
@include b(cards) {
  text-align: center;
  @include clearfix();
  .el-col {
    overflow: visible;
    margin-top: 120px;
  }
  @include e(wrap) {
    display: inline-block;
  }

  @include e(item) {
    @include mediaAdapt($cardList);
    position: relative;
    margin: auto;
    background: no-repeat center/cover;
    padding-left: 60px;
    padding-right: 60px;
    opacity: 0.95;
    @include m(toy) {
      @include plcenter();
      width: 105%;
      height: 0;
      top: -106px;
      em {
        -webkit-transform-origin: center;
        transform-origin: center;
        display: block;
        width: 100%;
        padding-bottom: 80%;
        position: absolute;
        top: 0;
        left: 0;
        background: no-repeat center/cover;
        -webkit-transition: 0.25s all;
        transition: 0.25s all;
      }
    }
    @include m(ctn) {
      @include plcenter();
      @include mediaAdapt($ctnList);
      position: absolute;
      width: 86.8%;
    }
    h4 {
      @include mediaAdapt($itemTitle);
      line-height: 100%;
      font-family: OrbitronBlack;
      position: relative;
      z-index: 1;
      white-space: nowrap;
      text-align: left;
    }
    .desc {
      line-height: 125%;
      text-align: left;
    }

    &:hover {
      opacity: 1;
    }

    &:hover &_toy em{
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
    }

  }
}

</style>
