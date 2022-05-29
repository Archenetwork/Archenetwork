import Mock from 'mockjs'

const list = [
  { id: 11, name: '', logo: '/mock/badge/11.png', desc: '' },
  { id: 12, name: '', logo: '/mock/badge/12.png', desc: '' },
  { id: 13, name: '', logo: '/mock/badge/13.png', desc: '' },
  { id: 14, name: '', logo: '/mock/badge/14.png', desc: '' },
  { id: 15, name: '', logo: '/mock/badge/15.png', desc: '' },
  { id: 16, name: '', logo: '/mock/badge/16.png', desc: '' },
  { id: 17, name: '', logo: '/mock/badge/17.png', desc: '' },
  { id: 18, name: '', logo: '/mock/badge/18.png', desc: '' },
  { id: 21, name: '', logo: '/mock/badge/21.png', desc: '' },
  { id: 22, name: '', logo: '/mock/badge/22.png', desc: '' },
  { id: 23, name: '', logo: '/mock/badge/23.png', desc: '' },
  { id: 24, name: '', logo: '/mock/badge/24.png', desc: '' },
  { id: 25, name: '', logo: '/mock/badge/25.png', desc: '' },
  { id: 26, name: '', logo: '/mock/badge/26.png', desc: '' },
  { id: 27, name: '', logo: '/mock/badge/27.png', desc: '' },
  { id: 28, name: '', logo: '/mock/badge/28.png', desc: '' },
  { id: 31, name: '', logo: '/mock/badge/31.png', desc: '' },
  { id: 32, name: '', logo: '/mock/badge/32.png', desc: '' },
  { id: 33, name: '', logo: '/mock/badge/33.png', desc: '' },
  { id: 34, name: '', logo: '/mock/badge/34.png', desc: '' },
  { id: 35, name: '', logo: '/mock/badge/35.png', desc: '' },
  { id: 36, name: '', logo: '/mock/badge/36.png', desc: '' },
]
export const medalList = list.map(x => {
  x.createdTime = Mock.Random.datetime()
  return x
})

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
