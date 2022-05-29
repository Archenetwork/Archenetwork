<script setup>
import { computed, onMounted, ref } from 'vue'
import useClipboard from 'vue-clipboard3'
import useWalletStore from '@/store/wallet'
import useCommonStore from '@/store/common'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { throttle, getChainList } from 'utils/func'
import { connectMetamask, connectWalletConnect, switchChain } from 'utils/wallet'
import { getUser, addUser } from 'api/http/user'

// import { getUser, addUser } from 'api/http/user'

const router = useRouter()
const route = useRoute()

const walletStore = useWalletStore()
const commonStore = useCommonStore()

const userInfo = computed(() => {
  return commonStore.userInfo
})

const menuList = [
  { id: 1, name: 'HOME', routerName: 'Home' },
  { id: 2, name: 'PLAYERS', routerName: 'Player' },
  { id: 3, name: 'REVIEWS', routerName: 'Review' },
]

const showHeader = ref(true)
const showHeaderBg = ref(false)
const showHeaderMini = ref(false)
const prevTop = ref(0)
const handleScroll = throttle(function () {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  if (scrollTop > 100) {
    showHeaderBg.value = true
    showHeaderMini.value = true
  } else {
    showHeaderBg.value = false
    showHeaderMini.value = false
  }
  const isDown = scrollTop - prevTop.value > 0
  if (!isDown || scrollTop < 300) {
    if (!showHeader.value) {
      showHeader.value = true
    }
  } else {
    if (showHeader.value) {
      showHeader.value = false
      closeAllPopup()
    }
  }
  prevTop.value = scrollTop
}, 200)

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

const currentMenu = computed(() => {
  return route.name
})
const goPage = (name) => {
  if (currentMenu.value !== name) {
    currentMenu.value = name
    router.push({ name: name })
    closeAllPopup()
  }
}

const walletList = ref([
  { id: 1, name: 'Metamask', icon: 'wallet-metamask' },
  { id: 2, name: 'WalletConnect', icon: 'wallet-walletConnect' },
  // { id: 3, name: 'Coinbase Wallet', icon: 'wallet-coinbase' },
])
const walletVisible = ref(false)
const walletType = computed(() => {
  return walletStore.walletType
})
const account = computed(() => {
  return walletStore.account
})
const isLogin = ref(false)
const handleChangeWalletVisible = (val) => {
  if (val) {
    isLogin.value = !!walletStore.account
  }
  walletVisible.value = val
}
const handleClickOutWallet = (el) => {
  if (el.event.isTrusted) {
    walletVisible.value = false
  }
}
const handleChangeWallet = async (item) => {
  if (item.id !== walletType.value) {
    try {
      const chainId = walletStore.selectChainId
      if (item.id === 1) {
        await connectMetamask(chainId)
      } else if (item.id === 2) {
        if (chainId === 0) {
          ElMessage.warning('Please select network!')
          return
        }
        await connectWalletConnect(chainId)
      }
      let userInfo = await getUser(walletStore.account)
      if (userInfo.code !== 200) {
        await addUser({ walletAddress: walletStore.account })
        userInfo = await getUser(walletStore.account)
      }
      commonStore.setUserInfo(userInfo.data || null)
    } catch (err) {
      console.log('connect wallet error:', err)
    }
  }
}

const networkList = getChainList()
const currentNetwork = computed(() => {
  const id = walletStore.selectChainId
  if (id > 0) {
    return networkList.find(x => x.chainId === id)
  } else {
    return { chainId: 0, chainName: '', showName: 'NetError', icon: 'error' }
  }
})
const networkVisible = ref(false)
const handleChangeNetworkVisible = (val) => {
  networkVisible.value = val
}
const handleClickOutNetwork = (el) => {
  if (el.event.isTrusted) {
    networkVisible.value = false
  }
}
const handleChangeNetwork = async (id) => {
  if (!walletType.value) {
    walletStore.setSelectChainId(id)
  } else {
    try {
      await switchChain(id)
      walletStore.setSelectChainId(id)
      handleChangeNetworkVisible(false)
    } catch (err) {
    }
  }
}

const closeAllPopup = () => {
  walletVisible.value = false
  networkVisible.value = false
}

const { toClipboard } = useClipboard()
const handleCopy = () => {
  toClipboard(walletStore.account).then(res => {
    ElMessage.success('Copy Success')
  })
}

const accountMenuList = ref([
  { icon: 'account-menu-user', routerName: 'User', name: 'User Center' },
  { icon: 'account-menu-medal', routerName: 'Medal', name: 'My Medals' },
  { icon: 'account-menu-game', routerName: 'Game', name: 'My Games' },
  { icon: 'account-menu-setting', routerName: 'Setting', name: 'Setting' },
])

const handleLogout = async () => {
  walletVisible.value = false
  if (window.walletInstance) {
    await window.walletInstance.disconnect()
  }
  if (['User', 'Medal', 'Game', 'Setting'].includes(currentMenu.value)) {
    window.location.href = '/'
  } else {
    window.location.reload()
  }
}
</script>

<template>
  <div class="layout-header" :class="{'layout-header_hidden': !showHeader,
    'layout-header_bg': showHeaderBg,
    'layout-header-mini': showHeaderMini,
    }">
    <div class="header-content">
      <div class="header-left">
        <!-- logo -->
        <svg-img class="logo-alpha" name="logo_alpha" @click="goPage('Home')"></svg-img>
        <!-- menu -->
        <div class="menu">
          <div class="menu-item" v-for="item in menuList" :key="item.id" @click.stop="goPage(item.routerName)" :class="{'active': item.routerName === currentMenu}">
            <span class="menu-title">{{item.name}}</span>
          </div>
        </div>
      </div>
      <div class="header-right">

        <!-- wallet -->
        <div class="wallet-wrap" v-clickout="handleClickOutWallet">
          <div class="wallet-address" @click="handleChangeWalletVisible(true)" v-if="!account">
            Connect Wallet
          </div>
          <!-- userInfo -->
          <div class="user-info" v-else @click="handleChangeWalletVisible(true)">
            <div class="user-avatar" v-if="userInfo">
              <img :src="userInfo?.avatar" alt="">
            </div>
            <div class="user-name r-text-line-1">{{walletStore.shortAccount}}</div>
            <div class="arrow">
              <svg-icon class="arrow" name="arrow_down"></svg-icon>
            </div>
          </div>
          <!--connect Popup -->
          <r-popup v-model="walletVisible" :top="55" :width="280" :closeTop="true">
            <template #top>
              <span v-if="!isLogin">CONNECT WALLET</span>
              <div v-else class="user-box">
                <div class="avatar">
                  <img class="img" :src="userInfo?.avatar" alt="">
                  <div class="level">L{{userInfo?.levelName}}</div>
                </div>
                <div class="info">
                  <span class="name">{{userInfo?.username}}</span>
                  <div class="address" @click="handleCopy">
                    <span>{{walletStore.shortAccount}}</span>
                    <svg-icon class="copy" name="copy"></svg-icon>
                  </div>
                </div>
              </div>
            </template>
            <template #center>
              <template v-if="!isLogin">
                <div class="item" :class="{'active': item.id === walletType}" v-for="item in walletList" :key="item.id" @click="handleChangeWallet(item)">
                  <svg-icon class="item-icon" :name="item.icon + (item.id === walletType ? '-selected' : '')"></svg-icon>
                  <div class="item-name">{{item.name}}</div>
                </div>
              </template>
              <div v-else>
                <div class="item item-menu" :class="{'active': item.routerName === currentMenu}" v-for="item in accountMenuList" :key="item.id" @click="goPage(item.routerName)">
                  <svg-icon class="item-icon" :name="item.icon + (item.routerName === currentMenu ? '-selected' : '')"></svg-icon>
                  <div class="item-name">{{item.name}}</div>
                </div>
              </div>
            </template>
            <template #bottom>
              <span v-if="!isLogin">I don’t have a wallet</span>
              <div v-else class="bottom-box">
                <div class="logout-btn" @click="handleLogout">Log out</div>
              </div>
            </template>
          </r-popup>
        </div>

        <!-- network -->
        <div class="network-wrap" v-clickout="handleClickOutNetwork">
          <div class="network" @click="handleChangeNetworkVisible(true)">
            <svg-icon class="icon" :class="{'error': currentNetwork.chainId === 0}" :name="'network-'+currentNetwork.icon"></svg-icon>
            <span class="text">{{currentNetwork.showName}}</span>
            <svg-icon class="arrow" name="arrow_down"></svg-icon>
          </div>
          <r-popup v-model="networkVisible" :top="55">
            <template #top>NETWORK</template>
            <template #center>
              <div class="item" :class="{'active': item.chainId === currentNetwork.chainId}" v-for="(item,index) in networkList" :key="index" @click="handleChangeNetwork(item.chainId)">
                <svg-icon class="item-icon" :name="'network-'+item.icon" alt=""/>
                <div class="item-name">{{item.showName}}</div>
              </div>
            </template>
          </r-popup>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.layout-header {
  top: 0;
  left: 0;
  box-sizing: border-box;
  flex-shrink: 0;
  width: 100%;
  transition: all .3s ease 0s;

  &.layout-header-mini {
    height: 60px;
  }

  &.layout-header_bg {
    background: rgb(26 32 36 / 80%);
    box-shadow: 0 10px 20px rgb(0 0 0 / 25%);
    backdrop-filter: blur(20px);
  }

  &.layout-header_hidden {
    top: -100px;
  }

  .header-content {
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px;
    height: 100%;
    padding: 0 15px;
    margin: 0 auto;

    .header-left {
      display: flex;
      align-items: center;

      .logo-alpha {
        width: 209px;
        height: 52px;
        margin-right: 40px;
        cursor: pointer;
      }

      .menu {
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-end;

        .menu-item {
          position: relative;
          height: 25px;
          margin-right: 15px;
          line-height: 25px;
          cursor: pointer;

          &::before {
            position: absolute;
            bottom: -20px;
            left: 0;
            z-index: 10;
            width: 100%;
            height: 21px;
            content: "";
          }

          .menu-title {
            font-weight: 600;
          }

          &.active {
            border-bottom: 1px solid #fff;
          }

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }

    .header-right {
      display: flex;
      align-items: center;
      margin-left: 15px;

      .message {
        position: relative;

        .clear {
          margin-left: 10px;
          font-family: Inter;
          font-size: 12px;
          font-style: normal;
          font-weight: 600;
          color: #0ff;
          text-transform: none;
          cursor: pointer;
        }

        .Popup {
          .message-item {
            margin-top: 15px;
            cursor: pointer;

            .message-title {
              display: flex;
              align-items: center;

              .img-wrap {
                position: relative;

                img {
                  width: 16px;
                  height: 16px;
                }

                .isRead {
                  position: absolute;
                  top: 0;
                  right: 0;
                  width: 6px;
                  height: 6px;
                  background: #f2271c;
                  border-radius: 50%;
                }
              }

              .name {
                margin-left: 6px;
                font-size: 18px;
                font-style: normal;
                font-weight: 600;
                line-height: 22px;
                letter-spacing: .02em;
              }
            }

            .message-content {
              margin: 10px 0;
              font-size: 14px;
              font-style: normal;
              font-weight: normal;
              letter-spacing: .02em;
              word-wrap: break-word;
            }

            .message-time {
              padding-bottom: 10px;
              font-size: 14px;
              font-style: normal;
              font-weight: normal;
              line-height: 17px;
              color: rgba($color: #fff, $alpha: 50%);
              border-bottom: 1px solid rgba($color: #fff, $alpha: 16%);
            }
          }
        }

        .bell-box {
          position: relative;
          width: 32px;
          height: 32px;
          cursor: pointer;

          .icon {
            width: 32px;
            height: 32px;
          }

          .count {
            position: absolute;
            top: -2px;
            left: 14px;
            box-sizing: border-box;
            min-width: 20px;
            height: 20px;
            padding: 0 4px;
            font-size: 12px;
            font-weight: 700;
            line-height: 16px;
            text-align: center;
            background: #f2271c;
            border: 2px solid var(--bg-color);
            border-radius: 10px;
          }
        }
      }

      .wallet-wrap {
        position: relative;

        .wallet-address {
          box-sizing: border-box;
          display: flex;
          align-items: center;
          height: 40px;
          padding: 0 15px;
          margin-left: 15px;
          font-weight: 600;
          cursor: pointer;
          background: #0038ff;
          border-radius: 20px;
        }

        .user-info {
          display: flex;
          align-items: center;

          // width: 151px;
          height: 40px;

          // margin: 0 15px;
          margin-left: 15px;
          font-weight: 600;
          cursor: pointer;
          background: #000;
          border-radius: 20px;

          .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;

            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              object-fit: cover;
            }
          }

          .user-name {
            max-width: 95px;
            margin-left: 6px;
          }

          .arrow {
            width: 20px;
            height: 20px;
            margin-right: 10px;
            margin-left: 2px;
          }
        }

        .item {
          box-sizing: border-box;
          display: flex;
          align-items: center;
          height: 36px;
          padding: 5px;
          margin-bottom: 15px;
          cursor: pointer;
          border: 1px solid #1a2024;
          border-radius: 18px;

          &:last-child {
            margin-bottom: 0;
          }

          .item-icon {
            width: 27px;
            height: 27px;
            margin-right: 10px;
          }

          .item-name {
          }
        }

        .item-menu {
          color: #5b6871;
          border: 0;

          &:hover {
            color: #fff;
            background: #1a2024;
          }
        }

        .active {
          font-weight: 600;
          color: #fff;
          background: #1a2024;
        }

        .user-box {
          display: flex;
          align-items: center;

          .avatar {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 76px;
            height: 76px;
            background-color: #fff;
            border-radius: 50%;

            .img {
              width: 64px;
              height: 64px;
              margin-right: 0 !important;
              border: 1px solid #957851;
              border-radius: 50%;
              object-fit: cover;
              box-shadow: 0 1px 2px 1px rgb(0 0 0 / 40%) inset;
            }

            .level {
              position: absolute;
              top: 10px;
              right: 0;
              box-sizing: border-box;
              width: 40px;
              padding: 5px;
              clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
              font-family: Inter;
              font-size: 14px;
              font-style: italic;
              font-weight: 900;
              color: #fff;
              text-align: center;
              background-color: #3b384e;
              transform: translate(15%, -50%);
            }
          }

          .info {
            margin-left: 10px;

            .name {
              font-family: Inter;
              font-size: 24px;
              font-style: normal;
              font-weight: bold;
              line-height: 29px;
              color: #fff;
            }

            .address {
              display: flex;
              align-items: center;
              margin-top: 6px;
              font-family: Inter;
              font-size: 12px;
              font-weight: bold;
              line-height: 15px;
              color: #0038ff;
              cursor: pointer;

              .copy {
                margin-left: 10px;
              }
            }
          }
        }

        .bottom-box {
          padding-top: 20px;
          border-top: 1px solid rgb(255 255 255 / 16%);

          .logout-btn {
            box-sizing: border-box;
            width: 100%;
            height: 40px;
            font-size: 14px;
            font-weight: 600;
            line-height: 38px;
            color: #fff;
            text-align: center;
            cursor: pointer;
            border: 1px solid #fff;
            border-radius: 20px;
          }
        }
      }

      .network-wrap {
        position: relative;

        .item {
          box-sizing: border-box;
          display: flex;
          align-items: center;
          height: 36px;
          padding: 5px;
          margin-bottom: 15px;
          cursor: pointer;
          border: 1px solid #1a2024;
          border-radius: 18px;

          &:last-child {
            margin-bottom: 0;
          }

          .item-icon {
            width: 27px;
            height: 27px;
            margin-right: 10px;
          }

          .item-name{

          }
        }

        .active {
          background: #1a2024;
        }
      }

      .network {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        height: 40px;
        padding: 8px;
        margin-left: 15px;
        cursor: pointer;
        border: 1px solid #fff;
        border-radius: 20px;

        .icon {
          width: 16px;
          height: 16px;
          margin: 4px;

          &.error {
            width: 24px;
            height: 24px;
            margin: 0;
          }
        }

        .text {
          margin: 0 2px;
          font-weight: 600;
        }

        .arrow {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}

</style>
