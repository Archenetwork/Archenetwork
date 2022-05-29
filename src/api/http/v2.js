import axios from 'axios'
import config from '@/config'
import { notifyApiErrorInfo } from 'utils/notification'

const request = axios.create({
  baseURL: config.apiV2,
  timeout: 20000,
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
  if (data.code === 200) {
    return data.result
  } else {
    if (config?.meta?.showErrorInfo) {
      notifyApiErrorInfo(data.message)
      return Promise.reject(data.message)
    } else {
      return data
    }
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
  }
  notifyApiErrorInfo(msg)
  // console.log('api response error: ', msg)
  console.log('api response error: ', error)
  return Promise.reject(msg)
})

export const _get = (url, query, showErrorInfo = true) => {
  return request.get(url, { params: query, meta: { showErrorInfo } })
}

export const _post = (url, body) => {
  return request.post(url, body, { meta: { showErrorInfo: true } })
}

export const _patch = (url, body) => {
  return request.patch(url, body, { meta: { showErrorInfo: true } })
}

export const _put = (url, body) => {
  return request.put(url, body, { meta: { showErrorInfo: true } })
}

export const _delete = (url) => {
  return request.delete(url, { meta: { showErrorInfo: true } })
}
