import Mock from 'mockjs'
import { gameImageDb, avatarDb, tagDb } from './db'

const getAvatar = (id) => {
  return `/mock/avatar/${avatarDb[id - 1]}`
}

const getTags = () => {
  const n = Mock.Random.integer(2, 3)
  return (new Array(n)).fill(1).map(x => {
    return Mock.Random.pick(tagDb)
  })
}

let Reviews = []

// for (let i = 1; i < 200; i++) {
//   // const avatar = Mock.Random.pick(['1.png', '2.avif', '3.png'])
//   const game = Mock.Random.pick([1, 2, 3])
//   const gameNames = ['Axie Infinity', 'Stepn', 'Let me speak']
//   Reviews.push(Mock.mock({
//     id: i,
//     gameName: gameNames[game - 1],
//     gameLogo: `/mock/game/${game}.png`,
//     text: Mock.Random.paragraph(),
//     userAvatar: '/mock/avatar/1.png',
//     userLevel: 2,
//     userName: 'Maximo Yrysnk',
//     startTime: Mock.Random.datetime('yyyy.MM.dd'),
//     likeCount: Mock.Random.integer(88, 999),

//     createdTime: Mock.Random.datetime(),
//     roi: Mock.Random.integer(40, 300),
//     genre: Mock.Random.integer(1, 5),
//   }))
// }
Reviews = [
  {
    id: 1,
    gameName: 'Stepn',
    gameLogo: 'mock/game/1.jpg',
    text: 'We think the NFT-enabled, gamified, fitness-oriented move2earn mobile app that STEPN is building is an excellent idea. The additional monetary incentive alters the dopamine curve just enough to bring millions into healthier lifestyles and to the Web 3.0 world.',
    userName: 'Maple',
    userAvatar: getAvatar(24),
    userLevel: 2,
    startTime: '2022.03.21',
    likeCount: 367,
  },
  {
    id: 2,
    gameName: 'Axie Infinity',
    gameLogo: 'mock/game/2.png',
    text: 'Axie Infinity is the perfect encapsulation of the future crypto wants: a crypto game so expensive to play, predatory lenders offer "scholarships" to those who can\'t afford it that requires they hand over a large percentage of their in-game earnings',
    userName: 'Binder',
    userAvatar: getAvatar(25),
    userLevel: 3,
    startTime: '2022.03.19',
    likeCount: 789,
  },
  {
    id: 3,
    gameName: 'The Sandbox',
    gameLogo: 'mock/game/3.png',
    text: 'JUST IN: TIME Magazine has named The Sandbox #Metaverse one of the most influential companies of 2022.',
    userName: 'Guru',
    userAvatar: getAvatar(26),
    userLevel: 1,
    startTime: '2022.04.04',
    likeCount: 543,
  },
  {
    id: 4,
    gameName: 'Decentraland',
    gameLogo: 'mock/game/4.jpeg', // 4
    text: 'wonderful project with great community. The leadership has been an inspiration in their innovative approaches towards achieving the project goals and visions.',
    userName: 'Hirok',
    userAvatar: getAvatar(27),
    userLevel: 3,
    startTime: '2022.05.12',
    likeCount: 863,
  },
  {
    id: 5,
    gameName: 'My Neighbor Alice',
    gameLogo: 'mock/game/5.png', // 5
    text: 'The next animal crossing I believe, not as good as animal crossing but its a web3 game, keep going',
    userName: 'Artoria',
    userAvatar: getAvatar(28),
    userLevel: 2,
    startTime: '2022.05.21',
    likeCount: 296,
  },
  {
    id: 6,
    gameName: 'Illuvium',
    gameLogo: 'mock/game/6.jpg', // 6
    text: "Love this. So excited to play. It's a really amazing experience to see a project in the works, before you play it. Kind of makes me feel part of it.",
    userName: 'Teloolan',
    userAvatar: getAvatar(29),
    userLevel: 1,
    startTime: '2022.01.21',
    likeCount: 385,
  },
  {
    id: 7,
    gameName: 'Splinterlands',
    gameLogo: gameImageDb[6].img,
    text: 'This game is a community built, player funded blockchain powerhouse that continues every day and with each update to lead the pack in non-fungible tokens, blockchain gaming, and changing what it means to b a collectible.',
    userName: 'lemonTea',
    userAvatar: getAvatar(30),
    userLevel: 1,
    startTime: '2022.05.12',
    likeCount: 385,
  },
  {
    id: 8,
    gameName: 'Thetan Arena',
    gameLogo: gameImageDb[7].img,
    text: 'Pretty much like dota2 or LOL, so far the best MOBA game in web3 right now. It definitely worth a try, but the game could be better if it comes with more heroes.',
    userName: 'Goller sad boy',
    userAvatar: getAvatar(31),
    userLevel: 3,
    startTime: '2022.02.14',
    likeCount: 628,
  },
  {
    id: 9,
    gameName: 'ElementX',
    gameLogo: gameImageDb[8].img,
    text: 'Another treasure hunt game, the adventure mode is much more interesting than the PvP mode. I have been recruit over 20 heroes and made decent amount token, only a close step to get all my investment back.',
    userName: '6987.eth',
    userAvatar: getAvatar(32),
    userLevel: 1,
    startTime: '2022.04.25',
    likeCount: 376,
  },
  {
    id: 10,
    gameName: 'Crypto Golf Impact',
    gameLogo: gameImageDb[9].img,
    text: 'When everyone saying web3 games need AAA games, but this one give you a different idea, why not casual games? Im not a hardcore player and game like this one can also bring you web3 game experience comes to casual player like me.',
    userName: '4x4dirt',
    userAvatar: getAvatar(33),
    userLevel: 3,
    startTime: '2022.04.13',
    likeCount: 654,
  },
  {
    id: 11,
    gameName: 'Crypto Golf Impact',
    gameLogo: gameImageDb[10].img,
    text: 'Welcome to the worlds biggest winter celebration! I love sports game and this one allow me to play in olympic and actually win some good money. Cool idea and keep going! Looking forward to add more sports in this game.',
    userName: 'Rocky JGT',
    userAvatar: getAvatar(34),
    userLevel: 3,
    startTime: '2022.05.23',
    likeCount: 427,
  },
  {
    id: 12,
    gameName: 'Worldwide Webb',
    gameLogo: gameImageDb[11].img,
    text: 'I always love pixel games, especially sandbox openworld like worldwide webb, this game allow you to use your NFT avatar to be the in game character and build your little home in the webb Metaverse.',
    userName: 'urgerman',
    userAvatar: getAvatar(35),
    userLevel: 3,
    startTime: '2022.04.18',
    likeCount: 582,
  },
]
Reviews = Reviews.map(x => {
  x.tags = getTags()
  x.createdTime = Mock.Random.datetime()
  x.roi = Mock.Random.integer(40, 300)
  return x
})

export { Reviews }
