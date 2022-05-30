/*
 * @Descripttion:
 * @Author: pujianguo
 * @Date: @Date: 2022-05-22 23:12:59
 */
import { defineStore } from 'pinia'
import { getShortAddress } from 'utils/func'

const useCommonStore = defineStore({
  id: 'common',
  state: () => ({
    // userInfo: {
    //   id: '819020384',
    //   address: '0x818a7DBF224F2a3ECa8D8bfBd809e0549bF407EB',
    //   shortAddress: '0x81...07EB',
    //   tags: ['FPS', 'AVG', 'OPENWORLD'],
    //   name: 'Raul',
    //   rank: 66,
    //   price: 30,
    //   avatar: '/mock/avatar/20.png',
    //   gameCount: 99,
    //   averageRoi: 134,
    //   friendCount: 90,
    //   state: 'Open for schalorships',
    //   contact: '',
    // },
    userInfo: null,
  }),
  getters: {
  },
  actions: {
    setUserInfo1 (payload) {
      this.$state.userInfo = payload
    },
    setNewUserInfo (payload) {
      this.$state.userInfo = payload
    },
    setUserInfo (payload) {
      if (!payload) {
        this.$state.userInfo = null
        return
      }

      // local
      const old = JSON.parse(localStorage.getItem('home') || '{}')
      const home = old[payload.id]

      this.$state.userInfo = {
        id: payload.id,
        avatar: payload.avatar || '/images/avatar.png',
        medalLogo: payload.medalLogo || '',
        medalId: payload.medalId || '',
        currentExperience: payload.currentExperience,
        nexLevelExperience: payload.nexLevelExperience,
        progress: (payload.currentExperience / payload.nexLevelExperience) * 100 + '%',
        archeId: payload.archeId,
        bio: payload.bio,
        createTime: payload.createTime,
        deleteTime: payload.deleteTime,
        email: payload.email,
        levelId: payload.levelId,
        levelName: payload.levelName,
        registerIp: payload.registerIp,
        registerSource: payload.registerSource,
        registerTime: payload.registerTime,
        social: payload.social,
        status: payload.status,
        updateTime: payload.updateTime,
        username: payload.username,
        walletAddress: payload.walletAddress,
        discord: payload.discord,
        telegram: payload.telegram,
        twitter: payload.twitter,
        home: home,

        rank: 66,
        price: 30,
        uid: '159265358',
        shortAddress: getShortAddress(payload.walletAddress),
        tags: ['MOBA', 'EDU', 'SPG'],
        gameCount: 14,
        averageRoi: 147,
        friendCount: 7,
        state: 'Just chilling',
        wishList: ['/mock/game/13.webp', '/mock/game/14.webp', '/mock/game/15.webp'],
        badges: ['/mock/badge/11.png', '/mock/badge/27.png',
          '/mock/badge/24.png', '/mock/badge/36.png',
          '/mock/badge/31.png', '/mock/badge/18.png'],
      }
    },
  },
})

export default useCommonStore
