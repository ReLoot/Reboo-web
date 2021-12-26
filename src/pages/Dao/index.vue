<template>
  <div class="dao">
    <div class="container">
      <div class="dao--hd">
        <h2>Vibranium DAO</h2>
        <div class="append">
          <router-link :to="{name: 'dao_list'}" v-if="$route.name == 'dao_current'" >
            <span>{{$t('vote.index.appendItem1')}}</span>
            <i class="el-icon-arrow-right"></i>
          </router-link>
        </div>
      </div>
      <cus-divider-ein dStyle="white" style="margin-bottom:30px" />

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  // beforeRouteEnter(to, from, next) {
  //   if(to.name.match(/dao/g)) {
  //     if(to.name === 'dao') {
  //       const schedule = 1
  //       next({path: `/dao/v${schedule}`})      
  //     } else {
  //       next()
  //     }
  //   } else
  //     next()
  // }
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
$hd: (
  $--page-xs-width:(fontsize: 16px),
  $--page-sm-width:(fontsize: 20px),
  $--page-md-width:(fontsize: 24px),
  $--page-lg-width:(fontsize: 24px),
);
.container {
  @include mediaAdapt($navHeight);
}

@include b(dao) {
  @include e(hd) {
    font-family: OrbitronRegular;
    margin-top: 30px;
    margin-bottom: 20px;
    position: relative;
    h2 {
      @include mediaAdapt($hd);
      line-height: 125%;
    }

    .append {
      @include pvcenter();
      right: 0;
      line-height: 100%;
      color: $--color-white-07;
      i {
        color: $--color-aqua;
      }
    }
  }
}
</style>