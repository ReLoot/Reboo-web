<template>
  <el-dialog 
    class="dialog--setone" 
    :visible='visible'
    :append-to-body="true"
    :close-on-click-modal="closeOnClickModal"
    @close="closeHandler"
  >
    <slot></slot>
  </el-dialog>
</template>

<script>
export default {
  props: ['visible', 'closeOnClickModal'],
  methods: {
    closeHandler(params) {
      this.$emit('closeHandler', params)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../dialog.scss';
</style>