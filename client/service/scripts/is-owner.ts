import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { replaceImportPathWithAddress } from "lib/replaceImportPathWithAddress";
import IS_OWNER_OF_NFT from "../../cadence/scripts/nft/is-owner-of-nft.cdc";

export const isOwner = (userAddress: string, nftId: string) => {
  const script = replaceImportPathWithAddress(IS_OWNER_OF_NFT);

  return fcl.query({
    cadence: script,
    args: () => [fcl.arg(userAddress, t.Address), fcl.arg(nftId, t.UInt64)],
  });
};
