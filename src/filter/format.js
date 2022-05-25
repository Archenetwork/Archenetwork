/*
 * @Descripttion: Format Function
 * @Author: pujianguo
 * @Date: 2022-05-22 14:46:34
 *
 * use eg: format('date', new Date())
 */
import dayjs from 'dayjs'

export default {
  // Submit Time For Backend
  submitTime (t) {
    t = t || new Date()
    return dayjs(t).format()
  },
  // Component Time
  componentTime (t) {
    t = t || new Date()
    return (new Date(t)).getTime()
  },

  /** *************** Time Correlation *************** **/
  month: t => {
    if (!t) return ''
    return dayjs(Number(t)).format('YYYY-MM')
  },
  date: t => {
    if (!t) return ''
    return dayjs(Number(t)).format('YYYY-MM-DD')
  },
  minute: t => {
    if (!t) return ''
    return dayjs(Number(t)).format('YYYY-MM-DD HH:mm')
  },
  second: t => {
    if (!t) return ''
    return dayjs(Number(t)).format('YYYY-MM-DD HH:mm:ss')
  },
  timestamp: t => {
    if (!t) return ''
    return dayjs(Number(t)).unix()
  },

  /** *************** Data Correlation *************** **/
  //  Data String
  decimalString (value, decimals = 2) {
    value = parseFloat(value + '')
    value = Number.isNaN(value) ? 0 : value
    return value.toFixed(decimals)
  },
  // Float
  decimalFloat (value, decimals = 2) {
    return parseFloat(this.decimalString(value, decimals))
  },
  // Int   0, Number('a'), parseInt('a')  => NaN
  int (value) {
    value = parseInt(value + '')
    return Number.isNaN(value) ? 0 : value
  },

  // File Size
  fileSize (bytes, decimal = 2) {
    if (!bytes) {
      return '0B'
    }
    if (bytes < 1024) {
      return bytes.toFixed(decimal) + 'B'
    }
    const e = Math.floor(Math.log(bytes) / Math.log(1024))
    return (bytes / Math.pow(1024, e)).toFixed(decimal) + '' + 'KMGTP'.charAt(e - 1) + 'B'
  },
}
