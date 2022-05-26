import { getChainInfoById } from '@/utils/func'
import { hexToNumber, toHex } from 'api/ethers/utils'
import { ethers } from 'ethers'
import useWalletStore from 'store/wallet'
import {
  AddChainError,
  ChainNotConfiguredError,
  ConnectorNotFoundError,
  SwitchChainError,
  UserRejectedRequestError
} from './errors'

export class InjectedConnector {
  id = 'metamask'
  name = 'MetaMask'
  ready = typeof window !== 'undefined' && !!window.ethereum
  _provider = window.ethereum

  // constructor(config) {
  //   // this.chains = config.chains
  //   // this.options = config.options
  // }

  async connect() {
    try {
      const provider = this.getProvider()
      if (!provider) throw new ConnectorNotFoundError()

      if (provider.on) {
        provider.on('accountsChanged', this.onAccountsChanged)
        provider.on('chainChanged', this.onChainChanged)
        provider.on('disconnect', this.onDisconnect)
      }

      const account = await this.getAccount()
      const id = await this.getChainId()
      const walletStore = useWalletStore()
      walletStore.setConnect({account,chainId: id, walletType: 1})
      window.web3Provider = new ethers.providers.Web3Provider(window.ethereum)
      return {
        account,
        chainId: id,
      }
    } catch (error) {
      if (error.code === 4001) { throw new UserRejectedRequestError() }
      throw error
    }
  }

  async disconnect() {
    const provider = this.getProvider()
    if (!provider?.removeListener) return
    provider.removeListener('accountsChanged', this.onAccountsChanged)
    provider.removeListener('chainChanged', this.onChainChanged)
    provider.removeListener('disconnect', this.onDisconnect)

    const walletStore = useWalletStore()
    walletStore.setDisconnect()
  }

  async getAccount() {
    const provider = this.getProvider()
    if (!provider) throw new ConnectorNotFoundError()
    return window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
      return accounts[0]
    }).catch(error => {
      if (error.code === 4001) {
        throw new UserRejectedRequestError()
      }
      throw error
    })
  }

  async getChainId() {
    const provider = this.getProvider()
    if (!provider) throw new ConnectorNotFoundError()
    return await provider.request({ method: 'eth_chainId' }).then(res => {
      res = hexToNumber(res)
      return res
    })
  }

  getProvider() {
    if (typeof window !== 'undefined' && !!window.ethereum) { this._provider = window.ethereum }
    return this._provider
  }

  // async getSigner() {
  //   const provider = this.getProvider()
  //   const account = await this.getAccount()
  //   return new Web3Provider(provider).getSigner(account)
  // }

  async isAuthorized() {
    try {
      const provider = this.getProvider()
      if (!provider) throw new ConnectorNotFoundError()
      const accounts = await provider.request({
        method: 'eth_accounts'
      })
      const account = accounts[0]
      return !!account
    } catch {
      return false
    }
  }

  async switchChain(chainId) {
    const provider = this.getProvider()
    if (!provider) throw new ConnectorNotFoundError()
    const id = toHex(chainId)
    try {
      await provider.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: id }] })
    } catch (error) {
      // Indicates chain is not added to MetaMask
      if (error.code === 4902) {
        try {
          const chain = getChainInfoById(chainId)
          if (!chain) throw new ChainNotConfiguredError()
          chain.chainId = id
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: chain
          })
        } catch (err) {
          throw new AddChainError()
        }
      } else if (error.code === 4001) {
        throw new UserRejectedRequestError()
      } else {
        throw new SwitchChainError()
      }
    }
  }

  onAccountsChanged = (accounts) => {
    const walletStore = useWalletStore()
    if (accounts.length === 0) {
      walletStore.setDisconnect()
    } else {
      walletStore.setAccount(accounts[0])
    }
  }

  onChainChanged = (chainId) => {
    const walletStore = useWalletStore()
    const id = hexToNumber(chainId)
    walletStore.setChainId(id)
  }

  onDisconnect = () => {
    // change chain auto disconnect
    // const walletStore = useWalletStore()
    // walletStore.setDisconnect()
  }
}
