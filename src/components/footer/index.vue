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
            <a href="https://docs.vibraniumslg.io/" >https://docs.vibraniumslg.io/</a>
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
          <el-col :sm="14">
            <a
              class="apps"
              v-for="(item, idx) in apps" 
              :key="`app_list_${idx}`"  
              :style="{'backgroundImage': `url(/image/apps_0${idx+1}.png)`}"
              :href="item"
            />
            <!-- @click="goLink(item)" -->
          </el-col>
          <el-col :sm="10">
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
      },
    }
  },
  data() {
    return {
      curRoute: '',
      apps: [
        'https://twitter.com/Vibranium_VBN',
        'https://t.me/Vibranium_VBN',
        'https://dsc.gg/vibraniumslg',
        'https://github.com/Vibranium-Game-Science',
        'https://medium.com/@Vibranium_VBN'
      ]
    }
  },
  methods: {
    changeLang(lang) {
      this.$i18n.locale = lang
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/custom.scss';
.container {
  padding-top: 60px;
  padding-bottom: 60px;
}

$logoList: (
  $--page-xs-width:(width:125px, height: 25px),
  $--page-sm-width:(width:125px, height: 25px),
  $--page-md-width:(width:160px, height: 33px),
  $--page-lg-width:(width:192px, height: 40px),
);

$footer: (
  $--page-xs-width: (height: 300px),
  $--page-sm-width: (height: 406px),
  $--page-md-width: (height: 526px),
  $--page-lg-width: (height: 632px),
);

$info: (
  $--page-xs-width: (fontsize: 12px, padding:0 8px),
  $--page-sm-width: (fontsize: 12px, padding:0 12px),
  $--page-md-width: (fontsize: 14px, padding:0 18px),
  $--page-lg-width: (fontsize: 16px, padding:0 25px),
);

$apps: (
  $--page-xs-width: (width:18px, height:18px, marginRight: 8px),
  $--page-sm-width: (width:28px, height:28px, marginRight: 12px),
  $--page-md-width: (width:32px, height:32px, marginRight: 16px),
  $--page-lg-width: (width:40px, height:40px, marginRight: 20px),
);

$extrInner: (
  $--page-xs-width: (width:18px, height:18px, marginRight: 8px),
  $--page-sm-width: (width:28px, height:28px, marginRight: 12px),
  $--page-md-width: (width:32px, height:32px, marginRight: 16px),
  $--page-lg-width: (width:40px, height:40px, marginRight: 20px),
);

$local: (
  $--page-xs-width: (width:130px, height:31px, lineHeight: 31px, fontsize:14px),
  $--page-sm-width: (width:130px, height:31px, lineHeight: 31px, fontsize:14px),
  $--page-md-width: (width:130px, height:31px, lineHeight: 31px, fontsize:14px),
  $--page-lg-width: (width:130px, height:31px, lineHeight: 31px, fontsize:14px),
);

@include b(footer) {
  color: $--color-white-07;
  font-family: OrbitronRegular;

  @include e(top) {
    @include displayFlex();
    // width: 90%; 
    margin-left: auto;
    margin-right: auto;
    align-items: flex-end;

    @include m(logo) {
      @include mediaAdapt($logoList);
      // width: 260px;
      // height: 56px;
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
      @include mediaAdapt($info);
      flex: 1;
      line-height: 150%;
      p {
        line-height: 100%;
        margin-bottom: 10px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    
    @include m(localeBtn) {
      @include mediaAdapt($local);
      // width: 137px;
      // height: 40px;
      // line-height: 40px;
      display: inline-block;
      text-align: center;
      background-color: $--color-white-01;
      border: 1px solid $--color-white-04;
      display: block;
      color: $--color-white-07;
      // font-size: 18px;
      cursor: pointer;
    }
  }

  @include e(bottom) {
    // width: 90%;
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;
    .apps {
      @include mediaAdapt($apps);
      cursor: pointer;
      // width: 64px;
      // height: 64px;
      // margin-right: 30px;
      display: inline-block;
      vertical-align: middle;
      background: no-repeat center/cover;
    }

    @include m(copyright) {
      line-height: 64px;
      text-align: right;
      white-space: nowrap;
    }
  }

  @include e(extr) {
    margin-bottom: 50px;
    width: 96%;
    margin-left: auto;
    margin-right: auto;
    
    @include m(inner) {
      @include displayFlex();
      align-items: center;
      background: rgba(28, 77, 74, 0.3);
      padding: 10px 20px;
      margin: 0 13px;
      .item {
        flex: 1;
      }

      p {
        font-size: 14px;
        color: $--color-white-07;
        width: 60%;
        text-align: left;
        margin-left: 10px;
      }
      
       a {
         line-height: 56px;
         font-size: 20px;
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