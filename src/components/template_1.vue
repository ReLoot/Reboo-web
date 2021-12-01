<template>
  <div 
    class="pages"
    :class="{'pages--menu_open': pageMenuVisible}"
  >
    <page-header></page-header>
      <router-view></router-view>
    <page-footer />
  </div>
</template>

<script>
import pageHeader from './header/nav'
import pageFooter from './footer'
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters('user', {
      account: 'account',
    }),
    ...mapGetters('common', {
      pageMenuVisible: 'pageMenuVisible'
    })
  },
  components: {pageHeader, pageFooter}
}
</script>

<style lang="scss" scoped>
// @import '@/style/custom.scss';
.pages {
  -webkit-transition: all 0.25s;
  transition: all 0.25s;
}
</style>
