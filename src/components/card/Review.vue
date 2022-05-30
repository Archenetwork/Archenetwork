<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  item: Object,
})

const goPage = (item) => {
  const data = {
    avatar: item.userAvatar,
    name: item.userName,
    averageRoi: 135,
    tags: ['MOBA', 'EDU', 'SPG'],
    state: 'Just chilling',
    wishList: ['/mock/game/8.webp', '/mock/game/9.webp', '/mock/game/10.webp'],
    badges: ['/mock/badge/11.png', '/mock/badge/112.png',
      '/mock/badge/24.png', '/mock/badge/36.png',
      '/mock/badge/31.png', '/mock/badge/311.png'],
    rank: 132,
    price: 29,
    address: '0x4d327DBF224F2a3ECa8D8bfBd809e0549bFfee2',
    shortAddress: '0x4d32...fee2',
    uid: 1592346246,
    text: item.text,
  }
  localStorage.setItem('item', JSON.stringify(data))
  router.push({
    name: 'User',
    query: {
      id: item.id,
      type: 2,
    },
  })
}

</script>

<template>
  <div class="c-card-review" @click="goPage(item)">
    <div class="a-box-shadow-wrap">
      <div class="a-box-shadow-inner-no-border">
        <div class="hd">
          <img class="logo" :src="item.gameLogo" alt="">
          <span class="game-name">{{item.gameName}}</span>
        </div>
        <div class="bd">
          {{item.text}}
        </div>
        <div class="ft">
          <img class="avatar" :src="item.userAvatar" alt="">
          <div class="level"><span>L{{item.userLevel}}</span></div>
          <div class="text-box">
            <div class="name r-text-line-1">{{item.userName}}</div>
            <div class="time">Play Since {{item.startTime}}</div>
          </div>
          <div class="follow-box">
            <svg-icon class="icon" name="follow"></svg-icon>
            <span class="count">{{item.likeCount}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.c-card-review {
  cursor: pointer;

  .a-box-shadow-inner-no-border {
    padding: 20px;
    background: #3a3c42;

    .hd {
      display: flex;
      align-items: center;
      height: 40px;

      .logo {
        width: 40px;
        height: 40px;
        margin-right: 13px;
        border-radius: 5px;
      }

      .game-name {
        font-size: 24px;
        font-weight: 700;
      }
    }

    .bd {
      height: 168px;
      margin-top: 20px;
      margin-bottom: 60px;
      overflow: hidden;
      font-size: 16px;
      line-height: 24px;
      color: #b0babf;

      @include multi-line-ellipsis(7);
    }

    .ft {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 37px;

      .avatar {
        width: 37px;
        height: 37px;
        margin-right: 10px;
        border-radius: 50%;
      }

      .level {
        position: absolute;
        top: -6px;
        left: 11px;
        width: 34px;
        height: 28px;
        font-size: 12px;
        transform: scale(.6);

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
          background: #1d1a2c;
        }

        &::after {
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 34px;
          height: 28px;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          content: "";
          background: rgb(46 46 76 / 50%);
        }

        span {
          z-index: 1;
          font-style: italic;
          font-weight: 900;
        }
      }

      .text-box {
        flex: 1;
        width: 0;

        .name {
          margin-bottom: 5px;
          font-weight: 700;
          line-height: 17px;
        }

        .time {
          font-size: 12px;
          opacity: .5;
        }
      }

      .follow-box {
        display: flex;
        align-items: center;

        .icon {
          width: 14px;
          height: 13px;
          margin-right: 7px;
        }

        .count {
          font-size: 16px;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
