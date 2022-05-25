import { showEthersError } from '@/utils/func'
import { getContract } from './index'
import sendCoinAbi from '@/abi/sendCoinAbi'
import config from '@/config'

export const getApproveContract = (address, isSigner) => {
  return getContract(sendCoinAbi, address, isSigner)
}

export const rewardApproveHandle = token => {
  const contract = getApproveContract(token, true)
  return contract.approve(config.agencyContractAddress, (Math.pow(2, 256) - 1).toString(16)).catch(err => {
    showEthersError(err)
    return Promise.reject(err)
  })
}
export const checkRewardApprove = (account, token) => {
  const contract = getApproveContract(token)
  return contract.allowance(account, config.agencyContractAddress).catch(err => {
    showEthersError(err)
    return Promise.reject(err)
  })
}
