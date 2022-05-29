<template>
  <button :class="className" :disabled="props.disabled||props.loading" :style="props.full?'width:100%':''">
    <div v-if="props.loading">{{props.loadingText}}...</div>
    <div class="slotContent" v-else>
      <slot></slot>
    </div>
  </button>
</template>

<script setup>
import { ref, computed } from 'vue'
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loadingText: {
    type: String,
    default: 'Loading',
  },
  full: {
    type: Boolean,
    default: false,
  },
  simple: {
    type: Boolean,
    default: false,
  },
  actived: {
    type: Boolean,
    default: false,
  },
})
const className = computed(() => {
  let className = ''
  className = props.simple ? 'simple' : ''
  if (props.actived) {
    className += ' white'
  }
  if (props.disabled || props.loading) {
    className += ' disabled'
  }
  return className
})

</script>

<style lang="scss" scoped>
button {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0 20px;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 40px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  background: #0038ff;
  border: none;
  border-radius: 20px;
  outline: none;

  .slotContent {
    display: flex;
    align-items: center;
    justify-content: center;

    :deep(.svg-icon) {
      margin-left: 9px;
    }
  }
}

.disable {
  cursor: auto !important;
  background-color: #023898 !important;
}

.simple {
  background: none !important;
  border: 1px solid #ccc !important;
}

.simple .disable {
  background-color: none !important;
}

.white {
  color: #5b6871 !important;
  background-color: white !important;
}
</style>
