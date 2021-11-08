<template>
  <div class="pages">
    <page-header></page-header>
      <router-view></router-view>
    <page-footer />
  </div>
</template>

<script>
import pageHeader from './header/nav'
import pageFooter from './footer'
export default {
  components: {pageHeader, pageFooter}
}
</script>
