<template>
  <div class="home--bk">
    <div class="container">
      <bk-title bg="/image/home/bk_4_hd.png" title="Star War" color="#00E3FF" />
      <div class="home--bk_desc">
        {{$t('home.bk4Desc')}}
      </div>

      <div class="ship ship--scan">
        <img class="ship--scan_view" src="/image/home/bk_4_view.jpg" />
      </div>
    </div>
  </div>
</template>

<script>
import bkTitle from '@/components/home/bk_title'
export default {
  components: {bkTitle},
  data(){
    return {
    }
  }
  
}
</script>

<style lang="scss" scoped>
@import '@/style/custom.scss';
.container {
  padding-top: 60px;
}

@include b(home) {
  @include e(bk) {
    @include m(desc) {
      font-family: OrbitronRegular;
      width: 90%;
      margin: 40px auto 80px;
      line-height: 150%;
    }
  }
}

@include b(ship) {
  @include e(scan) {
    position: relative;
    top: 0;
    left: 0;
    margin: 0 auto;
    width: 100%;
    img {
      width: 100%;
      display: block;
    }
  }
}

</style>