<template>
  <el-dialog 
    class="dialog--settwo" 
    :visible='visible'
    :append-to-body="true"
    :close-on-click-modal="closeOnClickModal"
    @close="closeHandler"
    :width="width"
    ref="dialogSetTwo"
  >
    <slot></slot>
  </el-dialog>
</template>

<script>
export default {
  props: ['width', 'visible', 'closeOnClickModal', 'styleTop'],
  methods: {
    closeHandler(params) {
      this.$emit('closeHandler', params)
    }
  },
  mounted() {
    if(this.styleTop) {
      const $dialogEl = this.$refs['dialogSetTwo'].$el.querySelector('.el-dialog')
      $dialogEl.style.top = this.styleTop
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../dialog.scss';
</style>