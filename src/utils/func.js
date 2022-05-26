/*
 * @Descripttion:
 * @Author: pujianguo
 * @Date: 2022-05-22 19:43:01
 */
import * as filterConst from '@/filter/const'
import formatFunc from '@/filter/format'
import storage from 'utils/storage'
import { ElMessage, ElNotification, ElMessageBox } from 'element-plus'
import chains from '@/lib/chains'
import useLocalStore from '@/store/local'
import config from '@/config'

export const checkWalletHandle = (checkChain = 0) => {
  const localStore = useLocalStore()
  const userAddress = localStore.userAddress
  const currentNetworkId = localStore.network.id
  if (!currentNetworkId) {
    ElMessage.error('Net error')
    return false
  }
  if (checkChain && currentNetworkId !== checkChain) {
    // TODO:
    // const chainName = 'BSC'
    // ElMessage.error({ title: 'Warning Info', message: `Please switch to the ${chainName} chain` })
    ElMessage.error('Net error')
    return false
  }
  if (!userAddress) {
    ElMessage.error('Connect wallet')
    return false
  }
  const whitelist = config.addressWhitelist[currentNetworkId] || []
  if (!whitelist.includes(userAddress)) {
    ElMessage.error('Wallet unavailable')
    return false
  }
  return true
}

export const showEthersError = info => {
  ElNotification.warning({
    title: 'Error Info',
    message: info.message || '',
  })
}

/** *************** data *************** **/
/**
 * Deep copy data
 * @param {Object} data old data
 * @return {Object} new data
 */
export const copy = data => {
  return JSON.parse(JSON.stringify(data))
}
/**
 * json data to array
 * @param {Object} obj  json data
 * @param {Object|null} firstItem first item，eg:{value: '', label: 'Please select xxx'}
 * @param {String} type key type:string/number/boolean
 * @return {Array} result
 */
export const constDataToArray = (obj, firstItem = null, type = 'string') => {
  const arr = []
  if (type === 'string') {
    Object.keys(obj).forEach(k => {
      if (k !== 'default') {
        arr.push({ value: k, label: obj[k] })
      }
    })
  } else if (type === 'number') {
    Object.keys(obj).forEach(k => {
      if (k !== 'default') {
        arr.push({ value: Number(k), label: obj[k] })
      }
    })
  } else if (type === 'boolean') {
    Object.keys(obj).forEach(k => {
      if (k !== 'default') {
        arr.push({ value: k === 'true', label: obj[k] })
      }
    })
  }
  if (firstItem) {
    arr.unshift(firstItem)
  }
  return arr
}

/**
 * filter
 * @param {String} filterName
 * @param {String} arg  params
 * @return {String|Number} result
 */
export const filter = (filterName, arg) => {
  const data = filterConst[`${filterName}Data`]
  return data ? (data[arg] || data.default) : ''
}
/**
 * format
 * @param {String} formatName
 * @param {Array} args params
 * @return {String|Number} result
 */
export const format = (formatName, ...args) => {
  return formatFunc[formatName] ? formatFunc[formatName](...args) : ''
}

/** *************** time *************** **/
/**
 * Gets the time of the last few hours
 * @param {number} n In the last n hours, a negative number means forward
 * @param {Date|String} t Start time, default is current time
 * @param {string} filterName  result format, value: month、date、minute、second
 * @return {String} result
 */
export const getRecentHour = (n, t, filterName = 'second') => {
  const now = t ? (new Date(t)) : new Date()
  now.setHours(now.getHours() + n)
  return filter(filterName, now)
}
/**
 * Get the time of the last few days
 * @param {number} n In the last n days, a negative number means forward
 * @param {Date|String} t Start time, default is current time
 * @param {string} filterName result format, value: month、date、minute、second
 * @return {String} result
 */
export const getRecentDate = (n, t, filterName = 'date') => {
  const now = t ? (new Date(t)) : new Date()
  now.setDate(now.getDate() + n)
  return filter(filterName, now)
}

/**
 * sleep
 * @param {number} n time
 * @return {Promise}
 */
export const sleep = (s) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve('')
    }, s)
  })
}

export const console = function (json, flag = 'log') {
  const a = [`${flag}--------------------`]
  for (const k in json) {
    if (typeof json[k] === 'object') {
      a.push(`${k}: ${JSON.stringify(json[k])}`)
    } else {
      a.push(`${k}: ${json[k]}`)
    }
  }
  a.push('--------------------')
  window.console.log(a.join('\n'))
}

/**
 * Numbers to letters
 * eg:1->A
 * @param num
 * @returns {string}
 */
export const convert = (num) => {
  let result = ''
  while (num) {
    result = String.fromCharCode(--num % 26 + 65) + result
    num = Math.floor(num / 26)
  }
  return result
}

/**
 * get Image URL
 * @param {Blob} file
 * @return {String} result
 */
export const getImageObjectURL = (file) => {
  let url = null
  if (window.createObjectURL !== undefined) { // basic
    url = window.createObjectURL(file)
  } else if (window.URL !== undefined) { // mozilla(firefox)
    url = window.URL.createObjectURL(file)
  } else if (window.webkitURL !== undefined) { // webkit or chrome
    url = window.webkitURL.createObjectURL(file)
  }
  return url
}

/**
 * Infinite pole classification
 * @param {Array} cate
 * @param {Number} pid parent id
 * @param {String} k id key
 * @return {Array} The result of hierarchy nesting
 */
export const unlimitedForLayer = (cate, pid = 0) => {
  const arr = []
  cate.forEach(x => {
    if (x.parentId === pid) {
      x.children = unlimitedForLayer(cate, x.id)
      arr.push(x)
    }
  })
  return arr
}

/**
 * element-plus check some fields
 * @param {Object} formRef current Form Object
 * @param {Array} fields Field to validate
 * @return {Boolean} result
 */
export const validateFields = (formRef, fields) => {
  let count = 0
  formRef.value.validateField(fields, c => {
    if (!c) {
      count++
    }
  })
  if (count === fields.length) {
    return true
  }
  return false
}

/**
 * get current language
 * @return {String}
 */
export const getLanguage = () => {
  const re = storage.getLisaStore()
  if (!re) {
    if (navigator.language.includes('zh')) {
      return 'zh'
    }
    return 'en'
  } else {
    return re.language
  }
}

export const getContextContent = (modules) => {
  const config = {}
  Object.keys(modules).forEach(filename => {
    const content = modules[filename].default || modules[filename]
    const module = filename.replace(/(.*\/)*([^.]+).*/ig, '$2')
    config[module] = content
  })
  return config
}

// json data sort
export const sortJson = (arr, key, order = 'asc') => {
  if (order === 'asc') {
    return arr.sort((a, b) => {
      return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0
    })
  } else {
    return arr.sort((a, b) => {
      return a[key] > b[key] ? -1 : a[key] < b[key] ? 1 : 0
    })
  }
}

// json data to FormData
export const jsonToFormData = (data) => {
  const body = new FormData()
  Object.keys(data).forEach(key => {
    body.append(key, data[key])
  })
  return body
}

export const throttle = (fn, interval = 300) => {
  let canRun = true
  return function () {
    if (!canRun) return
    canRun = false
    setTimeout(() => {
      fn.apply(this, arguments)
      canRun = true
    }, interval)
  }
}

export const debounce = (fn, interval = 300) => {
  let timer = null
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, interval)
  }
}

export const getGroupList = (list, n = 4) => {
  const arr = []
  list.forEach((x, i) => {
    const col = Math.floor(i / n)
    if (!arr[col]) {
      arr[col] = []
    }
    arr[col].push(x)
  })
  return arr
}

export const getCountdown = (t) => {
  const d = Math.floor(t / (24 * 60 * 60))
  const h = Math.floor((t % (24 * 60 * 60)) / (60 * 60)).toString().padStart(2, '0')
  const m = Math.floor((t % (60 * 60)) / 60).toString().padStart(2, '0')
  const s = Math.floor(t % 60).toString().padStart(2, '0')
  return { d, h, m, s }
}
export const getCountdownObj = (t) => {
  const { d, h, m, s } = getCountdown(t)
  return {
    d: d,
    t: `${h}:${m}:${s}`,
  }
}

export const getShortAddress = address => {
  return address ? `${address.substr(0, 4)}...${address.substr(-4)}` : ''
}

export const getBlockExplorerUrls = id => {
  return chains[id].blockExplorerUrls[0]
}

export const getChainInfoById = id => {
  return chains[id] || null
}
export const getChainList = () => {
  const ids = config.chains.split(',')
  return ids.map(id => {
    const item = chains[id]
    return {
      chainId: Number(item.chainId),
      chainName: item.chainName,
      showName: item.showName,
      icon: item.icon,
    }
  })
}
export const getNumberShortString = (number, len) => {
  let numberString = number.toString()
  const numberLen = numberString.length
  const isShort = numberLen > len
  if (isShort) {
    numberString = numberString.substr(0, len)
  }
  const arr = []
  while (numberString.length > 0) {
    arr.unshift(numberString.slice(-3))
    numberString = numberString.slice(0, -3)
  }
  let res = arr.join(',')
  if (isShort) {
    res = res + '+'
  }
  return res
}

// confirm dialog
export const confirmExecHandle = (title, text, callback, cancelCallBack = null) => {
  return ElMessageBox.confirm(text, title, {
    type: 'warning',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        instance.confirmButtonText = 'Running...'
        instance.showClose = false
        instance.closeOnClickModal = false
        instance.closeOnPressEscape = false
        instance.showCancelButton = false

        callback().finally(() => {
          done()
          setTimeout(() => {
            instance.confirmButtonLoading = false
          }, 300)
        })
      } else {
        done()
        // ElMessage.info('Cancel the operation')
        cancelCallBack && cancelCallBack()
      }
    },
  }).then(() => {}).catch(() => {})
}

// check install metamask
export const checkInstallMetamask = () => {
  if (!window.ethereum) {
    ElMessage({
      showClose: true,
      message: "No browser wallet detected. You'll need to <a target='_blank' href='https://metamask.io/download/'>install MetaMask</a> to continue. Once you have it installed, go ahead and refresh the page.",
      dangerouslyUseHTMLString: true,
      type: 'error',
    })
    return false
  } else {
    return true
  }
}
