<template>
  <div class="dataList">

    <div class="store--hd">
      <ul class="store--hd_tabs">
        <li 
          v-for="(item, idx) in tabs" 
          :key="`store_tabs_${idx}`"
          :class="{active: curTabIdx == idx}"
          @click="tabsTrigger(idx)"
        >{{$t(item.view)}}</li>
      </ul>
    </div>




  </div>
</template>

<script>
export default {
  props:['type'],
  data(){
    return {
      curTabIdx: 0,
      tabs: [{
        type: 'domain',
        view: 'market.boxType1',
      },{
        type: 'build',
        view: 'market.boxType2'
      }],
    }
  },
  methods: {
    tabsTrigger(cur) {
      this.curTabIdx = cur
    }
  }
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