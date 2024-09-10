import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { replaceImportPathWithAddress } from "lib/replaceImportPathWithAddress";
import { INFT } from "../../types/api/types";
import GET_NFT_DETAILS from "../../cadence/scripts/nft/get_nft_details.cdc";

/**  get details of specific NFT base on id */
export const getNFTDetails = (
  userAddress: string,
  id: number
): Promise<INFT> => {
  const script = replaceImportPathWithAddress(GET_NFT_DETAILS);
  return fcl.query({
    cadence: script,
    args: () => [fcl.arg(userAddress, t.Address), fcl.arg(id, t.UInt64)],
  });
};
