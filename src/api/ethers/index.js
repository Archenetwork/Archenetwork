/*
 * @Descripttion: ethers
 * @Author: pujianguo
 * @Date: 2022-05-22 17:57:38
 */
import { ethers } from 'ethers'

/**
 * get contract
 * @param {Object} abi
 * @param {String} address
 * @param {Boolean} isSigner
 * @return {Object} contact
 */
export const getContract = (abi, address, isSigner = false) => {
  const contract = new ethers.Contract(address, abi, window.web3Provider)
  if (isSigner) {
    const signer = window.web3Provider.getSigner()
    return contract.connect(signer)
  }
  return contract
}

/**
 * get gasPrice
 * @return {Promise}
 */
export const getGasPrice = () => {
  return window.web3Provider.getGasPrice()
}
