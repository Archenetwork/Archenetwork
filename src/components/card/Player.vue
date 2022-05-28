<script setup>
const props = defineProps({
  item: Object,
})

</script>

<template>
  <div class="c-card-player">
    <div class="hd">
      <div class="avatar-box-wrap">
        <div class="avatar-box-inner">
          <img class="img" :src="item.avatar" alt="">
        </div>
      </div>
      <div class="hd-content">
        <div class="name r-text-line-1">{{item.name}}</div>
        <div class="medals">
          <img class="img" v-for="(badge, i) in item.badge" :src="badge" :key="i" alt="">
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
  .hd {
    display: flex;

    .avatar-box-wrap {
      box-sizing: border-box;
      width: 94px;
      height: 94px;
      margin-right: 14px;
      border: 6px solid rgb(0 0 0 / 24%);
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
