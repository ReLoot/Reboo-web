<template>
  <div class="user">
    <div class="container">
      <div class="user--hd">
        <h2>Personal Information</h2>
        <cus-divider-ein dStyle="white" />
      </div>

       <el-row :gutter="30" class="user--cardwrap">
         <el-col :md="12" :sm="12" >
           <div class="user--card">
             <div class="user--card_inner front">
               <div class="card--item t_l">
                 <label>{{$t('receive.cardItem1')}}</label>
                 <p>{{nickName | barReplace}}</p>
               </div>
               <div class="card--item t_r">
                 <label>{{$t('receive.cardItem2')}}</label>
                 <p>
                   <span>--</span>
                 </p>
               </div>
               <div class="card--item b_l">
                 <label>{{$t('receive.cardItem3')}}</label>
                 <p>{{nft.game_no | barReplace}}</p>
               </div>
               <div class="card--item b_r">
                 <label>{{$t('receive.cardItem4')}}</label>
                 <p>{{nft.card_no | barReplace}}</p>
               </div>
             </div>
           </div>
         </el-col>
         <el-col :md="12" :sm="12" >
           <div class="user--card">
             <div class="user--card_inner back">
               <div class="form--item">
                 <div class="form--item_hd">
                    <label>Private Code</label>
                    <el-button @click="getCard" :disabled="count!==countSet">
                      <template v-if="count==countSet">Check</template>
                      <template v-else>{{count}}s</template>
                    </el-button>
                 </div>
                 <el-input :type="privateCodeItemType" v-model="privateCode" :disabled="true">
                   <template slot="append">
                     <a @click="copy" :disabled="count==15">copy</a>
                   </template>
                 </el-input>
                </div>
             </div>
           </div>
         </el-col>
       </el-row>

      <cus-divider-ein dStyle="white" />
       
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import copy from 'copy-to-clipboard';
export default {
  filters: {
    barReplace: str => str?str:'--'
  },
  computed: {
    ...mapGetters('user', {
      nickName: 'nickName',
      nft: 'nft',
    }),
  },
  data(){
    return {
      privateCode:'**********',
      privateCodeItemType: 'password',
      count: 15,
      countSet: 15,
      timer: '',
    }
  },
  methods: {
    async getCard(){
      if (this.count < 15) return false
      this.count --
      const res = await this.$nftContract.getCardInfo()
      this.privateCode = res[1]
      this.privateCodeItemType = 'text'
      const timer = setInterval(() => {
        if(this.count <= 0) {
          this.count = this.countSet
          this.privateCode = '**********'
          this.privateCodeItemType = 'password'

          clearInterval(timer)
        } else {
          this.count --
        }
      }, 1000)
    },
    copy() {
       if (this.count == 15) return false
      if (copy(this.privateCode))
        this.$message({ message: 'Copy successed', type: 'success' })
      else
        this.$message({ message: 'Copy Failed', type: 'error' })
    }
  },
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
    margin-bottom: 40px;
    h2 {
      font-size: 30px;
      line-height: 200%;
      height: 90px;
      line-height: 90px;
    }
  }

  @include e(cardwrap) {
    margin-bottom: 260px;
  }

  @include e(card) {
    width: 468px;
    max-width: 100%;
    @include m(inner) {
      width: 100%;
      padding-bottom: 60%;
      background: no-repeat center/cover;
      position: relative;
      &.front {
        background-image: url(/image/account/card_front.png);
      }
      &.back {
        background-image: url(/image/account/card_back.png)
      }

      .t_l, .t_r {
        top: 30px;
      }

      .b_l, .b_r {
        bottom: 45px;
      }

      .t_l, .b_l {
        left: 40px;
        text-align: left;
      }

      .t_r, .b_r {
        right: 40px;
        text-align: right;
      }
    }
  }
}

@include b(card) {
  @include e(item) {
    position: absolute;
    font-family: OrbitronRegular;
    line-height: 100%;

    label {
      font-size: 12px;
      display: block;
      color: $--color-yellow;
    }
    p {
      font-size: 14px;
    }
  }
}

@include b(form) {
  @include e(item) {
    @include plcenter();
    bottom: 48px;
    width: 83%;
    @include m(hd) {
      @include clearfix();
      margin-bottom: 10px;
      label {
        float: left;
        font-size: 16px;
        line-height: 24px;
      }
      .el-button {
        float: right;
        height: 24px;
        padding: 0;
        width: 67px;
        font-size: 12px;
        background-color: #2D8A92;
        border-color: #58DFD7;
        color: #ffffff;
        &:active {
          -webkit-transform: scale(0.95);
          transform: scale(0.95);
        }
      }
    }
  }
}

.el-input {
  ::v-deep &__inner {
    height: 34px;
    line-height: 34px;
  }

  ::v-deep &-group__append, &-group__prepend {
    border-color: rgba(208, 230, 238, 0.3);
    background-color: rgba(24, 33, 44, 0.3);
    color: rgba(208, 230, 238, 0.3);
    -webkit-user-select: none;
    user-select: none;
    a {
      cursor: pointer;
      color: #ffffff;
      &[disabled] {
        cursor: default;
        color: rgba(208, 230, 238, 0.3);
      }
    }
  }

  &-group--append {
    ::v-deep .el-input__inner {
      border-right: 0 none;
      background-color: rgba(24, 33, 44, 0.3);
      font-size: 12px;
    }
  }
}
</style>