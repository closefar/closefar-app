import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { replaceImportPathWithAddress } from "lib/replaceImportPathWithAddress";
import { INFT } from "../../types/api/types";
import GET_NFTS from "../../cadence/scripts/nft/get_nfts.cdc";

export const getNFTs = (userAddress: string): Promise<INFT[]> => {
  const script = replaceImportPathWithAddress(GET_NFTS);

  return fcl.query({
    cadence: script,
    args: () => [fcl.arg(userAddress, t.Address)],
  });
};
