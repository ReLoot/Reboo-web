<template>
  <div class="progress" :style="{width:width, display:arrangement=='row'?'-webkit-box':'block'}">
    <div class="progress--top" v-if="label || append">
      <label class="label">{{label}}</label>
      <div class="append">{{append}}</div>
    </div>

    <div class="progress--wrap" :style="{height:height}">
      <em class="progress--bar" :style="{width: progress*100+'%'}"></em>
      <span class="progress--count">{{(progress*100).toFixed(0)}}%</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    arrangement: {
      type: String,
      default: 'column'    // @params: row | column
    },
    label: {
      type: String,
      default: ''
    },
    append: {
      type: [String, Number],
      default: ''
    },
    // labelWidth: {
    //   type: [Number, String],
    //   default: '120px'
    // },
    width: {
      type: [String],
      default: '100%'
    },
    height: {
      type: [Number, String],
      default: '12px'
    },
    progress: {
      type: [Number, String],
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/custom.scss';
@include b(progress) {
  @include e(wrap) {
    position: relative;
    border: 1px solid $--color-aqua;
    width: 100%;
    flex: 1;
  }
  @include e(top) {
    @include clearfix();
    margin-bottom: 5px;
    font-size: 16px;
    label {
      width: 60%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      float: left;
      font-weight: 800;
    }
    .append {
      float: right;
      white-space: nowrap;
      width: 40%;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: right;
      color: $--color-white-04;
      font-size: 0.9em;
    }
  }
  @include e(bar) {
    height: 100%;
    background-image: linear-gradient(to right,  rgba(72, 255, 250, 0.2), rgba(44, 255, 243, 0.6));
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
  }
  @include e(count) {
    position: absolute;
    z-index: 1;
    color: $--color-whitening-1;
    top: 50%;
    right: -4px;
    font-size: 12px;
    -webkit-transform: translateY(-50%) scale(0.6);
    transform: translateY(-50%) scale(0.6);
  }
}
</style>