<template>
  <div class="token--banner">
    <div class="container">
      <h2>Vibranium Token VBN</h2>
      <p class="token--banner_desc">
        {{$t('token.desc')}}
      </p>

      <div class="token--banner_btns ">
        <a href="https://pancakeswap.finance/swap" target="blank_">
          <cus-btn-ein 
            class="btn"
            bg="/image/token/btn_1.png"
          >{{$t('token.btn1')}}</cus-btn-ein>
        </a>

        <a href="https://bscscan.com/address/0x4B41cA61f5FBe12dDbA38bC2D8bacC5f68FD491F" target="blank_">
          <cus-btn-ein 
            class="btn"
            bg="/image/token/btn_2.png"
          >{{$t('token.btn2')}}</cus-btn-ein>
        </a>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toPancake() {
      
    },
    // link() {  //url
    //   this.$message({
    //     showClose: true,
    //     message: this.$t('token.altr')
    //   })
    // },
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/custom.scss';
$bnListHd: (
  $--page-xs-width:(fontsize: 35px, marginTop: 80px, width: 250px),
  $--page-sm-width:(fontsize: 35px, marginTop: 180px, width: 250px),
  $--page-md-width:(fontsize: 35px, marginTop: 243px, width: 100%),
  $--page-lg-width:(fontsize: 40px, marginTop: 200px),
);
$btnList: (
  $--page-xs-width:(width: 256px, height: 67px, fontsize: 18px, margin: 0 10px 20px 10px),
  $--page-sm-width:(width: 256px, height: 67px, fontsize: 18px, margin: 0 10px 20px 10px),
  $--page-md-width:(width: 280px, height: 73px, fontsize: 22px, margin: 0 35px 0 0),
  $--page-lg-width:(width: 280px, height: 73px, fontsize: 22px, margin: 0 35px 0 0),
);


@include b(token) {
  @include e (banner) {
    // @include mediaAdapt($bnList);
    background: url(/image/token/banner.jpg) no-repeat center/cover;
    height: 675px;
    .container {
      border-top:1px solid transparent;
    }

    h2 {
      @include mediaAdapt($bnListHd);
      // font-size: 70px;
      font-family: OrbitronBlack;
      margin-bottom: 35px;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
      color: $--color-yellow;
      line-height: 125%;
    }

    @include m(desc) {
      max-width: 720px;
      padding: 0 5px;
      font-size: 16px;
      line-height: 150%;
      margin: 0 auto 90px;
      font-family: OrbitronRegular;
    }

    @include m(btns) {
      text-align: center;
      .btn {
        @include mediaAdapt($btnList);
        font-family: OrbitronBlack;
      }

      & > a:last-child .btn {
        margin-right: 0;
      }

    }

  }
}


</style>