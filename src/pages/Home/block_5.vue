<template>
  <div class="home--bk">
    <div class="container">
      <bk-title bg="/image/home/bk_5_hd.png" title="Universe Exploration" color="#FF00CC" />
      <div class="home--bk_desc">
        {{$t('home.bk5Desc')}}
      </div>
    </div>

    <div class="home--bk_view"></div>
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
  padding-top: 100px;
  padding-bottom: 40px;
}

@include b(home) {
  @include e(bk) {
    @include m(desc) {
      font-family: OrbitronRegular;
      width: 70%;
      margin: 40px auto 50px;
      line-height: 150%;
    }

    @include m(view) {
      width: 100%;
      padding-bottom: 56.26%;
      height: 0;
      background: url(/image/home/cordy-daler-main1.jpg) no-repeat center/cover;
    }
  }
}
</style>