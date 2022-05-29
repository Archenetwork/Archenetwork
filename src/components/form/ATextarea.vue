<template>
  <div class="a-page-input" >
    <textarea type="text" v-model="content" :placeholder="props.placeholder" maxlength="200" @input="inputChange($event.target.value)"></textarea>
    <div class="tips">{{tipLength}}</div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
const props = defineProps({
  modelValue: {
    type: String,
  },
  placeholder: {
    type: String,
    default: 'search',
  },
})
const content = ref('')
watch(() => props.modelValue, (newValue, old) => {
  content.value = newValue
}, { immediate: true })

const tipLength = computed(() => {
  return content.value ? 200 - Number(content.value.length) : 200
})
const emits = defineEmits(['update:modelValue'])

const inputChange = (modelValue) => {
  emits('update:modelValue', modelValue)
}

</script>

<style lang="scss" scoped>
textarea {
  box-sizing: border-box;
  width: 100%;
  height: 160px;
  padding: 15px 20px;
  color: white;
  resize: none;
  background: #14191d;
  border: none;
  border-radius: 10px;
  outline: none;
}

.tips {
  margin-top: 15px;
}

// .a-page-input {
//   position: relative;
//   display: flex;
//   align-items: center;
//   width: 250px;
//   height: 37px;
//   padding-left: 20px;
//   line-height: 37px;
//   background: #14191d;
//   border-radius: 10px;

//   .svg-icon {
//     position: absolute;
//     top: 50%;
//     left: 25px;
//     transform: translate(-50%, -50%);
//   }

//   input {
//     margin-left: 25px;
//     color: white;
//     background: #14191d;
//     border: none;
//     outline: none;
//   }
// }
</style>
