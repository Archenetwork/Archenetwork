<template>
  <div class="a-page-switch">
    <div class="switchItem actived">
      <svg-icon class="all-icon" :class="modelValue?'':'newest'" name="newest"></svg-icon>
      <div class="title">{{modelValue?'Oldest':'Newest'}}</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
  },
})
</script>

<style lang="scss" scoped>
.a-page-switch {
  display: flex;

  .actived {
    padding: 5px 15px 5px 5px !important;
    background: #000 !important;

    .title {
      display: flex;
    }
  }

  .switchItem {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 110px;
    padding: 5px 15px;
    cursor: pointer;
    background: #303940;
    border-radius: 30px;

    .all-icon {
      width: 27px;
      height: 27px;
      margin-right: 8px;
      transition: transform .3s;
    }

    .newest {
      transform: rotate(-180deg);
    }

    .title {
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 24px;
      letter-spacing: .02em;
    }
  }

  .switchItem + .switchItem {
    margin-left: 15px;
  }
}
</style>
