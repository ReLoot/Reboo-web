<template>
  <div class="user">
    <div class="container">
      <div class="user--hd">
        <h2>{{$t('personal.hd')}}</h2>
        <cus-divider dStyle="white" />
      </div>
      <div class="user--bd">
        <a class="avatar"><img src="/image/avatar.png" /></a>
        <!-- <h4 class="user--name">{{username}}</h4> -->
        <div class="user--info" >
          <div class="user--info_item" v-for="(item, key) in userOptions" :key="`user_info_${key}`">
            <em :style="{backgroundImage: `url(/image/account/user_info_lab${key+1}.png)`}"></em>
            <div class="user--info_ctn" >
              <p class="name">{{item.view}}</p>
              <p class="props" v-if="item.view == 'Wallet Address'">{{account || '--'}}</p>
              <p class="props" v-else-if="item.view == 'Email'">{{email || '--'}}</p>
              <p class="props" v-else >{{item.val || '--'}}</p>
            </div>

            <el-button v-if="item.view == 'Email' && !email" plain type="primary" @click="emailDialogCall" >{{$t('personal.bindBtn')}}</el-button>
            
          </div>
        </div>
      </div>
      <cus-divider dStyle="white" />

    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters('user', {
      account: 'account',
      email: 'email'
    }),
  },
  data(){
    return {
      username: 'Lily_9846',
      userOptions: [
      //   {
      //   view: 'GAME ID',
      //   val: 10001,
      // },
      {
        view: 'Email',
        val: 'lily9827@gmail.com'
      },{
        view: 'Address',
        val: '0x43Ec0de64cf7b05270'
      }]
    }
  },
  methods: {
    emailDialogCall(){
      this.$globalBus.$emit('EMAIL_DIALOG_VISIBLE')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/custom.scss';
$navHeight: (
  $--page-xs-width:(paddingTop: 50px),
  $--page-sm-width:(paddingTop: 50px),
  $--page-md-width:(paddingTop: 63px),
  $--page-lg-width:(paddingTop: 76px),
);

.container {
  @include mediaAdapt($navHeight);
  padding-bottom: 0;
}

@include b(user){
  @include e(hd) {
    font-family: OrbitronRegular;
    margin-bottom: 80px;
    h2 {
      font-size: 30px;
      line-height: 200%;
      height: 90px;
      line-height: 90px;
    }
  }


  @include e(bd) {
    margin-bottom: 40px;
    position: relative;
    padding: 55px 20px;
    background-color: rgba(102, 115, 132, 0.1);
    border-radius: 4px;
    .avatar {
      @include plcenter();
      display: block;
      width: 83px;
      height: 83px;
      top: -41.5px;
      background: $--color-white;
      padding: 10px;
      border-radius: 50%;
      img {
        @include pacenter();
        border-radius: 50%;
      }
    }
  }

  @include e(name) {
    text-align: center;
    font-size: 28px;
    margin-bottom: 34px;
    font-family: OrbitronRegular;
  }

  @include e(info) {
    margin-top: 34px;
    @include m(item) {
      @include displayFlex();
      position: relative;
      width: 550px;
      max-width: 100%;
      margin: 0 auto 40px;
      border: 4px solid transparent;
      padding: 10px;
      // border-image: url(/image/account/user_info_bd.png) 30 30 rounded;

      -moz-border-image:url(/image/account/user_info_bd.png) 5 5 round;
      -webkit-border-image:url(/image/account/user_info_bd.png) 5 5 round;
      -o-border-image:url(/image/account/user_info_bd.png) 5 5 round;
      border-image:url(/image/account/user_info_bd.png) 5 5 round;
      // border-image: ;
      &:last-child {
        margin-bottom: 0;
      }

      em {
        display: block;
        width: 40px;
        height: 40px;
        background: no-repeat center/cover;
        margin-right: 12px;
      }

      p {
        line-height: 100%;
        margin-bottom: 10px;
        font-size: 15px;
        &.name {
          opacity: 0.7;
        }
        &:last-child {margin-bottom: 0;}
      }

      .el-button {
        color: $--color-aqua;
        height: 30px;
        background-color: #232E3B;
        font-family: OrbitronRegular;
        padding-top: 0;
        padding-bottom: 0;
        border-radius: 0;
        position: absolute;
        right: 15px;
        font-size: 14px;
        top: 50%;
        margin-top: -15px;
        line-height: 32px;
        &:active {
          background-color: rgba(0,0,0,0.2);
          transform: scale(0.95);
        }
      }
    }
  }
}
</style>