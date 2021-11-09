<template>
  <div class="token--banner">
    <div class="container">
      <h2>Vibranium Token VBN</h2>
      <p class="token--banner_desc">
        {{$t('token.desc')}}
      </p>

      <div class="token--banner_btns">
        <cus-btn-ein 
        class="btn"
        bg="/image/token/btn_1.png"
        @click.native="link"
      >{{$t('token.btn1')}}</cus-btn-ein>

      <cus-btn-ein 
        class="btn"
        bg="/image/token/btn_2.png"
        @click.native="link"
      >{{$t('token.btn2')}}</cus-btn-ein>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    link() {  //url
      // window.location.href = url
      // if (type == 2) {
      //   window.location.href = 'https://discord.com/invite/Cu9FcCMrrz'
      // } else {
      //   alert(this.$t('token.altr'))
      // }
      this.$message({
        showClose: true,
        message: this.$t('token.altr')
      })
      // return false
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
$btnList: (
  $--page-xs-width:(width: 280px, height: 73px, fontsize: 22px),
  $--page-sm-width:(width: 280px, height: 73px, fontsize: 22px),
  $--page-md-width:(width: 300px, height: 78px, fontsize: 28px),
  $--page-lg-width:(width: 345px, height: 90px, fontsize: 30px),
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
      font-family: OrbitronRegular;
    }

    @include m(btns) {
      text-align: center;
      .btn {
        @include mediaAdapt($btnList);
        // width: 345px;
        // height: 90px;
        // font-size: 32px;
        margin-right: 35px;
        font-family: OrbitronBlack;
        &:last-child {
          margin-right: 0;
        }
      }
    }

  }
}


</style>