<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import useCommonStore from 'store/common'
import Slider from './Slider.vue'
import { getBadgeName } from '@/mock/data/medal'
import { useRoute } from 'vue-router'
const getBadgeNameByLogo = (logo) => {
  return getBadgeName(logo)
}
const commonStore = useCommonStore()
const route = useRoute()

const userInfo = ref({})
const userInfo1 = ref({
  name: '0xpi314',
  id: '159265358',
  address: '0x818a7DBF224F2a3ECa8D8bfBd809e0549bF407EB',
  shortAddress: '0x818a...07EB',
  tags: ['MOBA', 'EDU', 'SPG'],
  rank: 66,
  price: 30,
  avatar: '/mock/avatar/20.png',
  gameCount: 14,
  averageRoi: 147,
  friendCount: 7,
  state: 'Just chilling',
  wishList: ['/mock/game/13.webp', '/mock/game/14.webp', '/mock/game/15.webp'],
  badges: ['/mock/badge/11.png', '/mock/badge/27.png',
    '/mock/badge/24.png', '/mock/badge/36.png',
    '/mock/badge/31.png', '/mock/badge/18.png'],
})

const btnName = computed(() => {
  return route.query.type ? 'ADD' : 'EDIT'
})
const commonUserInfo = computed(() => {
  return commonStore.userInfo || {}
})

const initData = () => {
  const local = JSON.parse(localStorage.getItem('item') || '{}')
  userInfo.value = {
    ...commonUserInfo.value,
    ...local,
  }
}

onMounted(() => {
  initData()
})
onUnmounted(() => {
  localStorage.removeItem('item')
})

</script>

<template>
  <div class="a-container">
    <div class="user-banner">
      <div class="banner-left">
        <div class="base-info" v-if="userInfo">
          <img class="avatar" :src="userInfo.avatar" alt="">
          <div class="text">
            <div class="name">{{userInfo.name}}</div>
            <div class="id">UID {{userInfo.uid}}</div>
            <div class="address-box">
              <svg-icon class="icon" name="wallet"></svg-icon>
              <span>{{userInfo.shortAddress}}</span>
              <svg-icon class="icon-down" name="arrow_down2"></svg-icon>
            </div>
          </div>
        </div>
        <div class="tags" v-if="userInfo">
          <div class="tag" v-for="(tag, i) in userInfo.tags" :key="i">{{tag}}</div>
        </div>
        <div class="line" v-if="userInfo">
          <div class="item">
            <span class="label">My games</span>
            <span class="value-number">{{userInfo.gameCount}}</span>
          </div>
          <div class="item">
            <span class="label">Average ROI</span>
            <span class="value-number">{{userInfo.averageRoi}}%</span>
          </div>
          <div class="item">
            <span class="label">MY Friends</span>
            <span class="value-number">{{userInfo.friendCount}}</span>
          </div>
          <div class="item">
            <span class="label">States</span>
            <span class="value-state">{{userInfo.state}}</span>
          </div>
          <div class="item r-width-100">
            <span class="label">Contact</span>
            <div class="value-contact">
              <svg-icon class="icon" name="contact-twitter"></svg-icon>
              <svg-icon class="icon" name="contact-email"></svg-icon>
              <svg-icon class="icon" name="contact-discord"></svg-icon>
            </div>
          </div>
          <div class="item r-width-100">
            <span class="label">My wish list</span>
            <div class="value-wish">
              <img class="img" v-for="(item, i) in userInfo.wishList" :key="i" :src="item" alt="">
            </div>
          </div>
          <div class="item r-width-100">
            <span class="label">Badges</span>
            <div class="value-badge">
              <el-tooltip effect="dark" v-for="(item, i) in userInfo.badges" :key="i" :content="getBadgeNameByLogo(item)" placement="top">
                <img class="img" :src="item" alt="">
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
      <div class="banner-right">
        <div class="title">
          <div class="left">
            <svg-img class="title-img" name="text_favorite"></svg-img>
            <div class="title-text">GAMES</div>
          </div>
          <div class="right">
            <div class="btn">{{btnName}}</div>
          </div>
        </div>
        <slider></slider>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.user-banner {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 1170px;
  height: 891px;
  padding: 35px;
  margin-bottom: 100px;
  background: rgb(0 0 0 / 28%);
  border: 5px solid #000;
  border-radius: 29px;
  box-shadow: 6px 6px 0 rgb(0 0 0 / 24%);

  .banner-left {
    width: 290px;
    height: 100%;
    margin-right: 26px;

    .base-info {
      display: flex;
      align-items: center;
      width: 100%;
      height: 88px;
      margin-bottom: 16px;

      .avatar {
        width: 80px;
        height: 80px;
        margin-right: 12px;
        border: 1px solid #957851;
        border-radius: 12.8px;
        box-shadow: 0 0 0 3px #000;
      }

      .text {
        .name {
          margin-bottom: 6px;
          font-size: 20px;
          font-weight: 700;
          line-height: 24px;
        }

        .id {
          margin-bottom: 6px;
          font-size: 15px;
          font-weight: 700;
          line-height: 18px;
          color: #0ff;
        }

        .address-box {
          display: flex;
          align-items: center;
          height: 28px;

          .icon {
            width: 28px;
            height: 28px;
            margin-right: 10px;
          }

          span {
            font-size: 12px;
            font-weight: 600;
          }

          .icon-down {
            width: 7px;
            height: 5px;
            margin-left: 10px;
          }
        }
      }
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      height: 60px;

      .tag {
        height: 24px;
        padding: 0 8px;
        margin-right: 6px;
        margin-bottom: 6px;
        font-size: 12px;
        font-weight: 600;
        line-height: 24px;
        background: #303940;
        border-radius: 12px;
      }
    }

    .line {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      width: 100%;

      .item {
        display: flex;
        flex-direction: column;
        width: 50%;
        margin-bottom: 20px;

        .label {
          margin-bottom: 10px;
          font-weight: 700;
          text-transform: uppercase;
          opacity: .6;
        }

        .value-number {
          font-size: 36px;
          font-weight: 700;
        }

        .value-state {
          font-size: 18px;
          font-weight: 700;
          line-height: 24px;
          text-transform: uppercase;
        }

        .value-contact {
          display: flex;
          align-items: center;

          .icon {
            width: 40px;
            height: 40px;
            margin-right: 8px;
            cursor: pointer;
          }
        }

        .value-wish {
          display: flex;
          flex-wrap: wrap;
          align-items: center;

          .img {
            width: 72px;
            height: 72px;
            margin-right: 20px;
            margin-bottom: 24px;
            cursor: pointer;
            border-radius: 10px;
          }
        }

        .value-badge {
          display: flex;
          flex-wrap: wrap;
          align-items: center;

          .img {
            width: 72px;
            height: 72px;
            margin-right: 20px;
            margin-bottom: 24px;
            cursor: pointer;
            object-fit: contain;
          }
        }
      }
    }
  }

  .banner-right {
    flex: 1;
    height: 100%;

    .title {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 80px;

      .left {
        .title-img {
          width: 157px;
          height: 22px;
        }

        .title-text {
          height: 58px;
          padding-left: 20px;
          font-family: "Cindie Mono";
          font-size: 36px;
          line-height: 58px;
        }
      }

      .right {
        .btn {
          width: 128px;
          height: 40px;
          font-weight: 600;
          line-height: 40px;
          text-align: center;
          cursor: pointer;
          background: #0038ff;
          border-radius: 20px;
        }
      }
    }

    .slider {

    }
  }
}
</style>
