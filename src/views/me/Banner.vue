<script setup>
import { ref } from 'vue'
import Slider from './Slider.vue'

const userInfo = ref({
  id: '819020384',
  address: '0x818a7DBF224F2a3ECa8D8bfBd809e0549bF407EB',
  shortAddress: '0x818a...07EB',
  tags: ['FPS', 'AVG', 'OPENWORLD'],
  name: 'Raul',
  rank: 66,
  price: 30,
  avatar: '/mock/avatar/20.png',
  gameCount: 99,
  averageRoi: 134,
  friendCount: 90,
  state: 'Open for schalorships',
  wishList: ['/mock/game1/1.png', '/mock/game1/2.png', '/mock/game1/3.png'],
  badges: ['/mock/badge/11.png', '/mock/badge/27.png',
    '/mock/badge/24.png', '/mock/badge/36.png',
    '/mock/badge/31.png', '/mock/badge/18.png'],
})

const item = {
  id: 1,
  gameLogo: '/mock/game1/1.png',
  gameName: 'Axie Infinity',
  startTime: '2022.05.22',
  roi: 98,
  investment: 57,
  star: 45626,
  tokenLogo: '/mock/token/slp.png',
  assets: ['/mock/asset/1.png', '/mock/asset/1.png', '/mock/asset/1.png'],
  badges: ['/mock/badge/18.png', '/mock/badge/17.png', '/mock/badge/13.png', '/mock/badge/36.png'],
  review: {
    avatar: '/mock/avatar/1.png',
    name: 'Maximo Yrysnk',
    likeCount: 887,
    desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.",
  },
}
</script>

<template>
  <div class="a-container">
    <div class="me-banner">
      <div class="banner-left">
        <div class="base-info">
          <img class="avatar" :src="userInfo.avatar" alt="">
          <div class="text">
            <div class="name">{{userInfo.name}}</div>
            <div class="id">UID {{userInfo.id}}</div>
            <div class="address-box">
              <svg-icon class="icon" name="wallet"></svg-icon>
              <span>{{userInfo.shortAddress}}</span>
              <svg-icon class="icon-down" name="arrow_down2"></svg-icon>
            </div>
          </div>
        </div>
        <div class="tags">
          <div class="tag" v-for="(tag, i) in userInfo.tags" :key="i">{{tag}}</div>
        </div>
        <div class="line">
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
              <img class="img" v-for="(item, i) in userInfo.badges" :key="i" :src="item" alt="">
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
            <div class="btn">EDIT</div>
          </div>
        </div>
        <slider></slider>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.me-banner {
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
