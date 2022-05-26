import WalletConnectProvider from '@walletconnect/web3-provider'
import { hexToNumber } from 'api/ethers/utils'
import { UserRejectedRequestError } from './errors'
import useWalletStore from 'store/wallet'

export class WalletConnectConnector {
  id = 'walletConnect'
  name = 'WalletConnect'
  ready = true
  _provider = null

  constructor(config) {
    this.options = config.options
  }

  async connect() {
    try {
      const provider = this.getProvider(true)
      provider.on('accountsChanged', this.onAccountsChanged)
      provider.on('chainChanged', this.onChainChanged)
      provider.on('disconnect', this.onDisconnect)
      const accounts = await provider.enable()
      const account = accounts[0]
      const id = await this.getChainId()
      const walletStore = useWalletStore()
      walletStore.setConnect({account, chainId: id, walletType: 2})
      window.web3Provider = new ethers.providers.Web3Provider(provider)
      return {
        account,
        chainId: id,
      }
    } catch (error) {
      if (error.message === 'User closed modal') { throw new UserRejectedRequestError() }
      throw error
    }
  }

  async disconnect() {
    const provider = this.getProvider()
    await provider.disconnect()

    provider.removeListener('accountsChanged', this.onAccountsChanged)
    provider.removeListener('chainChanged', this.onChainChanged)
    provider.removeListener('disconnect', this.onDisconnect)

    const walletStore = useWalletStore()
    walletStore.setDisconnect()
  }

  async getAccount() {
    const provider = this.getProvider()
    const accounts = provider.accounts
    // return checksum address
    return accounts[0]
  }

  async getChainId() {
    const provider = this.getProvider()
    return provider.chainId
  }

  getProvider(create) {
    if (!this._provider || create) {
      this._provider = new WalletConnectProvider(this.options)
    }
    return this._provider
  }

  // async getSigner() {
  //   const provider = this.getProvider()
  //   const account = await this.getAccount()
  //   return new Web3Provider(provider).getSigner(account)
  // }

  async isAuthorized() {
    try {
      const account = await this.getAccount()
      return !!account
    } catch {
      return false
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
    const walletStore = useWalletStore()
    walletStore.setDisconnect()
  }

  // TODO: change chain
  // change option, connect again
  switchChain = () => {
  }
}
