<template>
  <div class="dataList">No Data</div>
</template>

<script>
export default {
  props:['type']
}
</script>

<style lang="scss" scoped>
@import '@/style/custom.scss';
@include b(dataList) {
  text-align: center;
  font-size: 40px;
  font-family: OrbitronBlack;
  color: $--color-white-04;
  padding: 40px 0;
}
</style>