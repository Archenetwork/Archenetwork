/*
 * @Descripttion:
 * @Author: pujianguo
 * @Date: @Date: 2022-05-22 23:12:59
 */
import { defineStore } from 'pinia'

const useCommonStore = defineStore({
  id: 'common',
  state: () => ({
    userInfo: {
      id: '819020384',
      address: '0x818a7DBF224F2a3ECa8D8bfBd809e0549bF407EB',
      shortAddress: '0x81...07EB',
      tags: ['FPS', 'AVG', 'OPENWORLD'],
      name: 'Raul',
      rank: 66,
      price: 30,
      avatar: '/mock/avatar/20.png',
      gameCount: 99,
      averageRoi: 134,
      friendCount: 90,
      state: 'Open for schalorships',
      contact: '',
    },
  }),
  getters: {
  },
  actions: {
    setUserInfo (payload) {
      this.$state.userInfo = payload
    },
  },
})

export default useCommonStore
