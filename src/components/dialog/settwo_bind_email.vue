<template>
  <dialog-set-two 
    :visible.sync="visible" 
    :closeOnClickModal="false"
    @closeHandler="viewClose"
  >
    <div class="dialog--settwo_inner">
      <el-form ref="DialogForBindEmail" class="dialog--setone_form" :rules="rules" :model="formData" >
        <h3 class="form--title">{{$t('header.bindEmailHd')}}</h3>
        <el-form-item prop="email" required >
          <el-input 
            v-model="formData.email"
            placeholder="Mail address"
          />
        </el-form-item>
        <el-form-item prop="pass_code" >
          <el-input 
            v-model="formData.pass_code"
            placeholder="ID Card Priate Code"
          />
        </el-form-item>
        <el-form-item prop="code" >
          <el-input 
            v-model="formData.code"
            placeholder="Code"
          >
            <template slot="append">
              <a v-if="count==60" @click="getCode">{{$t('header.sendCode')}}</a>
              <span v-else>{{count}}s</span>
            </template>
          </el-input>
        </el-form-item>

        <cus-btn-ein 
          @click.native="bindEmail"
          class="form_submit"
          bg="/image/account/btn_form.png"
          >{{$t('header.submit')}}</cus-btn-ein>

        </el-form>
    </div>
  </dialog-set-two>
</template>

<script>
import dialogSetTwo from './tmp/d_tmp_set_two'
import { mapGetters } from 'vuex'
import { validateEmail } from '@/utils/validate'
export default {
  components: {dialogSetTwo},
  computed: {
    ...mapGetters('user', {
      account: 'account'
    }),
    ...mapGetters('common', {
      loadingWarden: 'loadingWarden'
    }),
    ...mapGetters('dialog', {
      visible: 'BIND_EMAIL'
    })
  },
  data() {
    return {
      formData: {
        email: '',
        pass_code: '',
        code: ''
      },
      rules: {
        email: [{validator: validateEmail, trigger: 'change'}],
        pass_code: [{required: true, message: 'Pass code is required', trigger: 'blur'}],
        code: [{required: true, message: 'Email validate code is required', trigger: 'blur'}],
      },
      count: 60,
      countSet: 60,
    }
  },
  methods: {
    viewClose() {
      this.$store.commit('dialog/BIND_EMAIL', false)
    },
    bindEmail() {
      if(this.loadingWarden.includes('bind_email')) return false
      this.$refs['DialogForBindEmail'].validate((valid) => {
        if(valid) {
          this.$http('bind_email', { eth_address: this.account, ...this.formData })
            .then(res => {
              this.$store.commit('user/email', this.formData.email)
              this.$store.commit('dialog/BIND_EMAIL', false)
              this.$message({message: 'Bind Email Successed!', type: 'success'})
            }).catch(err => {
              this.$message({ message: err.response.data.msg || err, type: 'error' })
            })
        } else {
          return false
        }
      })
    },
    getCode(){
      if (this.count < 60) return false
      this.$refs['DialogForBindEmail'].validateField('email', async err => {
        if(err) return false
        this.count = 59
        try {
          let res = await this.$http('getEmailCode', { email:this.formData.email, eth_address:this.account })
          if (res) {
            this.$message({message: this.$t('header.sendCodeTip')+this.formData.email, type: 'success'})
            const timer = setInterval(() => {
                if(this.count <= 0){
                  this.count = this.countSet
                  clearInterval(timer)
                } else {
                    this.count --
              }}, 1000)
          }
        } catch (err) {
          this.count = this.countSet
          this.$message({message: err.response.data.msg||err, type: 'error'})
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
@import 'dialog.scss';
.form_submit {
  width: 100%;
  height: 62px;
  font-size: 20px;
  font-family: OrbitronRegular;
  display: block;
  background-size: cover;
  margin-top: 60px;
  ::v-deep .cus--btn_str {
    margin-top: 3px;
  }
}
</style>