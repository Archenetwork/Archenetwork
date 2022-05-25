/*
 * @Descripttion:
 * @Author: pujianguo
 * @Date: @Date: 2022-05-22 23:12:59
 */
import { defineStore } from 'pinia'
import storage from 'utils/storage'
import { getLanguage } from 'utils/func'

const useLisaStore = defineStore({
  id: 'lisa',
  state: () => ({
    token: '',
    userInfo: {},
    menuCollapsed: false,
    pageOption: {},
    language: '',
    pageSize: 10,
  }),
  getters: {
    // total (state) {
    //   const counter = useCounterStore()
    //   return counter.number * state.money
    // },
  },
  actions: {
    setPageSize (payload) {
      this.$state.pageSize = payload
    },
    setLanguage (payload) {
      this.$state.language = payload
      window.location.reload()
    },
    setLogin ({ token, ...user }) {
      this.$state.token = token
      this.$state.userInfo = user
    },
    setLogout () {
      this.$state.token = ''
      this.$state.userInfo = {}
    },
    // set menu collapsed
    setMenuCollapsed (payload) {
      this.$state.menuCollapsed = payload
    },
    setPageOption ({ routerName, data, isPage }) {
      let option = this.$state.pageOption[routerName] ? this.$state.pageOption[routerName] : {}
      if (isPage) {
        option = data
      } else {
        option = Object.assign({}, option, data)
      }
      this.$state.pageOption[routerName] = option
    },
    clearPageOption (routerName) {
      delete this.$state.pageOption[routerName]
    },
  },

})

export const initLisaStore = () => {
  const instance = useLisaStore()
  // listen hooks
  instance.$subscribe((mutation, state) => {
    // save
    storage.setLisaStore(state)
  })
  // recover
  const re = storage.getLisaStore()
  if (re) {
    instance.$patch({
      ...re,
    })
  } else {
    instance.$patch({
      language: getLanguage(),
    })
  }
}

export default useLisaStore
