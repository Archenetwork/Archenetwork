<script setup>
import { onMounted, ref } from 'vue'
import Swiper, { EffectCards, Navigation } from 'swiper'

const list = ref([
  {
    id: 1,
    gameLogo: '/mock/game1/1.png',
    gameName: 'Axie Infinity',
    startTime: '2021.10.13',
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
  },
  {
    id: 2,
    gameLogo: '/mock/game1/2.png',
    gameName: 'Stepn',
    startTime: '2022.03.14',
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
  },
  {
    id: 3,
    gameLogo: '/mock/game1/3.png',
    gameName: 'Let me speak',
    startTime: '2022.03.20',
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
  },
])

let swiper = null
const initSwiper = () => {
  swiper = new Swiper('.user-banner-swiper .swiper-container', {
    modules: [EffectCards, Navigation],
    effect: 'cards',
    spaceBetween: 30,
    // loop: true,
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
onMounted(() => {
  initSwiper()
})
</script>

<template>
  <div class="user-banner-swiper">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide swiper-slide-inner" v-for="item in list" :key="item.id">
          <div class="slider-left">
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
                  <div class="img-box" v-for="(item, i) in item.badges" :key="i">
                    <div class="new" v-if="i === 0"><span>NEW</span></div>
                    <img class="img" :src="item" alt="">
                  </div>
                </div>
              </div>
              <div class="item item-review r-width-100">
                <div class="label">MY Review</div>
                <div class="value-review r-text-line-5">
                  {{item.review.desc}}
                </div>
              </div>
            </div>
            <div class="review-box">
              <img class="avatar" :src="item.review.avatar" alt="">
              <span class="name">{{item.review.name}}</span>
              <svg-icon class="icon" name="follow"></svg-icon>
              <span class="count">{{item.review.likeCount}}</span>
            </div>
          </div>
        </div>
      </div>
      <svg-icon class="swiper-button-next" name="next"></svg-icon>
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
        width: 305px;
        height: 652px;
        background: url("/mock/game1/banner/mini_bg_1.png") no-repeat top left / 100%;

        // box-sizing: border-box;
        // width: 291px;
        // height: 638px;
        // background: rgb(0 0 0 / 30%);

        // // background: url(HQ Banner.jpg);
        // filter: drop-shadow(6px 6px 0 rgb(0 0 0 / 24%));
        // border: 4px solid #000;
        // border-radius: 12px;
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
              font-size: 12px;
              line-height: 18px;
              color: #b0babf;
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
    }
  }
}
</style>
