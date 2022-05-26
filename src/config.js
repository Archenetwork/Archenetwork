/*
 * @Descripttion: config
 * @Author: pujianguo
 * @Date: 2022-05-22 23:12:59
 */

const ENV = import.meta.env

export default {
  env: ENV.MODE,
  baseUrl: ENV.VITE_BASEURL,
  chains: ENV.VITE_CHAINS,
  agencyContractAddress: ENV.VITE_AGENCY_CONTRACT,

  // common
  defaultAvatar: '/images/avatar.png',
}
