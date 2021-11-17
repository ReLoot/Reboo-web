<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
// import mu from '@/utils/metaMaskUtil'
import {mapGetters} from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters('user', {
      account: 'account',
    })
  },
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
    },
    'account'(n, o) {
      if (localStorage.getItem('token')) {
        this.$http('user_info', { eth_address: this.account })
          .then(res => {
            if(res.data) {
              this.$store.commit('user/email', res.data.email)
              this.$store.commit('user/subscribe', res.data.subscribe)
            }
          })
      }
    }
  },
  created(){
    if (localStorage.getItem('token') && this.account) {
      this.$mu.initlization()
      this.$http('user_info', { eth_address: this.account })
        .then(res => {
          // console.log(res)
          if(res.data) {
            // res.data
            this.$store.commit('user/email', res.data.email)
            this.$store.commit('user/subscribe', res.data.subscribe)
            this.$store.commit('user/gid', res.data.game_no)
            this.$store.commit('user/nft', res.data.nft)
            this.$store.commit('user/nickName', res.data.name)
          }
        }).catch(err => {
          // console.log(err)
        })
    }
  }
}
</script>

<style lang="scss">
@import '@/style/rewrite.scss';
</style>
