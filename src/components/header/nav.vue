me<template>
  <header class="header">
    <a class="header--logo"></a>
    <ul class="header--nav hidden-md-and-down">
      <template v-for="(item, idx) in navs" >

        <router-link 
          v-if="item.meta && item.meta.view"
          tag="li"
          :key="`navs_${idx}`"
          :class="{active: curRoute.match(item.name)}"
          :to="{name: item.name}"
        >{{$t(item.meta.view)}}</router-link>
      </template>

      <template v-if="authentication">
        <router-link v-if="nft_benefit == 1" tag="li" :class="{active: curRoute == 'receivenft'}" :to="{name: 'receivenft'}" >{{$t('header.dropItem2')}}</router-link>
        <router-link v-if="nft_benefit == 0" tag="li" :class="{active: curRoute == 'idcard'}" :to="{name: 'idcard'}" >{{$t('header.dropItem3')}}</router-link>
      </template>

    </ul>

    <div class="header--append">

      <el-dropdown 
        class="header--locale hidden-md-and-down" 
        @command="changeLang" 
        placement="bottom" 
        trigger="click"
      >
        <a class="header--locale_btn">
          {{locale}}<i class="el-icon-caret-bottom el-icon--right"></i>
        </a>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="en" >English</el-dropdown-item>
          <el-dropdown-item command="zh" >繁体中文</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <cus-btn-ein 
        class="wc hidden-md-and-down"
        bg="/image/btn_banner.png"
        v-show="!authentication && !loadingWarden.includes('commonAuthLoading')"
        @click.native="walletConnect"
      >{{$t('header.btn')}}</cus-btn-ein>

      <span v-if="loadingWarden.includes('commonAuthLoading')" class="header--append_loading hidden-md-and-down" > Logining... </span>

      <el-dropdown 
        v-if="authentication" 
        class="header--append_account hidden-md-and-down" 
        @command="accountHandler" 
        placement="top" 
        trigger="click"
      >
        <a class="header--append_avatar"></a>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-if="authentication" command="toPersonalInfo">{{$t('header.dropItem1')}}</el-dropdown-item>
          <el-dropdown-item command="logout" >{{$t('header.dropItem4')}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <div class="header--append_menubtn hidden-lg-and-up" @click="pageMenuTrigger">
        <i class="fa fa-bars"></i>
      </div>
    </div>

    <el-dialog
      class="account--dialog"
      :visible.sync="bindEmailVisible"
      :append-to-body="true"
    >
      <h3>{{$t('header.bindEmailHd')}}</h3>
      <el-form > 
        <el-form-item>
          <el-input v-model="formData.email" placeholder="Mail address" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="formData.pass_code" placeholder="ID Card Priate Code" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="formData.code" placeholder="Code" >
            <template slot="append">
            <a v-if="count == 60" @click="getCode">{{$t('header.sendCode')}}</a>
            <span v-else>{{count}}s</span>
            </template>
          </el-input>
        </el-form-item>
        
        <cus-btn-ein 
          @click.native="bindEmail"
          class="form_submit"
          bg="/image/account/btn_form.png"
        >{{$t('header.submit')}}</cus-btn-ein>
      </el-form>
    </el-dialog>

    <el-dialog
      class="receivenft--tipblock"
      :visible.sync="receiveNFTVisible"
      :append-to-body="true"
      @close="closeRNTips(0)"
    >
      <div class="inner">
        <h4>Receive NFT</h4>
        <p class="receivenft--tipblock_sub">
          {{$t('header.receivenfttip0')}}
        </p>

        <cus-btn-ein 
          @click.native="closeRNTips"
          class="receivenft--tipblock_btn"
        >GET IT</cus-btn-ein>
        <div >
          <el-checkbox v-model="receiveNFTnomore">Don't remind again</el-checkbox>
        </div>
      </div>
    </el-dialog>


    <el-dialog
      class="receivenft--tipblock"
      :visible.sync="nftGuidVisible"
      :append-to-body="true"
    >
      <div class="inner">
        <p class="receivenft--tipblock_sub" style="margin-top:30px">
          {{$t('header.receivenfttip')}}
        </p>

        <cus-btn-ein 
          @click.native="closeRNTips"
          class="receivenft--tipblock_btn"
        >GET IT</cus-btn-ein>
      </div>
    </el-dialog>
  </header>
</template>

<script>
import {mapGetters} from 'vuex'
import {pageInitlization} from '@/utils/bootstrap'
export default {
  computed: {
      ...mapGetters('user', {
          account: 'account',
          email: 'email',
          nft_benefit: 'nft_benefit',
          ido_qua: 'ido_qua',
          ido_unpartake: 'ido_unpartake'  // false is buy ido
      }),
      ...mapGetters('common', {
          authentication: 'authentication',
          loadingWarden: 'loadingWarden'
      }),
      locale(){
          return this.$i18n.locale == 'en' ? 'English' : '繁体中文'
      },
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        this.curRoute = to.name
      },
    },
    account() {
      setTimeout(() => {
        if(parseInt(localStorage.getItem('RECEIVE_NFT_TIPS_SHOW')) != 1 && this.nft_benefit == 1 && !this.ido_unpartake) 
          this.receiveNFTVisible = true
      }, 2000)
    }
  },
  data(){
    return {
      bindEmailVisible: false,   // Email Dialog
      receiveNFTVisible: false,
      nftGuidVisible: false,
      receiveNFTnomore: false,
      curRoute: '',
      navs: this.$router.options.routes[1]['children'],
      formData: {
        email: '',
        code: '',
        pass_code: ''
      },
      count: 60,
      countSet: 60,
      loading: false,
    }
  },
  created() {
    this.$globalBus.$on('EMAIL_DIALOG_VISIBLE', () => {
      if(this.nft_benefit == 1) {
        this.nftGuidVisible = !this.nftGuidVisible
      } else {
        this.bindEmailVisible = !this.bindEmailVisible
      }
    })
    this.$globalBus.$on('RECEIVE_NFT_DIALOG_VISIBLE', () => {
      this.receiveNFTVisible = !this.receiveNFTVisible
    })
  },
  methods: {
    async walletConnect() {
      pageInitlization(true)
    },
    bindEmail(){
      if (!/^([a-zA-Z\d])(\w|-)+@[a-zA-Z\d]+\.[a-zA-Z]{1,63}$/.test(this.formData.email)){
        this.$message({
          message: this.$t('header.bindEmailIput'),
          type: 'error'
        })
        return false
      }

      if (!this.formData.pass_code) {
        this.$message({
          message: "Please fill in your ID card private code",
          type: 'error'
        })
        return false
      }

      if(this.loading) return false
      this.loading = true
      this.$http('bind_email', {
        eth_address: this.account,
        email: this.formData.email,
        code: this.formData.code,
        pass_code: this.formData.pass_code
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
      if (!/^([a-zA-Z\d])(\w|-)+@[a-zA-Z\d]+\.[a-zA-Z]{1,63}$/.test(this.formData.email)){
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
      if (type == 'toPersonalInfo') {
        this.$router.push({name: 'personalInfo'})
      }

      if (type == 'toReceiveNFN') {
        this.$router.push({name: 'receivenft'})
      }
      
      if (type == 'toIDCard') {
        this.$router.push({name: 'idcard'})
      }
      // const targetRoute = this.$route.matched[this.$route.matched.length - 1]['name']
      if(type == 'logout') {
        this.$store.dispatch('user/cleanAccount')
        this.$store.dispatch('common/cleanToken')
        this.$store.commit('common/authentication', false)
        this.$router.replace({'name': 'home'})

      }
    },
    changeLang(lang) {
      this.$i18n.locale = lang
      localStorage.setItem('lang', lang)
    },
    closeRNTips(handleType) {
      if (this.receiveNFTnomore) {
        localStorage.setItem('RECEIVE_NFT_TIPS_SHOW', 1)
      } else {
        localStorage.setItem('RECEIVE_NFT_TIPS_SHOW', 0)
      }
      if(handleType != 0) {
        this.$router.push({'name': 'receivenft'})
      }
      this.receiveNFTVisible = false
      this.nftGuidVisible = false
    },
    pageMenuTrigger() {
      this.$store.dispatch('common/pageMenuTrigger')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/custom.scss';
@import './nav.scss';
</style>