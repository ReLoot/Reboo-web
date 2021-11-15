<template>
  <header class="header">
    <a class="header--logo"></a>
    <ul class="header--nav">
      <template v-for="(item, idx) in navs" >

        <router-link 
          v-if="item.meta"
          tag="li"
          :key="`navs_${idx}`"
          :class="{active: curRoute == item.name}"
          :to="{name: item.name}"
        >{{$t(item.meta.view)}}</router-link>
      </template>

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
          <!-- <el-dropdown-item command="show_wallet" >{{$t('header.dropItem1')}}</el-dropdown-item> -->
          <el-dropdown-item command="toPersonalInfo">{{$t('header.dropItem1')}}</el-dropdown-item>
          <!-- <el-dropdown-item command="toReceiveNFN" v-if="enableRecived && email">Receive NFT</el-dropdown-item>
          <el-dropdown-item command="toIDCard" v-if="!enableRecived" >MY ID CARD</el-dropdown-item> -->
          <el-dropdown-item command="logout" >{{$t('header.dropItem4')}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- <el-dialog
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
    </el-dialog> -->


    <el-dialog
      class="account--dialog"
      :visible.sync="bindEmailVisible"
      :append-to-body="true"
      top="25vh"
    >
      <h3>{{$t('header.bindEmailHd')}}</h3>
      <el-form > 
        <el-form-item>
          <el-input v-model="formData.email" placeholder="Mail address" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="formData.code" placeholder="Code" >
            <template slot="append">
            <a v-if="count == 60" @click="getCode">{{$t('header.sendCode')}}</a>
            <span v-else>{{count}}s</span>
            </template>
          </el-input>
        </el-form-item>
          <!-- @click.native="walletConnect" -->
        
        <cus-btn-ein 
          @click.native="bindEmail"
          class="form_submit"
          bg="/image/account/btn_form.png"
        >{{$t('header.submit')}}</cus-btn-ein>
      </el-form>
    </el-dialog>

  </header>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
      ...mapGetters('user', {
          account: 'account',
          enableRecived: 'enableRecived',
          email: 'email'
      }),
      // bindEmailVisible(){
      //   if (this.$store.getters['user/account'] && !this.$store.getters['user/email']){
      //     return true
      //   }else{
      //     return false
      //   }
      // },
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
      // dialogVisible: false,       // wallet address Dialog
      bindEmailVisible: false,   // Email Dialog
      curRoute: '',
      navs: this.$router.options.routes[1]['children'],
      formData: {
        email: '',
        code: ''
      },
      count: 60,
      countSet: 60,
      loading: false,
    }
  },
  created() {
    this.$globalBus.$on('EMAIL_DIALOG_VISIBLE', () => {
      this.bindEmailVisible = !this.bindEmailVisible
    })
  },
  mounted() {
    this.$nextTick(() => {
      if(this.account) {
        this.$landContract.init()
        this.$buildingContract.init()
        if(!this.email) {
          this.bindEmailVisible = true
        }
      }
    })
  },
  methods: {
    async walletConnect() {
      await this.$mu.initlization()
      this.$http('login', {eth_address: this.account}).then(loginInfo => {
        if (loginInfo.data) {
          this.$store.commit('common/token', loginInfo.data.token)
          this.$store.commit('user/subscribe', loginInfo.data.user_info.subscribe)
          this.$store.commit('user/email', loginInfo.data.user_info.email || '')
          window.location.reload()
        }
      })
    },
    bindEmail(){
      // const reg = new RegExp(/^([a-zA-Z\d])(\w|-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/);
      console.log(this.formData.email)
      if (!/^([a-zA-Z\d])(\w|-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/.test(this.formData.email)){
        this.$message({
          message: this.$t('header.bindEmailIput'),
          type: 'error'
        })
        return false
      }
      if(this.loading) return false
      this.loading = true
      this.$http('bind_email', {
        eth_address: this.account,
        email: this.formData.email,
        code: this.formData.code
      }).then(res => {
        this.$store.commit('user/email', this.formData.email)
        this.bindEmailVisible = false
        this.loading = false
        this.$message({
          message: 'Subscribe Successed!',
          type: 'success'
        })
      }).catch(err => {
        this.loading = false
        this.$message({
          message: err.response.data.msg,
          type: 'error'
        })
      })
    },
    getCode(){
      // const reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
      if (!/^([a-zA-Z\d])(\w|-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/.test(this.formData.email)){
        this.$message({
          message: this.$t('header.bindEmailIput'),
          type: 'error'
        })
        return false
      }
      if (this.count < 60) return false
      this.count = 59
        let res = this.$http('getEmailCode', {
          email: this.formData.email,
          eth_address: this.account
        })

        if (res) {
          this.$message({
            message: this.$t('header.sendCodeTip')+this.formData.email,
            type: 'success'
          })
          const timer = setInterval(() => {
            if(this.count <= 0){
              this.count = this.countSet
              clearInterval(timer)
            } else {
                this.count --
            }
          }, 1000)
        }


    },
    accountHandler(type) {
      // if(type == 'show_wallet') {
      //   this.dialogVisible = true
      // }
      if (type == 'toPersonalInfo') {
        this.$router.push({name: 'personalInfo'})
      }

      if (type == 'toReceiveNFN') {
        this.$router.push({name: 'receivenft'})
      }
      
      if (type == 'toIDCard') {
        this.$router.push({name: 'idcard'})
      }
      
      if(type == 'logout') {
        this.$store.dispatch('user/cleanAccount')
        this.$store.dispatch('common/cleanToken')
        window.location.href = '/home'
      }

    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/custom.scss';
@import './nav.scss';
</style>