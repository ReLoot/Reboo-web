<template>
  <div class="page--nodata">
    <span>NO DATA</span>
  </div>
</template>

<style lang="scss" scoped>
@import '@/style/custom.scss';
@include b(page) {
  @include e(nodata) {
    text-align: center;
    font-size: 30px;
    font-family: OrbitronBlack;
    color: $--color-white-01;
  }
}

</style>