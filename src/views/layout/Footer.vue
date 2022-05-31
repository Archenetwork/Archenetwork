<script setup>
const communityList = [
  { link: 'https://twitter.com/Arche_Network', icon: 'community-twitter' },
  {
    icon: 'community-telegram',
    children: [
      {
        title: 'English',
        img: 'https://media.arche.network/arche2.0/images/flag/flag-eng.png',
        link: 'https://t.me/ArcheNetwork',
      },
      {
        title: 'Russian',
        img: 'https://media.arche.network/arche2.0/images/flag/flag-rus.png',
        link: 'https://t.me/archerussian',
      },
      {
        title: 'Vietnamese',
        img: 'https://media.arche.network/arche2.0/images/flag/flag-vie.png',
        link: 'https://t.me/Arche_Network_VNGroup',
      },
      {
        title: 'Indonesian',
        img: 'https://media.arche.network/arche2.0/images/flag/flag-idn.png',
        link: 'https://t.me/Archeindonesia',
      },
      {
        title: 'Spanish',
        img: 'https://media.arche.network/arche2.0/images/flag/flag-esp.png',
        link: 'https://t.me/archespanish',
      },
      {
        title: 'Indian',
        img: 'https://media.arche.network/arche2.0/images/flag/flag-ind.png',
        link: 'https://t.me/archeindian',
      },
      {
        title: 'Japan',
        img: 'https://media.arche.network/arche2.0/images/flag/flag-jpn.png',
        link: 'https://t.me/archejapan',
      },
      {
        title: 'Persian',
        img: 'https://media.arche.network/arche2.0/images/flag/flag-iri.png',
        link: 'https://t.me/archearchpersian',
      },
      {
        title: 'Chinese',
        img: 'https://media.arche.network/arche2.0/images/flag/flag-chn.png',
        link: 'https://t.me/archechinese',
      },
    ],
  },
  { link: 'https://discord.com/invite/ah8h2sqF2B', icon: 'community-discord' },
  { link: 'https://github.com/Archenetwork', icon: 'community-github' },
]
const jump = (item) => {
  window.open(item.link, '_blank')
}
</script>

<template>
  <div class="layout-footer">
    <div class="footer-content">
      <div class="info">
        <div class="info-left">
          <svg-img class="logo" name="logo"></svg-img>
          <div class="desc">
            Your web 3.0 social gaming hub
          </div>
        </div>
        <div class="info-right">
          <!-- <div class="info-right-title">
            <svg-img class="footer_title" name="footer_title"></svg-img>
            <div class="desc">
              Join Arche Community and share the collective building of a future world of Metaverse!
            </div>
          </div> -->
          <!-- todo -->
          <div class="info-right-function">
            <div class="email">
              <div class="title">Follow ARCHE Update</div>
              <div class="input">
                <input type="text" placeholder="Enter Email">
                <div class="btn-sign">Sign Up</div>
              </div>
            </div>
            <div class="community">
              <div class="title">Join Community</div>
              <div class="jump">
                <div v-for="(item,index) in communityList" :key="index" @click="jump(item)">
                  <svg-icon class="icon" :name="item.icon" v-if="index!=1"></svg-icon>
                  <el-popover placement="top" :width="180" trigger="hover" v-else>
                    <template #reference>
                      <svg-icon class="icon" :name="item.icon"></svg-icon>
                    </template>
                    <div class="footer-telegram-wrap">
                      <div class="telegram-popup" v-for="(v,i) in item.children"  :key="i" @click.stop="jump(v)">
                        <img :src="v.img" alt="">
                        <div>{{v.title}}</div>
                      </div>
                    </div>
                  </el-popover>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tips">
        <div class="tips-left">
          © 2022 ARCHE GROUP. ALL RIGHTS RESERVED.
        </div>
        <div class="tips-right">
          Reach out to us: Support@ARCHE.network
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" >
.el-popover.el-popper {
  color: white !important;
  background: #14191d !important;
  border: none !important;
}

.el-popper.is-light[data-popper-placement^="top"] .el-popper__arrow::before {
  border-top-color: #14191d !important;
  border-left-color: #14191d !important;
}

.el-popper.is-light .el-popper__arrow::before {
  background: #14191d !important;
  border: 1px solid #14191d !important;
}

.footer-telegram-wrap {
  display: flex;
  flex-direction: column;
  background-color: #14191d;

  .telegram-popup {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    padding: 0 20px;
    cursor: pointer;

    &:hover {
      background-color: #000;
    }

    img {
      width: 20px !important;
      margin-right: 12px;
      filter: drop-shadow(0 1px 2px rgb(0 0 0 / 10%));
    }
  }
}

.layout-footer {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 40px 0 15px;
  background: #000;

  .footer-content {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    width: 100%;
    max-width: 1170px;
    margin: 0 auto;

    .info {
      display: flex;
      justify-content: space-between;
      width: 100%;

      &-left {
        box-sizing: border-box;
        height: 150px;
        padding-top: 20px;

        .logo {
          width: 271px;
          height: 48px;
        }

        .desc {
          margin-top: 15px;
          font-family: "Cindie Mono";
          font-size: 12px;
          font-style: normal;
          font-weight: normal;
          line-height: 19px;
          color: #fff;
          text-transform: capitalize;
        }
      }

      &-right {
        .footer_title {
          width: 570px;
          height: 19px;
        }

        .desc {
          width: 397px;
          margin-top: 10px;
          font-family: Inter;
          font-size: 14px;
          font-style: normal;
          font-weight: normal;
          line-height: 21px;
          color: #b0babf;
          letter-spacing: .02em;
          word-wrap: break-word;
        }

        &-function {
          display: flex;
          justify-content: space-between;
          margin-top: 30px;

          .title {
            margin-bottom: 15px;
            font-family: "Cindie Mono";
            font-size: 12px;
            font-style: normal;
            font-weight: normal;
            line-height: 19px;
            color: #fff;
            text-transform: capitalize;
          }

          .input {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 345px;
            height: 40px;
            background: #14191d;
            border-radius: 30px;

            input {
              flex: 1;
              height: 100%;
              padding: 11px 15px;
              font-family: Inter;
              font-size: 14px;
              font-style: normal;
              font-weight: normal;
              line-height: 18px;
              color: white;
              letter-spacing: .02em;
              background-color: transparent;
              border: none;
              outline: none;
            }

            .btn-sign {
              width: 83px;
              height: 40px;
              font-family: Inter;
              font-size: 14px;
              font-style: normal;
              font-weight: 600;
              line-height: 40px;
              color: #fff;
              text-align: center;
              cursor: pointer;
              background: #0038ff;
              border-radius: 20px;
            }
          }

          .community {
            width: 184px;

            .title {
              text-align: center;
            }

            .jump {
              display: flex;
              align-items: center;
              justify-content: space-between;

              .icon {
                width: 40px;
                height: 40px;
                cursor: pointer;
                transition: transform .3s;
              }

              .icon:hover {
                transform: scale(1.1);
              }
            }
          }
        }
      }
    }

    .tips {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 21px;
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: normal;
      color: #b0babf;
      letter-spacing: .02em;
    }
  }
}
</style>
