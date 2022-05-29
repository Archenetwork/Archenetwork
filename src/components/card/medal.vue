<template>
  <!-- medals -->
  <div class="medal-card-item">
    <div class="medal-wrap">
      <div class="card-wrap">
        <div class="card-content">
          <el-tooltip class="box-item" effect="dark" :content="list.desc" placement="right">
            <img :src="list.logo" alt="">
          </el-tooltip>
        </div>
      </div>
      <div class="title">
        {{list.name}}
      </div>
      <!-- <div class="new" v-if="index<2">NEW</div> -->
    </div>
    <div class="line" v-if="(index+1)%6!==0||index==0"></div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'

const props = defineProps({
  list: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
})
</script>
<style lang="scss" scoped >
.medal-card-item {
  position: relative;
  display: flex;
  align-items: center;

  .medal-wrap {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .new {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    padding: 5px;
    font-size: 8px;
    font-style: italic;
    font-weight: 900;
    color: #fff;
    background-color: #f2271c;
    border-radius: 9px;
    transform: scale(.75) rotate(-1deg);
  }

  .card-wrap {
    position: relative;
    box-sizing: border-box;
    width: 86px;
    height: 86px;
    padding: 8px;

    .card-content {
      width: 100%;
      height: 100%;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .title {
    width: 106px;
    margin-top: 23px;
    margin-bottom: 23px;
    font-size: 12px;
    font-style: normal;
    font-weight: bold;
    line-height: 15px;
    color: #fff;
    text-align: center;
  }

  .line {
    position: absolute;
    top: 30px;
    right: 55px;
    box-sizing: border-box;
    width: 1px;
    height: 24px;
    border: 1px solid #fff;
    opacity: .16;
  }
}
</style>
