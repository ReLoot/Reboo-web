<template>
  <div class="page--nodata">
    <a></a>
    <p>Currentyl no content</p>
  </div>
</template>

<style lang="scss" scoped>
@import '@/style/custom.scss';
$nodata: (
  $--page-xs-width:(fontsize: 16px),
  $--page-sm-width:(fontsize: 18px),
  $--page-md-width:(fontsize: 24px),
  $--page-lg-width:(fontsize: 30px),
);
@include b(page) {
  @include e(nodata) {
    @include mediaAdapt($nodata);
    padding-top: 50px;
    padding-bottom: 50px;
    opacity: 0.2;
    text-align: center;
    // font-size: 30px;
    font-family: OrbitronRegular;
    color: $--color-white;
    position: relative;
    a {
      display: block;
      width: 5.87em;
      height: 4.4em;
      background: url(/image/no_data_lab.png) no-repeat center/cover;
      margin: 0 auto 30px;
    }
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
}

</style>