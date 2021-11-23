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
  async created(){
    if (localStorage.getItem('token') && this.account) {
      this.$mu.initlization()
      let params = {eth_address: this.account}
      try {
        const userInfo = await this.$http('user_info', params)
        if (userInfo && userInfo.data) {
          this.$store.commit('user/email', userInfo.data.email)
          this.$store.commit('user/subscribe', userInfo.data.subscribe)
          this.$store.commit('user/gid', userInfo.data.game_no)
          this.$store.commit('user/nft', userInfo.data.nft)
          this.$store.commit('user/nft_benefit', userInfo.data.nft_benefit)
          this.$store.commit('user/nickName', userInfo.data.name)
        }

        const whiteList = await this.$http('whiteList', params)
        if (whiteList && whiteList.data) 
            this.$store.commit('user/ido_qua', Boolean(parseInt(whiteList.data.is_white)))
            
        await this.$idoContract.checkQualification()
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/style/rewrite.scss';
</style>
