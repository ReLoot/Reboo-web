<template>
  <div class="user">
    <div class="container">
      <div class="user--hd">
        <h2>Welcome To Vibranium</h2>
        <h2>{{$t('receive.sub')}}</h2>
        <p class="sub">{{$t('receive.sub2')}}</p>
      </div>

      <div class="user--bd">
        <el-row :gutter="30">
          <el-col :md="14">
            <h4>Example Card</h4>
            <div class="user--card">
              <div class="user--card_inner front" >
                <div class="card--item t_l"  >
                  <label>{{$t('receive.cardItem1')}}</label>
                  <p>{{cardInfo.nickname | barReplace}}</p>
                </div>
                <div class="card--item t_r">
                  <label>{{$t('receive.cardItem2')}}</label>
                  <p >{{cardInfo.time | barReplace}}</p>
                </div>
                <div class="card--item b_l">
                  <label>{{$t('receive.cardItem3')}}</label>
                  <p>{{cardInfo.game_no | barReplace}}</p>
                </div>
                <div class="card--item b_r">
                  <label>{{$t('receive.cardItem4')}}</label>
                  <p>{{cardInfo.card_no | barReplace}}</p>
                </div>
              </div>
            </div>
          </el-col>
          
          <template v-if="memberAmount==-1||memberAmount>1000">
            <el-col :md="10">
              <div class="temp">COMING SOON...</div>
            </el-col>
          </template>
          <template v-else >
            <el-col :md="10">
              <el-form ref="registForm" :model="formData" > 
                <el-form-item label="Nick Name" prop="nickname" required>
                  <el-input v-model="formData.nickname" :disabled="Boolean(nickName)"  />
                </el-form-item>
                <el-form-item label="Game ID" prop="gid" required>
                  <el-input v-model="formData.gid" disabled >
                    <template slot="append">
                      <a @click="getGameID" >
                        <span v-if="loadingWarden.includes('get_game_id')">{{$t('common.loading')}}</span>
                        <span v-else >{{$t('receive.btn1')}}</span>
                      </a>
                    </template>
                  </el-input>
                </el-form-item>
                <cus-btn-ein 
                  @click.native="formSbumit"
                  class="form_submit"
                  :class="{disabled: this.loadingWarden.includes('receive_nft')}"
                  bg="/image/account/btn_form.png"
                >
                  <template v-if="this.loadingWarden.includes('receive_nft')">
                    {{$t('common.loading')}}
                  </template>
                  <template v-else>
                    {{$t('receive.btn2')}}
                  </template>
                </cus-btn-ein>
              </el-form>
            </el-col>
          </template>
        </el-row>
      </div>

      <cus-divider-ein dStyle="white" />

    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {nftContract} from '@/utils/contract_nft'
import {pageInitlization} from '@/utils/bootstrap'
export default {
  filters: {
    barReplace: str => str?str:'--'
  },
  computed: {
    ...mapGetters('user', {
      account: 'account',
      gid: 'gid',
      nft: 'nft',
      nickName: 'nickName'
    }),
    ...mapGetters('common', {
      loadingWarden: 'loadingWarden'
    }),
  },
  async created() {
    this.formData.gid = this.gid
    this.formData.nickname = this.nickName
    this.memberAmount = await this.$nftContract.currentAmount()
  },
  data(){
    return {
      cardInfo: {
        nickname: '',
        game_no: '',
        card_no: '',
        time: ''
      },
      formData: {
        nickname: '',
        gid: '',
      },
      rules: {
          nickname: [
              {required: true, trigger:'change'},
          ],
      },
      memberAmount: -1
    }
  },
  watch: {
    gid(n) {
      this.formData.gid = this.gid
    },
    formData: {
      immediate: true,
      handler(n) {
        this.cardInfo.nickname = n.nickname
        this.cardInfo.game_no = n.gid
      },
      deep: true
    },
    nft: {
      immediate: true,
      deep: true,
      handler(n) {
        this.cardInfo.game_no = n.game_no
        this.cardInfo.card_no = n.card_no
      }
    },
    nickName (n){
      this.formData.nickname = n 
    }
  },
  methods: {
    getGameID() {
      if(this.formData.gid) return false
      const request_name = 'get_game_id'
      if(this.loadingWarden.includes(request_name)) return false
      let vaild = this.$refs['registForm'].validateField('nickname', async err => {
        if(err) return false
        try {
          let res = await this.$http(request_name, {
            name: this.formData.nickname,
            eth_address: this.account
          })
          if (res)
            this.formData.gid = res.data.game_no
        } catch (err) {
          this.$message({message: err.response.data.msg||err, type: 'error'})
        }
      })
    },
    async formSbumit(){
      if(this.loadingWarden.includes('receive_nft')) return false
      if (!this.formData.nickname || !this.formData.gid ) return false
      this.$store.dispatch('common/addLoading', 'receive_nft')
      this.$refs['registForm'].validate(async valid => {
        if (!valid) {
          this.$message({message: 'Please finish personal infomation!', type: 'warning'});
          return false;
        }
        try {
          let recieveOptions = await this.$nftContract.claim(this.formData.gid)
          if (recieveOptions) {
            this.$store.dispatch('common/deleteLoading', 'receive_nft')
            // window.location.href = '/idCard'
            await pageInitlization()
            this.$router.replace({name: 'idcard'})
          }

        } catch (err) {
          this.$store.dispatch('common/deleteLoading', 'receive_nft')
        }
      });

    }
  },
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

$top: (
  $--page-xs-width:(top: 20px),
  $--page-sm-width:(top: 25px),
  $--page-md-width:(top: 30px),
  $--page-lg-width:(top: 30px),
);
$left: (
  $--page-xs-width:(left: 20px),
  $--page-sm-width:(left: 30px),
  $--page-md-width:(left: 40px),
  $--page-lg-width:(left: 40px),
);
$right: (
  $--page-xs-width:(right: 20px),
  $--page-sm-width:(right: 30px),
  $--page-md-width:(right: 40px),
  $--page-lg-width:(right: 40px),
);
$bottom: (
  $--page-xs-width:(bottom: 25px),
  $--page-sm-width:(bottom: 35px),
  $--page-md-width:(bottom: 45px),
  $--page-lg-width:(bottom: 45px),
);


.container {
  @include mediaAdapt($navHeight);
  padding-bottom: 0;
}

@include b(user){
  @include e(hd) {
    font-family: OrbitronRegular;
    margin-top: 60px;
    margin-bottom: 20px;
    h2 {
      @include mediaAdapt($hd);
      line-height: 120%;
      margin-bottom: 10px;
    }
    p.sub {
      font-size: 12px;
      // white-space: nowrap;
    }
  }
  
  @include e(bd) {
    padding: 20px;
    background-color: rgba(38, 49, 63, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    margin-bottom: 80px;

    .form_submit {
      width: 100%;
      height: 49px;
      line-height: 49px;
      font-size: 18px;
      font-family: OrbitronRegular;
      margin-top: 30px;
      text-align: center;
    }
  }

  @include e(card) {
    width: 520px;
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
        // top: 30px;
        @include mediaAdapt($top);
      }

      .b_l, .b_r {
        // bottom: 45px;
        @include mediaAdapt($bottom);

      }

      .t_l, .b_l {
        // left: 40px;
        @include mediaAdapt($left);
        text-align: left;
      }

      .t_r, .b_r {
        @include mediaAdapt($right);
        // right: 40px;
        text-align: right;
      }

      .card--item {
        position: absolute;
        font-family: OrbitronRegular;
        line-height: 100%;

        label {
          font-size: 12px;
          display: block;
          color: $--color-yellow;
        }
        p {
          font-size: 12px;
        }
      }
    }
  }
}

.temp {
  height: 327px;
  line-height: 327px;
  text-align: center;
  color: $--color-white-01;
  font-size: 24px;
  font-family: OrbitronRegular;
}

::v-deep .el-form {
  &-item {
    &__label {
      color: $--color-white
    }
  }
}

</style>