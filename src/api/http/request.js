/*
 * @Descripttion: axios
 * @Author: pujianguo
 * @Date: 2022-05-22 23:12:59
 */
import axios from 'axios'
import config from '@/config'
import { notifyApiErrorInfo } from 'utils/notification'
import 'element-plus/es/components/notification/style/css'

const request = axios.create({
  baseURL: config.baseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// request interceptors
request.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

// response interceptors
request.interceptors.response.use(({ config, data }) => {
  if (config?.meta?.showErrorInfo) {
    if (data.code === 200) {
      if (config?.meta?.isList) {
        return {
          items: data.data[0],
          total: data.data[1],
        }
      } else {
        return data.data
      }
    } else {
      notifyApiErrorInfo(data.message)
      return Promise.reject(data.message)
    }
  } else {
    return data
  }
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
    if (msg.includes('Network Error')) {
      msg = 'Please check if your network connection is normal! The network is abnormal'
    }
    if (msg.includes('timeout')) {
      msg = 'The interface request timed out, please refresh the page and try again!'
    }
  }
  notifyApiErrorInfo(msg)
  console.log('api response error: ', error)
  return Promise.reject(msg)
})

export const _get = (url, query, isList = false, showErrorInfo = true) => {
  return request.get(url, { params: query, meta: { showErrorInfo, isList } })
}
export const _post = (url, body) => {
  return request.post(url, body, { meta: { showErrorInfo: true } })
}
export const _put = (url, body) => {
  return request.put(url, body, { meta: { showErrorInfo: true } })
}

export const _delete = (url) => {
  return request.delete(url, { meta: { showErrorInfo: true } })
}

const uploadInstance = axios.create({
  baseURL: config.uploadUrl,
  timeout: 60000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})
export const _upload = (url, data, config = null) => {
  return uploadInstance.post(url, data, config).then(res => {
    return res.data
  }).catch(error => {
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
    if (msg !== 'not login') {
      // global error
      console.log('api error: ', msg)
      // ElNotification.error({ title: 'Error', message: msg })
    }
    // console.log('api response error: ', msg)
    console.log('api response error: ', error)
    return Promise.reject(msg)
  })
}
