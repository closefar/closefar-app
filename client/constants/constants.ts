export const delayTimeForEventHandler = 7000;

export const adminAddress = process.env.NEXT_PUBLIC_ADMIN_ADDRESS;
// if (!process.env.NEXT_PUBLIC_ADMIN_ADDRESS)
//   throw new Error("admin address environment variable doesn't set");

export const adminCommission = process.env.NEXT_PUBLIC_ADMIN_COMMISSION;
// if (!process.env.NEXT_PUBLIC_ADMIN_COMMISSION)
//   throw new Error("admin commission environment variable doesn't set");

export const apiPath = process.env.NEXT_PUBLIC_API_PATH;
// if (!process.env.NEXT_PUBLIC_API_PATH)
//   throw new Error("api path environment variable doesn't set");

export const contracts = {
  CapabilityDelegator: {
    path: '"../../contracts/hybrid-custody/CapabilityDelegator.cdc"',
    address: {
      local: "f8d6e0586b0a20c7",
      testnet: "294e44e1ec6993c6",
    },
  },
  CapabilityFactory: {
    path: '"../../contracts/hybrid-custody/CapabilityFactory.cdc"',
    address: {
      local: "f8d6e0586b0a20c7",
      testnet: "294e44e1ec6993c6",
    },
  },
  CapabilityFilter: {
    path: '"../../contracts/hybrid-custody/CapabilityFilter.cdc"',
    address: {
      local: "f8d6e0586b0a20c7",
      testnet: "294e44e1ec6993c6",
    },
  },
  CloseFarNFT: {
    path: '"../../contracts/utility/CloseFarNFT.cdc"',
    address: {
      local: "f8d6e0586b0a20c7",
      testnet: "f4a7067c129ca5b9",
    },
  },
  FTAllFactory: {
    path: '"../../contracts/hybrid-custody/factories/FTAllFactory.cdc"',
    address: {
      local: "f8d6e0586b0a20c7",
      testnet: "294e44e1ec6993c6",
    },
  },
  FTBalanceFactory: {
    path: '"../../contracts/hybrid-custody/factories/FTBalanceFactory.cdc"',
    address: {
      local: "f8d6e0586b0a20c7",
      testnet: "294e44e1ec6993c6",
    },
  },
  FTProviderFactory: {
    path: '"../../contracts/hybrid-custody/factories/FTProviderFactory.cdc"',
    address: {
      local: "f8d6e0586b0a20c7",
      testnet: "294e44e1ec6993c6",
    },
  },
  FTReceiverBalanceFactory: {
    path: '"../../contracts/hybrid-custody/factories/FTReceiverBalanceFactory.cdc"',
    address: {
      local: "f8d6e0586b0a20c7",
      testnet: "294e44e1ec6993c6",
    },
  },
  FTReceiverFactory: {
    path: '"../../contracts/hybrid-custody/factories/FTReceiverFactory.cdc"',
    address: {
      local: "f8d6e0586b0a20c7",
      testnet: "294e44e1ec6993c6",
    },
  },
  FungibleTokenMetadataViews: {
    path: '"../../contracts/utility/FungibleTokenMetadataViews.cdc"',
    address: {
      local: "f8d6e0586b0a20c7",
      testnet: "9a0766d93b6608b7",
    },
  },
  FlowToken: {
    path: '"../../contracts/utility/FlowToken.cdc"',
    address: {
      local: "f8d6e0586b0a20c7",
      testnet: "7e60df042a9c0868",
    },
  },
  FungibleToken: {
    path: '"../../contracts/utility/FungibleToken.cdc"',
    address: {
      local: "f8d6e0586b0a20c7",
      testnet: "9a0766d93b6608b7",
    },
  },
  HybridCustody: {
    path: '"../../contracts/hybrid-custody/HybridCustody.cdc"',
    address: {
      local: "f8d6e0586b0a20c7",
      testnet: "294e44e1ec6993c6",
    },
  },
  MetadataViews: {
    path: '"../../contracts/utility/MetadataViews.cdc"',
    address: {
      local: "f8d6e0586b0a20c7",
      testnet: "631e88ae7f1d7c20",
    },
  },
  NFTCatalog: {
    path: '"../../contracts/utility/NFTCatalog.cdc"',
    address: {
      local: "f8d6e0586b0a20c7",
      testnet: "324c34e1c517e4db",
    },
  },
  NFTCollectionPublicFactory: {
    path: '"../../contracts/hybrid-custody/factories/NFTCollectionPublicFactory.cdc"',
    address: {
      local: "f8d6e0586b0a20c7",
      testnet: "294e44e1ec6993c6",
    },
  },
  NFTProviderAndCollectionFactory: {
    path: '"../../contracts/hybrid-custody/factories/NFTProviderAndCollectionFactory.cdc"',
    address: {
      local: "f8d6e0586b0a20c7",
      testnet: "294e44e1ec6993c6",
    },
  },
  NFTProviderFactory: {
    path: '"../../contracts/hybrid-custody/factories/NFTProviderFactory.cdc"',
    address: {
      local: "f8d6e0586b0a20c7",
      testnet: "294e44e1ec6993c6",
    },
  },
  NFTStorefront: {
    path: '"../../contracts/NFTStorefront.cdc"',
    address: {
      local: "f8d6e0586b0a20c7",
    },
  },
  NFTStorefrontV2: {
    path: '"../../contracts/NFTStorefrontV2.cdc"',
    address: {
      local: "f8d6e0586b0a20c7",
      testnet: "f4a7067c129ca5b9",
    },
  },
  NonFungibleToken: {
    path: '"../../contracts/utility/NonFungibleToken.cdc"',
    address: {
      local: "f8d6e0586b0a20c7",
      testnet: "631e88ae7f1d7c20",
    },
  },
  ViewResolver: {
    path: '"../../contracts/utility/ViewResolver.cdc"',
    address: {
      local: "f8d6e0586b0a20c7",
      testnet: "631e88ae7f1d7c20",
    },
  },
};
