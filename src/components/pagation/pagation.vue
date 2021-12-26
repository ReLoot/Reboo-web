<template>
  <div class="cus--pagation">
    <div class="cus--pagation_wrap">
      <div class="cus--pagation_btn btn-prev">
        <em></em>
      </div>
      <div class="cus--pagation_ctn">
        <span class="cur">{{current}}</span>
        <span>/</span>
        <span class="total">{{total}}</span>
      </div>
      <div class="cus--pagation_btn btn-next">
        <em></em>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['current', 'total']
}
</script>

<style lang="scss" scoped>
@import '@/style/custom.scss';
@include b(cus) {
  $_elem_h: 37px;
  // $_elem_w: 165px;
  @include e(pagation) {
    @include m(wrap) {
      background-color: $--color-bg-block;
      height: $_elem_h;
      line-height: $_elem_h;
      position: relative;
    }

    @include m(ctn) {
      border: 1px solid $--color-white-01;
      background-color: $--color-bg-block;
      text-align: center;
    }

    @include m(btn) {
      height: $_elem_h;
      em {
        border: 1px solid $--color-white-01;
        display: block;
        position: absolute;
        top: 0;
        width: 100%;
        padding-bottom: 100%;
        background: no-repeat center/cover;
      }

      &.next {
        em {
          background-image: url(/image/arr_r.png);
          left: 0;
        }
      }

      &.pre {
        em {
          background-image: url(/image/arr_l.png);
          right: 0;
        }
      }
    }

  }
}
</style>