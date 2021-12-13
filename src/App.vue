<template>
  <div 
    id="app"
    :class="{'menu-on': pageMenuVisible}"
  >
    <div 
      class="app--menu"
      :class="{'pages--menu_open': pageMenuVisible}"
    >
      <div class="app--menu_user" v-if="account">
        <a class="app--menu_avatar"></a>
        <p class="name">{{nickName}}</p>
        <p class="num">{{gid}}</p>
      </div>
      <div v-else class="app--menu_walletconnect">
        <cus-btn-ein 
          bg="/image/btn_banner.png"
          @click.native="walletConnect"
        >{{$t('header.btn')}}</cus-btn-ein>
      </div>

      <ul >
        <template v-for="(item, idx) in navs">
          <router-link 
            tag="li" 
            :key="`menu_item_${idx}`" 
            v-if="item.meta && item.meta.view"
            :class="{active: curRoute.match(item.name)}"
            :to="{name: item.name}"
            @click.native="menuTrigger"
          >{{$t(item.meta.view)}}</router-link>
        </template>

        <router-link v-if="authentication" :to="{name: 'personalInfo'}" :class="{active: curRoute == 'personalInfo'}" tag="li" @click.native="menuTrigger">{{$t('header.dropItem1')}}</router-link>
        <template v-if="authentication">
          <router-link v-if="nft_benefit==1" :to="{name: 'receivenft'}" :class="{active: curRoute == 'receivenft'}" tag="li" @click.native="menuTrigger">{{$t('header.dropItem2')}}</router-link>
          <router-link v-if="nft_benefit==0 && nft" :to="{name: 'idcard'}" :class="{active: curRoute == 'idcard'}" tag="li" @click.native="menuTrigger">{{$t('header.dropItem3')}}</router-link>
        </template>
      </ul>

      <div class="app--menu_append">
        <div class="localeBtn" @click="changeLang">
          <span :class="{'active': $i18n.locale == 'en'}">English</span>
          <span> / </span>
          <span :class="{'active': $i18n.locale != 'en'}">繁体中文</span>
        </div>

        <cus-btn-ein 
          class="subscribeBtn"
          :bg="`/image/footer_btn_subscribe.png`"
          @click.native="subscrTrigger"
          v-if="authentication"
        >
          <em  v-if="subscribe == 1" class="subscribed"></em>
          <em v-else class="unsubscribe"></em>
          <span v-if="subscribe == 1" >{{$t('footer.unsubscribe')}}</span>
          <span v-else >{{$t('footer.subscribe')}}</span>
        </cus-btn-ein>
      </div>
    </div>
    <div 
      class="app--menu_mask" 
      :class="{'on': pageMenuVisible}"
      @click="menuTrigger"
    ></div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
// import mu from '@/utils/metaMaskUtil'
import {pageInitlization} from '@/utils/bootstrap'
import {mapGetters} from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters('user', {
      account: 'account',
      nickName: 'nickName',
      gid: 'gid',
      nft: 'nft',
      nft_benefit: 'nft_benefit',
      ido_qua: 'ido_qua',
      ido_unpartake: 'ido_unpartake',  // false is buy ido
      subscribe: 'subscribe'
    }),
    ...mapGetters('common', {
      loadingWarden: 'loadingWarden',
      pageMenuVisible: 'pageMenuVisible',
      authentication: 'authentication'
    }),
    locale(){
      return this.$i18n.locale == 'en' ? 'English' : '繁体中文'
    },
  },
  data() {
    return {
      navs: this.$router.options.routes[1]['children'],
      curRoute: ''
    }
  },
  watch: {
    '$route'(to) {
      this.curRoute = to.name
      document.documentElement.style.backgroundColor = '#18212C'
      for(let keys in to.matched) {
        if (to.matched[keys]['meta'] && to.matched[keys]['meta']['background']) {
          document.documentElement.style.backgroundColor = to.matched[keys]['meta']['background']
          break
        }
      }
    },
    'account'(n, o) {
      // if (localStorage.getItem('token') && !this.loadingWarden.includes('user_info')) {
      //   this.$http('user_info', { eth_address: this.account })
      //     .then(res => {
      //       if(res.data) {
      //         this.$store.commit('user/email', res.data.email)
      //         this.$store.commit('user/subscribe', res.data.subscribe)
      //       }
      //     })
      // }
      console.log('Account Change: ----------')
      this.init()
    }
  },
  async created(){
    await pageInitlization()
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init() {
      this.$landContract.init()
      this.$buildingContract.init()
      this.$idoContract.checkQualification()
    },
    menuTrigger() {
      this.$store.dispatch('common/pageMenuTrigger')
    },
    subscrTrigger() {
      this.$globalBus.$emit("EMAIL_SUBSCRIBED")
      this.$store.dispatch('common/pageMenuTrigger')
    },
    async walletConnect() {
      await pageInitlization(true)
    },
    changeLang() {
      let lang_
      if(this.$i18n.locale == 'en') {
        lang_ = 'zh'
      } else {
        lang_ = 'en'
      }
      this.$i18n.locale = lang_
      localStorage.setItem('lang', lang_)
    },
  }
}
</script>

<style lang="scss">
@import '@/style/rewrite.scss';
#app {
  position: relative;
  top: 0;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  &.menu-on {
    position: fixed;
    height: 100%;
    overflow: hidden;
  }
}

@include b(app) {
  @include e(menu) {
    position: absolute;
    height: 100%;
    width: $--page-menu-width;
    margin-left: -1*$--page-menu-width;
    background: rgba(0,0,0,0.45);
    -webkit-transition: all 0.25s;
    transition: all 0.25s;
    z-index: 99;
    padding:20px 16px;

    li {
      font-size: 14px;
      font-family: OrbitronRegular;
      padding: 10px 0;
      line-height: 100%;
      color: $--color-white-04;
      &.active {
        color: $--color-aqua;
      }
    }

    @include m(user) {
      border-bottom: 1px solid $--color-white-01;
      padding-bottom: 8px;
      margin-bottom: 8px;
      p {
        font-family: OrbitronRegular;
        font-size: 12px;
        text-align: center;
        white-space: nowrap;
        color: $--color-white-04;
        line-height: 100%;
        margin-bottom: 5px;
        &.name {
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 16px;
        }
        &.num {
          color: $--color-white-01;
          transform: scale(0.8);
        }
      }
    }

    @include m(walletconnect) {
      text-align: center;
      margin-bottom: 15px;
      & > a {
        width: 95%;
        height: 42px;
        font-family: OrbitronRegular;
      }
    }

    @include m(avatar) {
      width: 60px;
      height: 60px;
      background: url(/image/avatar.png) no-repeat center/cover;
      border-radius: 50%;
      display: block;
      margin: 0 auto 20px;
    }

    @include m(mask) {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.25);
      top: 0;
      left: 0;
      z-index: 90;
      display: none;
      &.on {
        display: block;
      }
    }

    @include m(append) {
      @include plcenter();
      bottom: 40px;
      opacity: 0.8;
    }

    // $--append-btn: 
    .subscribeBtn {
      // width: 160px;
      padding-left: 10px;
      padding-right: 10px;
      // height: 43px;
      width: 125px;
      height: 32px;
      line-height: 28px;
      margin-left: auto;
      margin-right: auto;
      em {
        display: inline-block;
        width: 12px;
        height: 14px;
        background: no-repeat center/cover;
        vertical-align: middle;
        margin-right: 5px;
        &.subscribed {
          background-image: url(/image/lab_subscribe.png);
        }
        &.unsubscribe {
          background-image: url(/image/lab_unsubscribe.png);
        }
      }

      ::v-deep .cus--btn_str {
        margin-top: 0;
      }
    }

    .localeBtn {
      white-space: nowrap;
      cursor: pointer;
      -webkit-user-select: none;
      user-select: none;
      width: 120px;
      height: 23px;
      text-align: center;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 15px;
      .active {
        color: $--color-aqua;
      }
    }


  }
}

</style>
