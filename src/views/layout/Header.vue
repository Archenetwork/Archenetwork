<script setup>
import { computed, watch, onMounted, ref } from 'vue'
import { checkInstallMetamask } from '@/utils/func'
// import useLocalStore from '@/store/local'
import useWalletStore from '@/store/wallet'
import { ElConfigProvider, ElMessage, ElNotification } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { throttle, getChainList } from 'utils/func'
import { connectMetamask, connectWalletConnect, switchChain } from 'utils/wallet'

// import { getUser, addUser } from 'api/http/user'

const router = useRouter()
const route = useRoute()

const walletStore = useWalletStore()
// const localStore = useLocalStore()
// const commonStore = useCommonStore()
// const userInfo = computed(() => {
//   return commonStore.userInfo
// })

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
const handleChangeWalletVisible = (val) => {
  walletVisible.value = val
}
const handleClickOutWallet = (el) => {
  if (el.event.isTrusted) {
    walletVisible.value = false
  }
}
const handleChangeWallet = async (item) => {
  if (item.walletType !== walletType.value) {
    try {
      const chainId = walletStore.selectChainId

      if (item.id === 1) {
        await connectMetamask()
      } else if (item.id === 2) {
        if (chainId === 0) {
          ElMessage.warning('Please select network!')
          return
        }
        await connectWalletConnect(chainId)
      }
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
            <!-- <div class="user-avatar">
              <img :src="userInfo.avatar" alt="">
            </div> -->
            <div class="user-name r-text-line-1">{{walletStore.shortAccount}}</div>
            <div class="arrow">
              <svg-icon class="arrow" name="arrow_down"></svg-icon>
            </div>
          </div>
          <!--connect Popup -->
          <r-popup v-model="walletVisible" :top="55" :width="280">
            <template #top>CONNECT WALLET</template>
            <template #center>
              <div class="item" :class="{'active': item.id === walletType}" v-for="item in walletList" :key="item.id" @click="handleChangeWallet(item)">
                <svg-icon class="item-icon" :name="item.icon + (item.id === walletType ? '-selected' : '')"></svg-icon>
                <div class="item-name">{{item.name}}</div>
              </div>
            </template>
            <template #bottom>I don’t have a wallet</template>
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
            max-width: 75px;
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

          .item-name{

          }
        }

        .active {
          background: #1a2024;
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
