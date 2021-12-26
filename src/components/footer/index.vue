<template>
  <div class="footer">
    <div class="container">
      <div class="footer--extr" v-if="extrVisible.includes(curRoute)">
        <cus-divider-ein dStyle="green" />
        <div class="footer--extr_inner">
          <div class="item" >
            <p>{{$t('footer.linkBlock')}}</p>
          </div>
          <div class="item footer--extr_link" >
            <a href="https://docs.vibraniumslg.io/" target="_blank" >https://docs.vibraniumslg.io</a>
          </div>
        </div>
        <cus-divider-ein dStyle="green" />
      </div>

      <div class="footer--top hidden-md-and-down">
        <div class="footer--top_logo">
          <router-link :to="{name: 'home'}" />
          <img src="/image/logo.png" />
        </div>
        <div class="footer--top_info">
          <p>Twitter: @Vibranium_VBN</p>
          <p><a  href="contact@vibraniumslg.com">Email:contact@vibraniumslg.com</a></p>
        </div>
        
        <!-- <el-dropdown class="footer--top_locale" @command="changeLang" placement="top" trigger="click">
          <a class="footer--top_localeBtn">
            {{locale}}<i class="el-icon-caret-bottom el-icon--right"></i>
          </a>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="en" >English</el-dropdown-item>
            <el-dropdown-item command="zh" >中文简体</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->

        <cus-btn-ein 
          class="footer--email_btn"
          :bg="`/image/footer_btn_subscribe.png`"
          @click.native="subscr"
          v-if="account"
        >
          <em  v-if="subscribe == 1" class="subscribed"></em>
          <em v-else class="unsubscribe"></em>
          <span v-if="subscribe == 1" >{{$t('footer.unsubscribe')}}</span>
          <span v-else >{{$t('footer.subscribe')}}</span>
        </cus-btn-ein>
      </div>

      <div class="footer--bottom">
        <el-row >
          <!-- class="hidden-md-and-down"  -->
          <el-col class="apps_wrap" style="margin-bottom:10px" :sm="14">
            <a
              class="apps"
              v-for="(item, idx) in apps" 
              :key="`app_list_${idx}`"  
              :style="{'backgroundImage': `url(/image/apps_0${idx+1}.png)`}"
              :href="item"
              target="_blank"
            />
            <!-- @click="goLink(item)" -->
          </el-col>
          <el-col style="margin-bottom:10px" :sm="10">
            <p class="footer--bottom_copyright">© 2021 Vibranium. All Rights Reserved</p>
          </el-col>
        </el-row>
      </div>
    </div>

    <el-dialog
      class="subsrcibe--success"
      :visible.sync="subscribeSuccessVisible"
      :append-to-body="true"
      top="25vh"
    >
      <div class="inner">
        <em class="subsrcibe--success_lab"></em>
        <h4>{{$t('footer.subscrSuccess.title')}}</h4>
        <p class="subsrcibe--success_sub">{{$t('footer.subscrSuccess.sub')}}</p>
        <p class="subsrcibe--success_email">{{email}}</p>
        <p class="subsrcibe--success_txt">{{$t('footer.subscrSuccess.txt')}}</p>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    locale(){
        return this.$i18n.locale == 'en' ? 'English' : '繁体中文'
    },
    ...mapGetters('user', {
        account: 'account',
        email: 'email',
        subscribe: 'subscribe'
    }),
  },
  watch: {
    '$route':{
      immediate: true,
      handler(to) {
        this.curRoute = to.name
      },
    }
  },
  created() {
    this.$globalBus.$on('EMAIL_SUBSCRIBED', this.subscr)
  },
  data() {
    return {
      curRoute: '',
      extrVisible: ['home', 'roadmap', 'token'],
      subscribeSuccessVisible: false,
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
    subscr(){
      if(this.email) {
        const subscribe = this.subscribe==1?-1:1
        this.$http('subscribe', {eth_address: this.account, subscribe: subscribe})
          .then(res => {
            // let tip 
            if (this.subscribe != 1) {
              this.subscribeSuccessVisible = true
            } else {
              let tip = 'footer.unsubscribeTip'
              this.$message({ type: 'success', message: this.$t(tip) })
            }
            this.$store.commit('user/subscribe', subscribe)
          })
      } else {
        // this.$globalBus.$emit('EMAIL_DIALOG_VISIBLE')
        this.$store.commit('dialog/BIND_EMAIL', true)
      }

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
  $--page-xs-width: (width:24px, height:24px, marginRight: 12px),
  $--page-sm-width: (width:28px, height:28px, marginRight: 12px),
  $--page-md-width: (width:32px, height:32px, marginRight: 16px),
  $--page-lg-width: (width:40px, height:40px, marginRight: 20px),
);

$appsWrap:(
  $--page-xs-width: (textAlign: center),
  $--page-sm-width: (textAlign: left),
  $--page-md-width: (textAlign: left),
  $--page-lg-width: (textAlign: left),
);

$extr: (
  $--page-xs-width: (marginBottom: 10px),
  $--page-sm-width: (marginBottom: 20px),
  $--page-md-width: (marginBottom: 50px),
  $--page-lg-width: (marginBottom: 50px),
);

$extrInner: (
  $--page-xs-width: (display: block),
  $--page-sm-width: (display: block),
  $--page-md-width: (display: flex),
  $--page-lg-width: (display: flex),
);

$extrInnerP: (
  $--page-xs-width: (fontsize:12px, width:80%, textAlign: center, marginLeft: auto, marginRight: auto, marginBottom: 10px),
  $--page-sm-width: (fontsize:14px, width:60%, textAlign: center, marginLeft: auto, marginRight: auto, marginBottom: 10px),
  $--page-md-width: (fontsize:14px, width:60%, textAlign: left, marginLeft: 10px, marginBottom: 0),
  $--page-lg-width: (fontsize:14px, width:60%, textAlign: left, marginLeft: 10px, marginBottom: 0),
);
$extrInnerLink: (
  $--page-xs-width: (fontsize:14px, lineHeight:125%, textAlign: center),
  $--page-sm-width: (fontsize:20px, lineHeight:125%, textAlign: center),
  $--page-md-width: (fontsize:20px, lineHeight: 56px),
  $--page-lg-width: (fontsize:20px, lineHeight: 56px),
);

$copyRight: (
  $--page-xs-width: (fontsize:12px, opacity: 0.5, lineHeight:150%),
  $--page-sm-width: (fontsize:14px, opacity: 0.5, lineHeight:150%),
  $--page-md-width: (fontsize:16px, opacity: 1, lineHeight:150%),
  $--page-lg-width: (fontsize:16px, opacity: 1, lineHeight:150%),
);


@include b(footer) {
  color: $--color-white-07;
  font-family: OrbitronRegular;

  @include e(top) {
    @include displayFlex();
    flex-wrap: nowrap;
    margin-left: auto;
    margin-right: auto;
    align-items: flex-end;

    @include m(logo) {
      @include mediaAdapt($logoList);
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
  }

  @include e(bottom) {
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;
    .apps {
      @include mediaAdapt($apps);
      cursor: pointer;
      display: inline-block;
      vertical-align: middle;
      background: no-repeat center/cover;
      &:last-child {
        margin-right: 0;
      }

      &_wrap {
        @include mediaAdapt($appsWrap);
      }
    }

    @include m(copyright) {
      @include mediaAdapt($copyRight);
      text-align: center;
      white-space: nowrap;
    }
  }

  @include e(extr) {
    @include mediaAdapt($extr);
    width: 96%;
    margin-left: auto;
    margin-right: auto;
    
    @include m(inner) {
      @include displayFlex();
      @include mediaAdapt($extrInner);
      align-items: center;
      background: rgba(28, 77, 74, 0.3);
      padding: 10px 20px;
      margin: 0 13px;
      .item {
        flex: 1;
      }

      p {
        @include mediaAdapt($extrInnerP);
        line-height: 125%;
        font-size: 14px;
        color: $--color-white-07;
      }
    }

    @include m(link) {
      @include mediaAdapt($extrInnerLink);
      font-family: OrbitronBlack;
      color: $--color-palegreen;
      &:hover {
        text-shadow: 0 0 5px $--color-palegreen;
        cursor: pointer;
      }
    }
  }

  &--email_btn {
    width: 160px;
    padding-left: 10px;
    padding-right: 10px;
    height: 43px;
    margin-left: 15px;
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
  }


}

@include b(subsrcibe) {
  @include e(success) {
    ::v-deep .el-dialog {
      width: 377px;
      max-width: 90%;
      position: relative;
      &__header { display: none; }

      &__body {
        padding: 0;
      }
    }

    .inner {
      position: relative;
      padding: 25px 40px;
      background-color: #4B5056;
      border: 2px solid #99A9BD;
      color: $--color-whitening-1;
      text-align: center;
      font-family: OrbitronRegular;
    }
    @include m(lab) {
      width: 40px;
      height: 40px;
      display: block;
      margin: 0 auto 20px;
      background: url(/image/label_subscribe_success.png) no-repeat center/cover;
    }

    h4 {
      font-size: 20px;
      white-space: nowrap;
      font-family: OrbitronBlack;
      margin-bottom: 8px;
    }

    @include m(sub) {
      font-family: OrbitronRegular;
      line-height: 125%;
      font-size: 12px;
      color: $--color-white-07;
      margin-bottom: 10px;
      word-break: break-word;
    }

    @include m(email) {
      font-size: 18px;
      color: #FFC43A;
    }

    @include m(txt) {
      font-size: 12px;
      color: $--color-white-07;
    }

  }
}

</style>