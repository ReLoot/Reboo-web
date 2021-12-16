<template>
  <div class="home--bk">
    <div class="container">
      <h1 v-html="$t('home.bannerTxt')"></h1>

      <a href="http://game.vibraniumslg.io" target="_blank">
        <cus-btn-ein 
          class="home--bk_btn"
          bg="/image/home/bk_1_btn.png"
        >PLAY NOW</cus-btn-ein>
      </a>
      
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // bannerBtn(){
    //   this.$message(this.$t('token.altr'))
    // }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/custom.scss';
$bkList: (
  $--page-xs-width:(height: 422px),
  $--page-sm-width:(height: 422px),
  $--page-md-width:(height: 558px),
  $--page-lg-width:(height: 675px),
);

$bkListHd: (
  $--page-xs-width:(fontsize: 20px, marginTop: 172px, marginBottom: 40px),
  $--page-sm-width:(fontsize: 36px, marginTop: 172px, marginBottom: 40px),
  $--page-md-width:(fontsize: 45px, marginTop: 222px, marginBottom: 60px),
  $--page-lg-width:(fontsize: 53px, margin: 269px auto 85px),
);
$btnList: (
  $--page-xs-width:(width: 188px, height: 55px, fontsize: 16px),
  $--page-sm-width:(width: 188px, height: 55px, fontsize: 20px),
  $--page-md-width:(width: 242px, height: 70px, fontsize: 24px),
  $--page-lg-width:(width: 292px, height: 84px, fontsize: 28px),
);

.container {
  position: relative;
  height: 100%;
  text-align: center;
}

@include b(home){
  @include e(bk) {
    @include mediaAdapt($bkList);
    // height: 934px;
    width: 100%;
    font-family: OrbitronBlack;
    background: url(/image/home/bk_1_bg.jpg) no-repeat center;
    background-size: cover;
    -webkit-user-select: none;
    user-select: none;
    h1 {
      @include mediaAdapt($bkListHd);
      // width: 80%;
      display: inline-block;
      text-align: center;
      letter-spacing: 5px;
      line-height: 125%;
      color: $--color-aqua;
      white-space: nowrap;
    }

    @include m(btn) {
      @include mediaAdapt($btnList);
      display: block;
      margin: 0 auto;
    }
  }
}
</style>