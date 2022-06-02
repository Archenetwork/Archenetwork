/*
 * @Descripttion: config
 * @Author: pujianguo
 * @Date: 2022-05-22 23:12:59
 */

const ENV = import.meta.env

export default {
  env: ENV.MODE,
  baseUrl: ENV.VITE_BASEURL,
  apiV2: ENV.VITE_API_V2,
  chains: ENV.VITE_CHAINS,
  agencyContractAddress: ENV.VITE_AGENCY_CONTRACT,
  archeContractAddress: ENV.VITE_ARCHE_CONTRACT,

  // common
  defaultAvatar: '/images/avatar.png',
  uploadUrl: 'https://appgraph.arche.network',
}
