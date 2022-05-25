/*
 * @Descripttion: axios
 * @Author: pujianguo
 * @Date: 2022-05-22 23:12:59
 */
import axios from 'axios'
import config from '@/config'
import useLisaStore from 'store/lisa'
import { notifyApiErrorInfo } from 'utils/notification'
import 'element-plus/es/components/notification/style/css'

const request = axios.create({
  baseURL: config.baseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// white list api
const noAuthWhiteList = [
  '/sys/login',
]

// request interceptors
request.interceptors.request.use(config => {
  const lisaStore = useLisaStore()
  if (lisaStore.token) {
    config.headers['X-Access-Token'] = `${lisaStore.token}`
  } else {
    const url = config.url || ''
    if (!noAuthWhiteList.includes(url)) {
      toLogin()
      return Promise.reject(new Error('not login'))
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

// response interceptors
request.interceptors.response.use(response => {
  if (response.data.code === 200 || response.data.code === 0) {
    return response.data.result
  } else {
    notifyApiErrorInfo(response.data.message)
    return Promise.reject(response.data.message)
  }
}, error => {
  let msg = ''
  if (error.response) {
    if (error.response.status === 401) { // no login
      toLogin()
      return
    }
    if (error.response.data && error.response.data.message) {
      msg = error.response.data.message
    } else {
      msg = error.response.data
    }
  } else {
    msg = error.message
    if (msg.includes('Network Error')) {
      msg = 'Please check if your network connection is normal! The network is abnormal'
    }
    if (msg.includes('timeout')) {
      msg = 'The interface request timed out, please refresh the page and try again!'
    }
  }
  if (msg !== 'not login') {
    // global error
    notifyApiErrorInfo(msg)
  }
  console.log('api response error: ', error)
  return Promise.reject(msg)
})

export const toLogin = () => {
  const lisaStore = useLisaStore()
  notifyApiErrorInfo('The user does not have permission (token, user name, password error)!')
  lisaStore.setLogout()
  window.location.href = '#/login'
}

export const _get = (url, query) => {
  return request.get(url, { params: query })
}
export const _download = (url, query) => {
  return request.get(url, { params: query, responseType: 'blob' })
}

export const _post = (url, body) => {
  return request.post(url, body)
}

export const _upload = (url, data, config = null) => {
  return request.post(url, data, { timeout: 60000, headers: { 'Content-Type': 'multipart/form-data' }, ...config })
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
