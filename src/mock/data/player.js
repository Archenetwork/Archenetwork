import Mock from 'mockjs'
import { statusDb, avatarDb, tagDb, badgeDb } from './db'

// 0-55
const getAvatar = (i) => {
  return `/mock/avatar/${avatarDb[i]}`
}
const getTags = () => {
  const n = Mock.Random.integer(2, 3)
  return (new Array(n)).fill(1).map(x => {
    return Mock.Random.pick(tagDb)
  })
}
// 0-14
const getBadges = () => {
  return (new Array(3)).fill(1).map(x => {
    return Mock.Random.pick(badgeDb)
  })
}

const Players = []

for (let i = 1; i < 56; i++) {
  const status = Mock.Random.integer(1, 5)
  Players.push(Mock.mock({
    id: i,
    avatar: getAvatar(i),
    name: Mock.Random.name(),
    roi: Mock.Random.integer(40, 300),
    genre: Mock.Random.integer(1, 5),
    devStatus: status,
    devStatusLabel: statusDb[status - 1],
    tags: getTags(),
    badge: getBadges(),
    createdTime: Mock.Random.datetime(),
  }))
}

export { Players }
