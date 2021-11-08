<template>
  <div class="token--banner">
    <div class="container">
      <h2>Vibranium Token (VBN)</h2>
      <p class="token--banner_desc">
        {{$t('token.desc')}}
      </p>

      <div class="token--banner_btns">
        <cus-btn-ein 
        class="btn"
        bg="/image/token/btn_1.png"
      >{{$t('token.btn1')}}</cus-btn-ein>
        <!-- @click.native="link('https://dex.guru/')" -->

      <cus-btn-ein 
        class="btn"
        bg="/image/token/btn_2.png"
      >{{$t('token.btn2')}}</cus-btn-ein>
        <!-- @click.native="link('https://etherscan.io/')" -->

      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    link(url) {
      window.location.href = url
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/custom.scss';
// .container {
//   padding-top: 385px;
// }


$bnList: (
  $--page-xs-width:(height: 787px),
  $--page-sm-width:(height: 787px),
  $--page-md-width:(height: 787px),
  $--page-lg-width:(height: 933px),
);
$bnListHd: (
  $--page-xs-width:(fontsize: 60px, marginTop: 335px),
  $--page-sm-width:(fontsize: 60px, marginTop: 335px),
  $--page-md-width:(fontsize: 60px, marginTop: 335px),
  $--page-lg-width:(fontsize: 70px, marginTop: 385px),
);


@include b(token) {
  @include e (banner) {
    @include mediaAdapt($bnList);
    background: url(/image/token/banner.jpg) no-repeat center/cover;
    border-top:1px solid transparent;

    h2 {
      @include mediaAdapt($bnListHd);
      // font-size: 70px;
      font-family: OrbitronBlack;
      margin-bottom: 35px;
      text-align: center;
      color: $--color-yellow;
    }

    @include m(desc) {
      max-width: 720px;
      padding: 0 5px;
      font-size: 16px;
      line-height: 150%;
      margin: 0 auto 90px;
    }

    @include m(btns) {
      text-align: center;
      .btn {
        width: 345px;
        height: 90px;
        margin-right: 35px;
        font-family: OrbitronBlack;
        font-size: 32px;
        &:last-child {
          margin-right: 0;
        }
      }
    }

  }
}


</style>