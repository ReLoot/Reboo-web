<template>
  <dialog-set-two 
    :visible.sync="result" 
    :closeOnClickModal="false"
    @closeHandler="viewClose"
    width="420px"
  >
    <div class="dialog--settwo_inner">
      <h4 class="synt--result_title">
        <span v-if="result == 1">Mint successful!</span>
        <span v-else>Mint failed</span>
      </h4>
      <div class="synt--result_view">
        <em v-if="result == 1" class="successed" />
        <em v-else class="failed" />
      </div>
      <div class="synt--result_btns">
        <cus-btn-ein
          @click.native="viewClose(1)"
        >RECEIPT</cus-btn-ein>
      </div>
    </div>
  </dialog-set-two>
</template>

<script>
import dialogSetTwo from './tmp/d_tmp_set_two'
import { mapGetters } from 'vuex'
export default {
  components: {dialogSetTwo},
  props: ['status'],
  computed: {
    ...mapGetters('dialog', {
      result: 'SYNT_RESULT'
    })
  },
  methods: {
    viewClose(type) {
      this.$store.commit('dialog/SYNT_RESULT', false)
      if(type !== 1)
        this.$emit('statusReset')
    },
  }
}
</script>

<style lang="scss" scoped>
@import 'dialog.scss';
@include b(synt) {
  @include e(result) {
    @include m(title) {
      width: 100%;
      text-align: center;
      font-size: 20px;
      color: $--color-yellow;
      font-family: OrbitronBlack;
    }
    @include m(view) {
      margin: 40px auto 60px;
      em {
        display: block;
        width: 140px;
        height: 150px;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        background: no-repeat center/cover;
        &.successed {
          background-image: url(/image/card_tool.png);
        }
        &.failed {
          background-image: url(/image/card_broken.png);
        }
      }
    }

    @include m(btns) {
        text-align: center;
        ::v-deep .cus--btn {
          width: 220px;
          height: 42.5px;
          // margin-left: -91px;
          font-size: 16px;
          font-family: OrbitronRegular;
          background-color: #3DB5AE;
          border: 2px solid #2D8A92;
        }
    }
  }
}
</style>