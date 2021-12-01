<template>
  <a 
    class="cus--btn cus--btn_ein"
    :class="{disabled}"
    :style="{backgroundImage: `url(${bg})`, color}"
  >
    <span class="cus--btn_str" >
      <slot></slot>
    </span>
  </a>
</template>

<script>
export default {
  props:{
    txt: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#FFFFFF'
    },
    bg: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/custom.scss';
@include b(cus) {
  @include e(btn) {
    @include m(ein) {
      display: inline-block;
      -webkit-user-select: none;
      user-select: none;
      user-select: none;
      position: relative;
      cursor: pointer;
      background: no-repeat center/cover;
      font-size: 14px;
      opacity: 0.9;
      -webkit-transform-origin: bottom;
      transform-origin: bottom;
      &:hover {
        opacity: 1;
        // transition: 0.25s all;
      }
      &:active {
        opacity: 0.8;
        -webkit-transform: scale(0.99);
        transform: scale(0.99);
      }

      &.disabled {
        opacity: 0.7;
        cursor: default;
      }
    }

    @include m(str) { 
      @include pacenter(); 
      color: inherit;
      white-space: nowrap;
      vertical-align: -6px;
      // margin-top: 3px;
    }
  }
}

</style>