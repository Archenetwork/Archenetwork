import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { LoginUsers, Users } from './data/user'
import { Players } from './data/player'
import { notifyApiErrorInfo } from 'utils/notification'
import useLisaStore from 'store/lisa'
import { sortJson } from 'utils/func'

const _Users = Users
const _Players = Players

// let checkPageCurrentDelete = function (num) {
//   let oldPage = Math.ceil(this.listPage.total / this.listPage.size)
//   this.listPage.total -= num
//   let newPage = Math.ceil(this.listPage.total / this.listPage.size)
//   if (oldPage !== newPage && newPage < this.listPage.current) {
//     this.changePage(newPage)
//   } else {
//     this.refresh()
//   }
// }

const request = axios.create({
  baseURL: '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default {
  /**
   * mock bootstrap
   */
  bootstrap () {
    const mock = new MockAdapter(request)

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success',
    })

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure',
    })

    // login
    mock.onPost('/login').reply(config => {
      const { username, password } = JSON.parse(config.data)
      return new Promise((resolve, reject) => {
        let user = null
        setTimeout(() => {
          const hasUser = LoginUsers.some(u => {
            if (u.username === username && u.password === password) {
              user = JSON.parse(JSON.stringify(u))
              user.password = undefined
              return true
            }
          })

          if (hasUser) {
            resolve([200, { code: 200, msg: 'request success', user }])
          } else {
            resolve([200, { code: 500, msg: 'account or password is error' }])
          }
        }, 1000)
      })
    })

    // get user info
    mock.onGet(/\/users\/\d+/).reply(config => {
      const id = Number(config.url.split('/users/')[1])
      const user = _Users.find(u => u.id === id)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            data: user,
          }])
        }, 1000)
      })
    })

    // get user list
    mock.onGet('/users').reply(config => {
      const mockUsers = _Users.filter(user => {
        return true
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            items: mockUsers,
          }])
          // resolve([300, {
          //   message: 'params error'
          // }]);
        }, 1000)
      })
    })

    mock.onGet('/users/page').reply(config => {
      const { pageNo, pageSize } = config.params
      const limit = Number(pageSize)
      const current = Number(pageNo)
      const offset = (current - 1) * limit
      let mockUsers = JSON.parse(JSON.stringify(_Users))
      const total = mockUsers.length
      mockUsers = mockUsers.filter((u, index) => index < offset + limit && index >= offset)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            items: mockUsers,
          }])
        }, 1000)
      })
    })

    mock.onGet('/players').reply(config => {
      let { limit, offset, search = null, genre = null, devStatus = null, orderType = 1 } = config.params

      limit = Number(limit)
      offset = Number(offset)
      let mockList = JSON.parse(JSON.stringify(_Players))
      mockList = mockList.filter(x => {
        let flag = true
        if (search && !x.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
          flag = false
        } else {
          if (genre && genre !== x.genre) {
            flag = false
          } else {
            if (devStatus && devStatus !== x.devStatus) {
              flag = false
            }
          }
        }
        return flag
      })
      const total = mockList.length
      if (orderType === 1) {
        mockList = sortJson(mockList, 'createdTime', 'desc')
      } else {
        mockList = sortJson(mockList, 'roi', 'desc')
      }
      mockList = mockList.filter((u, index) => index < offset + limit && index >= offset)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            items: mockList,
          }])
        }, 20)
      })
    })
  },
}

// request interceptors
request.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

// response interceptors
request.interceptors.response.use(response => {
  return response.data
}, error => {
  let msg = ''
  if (error.response) {
    if (error.response.data && error.response.data.message) {
      msg = error.response.data.message
    } else {
      msg = error.response.data
    }
  } else {
    msg = error.message
  }
  // console.log('api response error: ', msg)
  console.log('api response error: ', error)
  return Promise.reject(msg)
})

export const _get = (url, query) => {
  return request.get(url, { params: query })
}
export const _post = (url, body) => {
  return request.post(url, body)
}

export const _patch = (url, body) => {
  return request.patch(url, body)
}

export const _put = (url, body) => {
  return request.put(url, body)
}

export const _delete = (url) => {
  return request.delete(url)
}