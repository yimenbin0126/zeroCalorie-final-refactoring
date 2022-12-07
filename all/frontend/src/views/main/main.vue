<template>
  <div id="bodystyle">
    <Header />
    <div id="j_bg">
      <div class="container">
        <p class="title title1">LET'S</p>
      </div>
      <div class="container">
        <p class="title title2">WORKOUT</p>
      </div>
      <div class="container">
        <p class="title title3">TOGETHER!</p>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/common/Header.vue";
export default {
  name: "Main",
  components: {
    Header,
  }
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main/main.scss";
</style>