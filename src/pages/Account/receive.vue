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
              <div class="user--card_inner front">
                <div class="card--item t_l">
                  <label>Nick name</label>
                  <p>{{formData.nickname}}</p>
                </div>
                <div class="card--item t_r">
                  <label>Time</label>
                  <p>10/24</p>
                </div>
                <div class="card--item b_l">
                  <label>Game ID</label>
                  <p>{{formData.gid}}</p>
                </div>
                <div class="card--item b_r">
                  <label>Card Number</label>
                  <p>123123545641521423</p>
                </div>
              </div>
            </div>
          </el-col>

          <el-col :md="10">
            <el-form > 
              <el-form-item label="Nick Name">
                <el-input v-model="formData.nickname"/>
              </el-form-item>
              <el-form-item label="Game ID">
                <el-input v-model="formData.gid">
                  <template slot="append">
                    GET GID
                   </template>
                </el-input>
              </el-form-item>
                <!-- @click.native="walletConnect" -->
              
              <cus-btn-ein 
                @click.native="formSbumit"
                class="form_submit"
                bg="/image/account/btn_form.png"
              >Receive NFT</cus-btn-ein>
            </el-form>
          </el-col>
        </el-row>
      </div>

      <cus-divider dStyle="white" />

    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      formData: {
        nickname: '',
        gid: '10001'
      }
    }
  },
  methods: {
    formSbumit(){
      this.$store.commit('user/nickName', this.formData.nickname)
      this.$store.commit('user/gid', this.formData.gid)
      this.$store.commit('user/enableRecived', false)
      // this.$message({})
      this.$message({
        message: 'Subscribe Successed!',
        type: 'success'
      })
      this.$router.replace({name: 'idcard'})
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