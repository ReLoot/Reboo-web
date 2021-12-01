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
@import '@/style/custom.scss';
$itemTitle: (
  $--page-xs-width: (fontsize: 20px, padding:0, maxwidth: 85%, background: none),
  $--page-sm-width: (fontsize: 20px, padding:15px 91px 15px 90px, maxwidth: 80%),
  $--page-md-width: (fontsize: 30px, padding:15px 91px 15px 90px),
  $--page-lg-width: (fontsize: 34px, padding:18px 107px 18px 105px)
);

@include b(bk) {
  @include e(title) {
    // height: 92px;
    text-align: center;
    h2 {
      @include mediaAdapt($itemTitle);
      display: inline-block;
      font-family: OrbitronBlack;
      text-align: center;
      margin-left: auto;
      margin-right: auto;
      line-height: 125%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: auto 100%;
      white-space: nowrap;

    }
  }
}
</style>