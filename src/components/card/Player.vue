<script setup>
import { useRouter } from 'vue-router'
import { getBadgeName } from '@/mock/data/medal'
import Mock from 'mockjs'

const router = useRouter()

const props = defineProps({
  item: Object,
})

const goPage = (item) => {
  const data = {
    avatar: item.avatar,
    name: item.name,
    averageRoi: item.roi,
    tags: item.tags,
    badge: item.badge,
    state: item.devStatusLabel,
    wishList: ['/mock/game/13.webp', '/mock/game/14.webp', '/mock/game/15.webp'],
    badges: ['/mock/badge/111.png', '/mock/badge/27.png',
      '/mock/badge/24.png', '/mock/badge/212.png',
      '/mock/badge/31.png', '/mock/badge/18.png'],
    rank: 83,
    price: 35,
    address: '0x548a7DBF224F2a3ECa8D8bfBd809e0549bF3Fu8',
    shortAddress: '0x548a...3Fu8',
    uid: 15923681,
    likeCount: Mock.Random.integer(1000, 300),
    gameCount: Mock.Random.integer(3, 10),
    friendCount: Mock.Random.integer(5, 99),
  }
  localStorage.setItem('item', JSON.stringify(data))
  router.push({
    name: 'User',
    query: {
      id: item.id,
      type: 3,
    },
  })
}

const getBadgeNameByLogo = (logo) => {
  return getBadgeName(logo)
}
</script>

<template>
  <div class="c-card-player" @click="goPage(item)">
    <div class="hd">
      <div class="avatar-box-wrap">
        <div class="avatar-box-inner">
          <img class="img" :src="item.avatar" alt="">
        </div>
      </div>
      <div class="hd-content">
        <div class="name r-text-line-1">{{item.name}}</div>
        <div class="medals">
          <el-tooltip effect="dark" v-for="(item, i) in item.badge" :key="i" :content="getBadgeNameByLogo(item)" placement="top">
          <img class="img" :src="item" :key="i" alt="">
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="bd">
      <div class="bd-title">{{item.devStatusLabel}}</div>
      <div class="bd-content">
        <span class="label">Average ROI</span>
        <div class="value-box">
          <div class="value">{{item.roi}}%</div>
        </div>
      </div>
    </div>
    <div class="ft">
      <div class="tag" v-for="(tag, i) in item.tags" :key="i">{{tag}}</div>
    </div>
  </div>
</template>

<style lang="scss">
.c-card-player {
  cursor: pointer;

  .hd {
    display: flex;

    .avatar-box-wrap {
      box-sizing: border-box;
      width: 92px;
      height: 92px;
      margin-right: 14px;
      border: 5px solid rgb(0 0 0 / 24%);
      border-radius: 20px;

      .avatar-box-inner {
        box-sizing: border-box;
        width: 82px;
        height: 82px;
        overflow: hidden;
        border: 1px solid rgb(149 120 81 / 100%);
        border-radius: 14px;

        .img {
          width: 80px;
          height: 80px;
        }
      }
    }

    .hd-content {
      flex: 1;
      width: 0;
      margin-bottom: 22px;

      .name {
        height: 24px;
        margin-top: 10px;
        margin-bottom: 14px;
        font-size: 18px;
        font-weight: 700;
        line-height: 24px;
      }

      .medals {
        display: flex;
        align-items: center;

        .img {
          width: 40px;
          height: 40px;
          margin-right: 8px;
          object-fit: contain;

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }

  .bd {
    margin-bottom: 20px;

    .bd-title {
      height: 15px;
      margin-bottom: 4px;
      font-size: 12px;
      line-height: 15px;
      text-transform: uppercase;
      opacity: .5;
    }

    .bd-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 22px;
      color: #0ff;

      .label {
        margin-right: 3px;
        font-size: 18px;
        font-weight: 600;
      }

      .value-box {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        border-bottom: 1px solid rgb(255 255 255 / 16%);

        .value {
          padding: 0 5px;
          margin-bottom: -1px;
          font-size: 24px;
          font-weight: 600;
          border-bottom: 1px solid #0ff;
        }
      }
    }
  }

  .ft {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .tag {
      height: 24px;
      padding: 0 8px;
      margin-right: 6px;
      margin-bottom: 6px;
      font-size: 12px;
      font-weight: 600;
      line-height: 24px;
      text-transform: capitalize;
      background: #303940;
      border-radius: 12px;
    }
  }
}
</style>
