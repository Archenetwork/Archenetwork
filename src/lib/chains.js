// https://chainid.network/chains.json
export default [
  {
    name: 'Ethereum Mainnet',
    showName: 'Ethereum Mainnet',
    chain: 'ETH',
    icon: 'eth',
    rpc: [
      'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    ],
    faucets: [],
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    infoURL: 'https://ethereum.org',
    shortName: 'eth',
    chainId: 1,
    networkId: 1,
    slip44: 60,
    ens: {
      registry: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    },
    explorers: [
      {
        name: 'etherscan',
        url: 'https://etherscan.io',
        standard: 'EIP3091',
      },
    ],
  },
  {
    name: 'Ethereum Testnet Ropsten',
    showName: 'Ethereum Testnet',
    chain: 'ETH',
    icon: 'eth',
    rpc: [
      'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    ],
    faucets: [
      'https://faucet.ropsten.be?${ADDRESS}',
    ],
    nativeCurrency: {
      name: 'Ropsten Ether',
      symbol: 'ROP',
      decimals: 18,
    },
    infoURL: 'https://github.com/ethereum/ropsten',
    shortName: 'rop',
    chainId: 3,
    networkId: 3,
    ens: {
      registry: '0x112234455c3a32fd11230c42e7bccd4a84e02010',
    },
  },
  {
    name: 'Binance Smart Chain Mainnet',
    showName: 'Binance Mainnet',
    chain: 'BSC',
    icon: 'bsc',
    rpc: [
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
      'wss://bsc-ws-node.nariox.org',
    ],
    faucets: [
      'https://free-online-app.com/faucet-for-eth-evm-chains/',
    ],
    nativeCurrency: {
      name: 'Binance Chain Native Token',
      symbol: 'BNB',
      decimals: 18,
    },
    infoURL: 'https://www.binance.org',
    shortName: 'bnb',
    chainId: 56,
    networkId: 56,
    slip44: 714,
    explorers: [
      {
        name: 'bscscan',
        url: 'https://bscscan.com',
        standard: 'EIP3091',
      },
    ],
  },
  {
    name: 'Binance Smart Chain Testnet',
    showName: 'Binance Testnet',
    chain: 'BSC',
    icon: 'bsc',
    rpc: [
      'https://data-seed-prebsc-2-s2.binance.org:8545',
      'https://data-seed-prebsc-1-s1.binance.org:8545',
      'https://data-seed-prebsc-2-s1.binance.org:8545',
      'https://data-seed-prebsc-1-s2.binance.org:8545',
      'https://data-seed-prebsc-1-s3.binance.org:8545',
      'https://data-seed-prebsc-2-s3.binance.org:8545',
    ],
    faucets: [
      'https://testnet.binance.org/faucet-smart',
    ],
    nativeCurrency: {
      name: 'Binance Chain Native Token',
      symbol: 'tBNB',
      decimals: 18,
    },
    infoURL: 'https://testnet.binance.org/',
    shortName: 'bnbt',
    chainId: 97,
    networkId: 97,
    explorers: [
      {
        name: 'bscscan-testnet',
        url: 'https://testnet.bscscan.com',
        standard: 'EIP3091',
      },
    ],
  },
  {
    name: 'Huobi ECO Chain Mainnet',
    showName: 'HECO Mainnet',
    chain: 'Heco',
    icon: 'heco',
    rpc: [
      'https://http-mainnet-node.huobichain.com',
      'https://http-mainnet.hecochain.com',
      'wss://ws-mainnet.hecochain.com',
    ],
    faucets: [
      'https://free-online-app.com/faucet-for-eth-evm-chains/',
    ],
    nativeCurrency: {
      name: 'Huobi ECO Chain Native Token',
      symbol: 'HT',
      decimals: 18,
    },
    infoURL: 'https://www.hecochain.com',
    shortName: 'heco',
    chainId: 128,
    networkId: 128,
    slip44: 1010,
    explorers: [
      {
        name: 'hecoinfo',
        url: 'https://hecoinfo.com',
        standard: 'EIP3091',
      },
    ],
  },
  {
    name: 'Huobi ECO Chain Testnet',
    showName: 'HECO Testnet',
    chain: 'Heco',
    icon: 'heco',
    rpc: [
      'https://http-testnet.hecochain.com',
      'wss://ws-testnet.hecochain.com',
    ],
    faucets: [
      'https://scan-testnet.hecochain.com/faucet',
    ],
    nativeCurrency: {
      name: 'Huobi ECO Chain Test Native Token',
      symbol: 'htt',
      decimals: 18,
    },
    infoURL: 'https://testnet.hecoinfo.com',
    shortName: 'hecot',
    chainId: 256,
    networkId: 256,
  },
]
