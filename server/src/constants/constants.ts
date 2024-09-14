export const ACCESS_NODE_URLS = {
  local: 'http://localhost:8888',
  testnet: 'https://rest-testnet.onflow.org',
  mainnet: 'https://rest-mainnet.onflow.org',
};

export const contracts = {
  CapabilityDelegator: {
    path: '"../../contracts/hybrid-custody/CapabilityDelegator.cdc"',
    address: {
      local: 'f8d6e0586b0a20c7',
      testnet: '294e44e1ec6993c6',
      mainnet: '',
    },
  },
  CapabilityFactory: {
    path: '"../../contracts/hybrid-custody/CapabilityFactory.cdc"',
    address: {
      local: 'f8d6e0586b0a20c7',
      testnet: '294e44e1ec6993c6',
      mainnet: '',
    },
  },
  CapabilityFilter: {
    path: '"../../contracts/hybrid-custody/CapabilityFilter.cdc"',
    address: {
      local: 'f8d6e0586b0a20c7',
      testnet: '294e44e1ec6993c6',
      mainnet: '',
    },
  },
  CloseFarNFT: {
    path: '"../../contracts/utility/CloseFarNFT.cdc"',
    address: {
      local: 'f8d6e0586b0a20c7',
      testnet: '99b1a12bc9c2c1b4',
      mainnet: '',
    },
  },
  FTAllFactory: {
    path: '"../../contracts/hybrid-custody/factories/FTAllFactory.cdc"',
    address: {
      local: 'f8d6e0586b0a20c7',
      testnet: '294e44e1ec6993c6',
      mainnet: '',
    },
  },
  FTBalanceFactory: {
    path: '"../../contracts/hybrid-custody/factories/FTBalanceFactory.cdc"',
    address: {
      local: 'f8d6e0586b0a20c7',
      testnet: '294e44e1ec6993c6',
      mainnet: '',
    },
  },
  FTProviderFactory: {
    path: '"../../contracts/hybrid-custody/factories/FTProviderFactory.cdc"',
    address: {
      local: 'f8d6e0586b0a20c7',
      testnet: '294e44e1ec6993c6',
      mainnet: '',
    },
  },
  FTReceiverBalanceFactory: {
    path: '"../../contracts/hybrid-custody/factories/FTReceiverBalanceFactory.cdc"',
    address: {
      local: 'f8d6e0586b0a20c7',
      testnet: '294e44e1ec6993c6',
      mainnet: '',
    },
  },
  FTReceiverFactory: {
    path: '"../../contracts/hybrid-custody/factories/FTReceiverFactory.cdc"',
    address: {
      local: 'f8d6e0586b0a20c7',
      testnet: '294e44e1ec6993c6',
      mainnet: '',
    },
  },
  FungibleTokenMetadataViews: {
    path: '"../../contracts/utility/FungibleTokenMetadataViews.cdc"',
    address: {
      local: 'f8d6e0586b0a20c7',
      testnet: '9a0766d93b6608b7',
      mainnet: '',
    },
  },
  FlowToken: {
    path: '"../../contracts/utility/FlowToken.cdc"',
    address: {
      local: 'f8d6e0586b0a20c7',
      testnet: '7e60df042a9c0868',
      mainnet: '',
    },
  },
  FungibleToken: {
    path: '"../../contracts/utility/FungibleToken.cdc"',
    address: {
      local: 'f8d6e0586b0a20c7',
      testnet: '9a0766d93b6608b7',
      mainnet: '',
    },
  },
  HybridCustody: {
    path: '"../../contracts/hybrid-custody/HybridCustody.cdc"',
    address: {
      local: 'f8d6e0586b0a20c7',
      testnet: '294e44e1ec6993c6',
      mainnet: '',
    },
  },
  MetadataViews: {
    path: '"../../contracts/utility/MetadataViews.cdc"',
    address: {
      local: 'f8d6e0586b0a20c7',
      testnet: '631e88ae7f1d7c20',
      mainnet: '',
    },
  },
  NFTCatalog: {
    path: '"../../contracts/utility/NFTCatalog.cdc"',
    address: {
      local: 'f8d6e0586b0a20c7',
      testnet: '324c34e1c517e4db',
      mainnet: '',
    },
  },
  NFTCollectionPublicFactory: {
    path: '"../../contracts/hybrid-custody/factories/NFTCollectionPublicFactory.cdc"',
    address: {
      local: 'f8d6e0586b0a20c7',
      testnet: '294e44e1ec6993c6',
      mainnet: '',
    },
  },
  NFTProviderAndCollectionFactory: {
    path: '"../../contracts/hybrid-custody/factories/NFTProviderAndCollectionFactory.cdc"',
    address: {
      local: 'f8d6e0586b0a20c7',
      testnet: '294e44e1ec6993c6',
      mainnet: '',
    },
  },
  NFTProviderFactory: {
    path: '"../../contracts/hybrid-custody/factories/NFTProviderFactory.cdc"',
    address: {
      local: 'f8d6e0586b0a20c7',
      testnet: '294e44e1ec6993c6',
      mainnet: '',
    },
  },
  NFTStorefront: {
    path: '"../../contracts/NFTStorefront.cdc"',
    address: {
      local: 'f8d6e0586b0a20c7',
      testnet: '99b1a12bc9c2c1b4',
      mainnet: '',
    },
  },
  NFTStorefrontV2: {
    path: '"../../contracts/NFTStorefrontV2.cdc"',
    address: {
      local: 'f8d6e0586b0a20c7',
      testnet: '99b1a12bc9c2c1b4',
      mainnet: '',
    },
  },
  NonFungibleToken: {
    path: '"../../contracts/utility/NonFungibleToken.cdc"',
    address: {
      local: 'f8d6e0586b0a20c7',
      testnet: '631e88ae7f1d7c20',
      mainnet: '',
    },
  },
  ViewResolver: {
    path: '"../../contracts/utility/ViewResolver.cdc"',
    address: {
      local: 'f8d6e0586b0a20c7',
      testnet: '631e88ae7f1d7c20',
      mainnet: '',
    },
  },
  Burner: {
    path: './cadence/contracts/utility/Burner.cdc',
    address: {
      local: 'ce45dd06c2f77f71',
      testnet: 'f233dcee88fe0abe',
      mainnet: '',
    },
  },
};
