export const BSC_VAULT_ABI = [
  {
    inputs: [
      { internalType: 'address', name: '_token', type: 'address' },
      { internalType: 'address', name: '_controller', type: 'address' }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'spender',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      }
    ],
    name: 'Approval',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      }
    ],
    name: 'Transfer',
    type: 'event'
  },
  {
    constant: true,
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'spender', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'available',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'balance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'controller',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'subtractedValue', type: 'uint256' }
    ],
    name: 'decreaseAllowance',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }],
    name: 'deposit',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'depositAll',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'earn',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getPricePerFullShare',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'governance',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: 'reserve', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'harvest',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'addedValue', type: 'uint256' }
    ],
    name: 'increaseAllowance',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'max',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'min',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ internalType: 'address', name: '_controller', type: 'address' }],
    name: 'setController',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ internalType: 'address', name: '_governance', type: 'address' }],
    name: 'setGovernance',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ internalType: 'uint256', name: '_min', type: 'uint256' }],
    name: 'setMin',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'token',
    outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: 'sender', type: 'address' },
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ internalType: 'uint256', name: '_shares', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'withdrawAll',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  }
]

export const VALUE_LP_ABI = [
  {
    inputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'spender',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      }
    ],
    name: 'Approval',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount0',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount1',
        type: 'uint256'
      },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' }
    ],
    name: 'Burn',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount0',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount1',
        type: 'uint256'
      }
    ],
    name: 'Mint',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint112',
        name: 'collectedFee0',
        type: 'uint112'
      },
      {
        indexed: false,
        internalType: 'uint112',
        name: 'collectedFee1',
        type: 'uint112'
      }
    ],
    name: 'PaidProtocolFee',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount0In',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount1In',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount0Out',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount1Out',
        type: 'uint256'
      },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' }
    ],
    name: 'Swap',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint112',
        name: 'reserve0',
        type: 'uint112'
      },
      {
        indexed: false,
        internalType: 'uint112',
        name: 'reserve1',
        type: 'uint112'
      }
    ],
    name: 'Sync',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      }
    ],
    name: 'Transfer',
    type: 'event'
  },
  {
    constant: true,
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'MINIMUM_LIQUIDITY',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'PERMIT_TYPEHASH',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'address', name: '', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'value', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ internalType: 'address', name: 'to', type: 'address' }],
    name: 'burn',
    outputs: [
      { internalType: 'uint256', name: 'amount0', type: 'uint256' },
      { internalType: 'uint256', name: 'amount1', type: 'uint256' }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'factory',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'formula',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getCollectedFees',
    outputs: [
      { internalType: 'uint112', name: '_collectedFee0', type: 'uint112' },
      { internalType: 'uint112', name: '_collectedFee1', type: 'uint112' }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getReserves',
    outputs: [
      { internalType: 'uint112', name: '_reserve0', type: 'uint112' },
      { internalType: 'uint112', name: '_reserve1', type: 'uint112' },
      { internalType: 'uint32', name: '_blockTimestampLast', type: 'uint32' }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getSwapFee',
    outputs: [{ internalType: 'uint32', name: '_swapFee', type: 'uint32' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getTokenWeights',
    outputs: [
      { internalType: 'uint32', name: '_tokenWeight0', type: 'uint32' },
      { internalType: 'uint32', name: '_tokenWeight1', type: 'uint32' }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: '_token0', type: 'address' },
      { internalType: 'address', name: '_token1', type: 'address' },
      { internalType: 'uint32', name: '_tokenWeight0', type: 'uint32' },
      { internalType: 'uint32', name: '_swapFee', type: 'uint32' }
    ],
    name: 'initialize',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ internalType: 'address', name: 'to', type: 'address' }],
    name: 'mint',
    outputs: [{ internalType: 'uint256', name: 'liquidity', type: 'uint256' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'nonces',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'value', type: 'uint256' },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      { internalType: 'uint8', name: 'v', type: 'uint8' },
      { internalType: 'bytes32', name: 'r', type: 'bytes32' },
      { internalType: 'bytes32', name: 's', type: 'bytes32' }
    ],
    name: 'permit',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'price0CumulativeLast',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'price1CumulativeLast',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ internalType: 'address', name: 'to', type: 'address' }],
    name: 'skim',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { internalType: 'uint256', name: 'amount0Out', type: 'uint256' },
      { internalType: 'uint256', name: 'amount1Out', type: 'uint256' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'bytes', name: 'data', type: 'bytes' }
    ],
    name: 'swap',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'sync',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'token0',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'token1',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'value', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'value', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  }
]

export const bscTokens = [
  {
    id: 'wbnb',
    symbol: 'wbnb',
    contract: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
  },
  {
    id: 'binance-usd',
    symbol: 'busd',
    contract: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'
  },
  {
    id: 'pancakeswap-token',
    symbol: 'CAKE',
    contract: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82'
  },
  {
    id: 'beefy-finance',
    symbol: 'BIFI',
    contract: '0xca3f508b8e4dd382ee878a314789373d80a5190a'
  },
  {
    id: 'bdollar-share',
    symbol: 'sBDO',
    contract: '0x0d9319565be7f53cefe84ad201be3f40feae2740'
  },
  {
    id: 'belugaswap',
    symbol: 'BELUGA',
    contract: '0x181de8c57c4f25eba9fd27757bbd11cc66a55d31'
  },
  {
    id: 'chainlink',
    symbol: 'LINK',
    contract: '0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd'
  },
  {
    id: 'bscex',
    symbol: 'BSCX',
    contract: '0x5ac52ee5b2a633895292ff6d8a89bb9190451587'
  },
  {
    id: 'binance-eth',
    symbol: 'BETH',
    contract: '0x250632378e573c6be1ac2f97fcdf00515d0aa91b'
  },
  {
    id: 'tether',
    symbol: 'USDT',
    contract: '0x55d398326f99059fF775485246999027B3197955'
  },
  {
    id: 'bitcoin-bep2',
    symbol: 'BTCB',
    contract: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c'
  },
  {
    id: 'ethereum',
    symbol: 'ETH',
    contract: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8'
  },
  {
    id: 'bakerytoken',
    symbol: 'BAKE',
    contract: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5'
  },
  {
    id: 'goose-finance',
    symbol: 'EGG',
    contract: '0xf952fc3ca7325cc27d15885d37117676d25bfda6'
  },
  {
    id: 'dai',
    symbol: 'DAI',
    contract: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3'
  },
  {
    id: 'auto',
    symbol: 'AUTO',
    contract: '0xa184088a740c695e156f91f5cc086a06bb78b827'
  },
  {
    id: 'wault-finance',
    symbol: 'WAULT',
    contract: '0x6ff2d9e5891a7a7c554b80e0d1b791483c78bce9'
  },
  {
    id: 'swipe',
    symbol: 'SXP',
    contract: '0x47BEAd2563dCBf3bF2c9407fEa4dC236fAbA485A'
  },
  {
    id: 'vai',
    symbol: 'VAI',
    contract: '0x4bd17003473389a42daf6a0a729f6fdb328bbbd7'
  },
  {
    id: 'venus',
    symbol: 'XVS',
    contract: '0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63'
  },
  {
    id: 'terrausd',
    symbol: 'UST',
    contract: '0x23396cf899ca06c4472205fc903bdb4de249d6fc'
  },
  {
    id: 'cardano',
    symbol: 'ADA',
    contract: '0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47'
  },
  {
    id: 'bearn-fi',
    symbol: 'BFI',
    contract: '0x81859801b01764d4f0fa5e64729f5a6c3b91435b'
  },
  {
    id: 'polkadot',
    symbol: 'DOT',
    contract: '0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402'
  },
  {
    id: 'vbswap',
    symbol: 'VBSWAP',
    contract: '0x4f0ed527e8a95ecaa132af214dfd41f30b361600'
  },
  {
    id: 'bdollar',
    symbol: 'BDO',
    contract: '0x190b589cf9fb8ddeabbfeae36a813ffb2a702454'
  },
  {
    id: 'julswap',
    symbol: 'JULD',
    contract: '0x5a41f637c3f7553dba6ddc2d3ca92641096577ea'
  },
  {
    id: 'the-famous-token',
    symbol: 'TFT',
    contract: '0xA9d3fa202b4915c3eca496b0e7dB41567cFA031C'
  },
  {
    id: 'shield-protocol',
    symbol: 'SHIELD',
    contract: '0x60b3bc37593853c04410c4f07fe4d6748245bf77'
  },
  {
    id: 'lead-token',
    symbol: 'LEAD',
    contract: '0x2ed9e96EDd11A1fF5163599A66fb6f1C77FA9C66'
  },
  {
    id: 'sparkpoint',
    symbol: 'SRK',
    contract: '0x3B1eC92288D78D421f97562f8D479e6fF7350a16'
  },
  {
    id: 'curate',
    symbol: 'XCUR',
    contract: '0x708C671Aa997da536869B50B6C67FA0C32Ce80B2'
  },
  {
    id: 'uniswap',
    symbol: 'UNI',
    contract: '0xBf5140A22578168FD562DCcF235E5D43A02ce9B1'
  },
  {
    id: 'tsuki-dao',
    symbol: 'TSUKI',
    contract: '0x3fd9e7041c45622e8026199a46f763c9807f66f3'
  },
  {
    id: 'panda-yield',
    symbol: 'BBOO',
    contract: '0xd909840613fcb0fadc6ee7e5ecf30cdef4281a68'
  },
  {
    id: 'cryptex',
    symbol: 'CRX',
    contract: '0x97a30C692eCe9C317235d48287d23d358170FC40'
  },
  {
    id: 'polis',
    symbol: 'POLIS',
    contract: '0xb5bea8a26d587cf665f2d78f077cca3c7f6341bd'
  },
  {
    id: 'tether',
    symbol: 'USDT',
    contract: '0x049d68029688eAbF473097a2fC38ef61633A3C7A'
  },
  {
    id: 'swirl-cash',
    symbol: 'SWIRL',
    contract: '0x52d86850bc8207b520340b7e39cdaf22561b9e56'
  },
  {
    id: 'squirrel-finance',
    symbol: 'NUTS',
    contract: '0x8893D5fA71389673C5c4b9b3cb4EE1ba71207556'
  },
  {
    id: 'usd-coin',
    symbol: 'USDC',
    contract: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d'
  },
  {
    id: 'iron-stablecoin',
    symbol: 'IRON',
    contract: '0x7b65b489fe53fce1f6548db886c08ad73111ddd8'
  },
  {
    id: 'midas-dollar',
    symbol: 'MDO',
    contract: '0x35e869b7456462b81cdb5e6e42434bd27f3f788c'
  },
  {
    id: 'slime-finance',
    symbol: 'SLME',
    contract: '0x4fcfa6cc8914ab455b5b33df916d90bfe70b6ab1'
  },
  {
    id: 'bolt-true-dollar',
    symbol: 'BTD',
    contract: '0xd1102332a213e21faf78b69c03572031f3552c33'
  },
  {
    id: 'mdex',
    symbol: 'MDX',
    contract: '0x9C65AB58d8d978DB963e63f2bfB7121627e3a739'
  },
  {
    id: 'ice-token',
    symbol: 'ICE',
    contract: '0xf16e81dce15b08f326220742020379b855b87df9'
  },
  {
    id: 'alpaca-finance',
    symbol: 'ALPACA',
    contract: '0x8f0528ce5ef7b51152a59745befdd91d97091d2f'
  },
  {
    id: 'blue-planetfinance',
    symbol: 'AQUA',
    contract: '0x72B7D61E8fC8cF971960DD9cfA59B8C829D91991'
  },
  {
    id: 'dogecoin',
    symbol: 'DOGE',
    contract: '0xbA2aE424d960c26247Dd6c32edC70B295c744C43'
  },
  {
    id: 'degen',
    symbol: 'DGNZ',
    contract: '0xb68a67048596502A8B88f1C10ABFF4fA99dfEc71'
  },
  {
    id: 'degencomp',
    symbol: 'aDGNZ',
    contract: '0xe8B9b396c59A6BC136cF1f05C4D1A68A0F7C2Dd7'
  },
  {
    id: 'gambit',
    symbol: 'GMT',
    contract: '0x99e92123eb77bc8f999316f622e5222498438784'
  },
  {
    id: 'alien-worlds-bsc',
    symbol: 'TLM',
    contract: '0x2222227e22102fe3322098e4cbfe18cfebd57c95'
  },
  {
    id: 'ten',
    symbol: 'TENFI',
    contract: '0xd15c444f1199ae72795eba15e8c1db44e47abf62'
  },
  {
    id: 'pancake-bunny',
    symbol: 'BUNNY',
    contract: '0xc9849e6fdb743d08faee3e34dd2d1bc69ea11a51'
  },
  {
    id: 'swampy',
    symbol: 'SWAMP',
    contract: '0xc5A49b4CBe004b6FD55B30Ba1dE6AC360FF9765d'
  },
  {
    id: 'ellipsis',
    symbol: 'EPS',
    contract: '0xA7f552078dcC247C2684336020c03648500C6d9F'
  },
  {
    id: 'ketchup-finance',
    symbol: 'KETCHUP',
    contract: '0x714a84632ed7edbbbfeb62dacf02db4beb4c69d9'
  },
  {
    id: 'bnbc',
    symbol: 'BNBC',
    contract: '0x31b5d91806af3364678715f4c5bf50c1e3bae10a'
  },
  {
    id: 'thoreum',
    symbol: 'THOREUM',
    contract: '0x580de58c1bd593a43dadcf0a739d504621817c05'
  },
  {
    id: 'ruler-protocol',
    symbol: 'RULER',
    contract: '0x7EA2be2df7BA6E54B1A9C70676f668455E329d29'
  },
  {
    id: 'boringdao-old',
    symbol: 'BOR',
    contract: '0x92D7756c60dcfD4c689290E8A9F4d263b3b32241'
  },
  {
    id: 'nerve-finance',
    symbol: 'NRV',
    contract: '0x42F6f551ae042cBe50C739158b4f0CAC0Edb9096'
  },
  {
    id: 'trident',
    symbol: 'TRIDENT',
    contract: '0x66D7661cdcdF4adA7dA239Af6Fc8C4FE73E79D22'
  },
  {
    id: 'apeswap-finance',
    symbol: 'BANANA',
    contract: '0x603c7f932ed1fc6575303d8fb018fdcbb0f39a95'
  },
  {
    id: 'matic-network',
    symbol: 'MATIC',
    contract: '0xCC42724C6683B7E57334c4E856f4c9965ED682bD'
  },
  {
    id: 'cosmos',
    symbol: 'ATOM',
    contract: '0x0Eb3a705fc54725037CC9e008bDede697f62F335'
  },
  {
    id: 'reef-finance',
    symbol: 'REEF',
    contract: '0xF21768cCBC73Ea5B6fd3C687208a7c2def2d966e'
  },
  {
    id: 'zcore-finance',
    symbol: 'ZEFI',
    contract: '0x0288D3E353fE2299F11eA2c2e1696b4A648eCC07'
  },
  {
    id: 'binance-peg-litecoin',
    symbol: 'LTC',
    contract: '0x4338665cbb7b2485a8855a139b75d5e34ab0db94'
  },
  {
    id: 'tron-bsc',
    symbol: 'TRX',
    contract: '0x85EAC5Ac2F758618dFa09bDbe0cf174e7d574D5B'
  },
  {
    id: 'binance-peg-xrp',
    symbol: 'XRP',
    contract: '0x1d2f0da169ceb9fc7b3144628db156f3f6c60dbe'
  },
  {
    id: 'warden',
    symbol: 'WAD',
    contract: '0x0fEAdcC3824E7F3c12f40E324a60c23cA51627fc'
  },
  {
    id: 'biswap',
    sysbol: 'BSW',
    contract: '0x965F527D9159dCe6288a2219DB51fc6Eef120dD1'
  }
]
