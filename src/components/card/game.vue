<template>
  <!-- games -->
  <div class="card-wrap" @click.stop="goDetailPage('Game',list.id)">
    <div class="a-box-shadow-wrap">
      <div class="a-box-shadow-inner card-content-title">
        <img :src="list.logo" alt="">
      </div>
    </div>
    <div class="tips">
      <div class="name">{{list.name}}</div>
      <div class="collect" @click.stop="cancelCollect(list)">
        <svg-icon class="icon" name="img-collect"></svg-icon>
      </div>
    </div>
  </div>
</template>
<script setup>
import { collectGame } from '@/api/http/game'
import { useRouter } from 'vue-router'
import useCommonStore from '@/store/common'
const commonStore = useCommonStore()

const router = useRouter()

const emits = defineEmits(['on-cancel'])
const props = defineProps({
  list: {
    type: Object,
    required: true,
  },
})
// to detail
const goDetailPage = (type, id) => {
  router.push({
    name: `${type}_Detail`,
    params: {
      id: id,
    },
  })
}
const cancelCollect = (list) => {
  const id = list.id
  const type = 0
  postCancelCollect(id, type)
}
const postCancelCollect = async (id, type) => {
  collectGame(id, type).then(res => {
    console.log(commonStore, 'commonStore')
    commonStore.setMessageFlag()
    emits('on-cancel')
  })
}
</script>
<style lang="scss" scoped >
// games

.card-wrap {
  padding-right: 30px;
  cursor: pointer;

  .a-box-shadow-wrap {
    width: 270px;
    height: 160px;

    .card-content-title {
      position: relative;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 100%;
        height: 100%;
        border-radius: 30px;
        transition: transform .3s;
        object-fit: cover;
      }

      img:hover {
        transform: scale(1.1);
      }
    }
  }

  .tips {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 30px;

    .name {
      font-size: 24px;
      font-style: normal;
      font-weight: bold;
      line-height: 29px;
    }

    .collect {
      cursor: pointer;
    }
  }
}
</style>
