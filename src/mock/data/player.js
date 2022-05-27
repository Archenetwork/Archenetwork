import Mock from 'mockjs'

const Players = []

for (let i = 1; i < 200; i++) {
  // const avatar = Mock.Random.pick(['1.png', '2.avif', '3.png'])

  Players.push(Mock.mock({
    id: i,
    // avatar: `/mock/player/${avatar}`,
    avatar: Mock.Random.dataImage(),
    name: Mock.Random.name(),
    roi: Mock.Random.integer(80, 300),
    genre: Mock.Random.integer(1, 5),
    devStatus: Mock.Random.integer(1, 5),
    tags: ['Stable Coins', 'XSpend', 'Global'],
    medals: ['/mock/medal/4.png', '/mock/medal/6.png', '/mock/medal/8.png'],
    createdTime: Mock.Random.now(),
  }))
}

export { Players }
