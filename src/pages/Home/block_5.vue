<template>
  <div class="home--bk">
    <div class="container">
      <bk-title bg="/image/home/bk_5_hd.png" title="Universe Exploration" color="#FF00CC" />
      <div class="home--bk_desc">
        {{$t('home.bk5Desc')}}
      </div>
    </div>

    <div class="home--bk_view">
      <img src="/image/home/cordy-daler-main1.jpg" alt="" error="" />
    </div>
  </div>
</template>

<script>
import bkTitle from '@/components/home/bk_title'
export default {
  components: {bkTitle},
}
</script>

<style lang="scss" scoped>
@import '@/style/custom.scss';
.container {
  padding-top: 60px;
  padding-bottom: 20px;
}

$view: (
  $--page-xs-width: (height: 300px),
  $--page-sm-width: (height: 406px),
  $--page-md-width: (height: 526px),
  $--page-lg-width: (height: 632px),
);

@include b(home) {
  @include e(bk) {
    margin-bottom: 100px;
    @include m(desc) {
      font-family: OrbitronRegular;
      width: 95%;
      margin: 40px auto 50px;
      line-height: 150%;
    }

    @include m(view) {
      @include mediaAdapt($view);
      // max-width: 100%;
      margin: 0 auto;
      // padding-bottom: 56.26%;
      // height: 0;
      // background: url(/image/home/cordy-daler-main1.jpg) no-repeat center/cover;
      img {
        height: 100%;
        margin: auto;
        max-width: 100%;
        display: block;
      }
    }
  }
}
</style>