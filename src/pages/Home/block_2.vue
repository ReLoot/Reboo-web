<template>
  <div class="home--bk">
    <div class="container">
      <bk-title bg="/image/home/bk_2_hd.png" title="In-game DAO" color="#2CFFF3" />
      <article class="home--bk_desc">
        {{$t('home.bk2Desc')}}
      </article>

      <el-row class="cards" :gutter="50">
        <el-col :md="12">
          <div class="cards--item" style="background-image: url(/image/home/bk_2_itembg_1.png);">
            <em class="cards--item_toy" style="background-image:url(/image/home/bk_2_item_1.png)"></em>
            <div class="cards--item_ctn">
              <h4 style="color:#2CFFF3">{{$t('home.bk2Item1Hd')}}</h4>
              <div class="desc">{{$t('home.bk2Item1')}}</div>
            </div>
            
          </div>
        </el-col>
        <el-col :md="12">
          <div class="cards--item" style="background-image: url(/image/home/bk_2_itembg_2.png);">
            <em class="cards--item_toy" style="background-image:url(/image/home/bk_2_item_2.png)"></em>
            <div class="cards--item_ctn">
              <h4 style="color:#FFED2C">{{$t('home.bk2Item2Hd')}}</h4>
              <div class="desc">{{$t('home.bk2Item2')}}</div>
            </div>
          </div>
        </el-col>
      </el-row>
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
.container {
  padding-top: 100px;
}

@include b(home) {
  @include e(bk) {
    @include m(desc) {
      width: 60%;
      margin: 40px auto 50px;
      font-family: OrbitronRegular;
    }
  }
}

$cardList: (
  $--page-xs-width: (width:458px, height:402px, paddingTop: 285px),
  $--page-sm-width: (width:458px, height:402px, paddingTop: 285px),
  $--page-md-width: (width:534px, height:468px, paddingTop: 300px),
  $--page-lg-width: (width:632px, height:552px, paddingTop: 365px),
);
$toyList: (
  $--page-xs-width: (width:484px, height:363px, marginLeft: -242px),
  $--page-sm-width: (width:484px, height:363px, marginLeft: -242px),
  $--page-md-width: (width:534px, height:401px, marginLeft: -267px),
  $--page-lg-width: (width:632px, height:552px, marginLeft: -316px),
  // $--page-lg-width: (width:632px, height:552px, marginLeft: -316px),
);
// $ctnList: (
//   $--page-xs-width: (bottom: 35px),
//   $--page-sm-width: (bottom: 35px),
//   $--page-md-width: (bottom: 40px),
//   $--page-lg-width: (bottom: 50px),
// );
$ctnList: (
  $--page-xs-width: (top: 200px),
  $--page-sm-width: (top: 200px),
  $--page-md-width: (top: 280px),
  $--page-lg-width: (top: 300px),
);

@include b(cards) {
  text-align: center;
  padding-top: 106px;
  display: inline-block;
  @include clearfix();
  .el-col {
    overflow: visible;
  }
  @include e(item) {
    // width: 632px;
    // height: 552px;
    @include mediaAdapt($cardList);
    // float: left;
    position: relative;
    // margin-right: 50px;
    margin: auto;
    background: no-repeat center/cover;
    // padding: 365px 60px 0;
    padding-left: 60px;
    padding-right: 60px;
    @include m(toy) {
      // @include mediaAdapt($toyList);
      @include plcenter();
      width: 105%;
      padding-bottom: 80%;
      height: 0;
      top: -106px;
      background: no-repeat center/cover;
    }

    @include m(ctn) {
      @include plcenter();
      @include mediaAdapt($ctnList);
      position: absolute;
      width: 80%;
    }

    h4 {
      font-size: 35px;
      line-height: 100%;
      font-family: OrbitronBlack;
      margin-bottom: 30px;
      position: relative;
      z-index: 1;
      white-space: nowrap;
    }

    .desc {
      line-height: 150%;
    }

  }
}

</style>
