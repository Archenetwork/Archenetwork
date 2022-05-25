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

const handleChangeCollapsed = () => {
  lisaStore.setMenuCollapsed(!lisaStore.menuCollapsed)
}


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

</script>

<template>
  <div class="layout-header">
    <div class="header-left">
      <div class="menu-collapsed" @click="handleChangeCollapsed">
        <i :class="['iconfont', lisaStore.menuCollapsed ? 'icon-outdent' : 'icon-indent']" ></i>
      </div>
    </div>
    <div class="header-right">
      <div class="nav-item" v-show="showWallet">
        <div class="content">
          <el-button size="small" :type="!userAddress ? 'danger' : 'primary'" @click="connectWallet">{{shortUserAddress}}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.layout-header {
  display: flex;
  justify-content: space-between;

  .header-left {
    height: 100%;

    .menu-collapsed {
      width: 36px;
      height: 100%;
      cursor: pointer;

      @include flex-center;

      .iconfont {
        font-size: 18px;
      }

      &:hover {
        background: rgb(246 246 246);
      }
    }
  }

  .header-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .nav-item {
      height: 100%;
      color: rgb(96 98 102);
      cursor: pointer;

      @include flex-center;

      .el-dropdown--small {
        height: 100%;
      }

      .content {
        height: 100%;
        padding: 0 10px;

        @include flex-center;

        .userinfo-avatar {
          width: 24px;
          height: 24px;
          margin-right: 8px;
        }

        .userinfo-name {
          margin-right: 4px;
        }
      }

      &:hover {
        background: rgb(246 246 246);
      }
    }
  }
}

.language-list {
  .active {
    color: var(--el-color-primary);
  }
}
</style>
