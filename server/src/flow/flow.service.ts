import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';
import { INftDetails } from 'src/types/types';
import { ec as EC } from 'elliptic';
import { SHA3 } from 'sha3';
import { ACCESS_NODE_URLS, contracts } from 'src/constants/constants';
import { FlowModuleOptions } from './flow.interface';
import { MODULE_OPTIONS_TOKEN } from './flow.module-definition';
import GET_NFT_DETAILS from '../../cadence/scripts/nft/get_nft_details.cdc';
import GET_LISTING_DETAILS from '../../cadence/scripts/read_listing_details.cdc';

@Injectable()
export class FlowService implements OnModuleInit {
  private readonly ec: EC = new EC('p256');

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private readonly options: FlowModuleOptions,
  ) {}

  authorizeMinter = () => {
    return async (account: any = {}) => {
      const user = await this.getAccount(this.options.minterFlowAddress);
      const key = user.keys[this.options.minterAccountIndex];

      const sign = this.signWithKey;
      const pk = this.options.minterPrivateKeyHex;

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
    const script = this.replaceImportPathWithAddress(GET_NFT_DETAILS);
    return fcl.query({
      cadence: script,
      args: () => [fcl.arg(ownerAddress, t.Address), fcl.arg(nftId, t.UInt64)],
    });
  }

  async getListingDetails(ownerAddress: string, listingId: string) {
    const script = this.replaceImportPathWithAddress(GET_LISTING_DETAILS);
    return fcl.query({
      cadence: script,
      args: () => [
        fcl.arg(ownerAddress, t.Address),
        fcl.arg(listingId, t.UInt64),
      ],
    });
  }

  async verifyAccountProof(accountProofData) {
    return fcl.AppUtils.verifyAccountProof('closefar', accountProofData);
  }

  replaceImportPathWithAddress(str: string) {
    const listOfImportedContracts = str.match(/(?<=import)(.*)(?=from)/gm);

    listOfImportedContracts?.forEach((contract) => {
      const address =
        contracts[contract.trim() as keyof typeof contracts].address[
          this.options.network
        ];
      str = str.replace(
        new RegExp(
          String.raw`(?<=import\s${contract.trim()}\sfrom\s)(".+")(?=\s*\n+)`,
          'gm',
        ),
        fcl.withPrefix(address),
      );
    });
    return str;
  }

  onModuleInit() {
    console.log(`app running on ${this.options.network}`);
    const accessApi = ACCESS_NODE_URLS[this.options.network];
    fcl
      .config()
      .put('flow.network', this.options.network)
      .put('accessNode.api', accessApi)
      .put('decoder.Type', (val) => val.staticType)
      .put('decoder.Enum', (val) => Number(val.fields[0].value.value));
  }
}
