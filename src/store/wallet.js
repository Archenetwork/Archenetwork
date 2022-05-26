/*
 * @Descripttion: 状态管理
 */
import { defineStore } from 'pinia'
import { getShortAddress } from 'utils/func'
import storage from 'utils/storage'

const useWalletStore = defineStore({
  id: 'wallet',
  state: () => ({
    account: '',
    chainId: 0,
    walletType: null,
    isConnected: false,
    dialogVisible: false,
    selectChainId: 0,
  }),
  getters: {
    shortAccount (state) {
      return getShortAddress(state.account)
    },
  },
  actions: {
    setDialogVisible (payload) {
      this.$state.dialogVisible = payload
    },
    setAccount (payload) {
      this.$state.account = payload
    },
    setChainId (payload) {
      this.$state.chainId = payload
    },
    setSelectChainId (payload) {
      this.$state.selectChainId = payload
    },
    setWalletType (payload) {
      this.$state.walletType = payload
    },
    setConnect ({ account, chainId, walletType }) {
      this.$state.walletType = walletType
      this.$state.account = account
      this.$state.chainId = chainId
      this.$state.isConnected = true
    },
    setDisconnect () {
      this.$state.walletType = null
      this.$state.account = ''
      this.$state.chainId = 0
      this.$state.isConnected = false
    },
  },
})

export const initWalletStore = () => {
  const instance = useWalletStore()
  // listen hooks
  instance.$subscribe((mutation, state) => {
    // save
    storage.setWalletStore(state)
  })
  // recover
  const re = storage.getWalletStore()
  if (re) {
    instance.$patch({
      ...re,
    })
  }
}

export default useWalletStore
