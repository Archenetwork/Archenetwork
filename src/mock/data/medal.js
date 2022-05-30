import Mock from 'mockjs'

const list = [
  { id: 11, name: 'Axie famer', logo: '/mock/badge/11.png', desc: 'A real P2E player, SLP hunter!' },
  { id: 12, name: 'Axie enthusiast', logo: '/mock/badge/12.png', desc: 'Dude really love Axie for sure!' },
  { id: 13, name: 'Axie OG', logo: '/mock/badge/13.png', desc: 'The OG player of Axie, earliest group of Axie holder.' },
  { id: 14, name: 'Axie collector', logo: '/mock/badge/14.png', desc: 'This guy have over 10 Axie in his wallet!' },
  { id: 15, name: 'Axie breeder', logo: '/mock/badge/15.png', desc: 'Finished all 7 times breeding of 2 Axie.' },
  { id: 16, name: 'Community activist', logo: '/mock/badge/16.png', desc: 'A super social guy!' },
  { id: 17, name: 'Sniper', logo: '/mock/badge/17.png', desc: 'Really good at shooting games!' },
  { id: 18, name: 'Tactician', logo: '/mock/badge/18.png', desc: 'Really good at strategy games!' },
  { id: 111, name: 'Season 1 Axie master trainer', logo: '/mock/badge/111.png', desc: 'The 1st place of Season 1 Axie P2E match' },
  { id: 112, name: 'Season 1 Axie trainer', logo: '/mock/badge/112.png', desc: ' Proof of season 1 Axie competitor (18th place)' },

  { id: 21, name: 'Stepn famer', logo: '/mock/badge/21.png', desc: 'A real P2E player, GST hunter!' },
  { id: 22, name: 'Stepn enthusiast', logo: '/mock/badge/22.png', desc: 'Dude really love Stepn for sure!' },
  { id: 23, name: 'Stepn OG', logo: '/mock/badge/23.png', desc: 'The OG player of Stepn, earliest group of sneaker holder.' },
  { id: 24, name: 'Sneaker collector', logo: '/mock/badge/24.png', desc: 'This guy have over 10 sneaker in his wallet!' },
  { id: 25, name: 'Sneaker creator', logo: '/mock/badge/25.png', desc: 'Finished all 7 times creation of 2 sneakers.' },
  { id: 26, name: 'Community contributor', logo: '/mock/badge/26.png', desc: 'Helped our community grow more than 10 new gamers! ' },
  { id: 27, name: 'All-round gamer', logo: '/mock/badge/27.png', desc: 'This guy good at all kinds of games!' },
  { id: 28, name: 'Speed racer', logo: '/mock/badge/28.png', desc: 'Really good at race games!' },
  { id: 211, name: 'Season 1 Stepn marathon runner', logo: '/mock/badge/211.png', desc: 'The 1st place of Season 1 Stepn P2E match' },
  { id: 212, name: 'Season 1 Stepn runner', logo: '/mock/badge/212.png', desc: 'Proof of season 1 Stepn competitor (18th place)' },

  { id: 31, name: 'LMS famer', logo: '/mock/badge/31.png', desc: 'A real P2E player, Learning star hunter!' },
  { id: 32, name: 'LMS enthusiast', logo: '/mock/badge/32.png', desc: 'Dude really love LMS for sure!' },
  { id: 33, name: 'LMS OG', logo: '/mock/badge/33.png', desc: 'The OG player of Stepn, earliest group of sneaker holder.' },
  { id: 34, name: 'Character collector', logo: '/mock/badge/34.png', desc: 'This guy have over 10 characters in his wallet!' },
  { id: 35, name: 'Character creator', logo: '/mock/badge/35.png', desc: 'Finished all 7 times invite of 2 characters.' },
  { id: 36, name: 'Scholar', logo: '/mock/badge/36.png', desc: 'Get at least 1 scholarship from a guild.' },
  { id: 311, name: 'Season 1 Let me speak doctor', logo: '/mock/badge/311.png', desc: 'The 1st place of Season 1 LMS P2E match' },
  { id: 312, name: 'Season 1 Let me speak learner', logo: '/mock/badge/312.png', desc: 'Proof of season 1 LMS competitor (18th place)' },
]
export const medalList = list.map(x => {
  x.createdTime = Mock.Random.datetime()
  return x
})

export const getBadgeName = (logo) => {
  const item = list.find(x => x.logo === logo)
  return item ? item.name : ''
}
//  0 - 14
// export const badgeDb = [
//   '/mock/badge/11.png',
//   '/mock/badge/12.png',
//   '/mock/badge/13.png',
//   '/mock/badge/14.png',
//   '/mock/badge/15.png',
//   '/mock/badge/16.png',
//   '/mock/badge/17.png',
//   '/mock/badge/18.png',
//   '/mock/badge/21.png',
//   '/mock/badge/22.png',
//   '/mock/badge/23.png',
//   '/mock/badge/24.png',
//   '/mock/badge/25.png',
//   '/mock/badge/26.png',
//   '/mock/badge/27.png',
//   '/mock/badge/28.png',
//   '/mock/badge/31.png',
//   '/mock/badge/32.png',
//   '/mock/badge/33.png',
//   '/mock/badge/34.png',
//   '/mock/badge/35.png',
//   '/mock/badge/36.png',
// ]
