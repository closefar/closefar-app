import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import * as fcl from '@onflow/fcl';
import { INftDetails } from 'src/types/types';
import { ec as EC } from 'elliptic';
import { SHA3 } from 'sha3';
import { ConfigService } from '@nestjs/config';
import { ACCESS_NODE_URLS } from 'src/constants/constants';

@Injectable()
export class FlowService implements OnModuleInit {
  private readonly ec: EC = new EC('p256');
  private readonly minterFlowAddress: string = '0xf4a7067c129ca5b9';
  private readonly minterPrivateKeyHex: string =
    '96fb2cf5ae5b6bdbe812725c89c25f0e83998ea43d93bbf9b778946a4b3cf584';
  private readonly minterAccountIndex: string | number = 0;
  private adminAddress = this.configService.get('ADMIN_ADDRESS');
  private adminCommission = this.configService.get('ADMIN_COMMISSION');
  private network = this.configService.get('NETWORK');

  constructor(@Inject() private configService: ConfigService) {}

  authorizeMinter = () => {
    return async (account: any = {}) => {
      const user = await this.getAccount(this.minterFlowAddress);
      const key = user.keys[this.minterAccountIndex];

      const sign = this.signWithKey;
      const pk = this.minterPrivateKeyHex;

      return {
        ...account,
        tempId: `${user.address}-${key.index}`,
        addr: fcl.sansPrefix(user.address),
        keyId: Number(key.index),
        signingFunction: (signable) => {
          return {
            addr: fcl.withPrefix(user.address),
            keyId: Number(key.index),
            signature: sign(pk, signable.message),
          };
        },
      };
    };
  };

  getAccount = async (addr: string) => {
    const { account } = await fcl.send([fcl.getAccount(addr)]);
    return account;
  };

  private signWithKey = (privateKey: string, msg: string) => {
    const key = this.ec.keyFromPrivate(Buffer.from(privateKey, 'hex'));
    const sig = key.sign(this.hashMsg(msg));
    const n = 32;
    const r = sig.r.toArrayLike(Buffer, 'be', n);
    const s = sig.s.toArrayLike(Buffer, 'be', n);
    return Buffer.concat([r, s]).toString('hex');
  };

  private hashMsg = (msg: string) => {
    const sha = new SHA3(256);
    sha.update(Buffer.from(msg, 'hex'));
    return sha.digest();
  };

  // sendTx = async ({
  //   transaction,
  //   args,
  //   proposer,
  //   authorizations,
  //   payer,
  //   skipSeal
  // }: any): Promise<any> => {
  //   const response = await fcl.mutate(
  //     {
  //       cadence: transaction,
  //       args: (_arg, _t) => args,
  //       proposer,
  //       authorizations,
  //       payer,
  //       limit: 9999,
  //     },
  //   )

  //   if (skipSeal) return response;
  //   return await fcl.tx(response).onceSealed();
  // };

  // async executeScript<T>({ script, args }): Promise<T> {
  //   return await fcl.query(
  //     {
  //       cadence: script,
  //       args: (_arg, _t) => args,
  //     },
  //   );
  // }

  async getLatestBlockHeight() {
    // const authorization = this.authorizeMinter();
    const block = await fcl.send([fcl.getBlock(true)]);
    const decoded = await fcl.decode(block);
    return decoded.height;
  }

  async getEvent({
    eventName,
    fromBlock,
    toBlock,
  }: {
    eventName: string;
    fromBlock: number;
    toBlock: number;
  }) {
    console.log(eventName);
    const result = await fcl.send([
      fcl.getEventsAtBlockHeightRange(eventName, fromBlock, toBlock),
    ]);
    const decoded = await fcl.decode(result);
    return decoded;
  }

  async getNftDetails(
    ownerAddress: string,
    nftId: string,
  ): Promise<INftDetails> {
    return fcl.query({
      cadence: `
        // import CloseFarNFT from 0xf8d6e0586b0a20c7
        // import NonFungibleToken from 0xf8d6e0586b0a20c7
        // import MetadataViews from 0xf8d6e0586b0a20c7

        import NonFungibleToken from 0x631e88ae7f1d7c20
        import CloseFarNFT from 0xf4a7067c129ca5b9
        import MetadataViews from 0x631e88ae7f1d7c20
        
        pub fun main(account: Address, id: UInt64): &CloseFarNFT.NFT {
            let CollectionPublic = getAccount(account)
                .getCapability<&{NonFungibleToken.CollectionPublic, CloseFarNFT.CloseFarNFTCollectionPublic, MetadataViews.ResolverCollection}>(
                        CloseFarNFT.CollectionPublicPath
                    )
                .borrow()
                ?? panic("Could not borrow public collection from address")
        
              let NFT = CollectionPublic.borrowCloseFarNFT(id: id) ?? panic("There is no NFT with this id")
            return NFT
        }
      `,
      args: (arg, t) => [arg(ownerAddress, t.Address), arg(nftId, t.UInt64)],
    });
  }

  async getListingDetails(ownerAddress: string, listingId: string) {
    return fcl.query({
      cadence: `
      // import NFTStorefrontV2 from 0xf8d6e0586b0a20c7
      import NFTStorefrontV2 from 0xf4a7067c129ca5b9


      // This script returns the details for a listing within a storefront
      
      pub fun main(account: Address, listingResourceID: UInt64): NFTStorefrontV2.ListingDetails {
          let storefrontRef = getAccount(account)
              .getCapability<&NFTStorefrontV2.Storefront{NFTStorefrontV2.StorefrontPublic}>(
                  NFTStorefrontV2.StorefrontPublicPath
              )
              .borrow()
              ?? panic("Could not borrow public storefront from address")
      
          let listing = storefrontRef.borrowListing(listingResourceID: listingResourceID)
              ?? panic("No item with that ID")
          
          return listing.getDetails()
      }
      
      `,
      args: (arg, t) => [
        arg(ownerAddress, t.Address),
        arg(listingId, t.UInt64),
      ],
    });
  }

  onModuleInit() {
    // .config({
    //   // 'flow.network': 'local',
    //   // 'accessNode.api': 'http://localhost:8888',
    //   // 'discovery.wallet': `http:/localhost:8701/fcl/authn`,
    //   // 'app.detail.icon':
    //   //   'https://avatars.githubusercontent.com/u/62387156?v=4',
    //   // 'app.detail.title': 'FCL Next Scaffold',
    //   'flow.network': 'testnet',
    //   'accessNode.api': 'https://rest-testnet.onflow.org',
    // });
    console.log(`app running on ${this.network}`);
    const accessApi = ACCESS_NODE_URLS[this.network];
    fcl
      .config()
      .put('flow.network', this.network)
      .put('accessNode.api', accessApi)
      .put('decoder.Type', (val) => val.staticType)
      .put('decoder.Enum', (val) => Number(val.fields[0].value.value));
  }
}
