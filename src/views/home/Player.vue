<script setup>
import { playerList } from './data'
import PlayerCard from 'components/card/Player.vue'

const list = playerList

</script>

<template>
  <div class="a-container home-player">
    <div class="card-title">
      <svg-img class="img" name="text_recommend"></svg-img>
      <div class="text">player</div>
    </div>
    <div class="content">
      <player-card class="player-card" v-for="item in list" :key="item.id"
        :item="item"></player-card>
    </div>
  </div>
</template>

<style lang="scss">
.home-player {
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

    .player-card {
      box-sizing: border-box;

      // width: 270px;
      width: 25%;
      padding-right: 20px;
      margin-bottom: 40px;
    }
  }
}
</style>
