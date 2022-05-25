/*
 * @Descripttion: notify dialog
 * @Author: pujianguo
 * @Date: 2022-05-22 11:32:20
 */
import { ElNotification } from 'element-plus'

export const showRequestLoading = () => {

}
export const hideRequestLoading = () => {

}
export const showRequestError = () => {

}

export const notifyApiErrorInfo = (msg) => {
  ElNotification.error({ title: 'Api Error', message: msg })
}
