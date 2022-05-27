import Mock from 'mockjs'

const Reviews = []

for (let i = 1; i < 200; i++) {
  // const avatar = Mock.Random.pick(['1.png', '2.avif', '3.png'])
  const game = Mock.Random.pick([1, 2, 3])
  const gameNames = ['Axie Infinity', 'Stepn', 'Let me speak']
  Reviews.push(Mock.mock({
    id: i,
    gameName: gameNames[game - 1],
    gameLogo: `/mock/game/${game}.png`,
    gameDesc: Mock.Random.paragraph(),
    userAvatar: '/mock/avatar/1.png',
    userLevel: 2,
    userName: 'Maximo Yrysnk',
    startTime: Mock.Random.datetime('yyyy.MM.dd'),
    followCount: Mock.Random.integer(88, 999),

    createdTime: Mock.Random.datetime(),
    roi: Mock.Random.integer(80, 300),
    genre: Mock.Random.integer(1, 5),
    devStatus: Mock.Random.integer(1, 5),
  }))
}

export { Reviews }
