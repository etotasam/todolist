<template>
  <div class="loader_wrapper">
    <div class="vue_loader">
      <vue-loading
        type="spin"
        color="rgb(145, 145, 145)"
        :size="{ width: '50px', height: '50px' }"
      >
      </vue-loading>
      <span>loading....</span>
    </div>
  </div>
</template>

<script>
import { VueLoading } from 'vue-loading-template'
export default {
  components: {
    VueLoading
  }
}
</script>

<style lang="scss" scoped>
  .loader_wrapper {
    width: 100%;
    min-height:100vh;
    display:grid;
    grid-template:
    "..... ..... ....."
    ".....  vue  ....." 50px
    "..... ..... ....."
    /auto   50px  auto;

    .vue_loader {
      grid-area:vue;
    }
  }
</style>