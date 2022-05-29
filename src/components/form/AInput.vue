<template>
  <div class="a-page-input" :class="className">
    <div class="prefix" v-if="props.prefix">
      <svg-icon class="svg-icon" :name="props.prefix"></svg-icon>
    </div>
    <input type="text" :placeholder="props.placeholder" :maxlength="maxlength" v-model="content" @input="inputChange($event.target.value)">
    <div class="suffix" v-show="failed">
      {{failedtext}}
    </div>
  </div>
</template>

<script setup>
import { computed, watch, ref } from 'vue'
import { useRouter } from 'vue-router'
const props = defineProps({
  modelValue: {
    type: String,
  },
  prefix: {
    type: String,
  },
  maxlength: {
    type: Number,
  },
  big: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: 'search',
  },
  failed: {
    type: Boolean,
    default: false,
  },
  failedtext: {
    type: String,
    default: 'Required',
  },
})
const content = ref('')
watch(() => props.modelValue, (newValue, old) => {
  content.value = newValue
}, { immediate: true })
const className = computed(() => {
  let className = ''
  className = props.prefix ? 'a-page-input' : ''
  if (props.big) {
    className += ' big'
  }
  if (props.failed) {
    className += ' failed'
  }
  return className
})

const emits = defineEmits(['update:modelValue'])

const inputChange = (modelValue) => {
  emits('update:modelValue', modelValue)
}

</script>

<style lang="scss" scoped>
.a-page-input-prefix {
  padding-left: 50px !important;
}

.failed {
  border: 1px solid #f2271c !important;
}

.big {
  width: 100% !important;
  height: 54px !important;
  padding-left: 0 !important;
  line-height: 54px !important;

  input {
    flex: 1;
    padding: 15px 20px !important;
    margin-left: 0 !important;
  }
}

.a-page-input {
  position: relative;
  display: flex;
  align-items: center;
  width: 250px;
  height: 37px;
  padding-left: 20px;
  overflow: hidden;
  line-height: 37px;
  background: #14191d;
  border: 1px solid #14191d;
  border-radius: 10px;

  .svg-icon {
    position: absolute;
    top: 50%;
    left: 25px;
    transform: translate(-50%, -50%);
  }

  input {
    margin-left: 25px;
    color: white;
    background: #14191d;
    border: none;
    outline: none;
  }

  .suffix {
    margin-right: 20px;
    font-size: 14px;
    font-style: normal;
    font-weight: normal;
    color: #f2271c;
    letter-spacing: .02em;
  }
}
</style>
