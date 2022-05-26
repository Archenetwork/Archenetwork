<script setup>
import MainHeader from './Header.vue'
import MainFooter from './Footer.vue'

</script>

<template>
  <div class="layout">
    <main-header></main-header>
    <div class="layout-container">
      <router-view></router-view>
    </div>
    <main-footer></main-footer>
  </div>

</template>

<style lang="scss">
.layout {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  color: #fff;
  background: var(--bg-color);

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 500px;
    content: "";
    background: url("/images/page_bg.png") no-repeat center / 100%;
    filter: blur(97.8581px);
    opacity: .5;
  }

  &-header {
    position: fixed;
    z-index: 2000;
    height: 100px;
  }

  &-container {
    position: relative;
    flex: 1;
    padding-top: 100px;
  }

  &-footer {
    position: relative;
  }
}
</style>
