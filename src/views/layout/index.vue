<script setup>
import MainHeader from './Header.vue'
</script>

<template>
  <div class="layout">
    <div class="layout-right">
      <main-header></main-header>
      <div class="layout-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
