<template>
  <div class="dao--block">
    <div class="dao--block_hd">
      <slot name="hd">Title</slot>
    </div>
    <div class="dao--block_bd">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
@import '@/style/custom.scss';
@include b(dao) {
  @include e(block) {
    border: 1px solid $--color-white-04;
    background-color: $--color-bg-block;
    color: $--color-whitening-1;
    @include m(hd) {
      border-bottom: 1px solid $--color-white-04;
      line-height: 125%;
      padding: 10px 18px;
      font-size: 18px;
    }
    @include m(bd) {

    }
  }
}
</style>