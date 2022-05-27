<script setup>
import { ref, computed, watch } from 'vue'

const emits = defineEmits(['on-change'])
const props = defineProps({
  list: Array,
})

const changeFilter = () => {
  const data = {}
  filterList.value.forEach(x => {
    if (x.current) {
      data[x.key] = x.current
    }
  })
  if (searchValue.value) {
    data.search = searchValue.value
  }
  emits('on-change', data)
}

const searchValue = ref('')
const showCloseIcon = computed(() => {
  return searchValue.value !== ''
})
const handleSearch = () => {
  changeFilter()
}
const clearSearchValue = () => {
  searchValue.value = ''
  changeFilter()
}

const filterList = ref([])
watch(() => props.list, val => {
  filterList.value = val
}, { immediate: true })

const handleOpenItem = (item) => {
  item.isOpen = !item.isOpen
}
const handleFilterChange = (group, item) => {
  group.current = item.value
  changeFilter()
}
</script>

<template>
  <div class="c-filter-left">
    <div class="search-box">
      <svg-icon class="icon" name="search" @click="handleSearch"></svg-icon>
      <input class="input" v-model="searchValue" placeholder="Search" @keydown.enter.prevent="handleSearch" />
      <svg-icon class="close-icon" name="close-circle" v-show="showCloseIcon" @click="clearSearchValue"></svg-icon>
    </div>
    <div class="group-box">
      <template v-for="(group, i) in filterList" :key="i">
        <div class="group-box-title" :class="{'r-border-top-no': i === 0}" @click="handleOpenItem(group)">
          <div class="name">{{group.label}}</div>
          <svg-icon class="icon" :name="group.isOpen ? 'minus' : 'add'"></svg-icon>
        </div>
        <div class="group-box-content" v-if="group.isOpen">
          <div class="item" :class="{active: group.current === item.value}" v-for="(item, ii) in group.list" :key="item.value" @click="handleFilterChange(group, item)">
            <!-- icon start -->
            <svg-icon v-if="ii === 0" class="icon" :name="group.current === item.value ? 'all-selected' : 'all'"></svg-icon>
            <template v-else>
              <template v-if="group.iconType === 'img'">
                <div class="icon icon-img">
                  <img class="icon-img-inner" :src="item.icon" alt="">
                </div>
              </template>
              <template v-else-if="group.iconType === 'localSvg'">
                <svg-icon class="icon icon-local-svg" :name="item.icon + (group.current === item.value ? '-selected' : '')"></svg-icon>
              </template>
              <template v-else-if="group.iconType === 'localImg'">
                <img class="icon icon-local-img" :src="group.current === item.value ? item.selectedIcon : item.icon" alt="">
              </template>
              <template v-else-if="group.iconType === 'letter'">
                <div class="icon icon-letter">{{item.short}}</div>
              </template>
              <template v-else>
                <div class="icon icon-no"></div>
              </template>
            </template>
            <!-- icon end -->
            <span>{{item.name}}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.c-filter-left {
  position: sticky;
  top: 80px;
  box-sizing: border-box;
  width: 250px;
  margin-right: 30px;
  margin-bottom: 60px;

  .search-box {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 54px;
    padding: 15px;
    margin-bottom: 30px;
    background: #14191d;
    border-radius: 10px;

    .icon {
      margin-right: 10px;
      font-size: 24px;
      cursor: pointer;
    }

    .input {
      display: block;
      flex: 1;
      width: 0;
      color: #fff;
      background: none;
      border: none;
      outline: none;
    }

    .close-icon {
      font-size: 24px;
      cursor: pointer;
    }
  }

  .group-box {
    box-sizing: border-box;
    width: 100%;
    padding: 0 15px;
    background: #14191d;
    border-radius: 10px;

    .group-box-title {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 56px;
      padding: 15px 5px;
      cursor: pointer;
      border-top: 1px solid rgb(255 255 255 / 8%);
      border-bottom: 1px solid rgb(255 255 255 / 8%);

      .name {
        font-family: "Cindie Mono";
        font-size: 10px;
        color: #b0babf;
      }

      .icon {
        font-size: 12px;
        color: #b0babf;
      }
    }

    .group-box-content {
      max-height: 264px;
      padding: 15px 0;
      overflow-y: auto;

      .item {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        width: 100%;
        height: 37px;
        padding: 0 5px;
        margin-bottom: 2px;
        cursor: pointer;

        .icon {
          width: 28px;
          height: 28px;
          margin-right: 6px;
          border-radius: 50%;

          &.icon-img {
            @include flex-center;

            .icon-img-inner {
              width: 20px;
              height: 20px;
              border-radius: 50%;
            }
          }

          &.icon-letter,
          &.icon-no {
            font-size: 10px;
            font-weight: 900;
            text-transform: uppercase;
            background: #000;
            border-radius: 30px;

            @include flex-center;
          }
        }

        span {
          color: #5b6871;
        }

        &:hover {
          background: #000;
          border-radius: 30px;
        }

        &.active {
          background: #000;
          border-radius: 30px;

          span {
            font-weight: 600;
            color: #fff;
          }

          .icon-img,
          .icon-letter,
          .icon-no {
            background: #0038ff;
          }
        }
      }
    }
  }
}
</style>
