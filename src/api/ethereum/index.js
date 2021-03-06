/*
 * @Descripttion: ethereum
 * @Author: pujianguo
 * @Date: 2022-05-22 12:48:18
 */
import chains from '@/lib/chains'
import { toHex, hexToNumber } from 'api/ethers/utils'

/**
 * check ethereum
 * @return {Boolean}
 */
export const checkEthereum = () => {
  return !!window.ethereum
}

/**
 * Requesting user Authorization
 * connected return accounts array
 * no connect open dialog
 * @return {Promise} Promise
 */
export const requestAccounts = () => {
  return window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
    return accounts[0]
  }).catch(error => {
    let code = -1
    let message = ''
    if (error.code === 4001) {
      code = 4001
      message = 'Permissions needed to continue.'
    } else {
      if (error.code) {
        code = error.code
        message = error.message
      } else {
        message = error
      }
    }
    const err = { code, message }
    return Promise.reject(err)
  })
}

/**
 * get user account
 * not connect return null
 * @return {Promise} Promise
 */
export const getUserAddress = () => {
  return window.ethereum.request({ method: 'eth_accounts' }).then(accounts => {
    return accounts[0] || ''
  }).catch(error => {
    let code = -1
    let message = ''
    if (error.code) {
      code = error.code
      message = error.message
    } else {
      message = error
    }
    const err = { code, message }
    return Promise.reject(err)
  })
}

export const changeEthereumChain = (chainId) => {
  // if (isMobile()) {
  //   return changeEthereumChainForMobile(chainId)
  // }
  return changeEthereumChainForPc(chainId)
}

/**
 * add chain
 * @return {Promise} Promise Object
 */
export const addEthereumChain = (chainId) => {
  const chain = chains.find(x => x.chainId === chainId)
  const params = {
    chainId: toHex(chainId + ''),
    chainName: chain.name,
    rpcUrls: chain.rpc,
    blockExplorerUrls: [((chain.explorers && chain.explorers.length > 0 && chain.explorers[0].url) ? chain.explorers[0].url : chain.infoURL)],
    nativeCurrency: {
      name: chain.nativeCurrency.nativeName,
      symbol: chain.nativeCurrency.symbol,
      decimals: chain.nativeCurrency.decimals,
    },
  }
  return window.ethereum.request({ method: 'wallet_addEthereumChain', params: [params] }).then(result => {
    return result
  }).catch(error => {
    let message = ''
    let code = 0
    if (error.code === 4001) {
      message = 'Permissions needed to continue.'
      code = 4001
    } else if (error.code === -32602) {
      message = 'May not specify default MetaMask chain.'
      code = -32602
    } else {
      if (error.message) {
        message = error.message
        code = error.code
      } else {
        message = error
      }
    }
    const res = {
      code, message,
    }
    return Promise.reject(res)
  })
}

/**
 * change chain
 * @return {Promise} Promise Object
 */
export const switchEthereumChain = (chainId) => {
  return window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: toHex(chainId) }] }).then(result => {
    return result
  }).catch(error => {
    let message = ''
    let code = 0
    if (error.code === 4001) {
      message = 'Permissions needed to continue.'
      code = 4001
    } else if (error.code === 4902) {
      message = 'Unrecognized chain.'
      code = 4902
    } else {
      if (error.code) {
        code = error.code
        message = error.message
      } else {
        message = error
      }
    }
    const res = {
      code, message,
    }
    return Promise.reject(res)
  })
}

/**
 * get current chain
 * @return {Promise}
 */
export const getWindowNetwork = () => {
  return window.ethereum.request({ method: 'eth_chainId' }).then(res => {
    res = hexToNumber(res)
    return res
  }).catch(err => {
    return Promise.reject(err)
  })
}
/**
 * mobile change add chain
 * @return {Promise} Promise
 */
export const changeEthereumChainForMobile = (chainId) => {
  const timer = setTimeout(() => {
    // Dialog.alert({ message: 'Please refresh the page' })
  }, 10000)
  return addEthereumChain(chainId).then(res => {
    clearTimeout(timer)
    window.location.reload()
  }).catch(error => {
    clearTimeout(timer)
    if (error.code === -32602) {
      return switchEthereumChain(chainId).then(res => {
        window.location.reload()
      }).catch(error => {
        return Promise.reject(error)
      })
    } else {
      return Promise.reject(error)
    }
  })
}

/**
 * pc add/change chain
 * @return {Promise} Promise
 */
export const changeEthereumChainForPc = (chainId) => {
  return switchEthereumChain(chainId).then(res => {
    // window.location.reload()
  }).catch(error => {
    if (error.code === 4902) {
      return addEthereumChain(chainId).then(res => {
        return Promise.resolve()
      }).catch(error => {
        return Promise.reject(error)
      })
    } else {
      return Promise.reject(error)
    }
  })
}
