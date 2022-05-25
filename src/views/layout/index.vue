<script setup>
import MainHeader from './Header.vue'
</script>

<template>
  <div class="layout">
    <main-header class="layout-header"></main-header>
    <div class="layout-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss">
$menu-height: 60px;

.layout {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  color: #fff;
  background: #1a2024;

  .layout-header {
    position: fixed;
    z-index: 2000;
    width: 100%;
    height: $menu-height;
  }

  .layout-content {
    flex: 1;
    padding-top: $menu-height;
  }
}
</style>
