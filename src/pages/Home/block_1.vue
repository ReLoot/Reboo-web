<template>
  <div class="home--bk">
    <div class="container">
      <h1>{{$t('home.bannerTxt')}}</h1>
      <!-- <h1>From Here To The Sea Of Stars</h1> -->
      <!-- <cus-btn-ein 
        class="home--bk_btn"
        bg="/image/home/bk_1_btn.png"
      >{{$t('home.bannerBtn')}}</cus-btn-ein> -->
      <cus-btn-ein 
        class="home--bk_btn"
        bg="/image/home/bk_1_btn.png"
      >PLAY NOW</cus-btn-ein>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/style/custom.scss';
.container {
  position: relative;
  height: 100%;
  text-align: center;
}

$bkList: (
  $--page-xs-width:(height: 787px),
  $--page-sm-width:(height: 787px),
  $--page-md-width:(height: 787px),
  $--page-lg-width:(height: 934px),
);

$bkListHd: (
  $--page-xs-width:(fontsize: 50px, marginTop: 310px, marginBottom: 50px),
  $--page-sm-width:(fontsize: 68px, marginTop: 310px, marginBottom: 70px),
  $--page-md-width:(fontsize: 74px, marginTop: 310px, marginBottom: 60px),
  $--page-lg-width:(fontsize: 86px, margin: 358px auto 135px),
);
$btnList: (
  $--page-xs-width:(width: 340px, height: 105px, fontsize: 22px),
  $--page-sm-width:(width: 340px, height: 105px, fontsize: 22px),
  $--page-md-width:(width: 380px, height: 117px, fontsize: 28px),
  $--page-lg-width:(width: 422px, height: 130px, fontsize: 35px),
);

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
      width: 80%;
      display: inline-block;
      text-align: center;
      letter-spacing: 5px;
      line-height: 125%;
      color: $--color-aqua;
    }

    @include m(btn) {
      @include mediaAdapt($btnList);
    }
  }
}
</style>