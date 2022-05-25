/*
 * @Descripttion: validate
 * @Author: pujianguo
 * @Date: @Date: 2022-05-22 23:12:59
 */

/** ***********************************  Regular expression  *********************************** **/
export const regExpPhone = /^1[34578]\d{9}$/
export const regExpEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
export const regExpAddress = /^0x[0-9a-zA-Z]{40}$/

/** ***********************************  Regular check  *********************************** **/
export const validatePhone = function (value) {
  return regExpPhone.test(value)
}
export const validateEmail = function (value) {
  return regExpEmail.test(value)
}

/** ***********************************  Regularize the form validator  *********************************** **/
// check chinese length
export const validateFormChineseLength = (min = 2, max = 10) => (rule, value, callback) => {
  const reg = new RegExp(`^[\u4e00-\u9fa5]{${min},${max}}$`)
  if (!reg.test(value)) {
    callback(new Error())
    return
  }
  callback()
}
