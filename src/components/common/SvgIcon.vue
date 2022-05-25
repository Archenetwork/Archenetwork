<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})
const symbolId = computed(() => `#svg-icon-${props.name}`)
const isImg = computed(() => props.name.startsWith('img-'))
</script>

<template>
  <svg aria-hidden="true" class="svg-icon" :class="{'svg-icon-base': !isImg}">
    <use :href="symbolId"/>
  </svg>
</template>

<style>
.svg-icon {
  width: 1em;
  height: 1em;
  overflow: hidden;
  font-size: 16px;
}

.svg-icon-base {
  fill: currentColor;
}
</style>
