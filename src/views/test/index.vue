<script setup>
import { mint } from 'api/ethers/archeDid'
// import { mint } from 'api/ethers/arche'
import useWalletStore from 'store/wallet'

const walletStore = useWalletStore()

const handleMint = async () => {
  const res = await mint(walletStore.account, '1')
  console.log('res', res)
}
</script>

<template>

  <div class="test">
    <el-button @click="handleMint">test</el-button>
  </div>
</template>

<style lang="scss">
.test{

}
</style>
