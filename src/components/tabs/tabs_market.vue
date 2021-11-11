<template>
  <ul class="market--tabs">
    <template v-for="(item, idx) in tabs" >
        <li 
          :key="`tabs_${idx}`"
          :class="{active: tabIdx == idx}"
          @click="tigger(idx)"
        >
          {{$t(item.view)}}
        </li>
    </template>
  </ul>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      defautl: [],
    },
    tabIdx: {
      type: Number,
      default: 0
    }
  },
  methods: {
    tigger(idx) {
      this.$emit('trigger',idx)
    }
  }
  
}
</script>

<style lang="scss" scoped>
@import '@/style/custom.scss';
$navItem: (
  $--page-xs-width:(lineHeight: 34px, height: 34px),
  $--page-sm-width:(lineHeight: 34px, height: 34px),
  $--page-md-width:(lineHeight: 40px, height: 40px),
  $--page-lg-width:(lineHeight: 46px, height: 46px),
);

@include b(market) {
  @include e(tabs) {
    @include clearfix();
    display: table;
    li {
      @include mediaAdapt($navItem);
      display: table-cell;
      border-collapse: collapse;
      float: left;
      padding-left: 20px;
      padding-right: 20px;
      text-align: center;
      border: 1px solid $--color-white-07;
      color: $--color-white-07;
      cursor: pointer;
      -webkit-user-select: none;
      user-select: none;
      font-size: 16px;
      font-family: OrbitronRegular;
      &.active {
        border-color: $--color-aqua;
        color: $--color-aqua;
      }
    }
  }
}

</style>