<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { getCountdownObj } from 'utils/func'
import { bannerList } from './data'

const list = bannerList

const countdownObj = ref({
  d: 0,
  t: '',
})
const endTime = '2022-06-10'
let startTime = 0
let timer = null
const startInterval = () => {
  countdownObj.value = getCountdownObj(startTime)
  timer = setInterval(() => {
    startTime--
    if (startTime === 0) {
      clearInterval(timer)
    } else {
      countdownObj.value = getCountdownObj(startTime)
    }
  }, 1000)
}

onMounted(() => {
  startTime = parseInt(((new Date(endTime)).getTime() - (new Date()).getTime()) / 1000)
  startInterval()
})
onUnmounted(() => {
  clearInterval(timer)
})

</script>

<template>
  <div class="a-container home-banner">
    <div class="header">
      <div class="left">
        <span>Season 1</span>P2E billboard
      </div>
      <div class="right">
        <div class="time-box">
          <span class="label">Ends in</span>
          <span class="time">
            <template v-if="countdownObj.d > 0">
              <span class="time-d">{{countdownObj.d}}</span>
              <span class="time-day">DAYS</span>
            </template>
            <span class="time-t">{{countdownObj.t}}</span>
          </span>
        </div>
        <div class="btn">Join competition</div>
      </div>
    </div>
    <div class="content">
      <div class="card" v-for="item in list" :key="item.id">
        <div class="card-header">
          <img class="logo" :src="item.logo" alt="">
          <div class="header-content">
            <div class="name">{{item.name}}</div>
            <div class="price">Total price pool: ${{item.totalPrice}}</div>
            <div class="tags">
              <span class="tag-item" v-for="(tag, i) in item.tags" :key="i">{{tag}}</span>
            </div>
          </div>
        </div>
        <div class="card-content">
          <!-- <div class="level"><span>L{{userInfo.levelName}}</span></div> -->

        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.home-banner {
  margin-bottom: 120px !important;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 53px;
    margin-top: 34px;

    .left {
      font-size: 44px;
      font-weight: 700;

      span {
        margin-right: 15px;
        color: #0ff;
      }
    }

    .right {
      display: flex;
      align-items: center;

      .time-box {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        height: 40px;
        background: #303940;
        border-radius: 20px;

        .label {
          padding: 0 30px;
          font-family: "PingFang SC";
          font-size: 18px;
          text-align: center;
        }

        .time {
          display: flex;
          align-items: center;
          height: 40px;
          padding: 0 16px;
          font-weight: 600;
          line-height: 40px;
          color: #f0b90b;
          text-align: center;
          background: #000;
          border-radius: 20px;

          .time-day {
            margin-top: 5px;
            font-size: 12px;
            transform: scale(.7);
          }

          .time-t {
            display: inline-block;
            width: 65px;
            text-align: left;
          }
        }
      }

      .btn {
        box-sizing: border-box;
        height: 40px;
        padding: 0 15px;
        margin-left: 20px;
        font-size: 16px;
        font-weight: 600;
        line-height: 40px;
        cursor: pointer;
        background: #0038ff;
        border-radius: 20px;
      }
    }
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 50px;

    .card {
      box-sizing: border-box;
      width: 384px; // 370 + 14
      height: 625px; // 605 + 6+14
      padding: 26px 34px 34px 26px;

      &:nth-child(1) {
        background: url("mock/game/banner/bg_1.png") no-repeat top left / 100%;
      }

      &:nth-child(2) {
        background: url("mock/game/banner/bg_2.png") no-repeat top left / 100%;
      }

      &:nth-child(3) {
        background: url("mock/game/banner/bg_3.png") no-repeat top left / 100%;
      }

      .card-header {
        display: flex;
        align-items: flex-start;
        width: 100%;
        height: 116px;

        .logo {
          width: 72px;
          height: 72px;
          margin-right: 12px;
        }

        .header-content {
          display: flex;
          flex: 1;
          flex-direction: column;

          .name {
            margin-bottom: 8px;
            font-size: 24px;
            font-weight: 700;
          }

          .price {
            margin-bottom: 11px;
            line-height: 17px;
          }

          .tags {
            display: flex;
            flex-wrap: wrap;
            align-items: center;

            .tag-item {
              display: block;
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
        }
      }

      .card-content {
        .user-card {
          width: 100%;
          height: 60px;
          margin-bottom: 32px;

          .avatar-box {
            position: relative;
            width: 60px;
            height: 60px;

            .avatar {
              width: 60px;
              height: 60px;
              border-radius: 30px;
            }

            .level {
              position: absolute;
              top: -6px;
              right: -3px;
              width: 34px;
              height: 28px;

              @include flex-center;

              &::before {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 1;
                width: 34px;
                height: 28px;
                clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
                content: "";
                background: #3b384e;
              }

              &::after {
                position: absolute;
                bottom: -4px;
                left: 0;
                width: 34px;
                height: 28px;
                clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
                content: "";
                background: rgb(46 46 76 / 20%);
              }

              span {
                z-index: 1;
                font-style: italic;
                font-weight: 900;
              }
            }
          }

          .content-box{

          }
        }
      }
    }
  }
}
</style>
