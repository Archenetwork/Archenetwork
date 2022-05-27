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
      name: 'Raul',
      rank: 66,
      price: 30,
      avatar: '/mock/avatar/20.png',
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
