<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'empty', // empty, warning, loading
  },
  text: {
    type: String,
  },
})

const textData = {
  empty: 'No Items Found',
  warning: 'Something went wrong',
  loading: 'Loading...',
}
const showText = computed(() => {
  if (props.text) {
    return props.text
  }
  return textData[props.type]
})

</script>

<template>
  <div class="r-box">
    <div class="box-content">
      <svg-icon class="box-icon" :class="{'icon-loading': props.type === 'loading'}" :name="'box-status-' + props.type"></svg-icon>
      <div class="box-text">{{showText}}</div>
    </div>
  </div>
</template>

<style lang="scss">
.r-box {
  width: 100%;
  padding: 20px;

  @include flex-center;

  .box-content {
    width: 270px;
    height: 100px;
    background: #14191d;
    border-radius: 100px;

    @include flex-center(column);

    .box-icon {
      width: 24px;
      height: 24px;
    }

    .icon-loading {
      animation: rotating .8s linear infinite;
    }

    .box-text {
      margin-top: 15px;
      font-weight: 600;
    }
  }
}

@keyframes rotating {
  0% { transform: rotate(0); }
  to { transform: rotate(360deg); }
}

</style>
