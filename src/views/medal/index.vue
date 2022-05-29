<template>
  <div class="a-container account-medals-page">
    <div class="a-page-title">
      <div class="a-page-title-name">My Medals</div>
      <div class="a-page-title-right">
        <a-switch @click="sortChange" v-model="sortType"></a-switch>
      </div>
    </div>
    <div class="medal-card-wrap" v-loading="getListLoading">
      <div class="medal-card" v-for="(item,index) in list" :key="index">
        <medals-card :list="item" :index="index"></medals-card>
      </div>
    </div>
    <r-box type="empty" v-if="!getListLoading&&!list.length"></r-box>
    <load-more-list-btn ref="loadMoreListBtnRef" :limit="24" :getDataFunction="getListData" @on-refresh-list="refreshList"></load-more-list-btn>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import medalsCard from 'components/card/medal.vue'
import LoadMoreListBtn from 'components/button/LoadMoreListBtn.vue'
import ASwitch from 'components/form/ASwitch.vue'
import { listMedal } from 'api/http/medal'
import useCommonStore from 'store/common'

const commonStore = useCommonStore()
const userInfo = computed(() => {
  return commonStore.userInfo
})

// sort
const sortType = ref(true)
const sortChange = () => {
  sortType.value = !sortType.value
  initPage()
}
const orderType = computed(() => {
  return sortType.value ? 0 : 1
})

const list = ref([])
const loadMoreListBtnRef = ref(null)
const getListLoading = ref(false)

const getListData = (pageQuery, isRefresh) => {
  const query = {
    limit: pageQuery.limit,
    offset: pageQuery.offset,
    userId: userInfo.value?.id,
    orderType: orderType.value,
  }
  if (isRefresh) getListLoading.value = true
  return listMedal(query).finally(_ => {
    if (isRefresh) getListLoading.value = false
  })
}
const refreshList = (data, isRefresh) => {
  if (isRefresh) {
    list.value = data
  } else {
    list.value.push(...data)
  }
}

const initPage = () => {
  loadMoreListBtnRef.value.initPage()
}
</script>
<style lang="scss" scoped>
.account-medals-page {
  margin-top: 50px !important;
  margin-bottom: 50px !important;

  .medal-card-wrap {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 106px;
  }
}
</style>
