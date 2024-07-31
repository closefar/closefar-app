import * as fcl from "@onflow/fcl";
import { replaceImportPathWithAddress } from "lib/replaceImportPathWithAddress";
import IS_OWNER_OF_NFT from "../../cadence/scripts/nft/is-owner-of-nft.cdc";

export const isOwner = (userAddress: string, nftId: string) => {
  const script = replaceImportPathWithAddress(IS_OWNER_OF_NFT);

  return fcl.query({
    cadence: script,
    args: (arg, t) => [arg(userAddress, t.Address), arg(nftId, t.UInt64)],
  });
};
