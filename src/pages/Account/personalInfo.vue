<template>
  <div class="user">
    <div class="container">
      <div class="user--hd">
        <h2>Personal Information</h2>
        <cus-divider-ein dStyle="white" />
      </div>
      <div class="user--bd">
        <a class="avatar"><img src="/image/avatar.png" /></a>
        <div class="user--info" >
          <div class="user--info_item" v-if="gid">
            <em :style="{backgroundImage: `url(/image/account/user_info_lab1.png)`}"></em>
            <div class="user--info_ctn" >
              <p class="name">GAME ID</p>
              <p class="props">{{gid || '--'}}</p>
            </div>
          </div>
          <div class="user--info_item">
            <em :style="{backgroundImage: `url(/image/account/user_info_lab2.png)`}"></em>
            <div class="user--info_ctn" >
              <p class="name">Email</p>
              <p class="props">{{email || '--'}}</p>
            </div>
            <el-button v-if="!email" plain type="primary" @click="emailDialogCall" >{{$t('personal.bindBtn')}}</el-button>
          </div>
          <div class="user--info_item" v-if="account" >
            <em :style="{backgroundImage: `url(/image/account/user_info_lab3.png)`}"></em>
            <div class="user--info_ctn" >
              <p class="name">Address</p>
              <p class="props">{{(account|| '--')|addressFormat}}</p>
            </div>
          </div>
        </div>
      </div>
      <cus-divider-ein dStyle="white" />

    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {addressFormat} from '@/utils/tools'
export default {
  filters: {
    addressFormat
  },
  computed: {
    ...mapGetters('user', {
      account: 'account',
      email: 'email',
      gid: 'gid',
    }),
  },
  data(){
    return {
      username: 'Lily_9846',
    }
  },
  methods: {
    emailDialogCall(){
      // this.$globalBus.$emit('EMAIL_DIALOG_VISIBLE')
      this.$store.commit('dialog/BIND_EMAIL', true)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/custom.scss';
$hd: (
  $--page-xs-width:(fontsize: 16px),
  $--page-sm-width:(fontsize: 20px),
  $--page-md-width:(fontsize: 24px),
  $--page-lg-width:(fontsize: 24px),
);

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
    margin-top: 30px;
    margin-bottom: 60px;
    h2 {
      @include mediaAdapt($hd);
      margin-bottom: 15px;
      line-height: 125%;
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
      background: $--color-whitening-1;
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
    margin-top: 20px;
    @include m(item) {
      // @include displayFlex();
      position: relative;
      width: 550px;
      max-width: 100%;
      margin: 0 auto 30px;
      // border: 4px solid transparent;
      border:3px solid $--color-white-07;
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
        float: left;
      }

      p {
        line-height: 100%;
        margin-bottom: 10px;
        font-size: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
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