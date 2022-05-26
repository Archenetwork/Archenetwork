<script setup>
import { computed, ref } from 'vue'
import { getWindowNetwork, getUserAddress } from 'api/ethereum'
import useLocalStore from '@/store/local'
import useWalletStore from '@/store/wallet'
import { ElConfigProvider, ElMessage } from 'element-plus'
import en from 'element-plus/lib/locale/lang/en'
import RPreviewImage from 'components/dialog/RPreviewImage.vue'
import { connectMetamask, connectWalletConnect } from 'utils/wallet'

const localStore = useLocalStore()
const walletStore = useWalletStore()

const initAsyncData1 = async () => {
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
}
getNetworkList()

const walletType = computed(() => {
  return walletStore.walletType
})
const initWallet = async () => {
  if (!walletType.value) {
    // walletStore.setDialogVisible(true)
    return
  }
  const chainId = walletStore.chainId
  walletStore.setSelectChainId(chainId)
  if (walletType.value === 1) {
    await connectMetamask(chainId, true)
  } else if (walletType.value === 2) {
    if (chainId === 0) {
      ElMessage.warning('Please select network!')
      return
    }
    await connectWalletConnect(chainId, true)
  }
}
initWallet()

</script>

<template>
  <el-config-provider :locale="en">
    <router-view></router-view>
  </el-config-provider>

  <r-preview-image></r-preview-image>
</template>
