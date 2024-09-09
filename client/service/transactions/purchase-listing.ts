import * as fcl from "@onflow/fcl";
import BUY_ITEM from "../../cadence/transactions/storefront/buy_item.cdc";
import { replaceImportPathWithAddress } from "lib/replaceImportPathWithAddress";

/**
 * purchase listing by id listingResourceID from storefrontAddress to currentUser
 * @param listingResourceID
 * @param storefrontAddress
 * @returns
 */
export const purchaseListing = async (
  listingResourceID: number,
  storefrontAddress: string
) => {
  const transaction = replaceImportPathWithAddress(BUY_ITEM);

  const txId = await fcl.mutate({
    cadence: transaction,
    args: (arg, t) => [
      arg(listingResourceID, t.UInt64),
      arg(storefrontAddress, t.Address),
      arg(null, t.Optional(t.Address)),
    ],
    limit: 999,
  });
  const txStatus = await fcl.tx(txId).onceSealed();
  return { txId, txStatus };
};
