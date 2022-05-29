import Mock from 'mockjs'
import { statusDb, avatarDb, tagDb, badgeDb, gameImageDb } from './db'

// 0-55
const getAvatar = (i) => {
  return `/mock/avatar/${avatarDb[i]}`
}
const getTags = () => {
  const n = Mock.Random.integer(2, 3)
  const res = []
  for (let i = 0; i < n; i++) {
    let r = Mock.Random.pick(tagDb)
    if (res.includes(r)) {
      r = Mock.Random.pick(tagDb)
      if (res.includes(r)) {
        r = Mock.Random.pick(tagDb)
        if (res.includes(r)) {
          r = Mock.Random.pick(tagDb)
          if (res.includes(r)) {
            r = Mock.Random.pick(tagDb)
          }
        }
      }
    }
    res.push(r)
  }
  return res
}
// 0-14
const getBadges = () => {
  // return (new Array(3)).fill(1).map(x => {
  //   return Mock.Random.pick(badgeDb)
  // })
  const n = 3
  const res = []
  for (let i = 0; i < n; i++) {
    let r = Mock.Random.pick(badgeDb)
    if (res.includes(r)) {
      r = Mock.Random.pick(badgeDb)
      if (res.includes(r)) {
        r = Mock.Random.pick(badgeDb)
        if (res.includes(r)) {
          r = Mock.Random.pick(badgeDb)
          if (res.includes(r)) {
            r = Mock.Random.pick(badgeDb)
          }
        }
      }
    }
    res.push(r)
  }
  return res
}

const list = []

const assets = [
  ['/mock/asset/11.png', '/mock/asset/12.png', '/mock/asset/13.png'],
  ['/mock/asset/21.png', '/mock/asset/22.png', '/mock/asset/23.png'],
  ['/mock/asset/31.png', '/mock/asset/32.png', '/mock/asset/33.png'],
]

for (let i = 1; i < 6; i++) {
  list.push(Mock.mock({
    id: i,
    name: Mock.Random.name(),
    logo: gameImageDb[i - 1].img,
    createdTime: Mock.Random.datetime(),
    assetsList: (new Array(10)).fill(1).map((x, ii) => {
      const imgs = assets[Mock.Random.integer(0, 2)]
      return {
        hash: `${i}${ii}`,
        name: Mock.Random.name(),
        img: imgs[Mock.Random.integer(0, 2)],
      }
    }),
  }))
}

const games = [
  {
    id: 1,
    name: 'Axie Infinity',
    logo: '/mock/game1/banner/logo_1.png',
    assetsList: [
      {
        hash: 11,
        name: '',
        img: '/mock/asset/11.png',
      },
      {
        hash: 12,
        name: '',
        img: '/mock/asset/12.png',
      },
      {
        hash: 13,
        name: '',
        img: '/mock/asset/13.png',
      },
    ],
  },
  {
    id: 2,
    name: 'Stepn',
    logo: '/mock/game1/banner/logo_2.png',
    assetsList: [
      {
        hash: 21,
        name: '',
        img: '/mock/asset/21.png',
      },
      {
        hash: 22,
        name: '',
        img: '/mock/asset/22.png',
      },
      {
        hash: 23,
        name: '',
        img: '/mock/asset/23.png',
      },
    ],
  },
  {
    id: 3,
    name: 'Let me speak',
    logo: '/mock/game1/banner/logo_3.png',
    assetsList: [
      {
        hash: 32,
        name: '',
        img: '/mock/asset/31.png',
      },
      {
        hash: 32,
        name: '',
        img: '/mock/asset/32.png',
      },
      {
        hash: 33,
        name: '',
        img: '/mock/asset/33.png',
      },
    ],
  },
]

export const myGames = list
