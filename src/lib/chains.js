export default {
  // bsc testnet
  97: {
    showName: 'BSC',
    icon: 'bsc',
    chainId: 97,
    chainName: 'Binance Smart Chain Testnet',
    rpcUrls: [
      'https://data-seed-prebsc-2-s2.binance.org:8545',
      'https://data-seed-prebsc-1-s1.binance.org:8545',
      'https://data-seed-prebsc-2-s1.binance.org:8545',
      'https://data-seed-prebsc-1-s2.binance.org:8545',
      'https://data-seed-prebsc-1-s3.binance.org:8545',
      'https://data-seed-prebsc-2-s3.binance.org:8545',
    ],
    blockExplorerUrls: ['https://testnet.bscscan.com'],
    nativeCurrency: {
      name: 'Binance Chain Native Token',
      symbol: 'tBNB',
      decimals: 18,
    },
  },
  // bsc mainnet
  56: {
    showName: 'BSC',
    icon: 'bsc',
    chainId: 56,
    chainName: 'Binance Smart Chain Mainnet',
    rpcUrls: [
      'https://bsc-dataseed.binance.org',
      'https://bsc-dataseed1.binance.org',
      'https://bsc-dataseed2.binance.org',
      'https://bsc-dataseed3.binance.org',
      'https://bsc-dataseed4.binance.org',
      'https://bsc-dataseed1.defibit.io',
      'https://bsc-dataseed2.defibit.io',
      'https://bsc-dataseed3.defibit.io',
      'https://bsc-dataseed4.defibit.io',
      'https://bsc-dataseed1.ninicoin.io',
      'https://bsc-dataseed2.ninicoin.io',
      'https://bsc-dataseed3.ninicoin.io',
      'https://bsc-dataseed4.ninicoin.io',
    ],
    blockExplorerUrls: ['https://bscscan.com'],
    nativeCurrency: {
      name: 'Binance Chain Native Token',
      symbol: 'BNB',
      decimals: 18,
    },
  },

  // eth testnet
  3: {
    showName: 'Ethereum',
    icon: 'eth',
    chainId: 3,
    chainName: 'Ethereum Testnet Ropsten',
    rpcUrls: ['https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
    blockExplorerUrls: ['https://github.com/ethereum/ropsten'],
    nativeCurrency: {
      name: 'Ropsten Ether',
      symbol: 'ROP',
      decimals: 18,
    },
  },
  // eth mainnet
  1: {
    showName: 'Ethereum',
    icon: 'eth',
    chainId: 1,
    chainName: 'Ethereum Mainnet',
    rpcUrls: ['https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
    blockExplorerUrls: ['https://etherscan.io'],
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
  },
}
