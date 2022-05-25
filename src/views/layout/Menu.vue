<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useLisaStore from 'store/lisa'
import { getMenuList } from '@/router'

const route = useRoute()
const router = useRouter()
const lisaStore = useLisaStore()

onMounted(() => {
  const oneLevelMenuName = activeMenu.value.split('_')[0]
  menu.value.forEach(x => {
    if (x.name === oneLevelMenuName) {
      x.isOpen = true
    }
  })
})
const menuCollapsed = computed(() => {
  return lisaStore.menuCollapsed
})

const menu = ref(getMenuList())
const activeMenu = computed(() => {
  return route.name
})
// console.log('getMenuList', getMenuList())
// console.log('activeMenu', activeMenu.value)

const handleChangeMenu = (item) => {
  if (item.children) {
    if (item.isOpen) {
      item.isOpen = false
    } else {
      menu.value.forEach(x => {
        if (x.isOpen) {
          x.isOpen = false
        }
      })
      item.isOpen = true
    }
  } else {
    router.push({ name: item.name })
  }
}
const handleChangeSubmenu = (submenuItem, item) => {
  if (item) {
    handleChangeMenu(item)
  }
  router.push({ name: submenuItem.name })
}

</script>

<template>
  <div class="layout-menu" :class="{'layout-menu_collapsed': menuCollapsed}">
    <div class="logo-wrap">
      <svg-img class="logo" name="logo"></svg-img>
      <span class="text">ARCHE ADMIN</span>
    </div>
    <ul class="menu-wrap" v-if="!menuCollapsed">
      <template v-for="item in menu" :key="item.name">
        <li class="menu-item" :class="item.isOpen ? 'menu-item_opened' : 'menu-item_closed'">
          <div class="menu-item-title"
            :class="{
              'menu-item-title_active': item.name === activeMenu,
              'menu-item-title_chlidren-selected': activeMenu.startsWith(item.name)
            }"
            @click="handleChangeMenu(item)">
            <svg-icon class="menu-item-title-icon" :name="item.icon"></svg-icon>
            <span class="menu-item-title-label">{{$t(item.title)}}</span>
            <i class="iconfont icon-down menu-item-title-down-icon" v-if="item.children"></i>
          </div>
          <template v-if="item.children">
            <ul class="submenu-wrap" :style="`height: ${item.children.length * 40}px;`">
              <li v-for="submenuItem in item.children" :key="submenuItem.name"
                class="submenu-item" :class="{'submenu-item_active': activeMenu.startsWith(submenuItem.name)}"
                @click="handleChangeSubmenu(submenuItem)">
                <svg-icon class="submenu-item-icon" name="menu-dian"></svg-icon>
                <span class="submenu-item-label">{{$t(submenuItem.title)}}</span>
              </li>
            </ul>
          </template>
        </li>
      </template>
    </ul>
    <ul class="menu-wrap_collapsed" v-else>
      <template v-for="item in menu" :key="item.name">
        <el-tooltip v-if="!item.children" effect="dark" :content="$t('item.title')" placement="right">
          <li class="menu-item" :class="item.isOpen ? 'menu-item_opened' : 'menu-item_closed'">
            <div class="menu-item-title"
              :class="{
                'menu-item-title_active': item.name === activeMenu,
                'menu-item-title_chlidren-selected': activeMenu.startsWith(item.name)
              }"
              @click="handleChangeMenu(item)">
              <svg-icon class="menu-item-title-icon" :name="item.icon"></svg-icon>
            </div>
          </li>
        </el-tooltip>
        <el-popover v-else
          :show-arrow="false"
          placement="right-start"
          trigger="hover"
          popper-class="submenu-wrap_collapsed"
        >
          <template #reference>
            <li class="menu-item" :class="item.isOpen ? 'menu-item_opened' : 'menu-item_closed'">
              <div class="menu-item-title"
                :class="{
                  'menu-item-title_active': item.name === activeMenu,
                  'menu-item-title_chlidren-selected': activeMenu.startsWith(item.name)
                }"
                @click="handleChangeMenu(item)">
                <svg-icon class="menu-item-title-icon" :name="item.icon"></svg-icon>
              </div>
            </li>
          </template>
          <ul class="submenu-wrap">
            <li v-for="submenuItem in item.children" :key="submenuItem.name"
              class="submenu-item" :class="{'submenu-item_active': submenuItem.name === activeMenu}"
              @click="handleChangeSubmenu(submenuItem, item)">
              <svg-icon class="submenu-item-icon" name="menu-dian"></svg-icon>
              <span class="submenu-item-label">{{$t(submenuItem.title)}}</span>
            </li>
          </ul>
        </el-popover>
        <!-- <a-popover v-else placement="rightTop" overlayClassName="submenu-wrap_collapsed"> -->
      </template>
    </ul>
  </div>
</template>

<style lang="scss">
$color-primary: rgb(9 96 189);
$menu-bg: #001529;
$menu-text-color: #ffffffb3;
$menu-active-bg: $color-primary;
$menu-active-text-color: #fff;
$submenu-bg: #0c2135;
$submenu-text-color: #ffffffb3;
$submenu-active-bg: $color-primary;
$submenu-active-text-color: #fff;

.layout-menu {
  display: flex;
  flex-direction: column;
  width: 210px;
  overflow: hidden;
  font-size: 14px;
  color: $menu-text-color;
  background: $menu-bg;
  transition: all .2s ease 0s;

  .logo-wrap {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 48px;
    padding: 0 8px;
    overflow: hidden;
    word-break: break-all;

    .logo {
      width: 41px;
      height: 32px;
    }

    .text {
      height: 20px;
      margin-left: 8px;
      overflow: hidden;
      font-size: 16px;
      font-weight: 700;
      line-height: 20px;
      color: #fff;
      transition: all .5s;
    }
  }

  .menu-wrap {
    flex: 1;
    height: 0;
    overflow: auto;

    .menu-item {
      &-title {
        display: flex;
        align-items: center;
        height: 48px;
        padding: 0 16px;
        cursor: pointer;
        transition: all .3s;

        &-icon {
          font-size: 16px;
        }

        &-label {
          flex: 1;
          margin-left: 8px;
          font-weight: 600;

          @include ellipsis;
        }

        &-down-icon {
          font-size: 10px;
          transition: transform .2s cubic-bezier(.645, .045, .355, 1);
        }

        &:hover {
          color: $menu-active-text-color;
        }

        &_active {
          color: $menu-active-text-color;
          background: $menu-active-bg;
        }

        &_chlidren-selected {
          color: $menu-active-text-color;
        }
      }

      .submenu-wrap {
        width: 100%;
        overflow: hidden;
        color: $submenu-text-color;
        background: $submenu-bg;
        transition: all .2s;

        .submenu-item {
          box-sizing: border-box;
          display: flex;
          align-items: center;
          width: 100%;
          height: 40px;
          padding: 0 16px 0 32px;
          cursor: pointer;
          transition: all .3s;

          &-icon {
            font-size: 14px;
          }

          &-label {
            margin-left: 4px;
            font-weight: 600;

            @include ellipsis;
          }

          &:hover {
            color: $submenu-active-text-color;
          }

          &_active {
            color: $submenu-active-text-color;
            background: $submenu-active-bg;
          }
        }
      }

      &_opened {
        .menu-item-title-down-icon {
          transform: rotate(180deg);
        }
      }

      &_closed {
        .submenu-wrap {
          height: 0 !important;
        }
      }
    }
  }

  .menu-wrap_collapsed {
    flex: 1;
    height: 0;
    overflow: auto;

    .menu-item {
      &-title {
        display: flex;
        align-items: center;
        height: 45px;
        padding: 0 16px 0 13px;
        font-weight: 600;
        cursor: pointer;
        border-left: 3px solid transparent;
        transition: all .3s;

        &-icon {
          font-size: 16px;
        }

        &-down-icon {
          font-size: 10px;
          transition: transform .2s cubic-bezier(.645, .045, .355, 1);
        }

        &:hover {
          color: $menu-active-text-color;
        }

        &_active {
          color: $menu-active-text-color;
          border-color: $menu-active-bg;
        }

        &_chlidren-selected {
          color: $menu-active-text-color;
          border-color: $menu-active-bg;
        }
      }
    }
  }
}

.layout-menu_collapsed {
  width: 48px;

  .logo-wrap {
    .text {
      width: 0;
    }
  }
}

.submenu-wrap_collapsed {
  width: 200px !important;
  padding: 0 !important;
  overflow: hidden;
  color: $submenu-text-color !important;
  background: $submenu-bg !important;
  border: 0 !important;

  .submenu-wrap {
    .submenu-item {
      display: flex;
      align-items: center;
      height: 45px;
      padding: 0 24px;
      cursor: pointer;
      transition: all .3s;

      &-label {
        margin-left: 4px;
        font-weight: 600;

        @include ellipsis;
      }

      &-icon {
        font-size: 16px;
      }

      &:hover {
        color: $submenu-active-text-color;
      }

      &_active {
        color: $submenu-active-text-color;
        background: $submenu-active-bg;
      }
    }
  }
}
</style>
