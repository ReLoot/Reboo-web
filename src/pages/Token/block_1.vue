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
      this.$message({
        showClose: true,
        message: this.$t('token.altr')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/custom.scss';
$bnListHd: (
  $--page-xs-width:(fontsize: 35px, marginTop: 243px),
  $--page-sm-width:(fontsize: 35px, marginTop: 243px),
  $--page-md-width:(fontsize: 35px, marginTop: 243px),
  $--page-lg-width:(fontsize: 40px, marginTop: 200px),
);
$btnList: (
  $--page-xs-width:(width: 256px, height: 67px, fontsize: 18px),
  $--page-sm-width:(width: 256px, height: 67px, fontsize: 18px),
  $--page-md-width:(width: 280px, height: 73px, fontsize: 22px),
  $--page-lg-width:(width: 280px, height: 73px, fontsize: 22px),
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