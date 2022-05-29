<template>
  <div class="a-container account-game-page">
    <div class="a-page-title">
      <div class="a-page-title-name">My Games</div>
      <div class="a-page-title-right">
        <a-switch @click="sortChange" v-model="sortType"></a-switch>
      </div>
    </div>
    <div class="games-card-wrap" v-loading="getListLoading">
      <div class="games-item" v-for="(item,index) in list" :key="index">
        <div class="games">
          <games-card-title :list="item" @on-cancel="cancelCollect"></games-card-title>
        </div>
        <div class="category-box">
          <div class="hd">
            <div class="hd-left">
              Game’s Assets
            </div>
            <div class="hd-right">
              <svg-icon :class="'icon swiper-button-prev swiper-button-prev-'+index" name="prev"></svg-icon>
              <svg-icon :class="'icon swiper-button-next swiper-button-next-'+index" name="next"></svg-icon>
            </div>
          </div>
          <div class="bd">
            <div :class="'swiper-container swiper-container-'+index">
              <div class="'swiper-wrapper swiper-wrapper">
                <div class="'swiper-slide swiper-slide" v-for="(swiper, si) in item.assetsList" :key="si">
                  <div class="box-item" v-for="(item, index) in swiper" :key="index">
                    <div class="img-box">
                      <div class="a-box-shadow-wrap">
                        <div class="a-box-shadow-inner">
                          <img class="img" :src="item.img" alt="">
                        </div>
                      </div>
                    </div>
                    <el-tooltip :content="item.name" placement="bottom">
                      <div class="name r-text-line-1">{{item.name}}</div>
                    </el-tooltip>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <r-box type="empty" v-if="!item.assetsList.length"></r-box>
        </div>
      </div>
    </div>
    <r-box type="empty" v-if="!getListLoading&&!list.length"></r-box>
    <load-more-list-btn ref="loadMoreListBtnRef" :limit="3" :getDataFunction="getListData" @on-refresh-list="refreshList"></load-more-list-btn>
  </div>
</template>
<script setup>
import gamesCardTitle from 'components/card/game.vue'
import ASwitch from 'components/form/ASwitch.vue'
import { ref, computed, nextTick } from 'vue'
import Swiper, { Navigation } from 'swiper'
import { getGroupList } from 'utils/func'
import { listMyGame } from 'api/http/game'
import LoadMoreListBtn from 'components/button/LoadMoreListBtn.vue'
import useCommonStore from 'store/common'

const commonStore = useCommonStore()
const userInfo = computed(() => {
  return commonStore.userInfo
})
// sort
const sortType = ref(true)
const sortChange = () => {
  sortType.value = !sortType.value
  initPage()
}
const cancelCollect = () => {
  initPage()
}
const orderType = computed(() => {
  return sortType.value ? 0 : 2
})

const list = ref([])
const loadMoreListBtnRef = ref(null)
const getListLoading = ref(false)

const getListData = (pageQuery, isRefresh) => {
  const query = {
    limit: pageQuery.limit,
    offset: pageQuery.offset,
    userId: userInfo.value?.id,
    orderType: orderType.value,
  }
  if (isRefresh) getListLoading.value = true
  return listMyGame(query).finally(_ => {
    if (isRefresh) getListLoading.value = false
  })
}
const refreshList = (data, isRefresh) => {
  const items = data.map(x => {
    const assetsList = []
    x.project.forEach(xx => {
      xx.blindBox.forEach(xxx => {
        assetsList.push(...xxx.nft.map(xxxx => {
          return {
            hash: xxxx.hash,
            name: xxxx.name,
            img: xxxx.uriThumbnail,
          }
        }))
      })
    })
    return {
      id: x.id,
      logo: x.cover,
      name: x.name,
      collected: x.collected,
      assetsList: getGroupList(assetsList, 4),
    }
  })

  if (isRefresh) {
    list.value = items
  } else {
    list.value.push(...items)
  }
  processing(list.value)
  nextTick(() => {
    swiperInit(gameListProcessed.value)
  })
}

const gameListProcessed = ref([])
const result = ref([])
const processing = (data) => {
  result.value = JSON.parse(JSON.stringify(data))
  result.value.forEach((v, i) => {
    v.assetsList = getGroupList(v.assetsList, 4)
  })
  gameListProcessed.value = result.value
}

const swiperInit = (data) => {
  data.forEach((v, i) => {
    v.swiperFn = new Swiper(`.account-game-page .swiper-container-${i}`, {
      modules: [Navigation],
      navigation: {
        nextEl: `.account-game-page .swiper-button-next-${i}`,
        prevEl: `.account-game-page .swiper-button-prev-${i}`,
      },
    })
  })
}
const initPage = () => {
  loadMoreListBtnRef.value.initPage()
}

</script>
<style lang="scss" scoped>
.account-game-page {
  padding-bottom: 60px;
  margin-top: 50px !important;
  margin-bottom: 50px !important;

  .games-card-wrap {
    .games-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 60px 0;

      .games {
        width: 300px;
        border-right: 1px solid rgba($color: #fff, $alpha: 16%);
      }

      .category-box {
        flex: 1;
        width: 0;

        // height: 235px;
        padding-left: 30px;

        .hd {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;

          .hd-left {
            font-size: 18px;
            font-style: normal;
            font-weight: 600;
            line-height: 22px;

            /* identical to box height */

            letter-spacing: .02em;
          }

          .hd-right {
            display: flex;
            align-items: center;

            .icon {
              position: unset;
              font-size: 24px;
              color: #fff;

              &:last-child {
                margin-left: 15px;
              }
            }
          }
        }

        .bd {
          width: 100%;
          margin-top: 22px;

          .swiper-container {
            width: 100%;
            overflow: hidden;

            .swiper-wrapper {
              width: 100%;

              .swiper-slide {
                display: flex;
                align-items: flex-start;

                // justify-content: space-between;

                .box-item {
                  box-sizing: border-box;
                  display: flex;
                  flex-direction: column;
                  width: 25%;
                  padding-right: 14px;

                  .img-box {
                    position: relative;
                    width: 100%;
                    height: 0;
                    padding-bottom: 100%;

                    .a-box-shadow-wrap {
                      position: absolute;
                      top: 0;
                      right: 0;
                      bottom: 0;
                      left: 0;

                      .img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                      }
                    }
                  }

                  .text {
                    height: 15px;
                    margin-top: 8px;
                    font-size: 12px;
                    font-weight: bold;
                    line-height: 15px;
                    text-align: center;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .name {
    margin-top: 30px;
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: bold;
  }
}
</style>
