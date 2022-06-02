
import { getContract } from './index'
import archeAbi from '@/abi/archeAbi'
import config from '@/config'

export const mint = (account, token) => {
  const contract = getContract(archeAbi, config.archeContractAddress)
  return contract.mint(account, config.agencyContractAddress).catch(err => {
    return Promise.reject(err)
  })
}
