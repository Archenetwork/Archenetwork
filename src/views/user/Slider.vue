<script setup>
import { nextTick, onMounted, ref } from 'vue'
import Swiper, { EffectCards, Navigation } from 'swiper'
import { useRoute } from 'vue-router'
import { getBadgeName } from '@/mock/data/medal'

const route = useRoute()

const item1 = {
  id: 1,
  gameLogo: '/mock/game1/1.png',
  gameName: 'Axie Infinity',
  startTime: '2021.10.13',
  bg: '/mock/game1/banner/mini_bg_1.png',
  roi: 114,
  investment: 6790,
  calmed: 14531,
  tokenLogo: '/mock/token/slp.png',
  tokenName: 'SLP',
  assets: ['/mock/asset/11.png', '/mock/asset/12.png', '/mock/asset/13.png'],
  badges: ['/mock/badge/18.png', '/mock/badge/17.png', '/mock/badge/13.png', '/mock/badge/16.png'],
  review: {
    avatar: '/mock/avatar/1.png',
    name: 'Maximo Yrysnk',
    likeCount: 887,
    desc: 'Axie Infinity is a Pokémon-inspired digital pet universe where anyone can earn tokens through skillful gameplay and contributions to the ecosystem. Players can fight, collect, grow and build a land kingdom for their pets. I think the only drawback is the few languages for users.',
  },
}
const item2 = {
  id: 2,
  gameLogo: '/mock/game1/2.png',
  gameName: 'Stepn',
  startTime: '2022.03.14',
  bg: '/mock/game1/banner/mini_bg_2.png',
  roi: 179,
  investment: 943,
  calmed: 2631,
  tokenName: 'GST',
  tokenLogo: '/mock/token/gst.webp',
  assets: ['/mock/asset/21.png', '/mock/asset/22.png', '/mock/asset/23.png'],
  badges: ['/mock/badge/21.png', '/mock/badge/22.png', '/mock/badge/26.png', '/mock/badge/28.png'],
  review: {
    avatar: '/mock/avatar/21.png',
    name: 'Guinox',
    likeCount: 887,
    desc: 'I start with Stepn because I heard it provide a decent earning, but since I have been running about a month my propose changed, now I realized that Stepn do help me living a healthy life, I don’t care about the earnings anymore, all I care about is did I run today. Why spend money in gym? You should try move to earn.',
  },
}
const item3 = {
  id: 3,
  gameLogo: '/mock/game1/3.png',
  gameName: 'Let me speak',
  startTime: '2022.03.20',
  bg: '/mock/game1/banner/mini_bg_3.png',
  roi: 97,
  investment: 8734,
  calmed: 17206,
  tokenName: 'LS',
  tokenLogo: '/mock/token/ls.png',
  assets: ['/mock/asset/31.png', '/mock/asset/32.png', '/mock/asset/33.png'],
  badges: ['/mock/badge/33.png', '/mock/badge/34.png', '/mock/badge/35.png', '/mock/badge/36.png'],
  review: {
    avatar: '/mock/avatar/13.png',
    name: 'Kustinski',
    likeCount: 887,
    desc: 'Well, when everything comes to x to earn, you got say is a good motivate to do x. Learning a language can be hard sometimes but reward with money and make it like a game, everyone would like to try.',
  },
}
const list = ref([item1, item2, item3])

let swiper = null
const initSwiper = () => {
  swiper = new Swiper('.user-banner-swiper .swiper-container', {
    modules: [EffectCards, Navigation],
    effect: 'cards',
    loop: true,
    grabCursor: true,
    cardsEffect: {
      rotate: false,
      slideShadows: true,
      transformEl: null,
    },
    navigation: {
      nextEl: '.user-banner-swiper .swiper-button-next',
      prevEl: '.user-banner-swiper .swiper-button-prev',
    },
  })
}

const getBadgeNameByLogo = (logo) => {
  return getBadgeName(logo)
}
onMounted(() => {
  const type = route.query.type
  let arr = [item1, item2, item3]
  if (type === '2') {
    const local = JSON.parse(localStorage.getItem('item') || '{}')
    if (local.text) {
      item2.review.desc = local.text
      item2.review.likeCount = local.likeCount
    }
    arr = [item2, item1, item3]
  } else if (type === '3') {
    arr = [item3, item1, item2]
  }
  list.value = arr
  nextTick(() => {
    initSwiper()
  })
})

</script>

<template>
  <div class="user-banner-swiper">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide swiper-slide-inner" v-for="item in list" :key="item.id">
          <div class="slider-left" :style="`background-image: url(${item.bg});`">
          </div>
          <div class="slider-right">
            <div class="base-info">
              <img class="logo" :src="item.gameLogo" alt="">
              <div class="text">
                <div class="name">{{item.gameName}}</div>
                <div class="since">play since {{item.startTime}}</div>
                <div class="since">roi {{item.roi}}%</div>
              </div>
            </div>
            <div class="line">
              <div class="item">
                <div class="label">investment</div>
                <div class="value-token">
                  <img class="logo" :src="item.tokenLogo" alt="">
                  <span class="span">{{item.tokenName}}</span>
                  <span>{{item.investment}}</span>
                </div>
              </div>
              <div class="item">
                <div class="label">Token claimed</div>
                <div class="value-token">
                  <img class="logo" :src="item.tokenLogo" alt="">
                  <span class="span">{{item.tokenName}}</span>
                  <span>{{item.calmed}}</span>
                </div>
              </div>
              <div class="item item-asset r-width-100">
                <div class="label">Game Assets</div>
                <div class="value-asset">
                  <img class="img" v-for="(item, i) in item.assets" :key="i" :src="item" alt="">
                </div>
              </div>
              <div class="item r-width-100">
                <div class="label">badges</div>
                <div class="value-badge">
                  <el-tooltip effect="dark" v-for="(item, i) in item.badges" :key="i" :content="getBadgeNameByLogo(item)" placement="top">
                    <div class="img-box" >
                      <div class="new" v-if="i === 0"><span>NEW</span></div>
                      <img class="img" :src="item" alt="">
                    </div>
                  </el-tooltip>
                </div>
              </div>
              <div class="item item-review r-width-100">
                <div class="label">MY Review</div>
                <div class="value-review">
                  {{item.review.desc}}
                </div>
              </div>
            </div>
            <div class="review-box">
              <!-- <img class="avatar" :src="item.review.avatar" alt="">
              <span class="name">{{item.review.name}}</span> -->
              <div></div>
              <svg-icon class="icon" name="follow"></svg-icon>
              <span class="count">{{item.review.likeCount}}</span>
            </div>
          </div>
        </div>
      </div>
      <svg-icon class="swiper-button-next" name="big_next"></svg-icon>
    </div>
  </div>
</template>

<style lang="scss">
.user-banner-swiper {
  width: 100%;
  height: 652px;
  overflow: hidden;

  .swiper-container {
    position: relative;
    width: 710px;
    height: 652px;

    .swiper-button-next {
      position: absolute;
      top: 50%;
      right: -45px;
      z-index: 9999;
      width: 75px;
      height: 75px;
      margin-top: -37px;
      cursor: pointer;

      &.swiper-button-disabled {
        pointer-events: none;
        cursor: auto;
        opacity: .35;
      }
    }

    .swiper-wrapper{
    }

    .swiper-slide {
      box-sizing: border-box;

      // width: 668px;
      // height: 618px;
      padding: 10px 0;

      .slider-left {
        position: absolute;
        top: 0;
        left: 0;
        box-sizing: border-box;
        width: 305px;
        height: 652px;
        filter: drop-shadow(6px 6px 0 rgb(0 0 0 / 24%));

        // background: url("/mock/game1/banner/mini_bg_1.png") no-repeat top left / 100%;
        background-repeat: no-repeat;
        background-position: top left;
        background-size: 100%;
        border: 4px solid #000;
        border-radius: 12px;
      }

      .slider-right {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 20px 20px 25px 320px;
        background: #3a3c42;
        border: 4px solid #000;
        border-radius: 12px;
        box-shadow: 6px 6px 0 rgb(0 0 0 / 24%);

        .base-info {
          display: flex;
          align-items: center;
          margin-bottom: 20px;

          .logo {
            width: 72px;
            height: 72px;
            margin-right: 18px;

            // border-radius: 5px;
          }

          .text {
            .name {
              margin-bottom: 6px;
              font-size: 24px;
              font-weight: 700;
              line-height: 30px;
            }

            .since {
              margin-bottom: 6px;
              font-size: 12px;
              line-height: 15px;
              text-transform: uppercase;
              opacity: .5;
            }
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
              font-size: 12px;
              font-weight: 700;
              text-transform: uppercase;
              list-style: 14px;
              opacity: .6;
            }

            .value-token {
              display: flex;
              align-items: center;
              height: 16px;

              .logo {
                width: 16px;
                height: 16px;
                margin-right: 5px;
              }

              .span {
                margin-right: 5px;
                font-weight: 600;
              }
            }

            .value-asset {
              display: flex;
              flex-wrap: wrap;
              align-items: center;

              .img {
                width: 72px;
                height: 72px;
                margin-right: 15px;
                cursor: pointer;
                border-radius: 10px;
              }
            }

            .value-badge {
              display: flex;
              flex-wrap: wrap;
              align-items: center;

              .img-box {
                position: relative;
                width: 72px;
                height: 72px;
                margin-right: 15px;
                cursor: pointer;

                .new {
                  position: absolute;
                  top: 0;
                  right: 0;
                  width: 28px;
                  height: 16px;
                  background: #f2271c;
                  border: 1px solid #1a2024;
                  border-radius: 8px;

                  @include flex-center;

                  span {
                    font-size: 12px;
                    font-style: italic;
                    font-weight: 900;
                    transform: scale(.7);
                  }
                }

                .img {
                  display: block;
                  width: 72px;
                  height: 72px;
                  object-fit: contain;
                }
              }
            }

            .value-review {
              height: 90px;

              // height: 144px;
              font-size: 12px;
              line-height: 18px;
              color: #b0babf;

              @include multi-line-ellipsis(5);
            }
          }

          .item-asset {
            margin-top: 20px;
          }

          .item-review {
            margin-bottom: 12px;
          }
        }

        .review-box {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          height: 50px;

          .avatar {
            width: 32px;
            height: 32px;
            margin-right: 5px;
            border-radius: 16px;
          }

          .name {
            flex: 1;
            font-weight: 700;
          }

          .icon {
            width: 14px;
            height: 12px;
            margin-right: 8px;
          }

          .count {
            font-size: 16px;
            font-weight: 600;
          }
        }
      }

      // &:nth-child(1) {
      //   .slider-left {
      //     background: url("/mock/game1/banner/mini_bg_1.png") no-repeat top left / 100%;
      //   }
      // }

      // &:nth-child(2) {
      //   .slider-left {
      //     background: url("/mock/game1/banner/mini_bg_2.png") no-repeat top left / 100%;
      //   }
      // }

      // &:nth-child(3) {
      //   .slider-left {
      //     background: url("/mock/game1/banner/mini_bg_3.png") no-repeat top left / 100%;
      //   }
      // }
    }
  }
}
</style>
