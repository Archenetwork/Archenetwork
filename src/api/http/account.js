import { _get, _post, _put, _delete } from './request'
import { ElNotification } from 'element-plus'

const urlPrefix = '/apis/core/v1/'

// send forget password code TODO:
export const sendCodeForResetPassword = body => {
  // TODO: type: 1 email; 2 phone
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        return resolve('ok')
      } else {
        ElNotification.error({ title: 'Error Info', message: 'get code error' })
        return reject(new Error(''))
      }
    }, 200)
  })
}
export const resetPassword = body => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        return resolve('ok')
      } else {
        ElNotification.error({ title: 'Error Info', message: 'set error' })
        return reject(new Error(''))
      }
    }, 200)
  })
}

// send register code
export const sendCodeForRegister = body => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        return resolve('ok')
      } else {
        ElNotification.error({ title: 'Error Info', message: 'get code error' })
        return reject(new Error(''))
      }
    }, 200)
  })
}
// check image code
export const checkoutImageCode = body => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        return resolve('ok')
      } else {
        ElNotification.error({ title: 'Error Info', message: 'image code error' })
        return reject(new Error(''))
      }
    }, 200)
  })
}

export const register = body => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        return resolve('ok')
      } else {
        ElNotification.error({ title: 'Error Info', message: 'register fail' })
        return reject(new Error(''))
      }
    }, 200)
  })
}

// login
export const login = body => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (body.password === 'archeadmin') {
        return resolve({
          ID: 1,
          Token: 'xxxxxxxxx',
          email: '18919015125@163.com',
          phone: '18919015125',
          username: body.name,
        })
      } else {
        ElNotification.error({ title: 'Error Info', message: 'login fail' })
        return reject(new Error(''))
      }
      // if (Math.random() > 0.5) {
      //   return resolve({
      //     ID: 1,
      //     Token: 'xxxxxxxxx',
      //     email: '18919015125@163.com',
      //     phone: '18919015125',
      //     username: 'raul',
      //   })
      // } else {
      //   ElNotification.error({ title: 'Error Info', message: 'login fail' })
      //   return reject(new Error(''))
      // }
    }, 200)
  })
}

// get profile info
export const getProfile = _ => _get(urlPrefix + 'profile')
