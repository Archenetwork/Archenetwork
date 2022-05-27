<script setup>
import { ref } from 'vue'
import { listPlayer } from 'api/http/player'
import FilterLeft from 'components/filter/Left.vue'
import LoadMoreListBtn from 'components/button/LoadMoreListBtn.vue'
import PlayerCard from 'components/card/Player.vue'

const orderTypeList = [
  { label: 'NEW', value: 1, icon: 'new' },
  { label: 'ROI', value: 2, icon: 'roi' },
]
const currentOrderType = ref(1)
const changOrderType = (val) => {
  currentOrderType.value = val
  initPage()
}

const filterList = [
  {
    label: 'game',
    key: 'genre',
    isOpen: true,
    current: '',
    iconType: 'localSvg',
    list: [
      { value: '', name: 'ALL - GENRE' },
      { value: 1, name: 'Action', icon: 'genre-action' },
      { value: 2, name: 'Adventure', icon: 'genre-adventure' },
      { value: 3, name: 'Arcade', icon: 'genre-arcade' },
      { value: 4, name: 'Art', icon: 'genre-art' },
      { value: 5, name: 'Augmented-Reality', icon: 'genre-ar' },
    ],
  },
  {
    label: 'status',
    key: 'devStatus',
    isOpen: true,
    current: '',
    iconType: 'localSvg',
    list: [
      { value: '', name: 'ALL - STATUS' },
      { value: 1, name: 'Live', icon: 'status-live' },
      { value: 2, name: 'Presale', icon: 'status-presale' },
      { value: 3, name: 'Alpha', icon: 'status-alpha' },
      { value: 4, name: 'Beta', icon: 'status-beta' },
      { value: 5, name: 'Development', icon: 'status-development' },
    ],
  },
]

const list = ref([])
const loadMoreListBtnRef = ref(null)
const getListLoading = ref(false)
const filterData = ref({})
const handleFilterChange = (val) => {
  filterData.value = val
  initPage()
}
const getListData = (pageQuery, isRefresh) => {
  const limit = pageQuery.limit
  const offset = pageQuery.offset
  const query = {
    limit: limit,
    offset: offset,
    orderType: currentOrderType.value,
    ...filterData.value,
  }
  if (isRefresh) getListLoading.value = true
  return listPlayer(query).finally(_ => {
    if (isRefresh) getListLoading.value = false
  })
}
const refreshList = (data, isRefresh) => {
  const items = data
  if (isRefresh) {
    list.value = items
  } else {
    list.value.push(...items)
  }
}
const initPage = () => {
  loadMoreListBtnRef.value.initPage()
}
</script>
<template>
  <div class="player-page">
    <div class="a-container game-container">
      <!-- left filter part -->
      <filter-left class="filter-box" :list="filterList" @on-change="handleFilterChange"></filter-left>

      <div class="content-box a-page-card">
        <div class="a-page-card-title">
          <div class="title-left">
            <svg-img class="subtitle text-top" name="text_all"></svg-img>
            <h1 class="title">players</h1>
          </div>
          <div class="title-right">
            <div :class="['item', {'active': currentOrderType === item.value}]" v-for="item in orderTypeList" :key="item.value" @click="changOrderType(item.value)">
              <svg-icon class="icon" :name="'selected-'+item.icon"></svg-icon>
              <span>{{item.label}}</span>
            </div>
          </div>
        </div>
        <div class="a-page-card-content" v-loading="getListLoading">
          <player-card class="player-card" v-for="item in list" :key="item.id"
            :item="item"></player-card>
          <r-box class="empty-box" type="empty" v-if="!list.length"></r-box>
        </div>
        <load-more-list-btn ref="loadMoreListBtnRef" :limit="18" :getDataFunction="getListData" @on-refresh-list="refreshList"></load-more-list-btn>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.player-page {
  padding-top: 34px;

  .game-container {
    display: flex;
    align-items: flex-start;

    .filter-box {
      margin-top: 20px;
    }

    .content-box {
      flex: 1;
      width: 0;
      padding-top: 0 !important;

      .a-page-card-title {
        margin-bottom: 20px !important;
        margin-left: 20px;

        .title-left {
          .title {
            padding-left: 20px;
          }
        }

        .title-right {
          display: flex;
          align-items: center;

          .item {
            display: flex;
            align-items: center;
            height: 37px;
            padding: 0 15px;
            margin-left: 15px;
            cursor: pointer;
            background: #303940;
            border-radius: 30px;

            .icon {
              display: none;
              width: 27px;
              height: 27px;
              margin-right: 6px;
            }

            span {
              font-weight: 600;
            }

            &.active {
              padding-left: 5px;
              background: #000;

              .icon {
                display: block;
              }
            }
          }
        }
      }

      .a-page-card-content {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 30px;

        .empty-box {
          height: 500px;
        }

        .player-card {
          box-sizing: border-box;
          width: 33.3333%;
          padding-left: 20px;
          margin-bottom: 50px;
        }
      }
    }
  }
}
</style>
