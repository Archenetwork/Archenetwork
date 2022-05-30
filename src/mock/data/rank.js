import Mock from 'mockjs'

export const rankData = {
  1: {
    rank: Mock.Random.integer(50, 1000),
    price: Mock.Random.pick([20, 30, 40]),
  },
  2: {
    rank: Mock.Random.integer(50, 1000),
    price: Mock.Random.pick([20, 30, 40]),

  },
  3: {
    rank: Mock.Random.integer(50, 1000),
    price: Mock.Random.pick([20, 30, 40]),
  },
}
