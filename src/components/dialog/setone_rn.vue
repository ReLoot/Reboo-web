<template>
  <dialog-set-one :visible.sync="visible" @closeHandler="viewClose" >
    <div class="dialog--setone_inner">
      <!-- <h4 class="box-title">TTTTTTTT</h4> -->
      <p class="box-sub">{{$t('header.receivenfttip')}}</p>
      <cus-btn-ein 
        class="box-btn"
        @click.native="viewClose"
      >GET IT</cus-btn-ein>
    </div>
  </dialog-set-one>
</template>

<script>
import dialogSetOne from './tmp/d_tmp_set_one'
import { mapGetters } from 'vuex'
export default {
  components: {dialogSetOne},
  computed: {
    ...mapGetters('dialog', {
      visible: 'RECEIVE_NFT_BEFORE_BIND_EMAIL'
    })
  },
  methods: {
    viewClose() {
      this.$store.commit('dialog/RECEIVE_NFT_BEFORE_BIND_EMAIL', false)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'dialog.scss';
</style>