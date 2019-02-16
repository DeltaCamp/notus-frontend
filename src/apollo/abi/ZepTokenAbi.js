export default [
  {
    'constant': false,
    'inputs': [
      {
        'name': 'spender',
        'type': 'address'
      },
      {
        'name': 'value',
        'type': 'uint256'
      }
    ],
    'name': 'approve',
    'outputs': [
      {
        'name': '',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function',
    'signature': '0x095ea7b3'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'totalSupply',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function',
    'signature': '0x18160ddd'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': 'from',
        'type': 'address'
      },
      {
        'name': 'to',
        'type': 'address'
      },
      {
        'name': 'value',
        'type': 'uint256'
      }
    ],
    'name': 'transferFrom',
    'outputs': [
      {
        'name': '',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function',
    'signature': '0x23b872dd'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': 'spender',
        'type': 'address'
      },
      {
        'name': 'addedValue',
        'type': 'uint256'
      }
    ],
    'name': 'increaseAllowance',
    'outputs': [
      {
        'name': '',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function',
    'signature': '0x39509351'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': 'to',
        'type': 'address'
      },
      {
        'name': 'amount',
        'type': 'uint256'
      }
    ],
    'name': 'mint',
    'outputs': [
      {
        'name': '',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function',
    'signature': '0x40c10f19'
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': 'owner',
        'type': 'address'
      }
    ],
    'name': 'balanceOf',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function',
    'signature': '0x70a08231'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': 'account',
        'type': 'address'
      }
    ],
    'name': 'addMinter',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function',
    'signature': '0x983b2d56'
  },
  {
    'constant': false,
    'inputs': [],
    'name': 'renounceMinter',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function',
    'signature': '0x98650275'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': 'spender',
        'type': 'address'
      },
      {
        'name': 'subtractedValue',
        'type': 'uint256'
      }
    ],
    'name': 'decreaseAllowance',
    'outputs': [
      {
        'name': '',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function',
    'signature': '0xa457c2d7'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': 'to',
        'type': 'address'
      },
      {
        'name': 'value',
        'type': 'uint256'
      }
    ],
    'name': 'transfer',
    'outputs': [
      {
        'name': '',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function',
    'signature': '0xa9059cbb'
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': 'account',
        'type': 'address'
      }
    ],
    'name': 'isMinter',
    'outputs': [
      {
        'name': '',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function',
    'signature': '0xaa271e1a'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': 'sender',
        'type': 'address'
      }
    ],
    'name': 'initialize',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function',
    'signature': '0xc4d66de8'
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': 'owner',
        'type': 'address'
      },
      {
        'name': 'spender',
        'type': 'address'
      }
    ],
    'name': 'allowance',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function',
    'signature': '0xdd62ed3e'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'name': 'account',
        'type': 'address'
      }
    ],
    'name': 'MinterAdded',
    'type': 'event',
    'signature': '0x6ae172837ea30b801fbfcdd4108aa1d5bf8ff775444fd70256b44e6bf3dfc3f6'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'name': 'account',
        'type': 'address'
      }
    ],
    'name': 'MinterRemoved',
    'type': 'event',
    'signature': '0xe94479a9f7e1952cc78f2d6baab678adc1b772d936c6583def489e524cb66692'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'name': 'from',
        'type': 'address'
      },
      {
        'indexed': true,
        'name': 'to',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': 'value',
        'type': 'uint256'
      }
    ],
    'name': 'Transfer',
    'type': 'event',
    'signature': '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'name': 'owner',
        'type': 'address'
      },
      {
        'indexed': true,
        'name': 'spender',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': 'value',
        'type': 'uint256'
      }
    ],
    'name': 'Approval',
    'type': 'event',
    'signature': '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925'
  }
]
