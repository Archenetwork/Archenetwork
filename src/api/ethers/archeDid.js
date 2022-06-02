
import { getContract } from './index'
import archeDidAbi from '@/abi/archeDidAbi'
import config from '@/config'

export const mint = (account, token) => {
  console.log('archeDidAbi1', archeDidAbi, token)
  const contract = getContract(archeDidAbi, config.archeContractAddress)

  return contract.mint(account, config.agencyContractAddress).catch(err => {
    return Promise.reject(err)
  })
}
