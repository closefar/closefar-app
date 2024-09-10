import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
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
    args: () => [fcl.arg(listingResourceID, t.UInt64)],
    limit: 999,
  });
  const txStatus = await fcl.tx(txId).onceSealed();
  return { txId, txStatus };
};
