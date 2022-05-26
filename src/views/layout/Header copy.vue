<script setup>
import { ElNotification, ElMessage, ElMessageBox } from 'element-plus'
import { requestAccounts, changeEthereumChainForPc } from 'api/ethereum'
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useLisaStore from 'store/lisa'
import useLocalStore from '@/store/local'

const localStore = useLocalStore()
const lisaStore = useLisaStore()
const router = useRouter()
const route = useRoute()

const networkList = ref([])
const networkListVisible = ref(false)
networkList.value = [
  { id: 3, icon: '', name: 'Ethereum Testnet' },
  { id: 97, icon: '', name: 'BSC Testnet' },
]
const currentNetwork = computed(() => {
  return localStore.network
})

const userAddress = computed(() => {
  return localStore.userAddress
})
const shortUserAddress = computed(() => {
  return localStore.shortUserAddress || 'Connect Wallet'
})
const connectWallet = () => {
  if (localStore.shortUserAddress) {
    return
  }
  requestAccounts().then(account => {
    localStore.setUserAddress(account)
  }).catch(err => {
    const message = err.message || 'Connect error.'
    ElNotification.warning({ title: 'Warning Info', message: message })
  })
}

const currentMenu = computed(() => {
  return route.name
})
const menuList = [
  { id: 1, name: 'Home', routerName: 'Home' },
  { id: 2, name: 'Players', routerName: 'Player' },
  { id: 3, name: 'Reviews', routerName: 'Review' },
]
const goPage = (name) => {
  if (currentMenu.value !== name) {
    currentMenu.value = name
    router.push({ name: name })
  }
}
</script>

<template>
  <div class="layout-header">
    <div class="header-content">
      <div class="header-left">
        <svg-img class="logo" name="logo" @click="goPage('Home')"></svg-img>
        <div class="menu-list">
          <div class="item" :class="{'item-active': currentMenu === item.routerName}" v-for="item in menuList" :key="item.id"
            @click="goPage(item.routerName)">{{item.name}}</div>
        </div>
      </div>
      <div class="header-right">
        <div class="me-item" @click="goPage('Me')">Me</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.layout-header {
  background: rgb(26 32 36 / 80%);
  box-shadow: 0 10px 20px rgb(0 0 0 / 25%);

  // backdrop-filter: blur(20px);

  .header-content {
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px;
    height: 100%;
    padding: 0 15px;
    margin: 0 auto;
  }

  .header-left {
    display: flex;
    align-items: center;
    height: 100%;

    .logo {
      width: 167px;
      height: 40px;
      margin-right: 20px;
      cursor: pointer;
    }

    .menu-list {
      display: flex;
      align-items: center;
      height: 100%;

      .item {
        height: 100%;
        padding: 0 16px;
        font-weight: 600;
        line-height: 60px;
        cursor: pointer;
      }

      .item-active {
        color: red;
      }
    }
  }

  .header-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .me-item {
      height: 100%;
      padding: 0 16px;
      line-height: 48px;
      cursor: pointer;
    }
  }
}

.language-list {
  .active {
    color: var(--el-color-primary);
  }
}
</style>
