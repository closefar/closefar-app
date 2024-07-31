import * as fcl from "@onflow/fcl";
import REMOVE_LISTING from "../../cadence/transactions/storefront/remove_item.cdc";
import { replaceImportPathWithAddress } from "lib/replaceImportPathWithAddress";

/**
 * purchase listing by id listingResourceID from storefrontAddress to currentUser
 * @param listingResourceID
 * @param storefrontAddress
 * @returns
 */
export const removeListing = async (listingResourceID: number) => {
  const transaction = replaceImportPathWithAddress(REMOVE_LISTING);

  const txId = await fcl.mutate({
    cadence: transaction,
    args: (arg, t) => [arg(listingResourceID, t.UInt64)],
    limit: 999,
  });
  return fcl.tx(txId).onceSealed();
};
