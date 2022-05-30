<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { getCountdownObj } from 'utils/func'
import { bannerList } from './data'
import useCommonStore from 'store/common'
import { ElMessage } from 'element-plus'
import { rankData } from '@/mock/data/rank'

const commonStore = useCommonStore()
const userInfo = computed(() => {
  return commonStore.userInfo
})

const list = ref(bannerList.map(x => {
  x.countdown = parseInt(((new Date(x.endTime)).getTime() - (new Date()).getTime()) / 1000)
  x.countdownObj = getCountdownObj(x.countdown)
  return x
}))

let timer = null
const startInterval = () => {
  timer = setInterval(() => {
    list.value.forEach(x => {
      if (x.countdown > 0) {
        x.countdown--
        x.countdownObj = getCountdownObj(x.countdown)
      } else {
        // x.boxStatus = 3
      }
    })
  }, 1000)
}

const handleJoin = (item) => {
  const userInfo = commonStore.userInfo
  if (!userInfo) {
    ElMessage.error('Please Connect Wallet')
    return
  }
  const data = rankData[item.id]
  const home = userInfo.home || {}
  home[item.id] = data
  userInfo.home = home
  commonStore.setNewUserInfo(userInfo)

  // local
  const old = JSON.parse(localStorage.getItem('home') || '{}')
  // const userItem = old[userInfo.id] || {}
  old[userInfo.id] = home
  localStorage.setItem('home', JSON.stringify(old))
  ElMessage.success('Join Success')
}

onMounted(() => {
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
        <!-- <div class="btn">Join competition</div> -->
      </div>
    </div>
    <div class="content">
      <!-- <div>
          <img style="width: 30px;height: 30px;" :src="`/mock/avatar/${item}`" v-for="(item,i ) in avatarDb" alt="">
        </div> -->
      <div class="card" v-for="item in list" :key="item.id">
        <div class="card-header">
          <img class="logo" :src="item.logo" alt="">
          <div class="header-content">
            <div class="name">{{item.name}}</div>
            <div class="price">
              <!-- <img class="token-logo" :src="item.tokenLogo" alt="">-->
              Price Pool: ${{item.totalPrice}}
            </div>
          </div>
        </div>
        <div class="time-box">
          <div class="left">
            <span class="label">Ends in</span>
            <span class="time">
              <template v-if="item.countdownObj.d > 0">
                <span class="time-d">{{item.countdownObj.d}}</span>
                <span class="time-day">DAYS</span>
              </template>
              <span class="time-t">{{item.countdownObj.t}}</span>
            </span>
          </div>
          <div class="right">RANKLIST</div>
        </div>
        <div class="card-content">
          <div class="user-list">
            <div class="user-item" v-for="user in item.userList" :key="user.id">
              <div class="avatar-box">
                <img class="avatar" :src="user.avatar" alt="">
                <div class="text">
                  <span>{{user.level}}</span>
                  <span>$</span>
                  <span>{{user.scholar}}</span>
                </div>
              </div>
              <div class="content-box">
                <div class="content-box-hd">
                  <div class="name r-text-line-1">{{user.name}}</div>
                  <div class="scholar-box" v-if="user.scholarGuild">
                    <img class="logo" :src="user.scholarGuild" alt="">
                    <span>Scholar</span>
                  </div>
                </div>
                <div class="content-box-bd">
                  <div class="item item-earned">
                    <div class="label">Earned</div>
                    <div class="value">
                      <img class="token-logo" :src="item.tokenLogo" alt="">
                      <span class="token-name">{{item.tokenName}}</span>
                      <span>{{user.tokenEarned}}</span>
                    </div>
                  </div>
                  <div class="item item-roi">
                    <div class="label">ROI</div>
                    <div class="value">{{user.roi}}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <div class="me-box" v-if="userInfo && userInfo.home && userInfo.home[item.id]">
            <img class="avatar" :src="userInfo?.avatar || ''" alt="">
            <div class="r-width-100">
              <div class="name">{{userInfo?.username}}</div>
              <div class="text">
                <div class="item">
                  <span class="label">Rank &nbsp;</span>
                  <span class="value">{{userInfo.home[item.id].rank}}</span>
                </div>
                <div class="item">
                  <span class="label">Price &nbsp;</span>
                  <span class="value">{{userInfo.home[item.id].price}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="join-box" v-else>
            <div class="btn" @click="handleJoin(item)">Join competition</div>
            <div class="time-wrap">
              <span class="label">Ends in</span>
              <span class="time">
                <template v-if="item.countdownObj.d > 0">
                  <span class="time-d">{{item.countdownObj.d}}</span>
                  <span class="time-day">DAYS</span>
                </template>
                <span class="time-t">{{item.countdownObj.t}}</span>
              </span>
            </div>
          </div>
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
      position: relative;
      box-sizing: border-box;
      width: 386px; // 370 + 5+5+6
      height: 691px; // 675 + 16
      padding: 25px 31px 31px 25px;

      &:nth-child(1) {
        background: url("mock/game1/banner/bg_1.png") no-repeat top left / 100%;
      }

      &:nth-child(2) {
        background: url("mock/game1/banner/bg_2.png") no-repeat top left / 100%;
      }

      &:nth-child(3) {
        background: url("mock/game1/banner/bg_3.png") no-repeat top left / 100%;
      }

      .card-header {
        display: flex;
        align-items: flex-start;
        width: 100%;
        margin-bottom: 18px;

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
            position: relative;
            display: flex;
            align-items: center;
            height: 18px;
            padding-left: 18px;
            margin-bottom: 11px;

            &::before {
              position: absolute;
              top: 6px;
              left: 6px;
              width: 6px;
              height: 6px;
              content: "";
              background: #00ff47;
              border-radius: 3px;
            }

            .token-logo {
              width: 16px;
              height: 16px;
              margin-right: 5px;
              margin-left: 8px;
            }
          }
        }
      }

      .time-box {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 30px;
        background: #0038ff;
        border-radius: 20px;

        .left {
          display: flex;
          align-items: center;
          width: 230px;
          height: 30px;
          background: #000;
          border-radius: 20px;

          .label {
            padding: 0 14px;
            font-family: "PingFang SC";
            text-align: center;
          }

          .time {
            display: flex;
            align-items: center;
            height: 30px;
            padding: 0 16px;
            font-weight: 600;
            line-height: 30px;
            color: #f0b90b;
            text-align: center;

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

        .right {
          flex: 1;
          font-size: 12px;
          font-weight: 600;
          text-align: center;
          cursor: pointer;
        }
      }

      .card-content {
        .user-list {
          margin-top: 20px;

          .user-item {
            display: flex;
            align-items: center;
            width: 100%;
            height: 64px;
            margin-bottom: 20px;

            .avatar-box {
              position: relative;
              width: 64px;
              height: 64px;
              margin-right: 16px;

              .avatar {
                width: 64px;
                height: 64px;
                border-radius: 11px;
              }

              .text {
                position: absolute;
                bottom: 0;
                left: 0;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                width: 64px;
                height: 14px;
                padding: 0 3px;
                background: #000;
                border-radius: 7px;

                span {
                  &:nth-child(1) {
                    font-size: 12px;
                    font-style: italic;
                    font-weight: 700;
                    transform: scale(.9);
                  }

                  &:nth-child(2) {
                    margin-right: -1px;
                    margin-bottom: -2px;
                    font-size: 12px;
                    font-style: italic;
                    font-weight: 700;
                    color: #f0b90b;
                    transform: scale(.8);
                  }

                  &:nth-child(3) {
                    font-size: 12px;
                    font-style: italic;
                    font-weight: 700;
                    color: #f0b90b;
                  }
                }
              }
            }

            .content-box {
              flex: 1;

              .content-box-hd {
                display: flex;
                align-items: center;
                height: 24px;
                margin-bottom: 10px;

                .name {
                  font-size: 18px;
                  font-weight: 700;
                  line-height: 24px;
                }

                .scholar-box {
                  display: flex;
                  align-items: center;
                  width: 89px;
                  height: 20px;
                  padding: 0 5px;
                  margin-left: 10px;
                  cursor: pointer;
                  background: #f7df93;
                  border-radius: 4px;

                  .logo {
                    width: 16px;
                    height: 16px;
                    margin-right: 3px;
                  }

                  span {
                    flex: 1;
                    font-size: 12px;
                    font-weight: 700;
                    color: #e6a500;
                    text-align: center;
                    text-transform: uppercase;
                  }
                }
              }

              .content-box-bd {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .item {
                  display: flex;
                  align-items: center;

                  .label {
                    margin-right: 5px;
                    font-size: 12px;
                    opacity: .5;
                  }

                  .value{

                  }
                }

                .item-earned {
                  flex: 1;

                  .value {
                    display: flex;
                    align-items: center;

                    .token-logo {
                      width: 16px;
                      height: 16px;
                      margin-right: 5px;
                    }

                    .token-name {
                      margin-right: 5px;
                      font-weight: 600;
                    }
                  }
                }

                .item-roi {
                  width: 80px;

                  .value {
                    font-size: 18px;
                    font-weight: 600;
                    color: #f0b90b;
                    text-transform: capitalize;
                  }
                }
              }
            }
          }
        }
      }

      .card-footer {
        position: absolute;
        bottom: 11px;
        left: 5px;
        box-sizing: border-box;
        width: 370px;
        height: 100px;
        background: linear-gradient(180deg, rgb(47 56 63 / 20%) 0%, #2f383f 100%);
        border-radius: 0 0 30px 30px;
        box-shadow: 6px 6px 0 rgb(0 0 0 / 24%);

        .me-box {
          display: flex;
          align-items: center;
          padding: 18px 20px;

          .avatar {
            width: 64px;
            height: 64px;
            margin-right: 15px;
            border-radius: 11px;
          }

          .name {
            font-size: 18px;
            font-weight: 700;
            line-height: 24px;
          }

          .text {
            display: flex;
            flex: 1;
            align-items: center;

            .item {
              display: flex;
              flex: 1;
              align-items: center;
              font-size: 18px;
              font-weight: 700;

              .label {
                color: #f0b90b;
              }

              .value {
              }
            }
          }
        }

        .join-box {
          padding: 8px 20px 0;

          .btn {
            width: 100%;
            height: 40px;
            font-size: 18px;
            font-weight: 600;
            line-height: 40px;
            text-align: center;
            text-transform: uppercase;
            cursor: pointer;
            background: #0038ff;
            border-radius: 20px;
          }

          .time-wrap {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 273px;
            height: 30px;
            margin: 0 auto;
            background: rgb(0 0 0 / 14%);
            border-radius: 0 0 8px 8px;

            .label {
              padding: 0 14px;
              font-family: "PingFang SC";
              text-align: center;
            }

            .time {
              display: flex;
              align-items: center;
              height: 30px;
              padding: 0 16px;
              font-weight: 600;
              line-height: 30px;
              color: #f0b90b;
              text-align: center;

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
        }
      }
    }
  }
}
</style>
