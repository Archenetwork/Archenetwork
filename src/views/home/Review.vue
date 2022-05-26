<script setup>
import { reviewList } from './data'
import ReviewCard from 'components/card/Review.vue'

const list = reviewList

</script>

<template>
  <div class="a-container home-review">
    <div class="card-title">
      <svg-img class="img" name="text_recommend"></svg-img>
      <div class="text">Review</div>
    </div>
    <div class="content">
      <review-card class="review-card" v-for="item in list" :key="item.id"
        :item="item"></review-card>
    </div>
  </div>
</template>

<style lang="scss">
.home-review {
  margin-bottom: 100px !important;

  .card-title {
    margin-bottom: 50px;

    .img {
      width: 177px;
      height: 22px;
    }

    .text {
      padding-left: 20px;
      font-family: "Cindie Mono";
      font-size: 36px;
      font-weight: 400;
      line-height: 58px;
    }
  }

  .content {
    display: flex;
    flex-wrap: wrap;

    .review-card {
      box-sizing: border-box;
      width: 33.33%;
      padding-right: 20px;
      margin-bottom: 40px;
    }
  }
}
</style>
