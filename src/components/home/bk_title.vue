<template>
  <div class="bk--title">
    <h2 :style="{
      backgroundImage: `url(${bg})`,
      color: color
    }">{{title}}</h2>
  </div>
</template>

<script>
export default {
  props: {
    bg: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#FFFFFF'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/rewrite.scss';
@include b(bk) {
  @include e(title) {
    // height: 92px;
    text-align: center;
    h2 {
      display: inline-block;
      font-family: OrbitronBlack;
      font-size: 52px;
      text-align: center;
      margin-left: auto;
      margin-right: auto;
      line-height: 125%;
      padding: 15px 150px 15px 120px;
      // background: no-repeat center/cover;
      background-repeat: no-repeat;
      background-position: center;
      background-size: auto 100%;
      white-space: nowrap;

    }
  }
}
</style>