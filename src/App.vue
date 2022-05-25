<script setup>
import { ref, computed } from 'vue'
import { getWindowNetwork, getUserAddress } from 'api/ethereum'
import { hexToNumber } from 'api/ethers/utils'
import useLocalStore from '@/store/local'

import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import useLisaStore from 'store/lisa'
import RPreviewImage from 'components/dialog/RPreviewImage.vue'

const lisaStore = useLisaStore()
const locale = computed(() => {
  return lisaStore.language === 'zh' ? zhCn : en
})

const localStore = useLocalStore()

const initAsyncData = async () => {
  // select network
  const windowNetworkId = await getWindowNetwork()
  setCurrentNetworkById(windowNetworkId)

  // select account
  const userAddress = await getUserAddress()
  localStore.setUserAddress(userAddress)
}

const setCurrentNetworkById = windowId => {
  const currentNetworkId = localStore.network.id
  if (windowId !== currentNetworkId) {
    let item = networkList.value.find(x => x.id === windowId)
    if (!item) {
      item = { id: 0, name: 'NetError', icon: 'error' }
    }
    localStore.setNetwork(item)
  }
}
const networkList = ref([])
const getNetworkList = () => {
  networkList.value = [
    { id: 3, icon: '', name: 'Ethereum Testnet' },
    { id: 97, icon: '', name: 'BSC Testnet' },
  ]
  initAsyncData()
}
getNetworkList()

// listener ethereum event
window.ethereum.on('chainChanged', chainId => {
  const id = hexToNumber(chainId)
  setCurrentNetworkById(id)
  // window.location.reload()
})
window.ethereum.on('accountsChanged', ([account]) => {
  localStore.setUserAddress(account)
  // window.location.reload()
})

</script>

<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>

  <r-preview-image></r-preview-image>
</template>
