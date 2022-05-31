import Mock from 'mockjs'
import { statusDb, avatarDb, tagDb, badgeDb } from './db'

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

const Players = []

for (let i = 1; i < 56; i++) {
  const status = Mock.Random.integer(1, 5)
  const item = {
    id: i,
    avatar: getAvatar(i),
    name: Mock.Random.name(),
    roi: Mock.Random.integer(40, 300),
    genre: Mock.Random.integer(1, 5),
    devStatus: status,
    devStatusLabel: statusDb[status - 1],
    tags: getTags(),
    badge: getBadges(),
    createdTime: Mock.Random.integer(1, 2000),
  }
  if (i === 1) {
    item.avatar = getAvatar(42)
    item.name = 'Deborah Clark'
    item.createdTime = 30000
  }
  Players.push(item)
}

export { Players }
