/*
 * @Descripttion: File Function
 * @Author: pujianguo
 * @Date: 2022-01-05 13:48:26
 */
// import sparkMD5 from 'spark-md5'

/**
 * blob to string
 * @param {Blob} blob file
 * @return {String} string result
 */
export const blobToString = blob => {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = function () {
      const ret = reader.result.split('')
        .map(v => v.charCodeAt())
        .map(v => v.toString(16).toUpperCase())
        .map(v => v.padStart(2, '0'))
        .join(' ')
      resolve(ret)
    }
    reader.readAsBinaryString(blob)
  })
}

// check file type
/**
 * is gif
 * @param {Blob} file
 * @return {Boolean}
 */
export const isGif = async file => {
  // GIF89a And GIF87a
  // '47 49 46 38 39 61' '47 49 46 38 37 61'
  const ret = await blobToString(file.slice(0, 6))
  const isGif = (ret === '47 49 46 38 39 61') || (ret === '47 49 46 38 37 61')
  return isGif
}
/**
 * is png
 * @param {Blob} file
 * @return {Boolean}
 */
export const isPng = async file => {
  const ret = await blobToString(file.slice(0, 8))
  const isPng = (ret === '89 50 4E 47 0D 0A 1A 0A')
  return isPng
}
/**
 * is jpg
 * @param {Blob} file
 * @return {Boolean}
 */
export const isJpg = async file => {
  const len = file.size
  const start = await blobToString(file.slice(0, 2))
  const tail = await blobToString(file.slice(-2, len))
  const isJpg = (start === 'FF D8') && (tail === 'FF D9')
  return isJpg
}
/**
 * is allow image type
 * @param {Blob} file
 * @param {Array} types allow type，default: ['png', 'jpg', 'gif']
 * @return {String|null} type or null
 */
export const getImageType = async (file, types = []) => {
  types = types || ['png', 'jpg', 'gif']
  for (let i = 0; i < types.length; i++) {
    if (types[i] === 'png' && await isPng(file)) {
      return 'png'
    }
    if (types[i] === 'jpg' && await isJpg(file)) {
      return 'jpg'
    }
    if (types[i] === 'gif' && await isGif(file)) {
      return 'gif'
    }
  }
  return null
}

// get file Hash
export const calculateHashSample = async (file) => {
  return new Promise(resolve => {
    // TODO:
    // const spark = new sparkMD5.ArrayBuffer()
    const spark = ''
    const reader = new FileReader()

    const size = file.size
    const offset = 2 * 1024 * 1024
    const chunks = [file.slice(0, offset)]

    let cur = offset
    while (cur < size) {
      if (cur + offset >= size) {
        chunks.push(file.slice(cur, cur + offset))
      } else {
        // middle block
        const mid = cur + offset / 2
        const end = cur + offset
        chunks.push(file.slice(cur, cur + 2))
        chunks.push(file.slice(mid, mid + 2))
        chunks.push(file.slice(end - 2, end))
      }
      cur += offset
    }
    reader.readAsArrayBuffer(new Blob(chunks))
    reader.onload = e => {
      spark.append(e.target.result)
      resolve(spark.end())
    }
  })
}

/**
 * get Image Url
 * @param {Blob} file
 * @return {String} url
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

export const getImageInfo = (file) => {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = function (e) {
      const data = e.target.result
      const image = new Image()
      image.onload = function () {
        const { width, height } = image
        resolve({ width, height })
      }
      image.src = data
    }
    reader.readAsDataURL(file)
  })
}
