<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import config from '@/config'
import buttonCommon from 'components/tmp/common.vue'
import userInfoBox from 'components/tmp/userInfo.vue'
import { getTwitterLink, bindTwitter, disconnectTwitter, disconnectDiscord, bindDiscord, bindTelegram } from 'api/http/social'
import { useRoute, useRouter } from 'vue-router'
import useCommonStore from '@/store/common'

const commonStore = useCommonStore()
const route = useRoute()
const router = useRouter()

const userInfo = computed(() => {
  return commonStore.userInfo
})

const setSocialStatus = () => {
  if (userInfo.value) {
    if (userInfo.value.twitter) {
      socialList.value[0].connected = true
    }
    if (userInfo.value.discord) {
      socialList.value[1].connected = true
    }
    // if (userInfo.value.telegram) {
    //   socialList.value[2].connected = true
    //   document.querySelector('#telegram-login-Arche_Network_bot') && document.querySelector('#telegram-login-Arche_Network_bot').remove()
    // }
  }
}

watch(() => userInfo.value, (newValue) => {
  setSocialStatus()
}, { immediate: true })
// socialList
const socialList = ref([
  { title: 'Twitter', name: 'twitter', icon: 'social-twitter', connected: false },
  { title: 'Discord', name: 'discord', icon: 'social-discord', connected: false },
  // { title: 'Telegram', name: 'telegram', icon: 'social-telegram', connected: false },
])

const twitterLoading = ref(false)
const discordLoading = ref(false)
const handleConnect = (item) => {
  if (!item.connected) {
    if (item.title === 'Twitter') {
      if (twitterLoading.value) return
      twitterLoading.value = true
      connectTwitter()
    } else if (item.title === 'Discord') {
      if (discordLoading.value) return
      discordLoading.value = true
      connectDiscord()
    }
  } else {
    if (item.title === 'Twitter') {
      if (twitterLoading.value) return
      handleTwitterDisconnect()
    } else if (item.title === 'Discord') {
      if (discordLoading.value) return
      handleDiscordDisconnect()
    }
  }
}
const getRedirectUri = (path) => {
  return encodeURIComponent(window.location.origin + path)
}

const connectDiscord = () => {
  const url = `https://discord.com/api/oauth2/authorize?client_id=${config.discordClientId}&redirect_uri=${getRedirectUri('/account/setting')}&response_type=code&scope=identify`
  window.location.href = url
}
const connectTwitter = () => {
  getTwitterLink().then(res => {
    window.location.href = res.result
  })
}

const initTwitter = (code) => {
  const data = {
    id: userInfo.value.id,
    code: code,
  }
  bindTwitter(data).then(res => {
    reloadPage()
    console.log('bind twitter success')
  }).catch(_ => {
    console.log('bind twitter error:', _)
  })
}
const initDiscord = (code) => {
  const data = {
    id: userInfo.value.id,
    code: code,
  }
  bindDiscord(data).then(res => {
    reloadPage()
    console.log('bind discord success')
  }).catch(_ => {
    console.log('bind discord error:', _)
  })
}
const initTelegram = (query) => {
  query.photo_url = decodeURIComponent(query.photo_url)
  const telegramInfo = JSON.stringify(query)
  const data = {
    id: userInfo.value.id,
    telegram: telegramInfo,
  }
  bindTelegram(data).then(res => {
    reloadPage()
    console.log('bind telegram success')
  }).catch(_ => {
    console.log('bind telegram error:', _)
  })
}

const handleTwitterDisconnect = () => {
  twitterLoading.value = true
  disconnectTwitter(userInfo.value.id).then(res => {
    socialList.value[0].connected = false
  }).finally(_ => {
    twitterLoading.value = false
  })
}
const handleDiscordDisconnect = () => {
  discordLoading.value = true
  disconnectDiscord(userInfo.value.id).then(res => {
    socialList.value[1].connected = false
  }).finally(_ => {
    discordLoading.value = false
  })
}

const reloadPage = async () => {
  await commonStore.refreshUserInfo()
  setSocialStatus()
  router.push({ query: {} })
}
const initRouter = () => {
  const { query } = route
  if (query.state && query.code) {
    initTwitter(query.code)
    return
  }
  if (query.code) {
    initDiscord(query.code)
    return
  }
  if (query.first_name && query.id) {
    initTelegram(query)
  }
}

onMounted(() => {
  initRouter()
  setSocialStatus()
})
</script>

<template>
  <div class="a-container account-setting-page">
    <div class="content">
      <!-- left -->
      <div class="left">
        <user-info-box></user-info-box>
      </div>
      <!-- line -->
      <div class="line"></div>
      <!-- right -->
      <div class="right">
        <div class="a-page-title-small">
          <div class="a-page-title-small-name">Social media</div>
        </div>
        <div class="social-list">
          <div class="social-item" :class="[item.name, item.connected ? 'connected' : '']" v-for="(item,index) in socialList" :key="index">
            <div class="left-content">
              <svg-icon class="svg-icon" :name="item.icon"></svg-icon>
              <div class="title">{{item.title}}</div>
            </div>
            <div class="right-content">
              <component v-if="item.name === 'telegram' && !item.connected" :is="'script'" src="https://telegram.org/js/telegram-widget.js?2" data-telegram-login="Arche_Network_bot" data-size="large" data-auth-url="https://g-alpha.arche.network/account/setting"></component>
              <button-common v-else class="connect-btn" simple :loading="(item.name === 'twitter' && twitterLoading) || item.name === 'discord' && discordLoading" :actived="item.connected" @click="handleConnect(item)">{{item.connected ? 'Connected' : 'Connect'}}</button-common>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.account-setting-page {
  padding: 60px 80px  0 !important;

  .content {
    display: flex;
    justify-content: space-between;

    .left,
    .right {
      flex: 1;
    }

    .left {
      display: flex;
      flex-direction: column;

      .avatar {
        .a-page-title-small {
          margin-top: 0 !important;
        }

        .imgUpload {
          display: flex;
          align-items: center;

          .chooseFile {
            margin-left: 15px;
          }
        }
      }

      .username {
        .id {
          font-size: 14px;
          font-style: normal;
          font-weight: normal;
          line-height: 17px;
          color: #5b6871;
          letter-spacing: .02em;
        }
      }
    }

    .line {
      box-sizing: border-box;
      width: 1px;
      height: 602px;
      margin: 0 30px;
      background-color: #fff;
      mix-blend-mode: normal;
      opacity: .16;
    }

    .right {
      .a-page-title-small {
        margin-top: 0 !important;
      }

      .social-list {
        display: flex;
        flex-direction: column;

        .social-item {
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 370px;
          height: 54px;
          padding: 19px 7px 19px 20px;
          background: #303940;
          border-radius: 100px;

          .left-content {
            display: flex;
            flex: 1;

            .title {
              margin-left: 10px;
            }
          }

          .right-content {
            display: flex;
            align-items: center;

            .connect-btn {
              width: 105px;
            }

            #telegram-login-Arche_Network_bot {
              width: 105px;
              height: 40px;
            }
          }
        }

        .connected {
          .connect-btn {
            color: #5b6871;
            background: #fff !important;
          }

          &.twitter {
            background: #0038ff;
          }

          &.discord {
            background: #6100ff;
          }

          &.telegram {
            background: #00c04d;
          }
        }

        .social-item + .social-item {
          margin-top: 15px;
        }
      }
    }
  }
}

</style>
