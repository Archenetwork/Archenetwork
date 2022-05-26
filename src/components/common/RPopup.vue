<template>
  <transition-group tag="div" name="display" mode="out-in">
    <div class="r-popup" key="popup" v-if="visible">
      <div class="top">
        <slot name="top"></slot>
        <div @click="close" :class="{'close-top': closeTop}">
          <svg-icon class="close" name="close"></svg-icon>
        </div>
      </div>
      <div class="center">
        <slot name="center"></slot>
      </div>
      <div class="bottom" v-if="slotBottom">
        <slot name="bottom"></slot>
      </div>
    </div>
  </transition-group>
</template>

<script setup>
import { ref, computed, watch, useSlots } from 'vue'

const emits = defineEmits(['update:modelValue', 'on-close'])
const props = defineProps({
  modelValue: {
    type: Boolean,
  },
  top: {
    type: Number,
    default: 30,
  },
  width: {
    type: Number,
    default: 250,
  },
  closeTop: {
    type: Boolean,
    default: false,
  },
})

const slotBottom = !!useSlots().bottom

const visible = ref(false)
watch(() => props.modelValue, (newValue) => {
  visible.value = newValue
}, { immediate: true })

const toppx = computed(() => {
  return props.top + 'px'
})
const widthpx = computed(() => {
  return props.width + 'px'
})

const close = async () => {
  emits('update:modelValue', false)
}

</script>
<style lang="scss" scoped>
.r-popup {
  position: absolute;
  top: v-bind(toppx);
  right: 0;
  z-index: 999;
  box-sizing: border-box;
  width: v-bind(widthpx);

  // height: 236px;
  padding: 20px 30px;
  background: #000;
  border-radius: 30px;
  box-shadow: 6px 6px 0 rgb(0 0 0 / 24%);

  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    // height: 24px;
    padding-bottom: 15px;
    margin-bottom: 15px;
    font-family: "Cindie Mono";
    font-size: 10px;
    font-style: normal;
    font-weight: normal;
    color: #b0babf;
    letter-spacing: .02em;
    border-bottom: 1px solid rgb(255 255 255 / 16%);

    .close-top {
      align-self: start;
    }

    .close {
      cursor: pointer;
    }
  }

  .center {
    max-height: 60vh;
    overflow: auto;

    svg {
      width: 27px;
      height: 27px;
    }
  }

  .bottom {
    margin-top: 15px;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 15px;
    color: #5b6871;
  }
}

// transition
.display-enter-active {
  transition: all .3s ease-in-out;
}

.display-leave-active {
  transition: all .3s ease-in-out;

  .css,
  .html {
    transition: all .3s ease-in-out;
  }
}

.display-enter-from {
  opacity: 0;
  transform: scale(.5);
}

.display-leave-to {
  opacity: 0;

  .css {
    right: 50%;
    transform: translateX(50%);
  }

  .html {
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
