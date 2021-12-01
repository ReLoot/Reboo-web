<template>
  <div
    class="cus--divider"
    :class="`cus--divider_${dStyle}`"
  >
    <hr />
  </div>
</template>

<script>
export default {
  // props:['type']
  props: {
    dStyle:{
      type: String,
      default: 'white'
    }
  }
}
</script>

<style lang="scss" scoped >
@import '@/style/custom.scss';
@include b(cus) {
  @include e(divider) {
    position: relative;
    display: block;
    height: 12px;
    margin-left: auto;
    margin-right: auto;
    border: 0 none;
    opacity: 0.3;
    hr {
      @include pacenter();
      border: 0;
      width: 100%;
      height: 2px;
    }

    &:before, &:after {
      content:'';
      display: block;
      position: absolute;
      height: 12px;
      width: 12px;
      top: 50%;
      margin-top: -6px;
      background-color: inherit;
      z-index: 10;
    }

    &::before {
      left: 0;
    }
    
    &::after {
      right: 0;
    }

    @include m(blue) {
      &:before, &:after, hr {
        background-color: $--color-blue;
        
      }
    }
    @include m(green) {
      &:before, &:after, hr {
        background-color: $--color-success;
      }
    }
    @include m(white) {
      &:before, &:after, hr {
        background-color: $--color-white-04;
      }
    }

  }
}
</style>