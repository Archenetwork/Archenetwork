<script setup>
import { computed } from 'vue'
import useWalletStore from '@/store/wallet'
import useCommonStore from '@/store/common'
import { ElConfigProvider, ElMessage } from 'element-plus'
import en from 'element-plus/lib/locale/lang/en'
import RPreviewImage from 'components/dialog/RPreviewImage.vue'
import { connectMetamask, connectWalletConnect } from 'utils/wallet'
import { getUser, addUser } from 'api/http/user'

const commonStore = useCommonStore()
const walletStore = useWalletStore()

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
  let userInfo = await getUser(walletStore.account)
  if (userInfo.code !== 200) {
    await addUser({ walletAddress: walletStore.account })
    userInfo = await getUser(walletStore.account)
  }
  commonStore.setUserInfo(userInfo.data || null)
}
initWallet()

</script>

<template>
  <el-config-provider :locale="en">
    <router-view></router-view>
  </el-config-provider>

  <r-preview-image></r-preview-image>
</template>
