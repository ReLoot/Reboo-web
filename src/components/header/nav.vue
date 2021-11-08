<template>
  <header class="header">
    <a class="header--logo"></a>
    <ul class="header--nav">
      <router-link 
        v-for="(item, idx) in navs" 
        tag="li"
        :key="`navs_${idx}`"
        :class="{active: curRoute == item.name}"
        :to="{name: item.name}"
      >{{$t(item.meta.view)}}</router-link>
    </ul>

    <div class="header--append">
      <cus-btn-ein 
        class="wc"
        bg="/image/btn_banner.png"
        v-if="!account"
        @click.native="walletConnect"
      >{{$t('header.btn')}}</cus-btn-ein>

      <el-dropdown v-if="account" class="header--append_account" @command="accountHandler" placement="top" trigger="click">
        <a class="header--append_avatar"></a>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="show_wallet" >{{$t('header.dropItem1')}}</el-dropdown-item>
          <el-dropdown-item command="logout" >{{$t('header.dropItem2')}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog
      class="account--infocard"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      top="25vh"
    >
      <h3>{{$t('header.dialogTitle1')}}</h3>
      <em class="box"></em>
      <div class="address">
        <h4>{{$t('header.dialogTitle2')}}</h4>
        <div class="view">{{account}}</div>
      </div>
    </el-dialog>
  </header>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
      ...mapGetters('user', {
          account: 'account'
      }),
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        this.curRoute = to.name
      },
    },
  },
  data(){
    return {
      dialogVisible: false,
      curRoute: '',
      navs: this.$router.options.routes[1]['children']
    }
  },
  methods: {
    walletConnect() {
      this.$mu.initlization()
    },
    accountHandler(type) {
      if(type == 'show_wallet') {
        this.dialogVisible = true
      }
      
      if(type == 'logout') {
        this.$store.dispatch('user/cleanAccount')
      }

    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/custom.scss';
@import './nav.scss';
</style>