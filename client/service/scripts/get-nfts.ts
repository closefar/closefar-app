import { replaceImportPathWithAddress } from "lib/replaceImportPathWithAddress";
import { INFT } from "../../types/api/types";
import * as fcl from "@onflow/fcl";
import GET_NFTS from "../../cadence/scripts/nft/get_nfts.cdc";

export const getNFTs = (userAddress: string): Promise<INFT[]> => {
  const script = replaceImportPathWithAddress(GET_NFTS);

  return fcl.query({
    cadence: script,
    args: (arg, t) => [arg(userAddress, t.Address)],
  });
};
