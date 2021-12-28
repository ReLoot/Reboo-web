<template>
  <div class="cus--fxbar">
    <div class="cus--fxbar_inner">
      <div class="cus--fxbar_prepend"></div>
      <div class="cus--fxbar_append">
        <a class="cus--fxbar_btn">

        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    btnArr: {
      type: [Object, Array],
      
    }
  }
}
</script>