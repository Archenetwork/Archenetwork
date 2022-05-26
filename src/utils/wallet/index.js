// import config from '@/config'
import chains from '@/lib/chains'
import { InjectedConnector } from './injected'
import { WalletConnectConnector } from './walletConnect'

export const connectMetamask = async (chainId, isInit = false) => {
  // disconnect
  window.walletInstance && window.walletInstance.disconnect()
  window.walletInstance = new InjectedConnector()
  await window.walletInstance.connect()
  // connect network
  // const chainId = await window.walletInstance.getChainId()
  // if (chainId !== config.chainId) {
  //   await window.walletInstance.switchChain(config.chainId)
  // }
  const currentChainId = await window.walletInstance.getChainId()
  if (currentChainId !== chainId) {
    await window.walletInstance.switchChain(chainId)
  }
  if (isInit) {
    await window.walletInstance.getAccount()
  } else {
    window.location.reload()
  }
}
export const connectWalletConnect = async (chainId, isInit = false) => {
  // disconnect
  window.walletInstance && window.walletInstance.disconnect()
  // const chainId = 97
  const chain = chains[chainId]
  const options = {
    rpc: {},
  }
  options.rpc[chain] = chain.rpcUrls[0]
  window.walletInstance = new WalletConnectConnector({ options })
  await window.walletInstance.connect()
  if (isInit) {
    await window.walletInstance.getAccount()
  } else {
    window.location.reload()
  }
}

export const switchChain = async (chainId) => {
  // if (walletType === 1) {
  //   window.walletInstance && window.walletInstance.switchChain()
  // } else if (walletType === 2) {
  //   window.walletInstance && window.walletInstance.switchChain()
  // }
  if (window.walletInstance) {
    return window.walletInstance.switchChain(chainId)
  }
}
