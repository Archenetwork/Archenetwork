/*
 * @Descripttion: local store
 * @Author: pujianguo
* @Date: 2022-05-22 02:04:06
 */
import { defineStore } from 'pinia'
import storage from 'utils/storage'

const useLocalStore = defineStore({
  id: 'local',
  state: () => ({
    network: {
      id: 0,
      name: 'NetError',
      icon: 'error',
    },
    userAddress: '',
    shortUserAddress: '',
  }),
  getters: {
  },
  actions: {
    setNetwork (payload) {
      this.$state.network = payload
    },
    setUserAddress (payload) {
      const short = payload ? `${payload.substr(0, 6)}...${payload.substr(-4)}` : ''
      this.$state.userAddress = payload
      this.$state.shortUserAddress = short
    },
  },

})

export const initLocalStore = () => {
  const instance = useLocalStore()
  // listen hooks
  instance.$subscribe((mutation, state) => {
    // save
    storage.setLocalStore(state)
  })
  // recover
  const re = storage.getLocalStore()
  if (re) {
    instance.$patch({
      ...re,
    })
  }
}

export default useLocalStore
