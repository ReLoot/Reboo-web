<template>
  <div class="user">
    <div class="container">
      <div class="user--hd">
        <h2>Welcome To Vibranium</h2>
        <h2>Claim your Interstellar ID NFT</h2>
        <p class="sub">Congratulations! This is only an NFT identity credential that a very small number of users can have</p>
      </div>

      <div class="user--bd">
        <el-row :gutter="30">
          <el-col :md="14">

            <h4>Example Card</h4>
            <div class="user--card">
              <div class="user--card_inner front" >
                <div class="card--item t_l" v-if="cardInfo.nickname" >
                  <label>Nick name</label>
                  <p>{{cardInfo.nickname}}</p>
                </div>
                <div class="card--item b_l" v-if="cardInfo.game_no" >
                  <label>Game ID</label>
                  <p>{{cardInfo.game_no}}</p>
                </div>
                <div class="card--item b_r" v-if="cardInfo.card_no" >
                  <label>Card Number</label>
                  <p>{{cardInfo.card_no}}</p>
                </div>
              </div>
            </div>
          </el-col>

          <el-col :md="10">
            <el-form ref="registForm" :model="formData" > 
              <el-form-item label="Nick Name" prop="nickname" required>
                <el-input v-model="formData.nickname" :disabled="Boolean(nickName)" />
              </el-form-item>
              <el-form-item label="Game ID" prop="gid" required>
                <el-input v-model="formData.gid" disabled >
                  <template slot="append">
                    <a @click="getGameID">GET GID</a>
                   </template>
                </el-input>
              </el-form-item>
              
              <cus-btn-ein 
                @click.native="formSbumit"
                class="form_submit"
                bg="/image/account/btn_form.png"
              >Receive NFT</cus-btn-ein>
            </el-form>
          </el-col>
        </el-row>
      </div>

      <cus-divider-ein dStyle="white" />

    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters('user', {
      account: 'account',
      gid: 'gid',
      nft: 'nft',
      nickName: 'nickName'
    }),
  },
  data(){
    return {
      cardInfo: {
        nickname: '',
        game_no: '',
        card_no: '',
      },
      formData: {
        nickname: '',
        gid: '',
      },
      rules: {
          nickname: [
              {required: true, trigger:'change'},
          ],
      }
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
  created() {
    this.formData.gid = this.gid
    this.formData.nickname = this.nickName
  },
  methods: {
    getGameID() {
      if (this.gid) return false
      let vaild = this.$refs['registForm'].validateField('nickname', async err => {
        if(!err) {
          let res = await this.$http('get_game_id', {
            name: this.formData.nickname,
            eth_address: this.account
          })
          console.log(res)
        }
      })
    },
    async formSbumit(){
      if (Boolean(String(this.nickName)) && Boolean(this.gid)) return false
      this.$refs['registForm'].validate((valid) => {
        console.log(valid)
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });

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
    margin-top: 60px;
    margin-bottom: 20px;
    h2 {
      font-size: 34px;
      line-height: 120%;
      margin-bottom: 10px;
    }
    p.sub {
      font-size: 12px;
      white-space: nowrap;
    }
  }
  
  @include e(bd) {
    padding: 40px;
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
          font-size: 14px;
        }
      }
    }
  }
}

::v-deep .el-form {
  &-item {
    &__label {
      color: $--color-white
    }
  }
}

</style>