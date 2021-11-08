<template>
  <div class="footer">
    <div class="container">
      <div class="footer--extr" v-if="curRoute !== 'market'">
        <cus-divider dStyle="green" />
        <div class="footer--extr_inner">
          <div class="item" >
            <p>{{$t('footer.linkBlock')}}</p>
          </div>
          <div class="item" >
            <a href="https://docs.vibrantium.io/" >https://docs.vibrantium.io/</a>
          </div>
        </div>
        <cus-divider dStyle="green" />
      </div>

      <div class="footer--top">
        <div class="footer--top_logo">
          <router-link :to="{name: 'home'}" />
          <img src="/image/logo.png" />
        </div>
        <div class="footer--top_info">
          <p>Twitter: @Vibranium_VBN</p>
          <p><a  href="contact@vibraniumslg.com">Email:contact@vibraniumslg.com</a></p>
        </div>
        
        <el-dropdown class="footer--top_locale" @command="changeLang" placement="top" trigger="click">
          <a class="footer--top_localeBtn">
            {{locale}}<i class="el-icon-caret-bottom el-icon--right"></i>
          </a>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="en" >English</el-dropdown-item>
            <el-dropdown-item command="zh" >中文简体</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="footer--bottom">
        <el-row >
          <el-col :sm="16">
            <a
              class="apps"
              v-for="(item, idx) in apps" 
              :key="`app_list_${idx}`"  
              :style="{'backgroundImage': `url(/image/apps_0${idx+1}.png)`}"
              :href="item"
            />
            <!-- @click="goLink(item)" -->
          </el-col>
          <el-col :sm="8">
            <p class="footer--bottom_copyright">© 2021 Vibranium. All Rights Reserved</p>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    locale(){
        return this.$i18n.locale == 'en' ? 'English' : '中文简体'
    }
  },
  watch: {
    '$route':{
      immediate: true,
      handler(to) {
        this.curRoute = to.name
        console.log(to)
      },
    }
  },
  data() {
    return {
      curRoute: '',
      apps: [
        'https://twitter.com/Vibranium_VBN',
        'https://t.me/Vibranium_VBN',
        'https://discord.com/invite/kERPbw3EhR',
        'https://github.com/Vibranium-Game-Science',
        'https://medium.com/@Vibranium_VBN'
      ]
    }
  },
  methods: {
    changeLang(lang) {
      this.$i18n.locale = lang
    },
    goLink(url) {
      console.log(url, 123)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/custom.scss';
.container {
  padding-top: 60px;
  padding-bottom: 60px;
}

@include b(footer) {
  color: $--color-white-07;
  @include e(top) {
    @include displayFlex();
    // align-items: center;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    align-items: flex-end;
    @include m(logo) {
      width: 260px;
      height: 56px;
      position: relative;
      a {
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    @include m(info) {
      flex: 1;
      font-size: 18px;
      line-height: 150%;
      padding: 0 30px;
    }
    
    @include m(localeBtn) {
      width: 137px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background-color: $--color-white-01;
      border: 1px solid $--color-white-04;
      display: block;
      color: $--color-white-07;
      font-size: 18px;
      cursor: pointer;
    }
  }

  @include e(bottom) {
    width: 90%;
    margin-top: 70px;
    margin-left: auto;
    margin-right: auto;
    .apps {
      cursor: pointer;
      width: 64px;
      height: 64px;
      margin-right: 30px;
      display: inline-block;
      vertical-align: middle;
      background: no-repeat center/cover;
    }

    @include m(copyright) {
      line-height: 64px;
      text-align: right;
    }
  }

  @include e(extr) {
    margin-bottom: 100px;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    @include m(inner) {
      @include displayFlex();
      align-items: center;
      background: rgba(28, 77, 74, 0.3);
      padding: 30px 50px;
      margin: 0 13px;
      .item {
        flex: 1;
      }

      p {
        font-size: 20px;
        color: $--color-white-07;
        width: 60%;
        text-align: left;
        margin-left: 30px;
      }
      
       a {
         line-height: 56px;
         font-size: 32px;
         font-family: OrbitronBlack;
         color: $--color-palegreen;
         &:hover {
           text-shadow: 0 0 5px $--color-palegreen;
           cursor: pointer;
         }
       }
    }
  }
}
</style>