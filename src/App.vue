<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
// import mu from '@/utils/metaMaskUtil'
export default {
  name: 'App',
  watch: {
    '$route'(n) {
      document.documentElement.style.backgroundColor = '#18212C'
      for(let keys in n.matched) {
        // n.matched[keys]
        if (n.matched[keys]['meta'] && n.matched[keys]['meta']['background']) {
          document.documentElement.style.backgroundColor = n.matched[keys]['meta']['background']
          break
        }
      }
    }
  },
}
</script>

<style lang="scss">
@import '@/style/rewrite.scss';
</style>
