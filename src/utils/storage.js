/*
 * @Descripttion: localStorage
 * @Author: pujianguo
 * @Date: 2022-05-22 00:11:40
 */

const LOCAL_STORE = 'local-store'
const LISA_STORE = 'lisa-store'
const WALLET_STORE = 'wallet-store'

export default {
  // setLocalStore
  setLocalStore: payload => {
    window.localStorage.setItem(LOCAL_STORE, JSON.stringify(payload))
  },
  getLocalStore: () => {
    const res = window.localStorage.getItem(LOCAL_STORE)
    return res ? JSON.parse(res) : null
  },
  rmLocalStore: () => {
    window.localStorage.removeItem(LOCAL_STORE)
  },

  // setLisaStore
  setLisaStore: payload => {
    window.localStorage.setItem(LISA_STORE, JSON.stringify(payload))
  },
  getLisaStore: () => {
    const res = window.localStorage.getItem(LISA_STORE)
    return res ? JSON.parse(res) : null
  },
  rmLisaStore: () => {
    window.localStorage.removeItem(LISA_STORE)
  },

  // wallet
  setWalletStore: payload => {
    window.localStorage.setItem(WALLET_STORE, JSON.stringify(payload))
  },
  getWalletStore: () => {
    const res = window.localStorage.getItem(WALLET_STORE)
    return res ? JSON.parse(res) : null
  },
  rmWalletStore: () => {
    window.localStorage.removeItem(WALLET_STORE)
  },
}
