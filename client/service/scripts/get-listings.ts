import * as fcl from "@onflow/fcl";
import READ_STOREFRONT_IDS from "../../cadence/scripts/read_storefront_ids.cdc";
import { replaceImportPathWithAddress } from "lib/replaceImportPathWithAddress";

export const getListingIDs = (userAddress: string) => {
  const script = replaceImportPathWithAddress(READ_STOREFRONT_IDS);

  return fcl.query({
    cadence: script,
    args: (arg, t) => [arg(userAddress, t.Address)],
  });
};
