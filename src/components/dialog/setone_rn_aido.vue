<template>
  <dialog-set-one :visible.sync="visible" @closeHandler="viewClose" >
    <div class="dialog--setone_inner">
      <h4 class="box-title">Receive NFT</h4>
      <p class="box-sub">{{$t('header.receivenfttip0')}}</p>
      <cus-btn-ein 
        class="box-btn"
        @click.native="viewClose('jump')"
      >GET IT</cus-btn-ein>
      <el-checkbox v-model="repeatShow">Don't remind again</el-checkbox>
    </div>
  </dialog-set-one>
</template>

<script>
import dialogSetOne from './tmp/d_tmp_set_one'
import { mapGetters } from 'vuex'
export default {
  components: {dialogSetOne},
  computed: {
    ...mapGetters('user', {
      nft_benefit: 'nft_benefit',
      ido_unpartake: 'ido_unpartake'
    }),
    ...mapGetters('dialog', {
      visible: 'RECEIVE_NFT_AFTER_IDO'
    }),
    ...mapGetters('common', {
        authentication: 'authentication',
    }),
  },
  data() {
    return {
      repeatShow: localStorage.getItem('RECEIVE_NFT_TIPS_SHOW') 
    }
  },
  watch: {
    async authentication(){
      const ido_partake = await this.$idoContract.checkQualification()
      if(parseInt(localStorage.getItem('RECEIVE_NFT_TIPS_SHOW')) != 1 && this.nft_benefit == 1 && !ido_partake)
        this.$store.commit('dialog/RECEIVE_NFT_AFTER_IDO', true)
    }
  },
  methods: {
    viewClose(handleType) {
      if(this.repeatShow)
        localStorage.setItem('RECEIVE_NFT_TIPS_SHOW', 1)
      else 
        localStorage.setItem('RECEIVE_NFT_TIPS_SHOW', 0)

      if(handleType == 'jump')
        this.$router.push({'name': 'receivenft'})

      this.$store.commit('dialog/RECEIVE_NFT_AFTER_IDO', false)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'dialog.scss';
</style>