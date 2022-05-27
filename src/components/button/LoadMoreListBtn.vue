<script setup>
import { ref, computed, onMounted, reactive } from 'vue'

const emits = defineEmits(['on-refresh-list'])
const props = defineProps({
  limit: {
    type: Number,
    default: 10,
  },
  isInitData: {
    type: Boolean,
    default: true,
  },
  getDataFunction: {
    type: Function,
  },
})

const isRefresh = ref(true)
const pageObj = reactive({
  offset: 0,
  total: 0,
  loading: false,
})
const showMore = computed(() => {
  return pageObj.total > pageObj.offset
})
const showEmpty = computed(() => {
  return pageObj.total > 0 && !pageObj.loading && pageObj.offset >= pageObj.total
})

const getData = () => {
  if (pageObj.loading || (pageObj.total > 0 && pageObj.offset >= pageObj.total)) {
    return
  }
  const query = {
    offset: pageObj.offset,
    limit: props.limit,
  }
  pageObj.loading = true
  props.getDataFunction(query, isRefresh.value).then(res => {
    const { total, items } = res
    if (total > 0) {
      pageObj.offset = pageObj.offset + props.limit
    }
    pageObj.total = total
    emits('on-refresh-list', items, isRefresh.value)
  }).finally(_ => {
    if (isRefresh.value) {
      isRefresh.value = false
    }
    pageObj.loading = false
  })
}
onMounted(() => {
  if (props.isInitData) {
    getData()
  }
})

const initPage = () => {
  isRefresh.value = true
  pageObj.offset = 0
  pageObj.total = 0
  pageObj.loading = false
  getData()
}

defineExpose({
  initPage,
})

</script>

<template>
  <div class="c-load-more-list-btn" v-show="showMore" :class="{'is-loading': pageObj.loading}" @click="getData">
    <svg-icon class="icon-loading" name="loading"></svg-icon>
    <span>More</span>
    <svg-icon class="icon-arrow" name="arrow_down"></svg-icon>
  </div>
  <div class="c-load-more-list-empty" v-show="showEmpty">
    <span>- The End -</span>
  </div>
</template>

<style lang="scss">
.c-load-more-list-btn {
  width: 100%;
  height: 40px;
  font-weight: 600;
  color: #0ff;
  cursor: pointer;
  background: #000;
  border-radius: 20px;

  @include flex-center;

  .icon-arrow {
    width: 20px;
    height: 20px;
  }

  .icon-loading {
    display: none;
    font-size: 24px;
    animation: rotating 2s linear infinite;
  }

  &.is-loading {
    pointer-events: none;
    opacity: .5;

    .icon-loading {
      display: block;
    }
  }
}

.c-load-more-list-empty {
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: #5b6871;
  text-align: center;
}

</style>
