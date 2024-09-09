import * as fcl from "@onflow/fcl";
import SELL_ITEM_WITH_MARKETPLACE_CUT from "../../cadence/transactions/storefront/sell_item_with_marketplace_cut.cdc";
import { replaceImportPathWithAddress } from "lib/replaceImportPathWithAddress";

/**
 * create listing of specific NFT base on id with price determined by owner and add market place as commission receiver
 * @param saleItemID
 * @param saleItemPrice
 * @param expiry
 * @param marketPlaceSaleCutReceiver
 * @param marketPlaceSaleCutPercentage
 * @param customID
 */
export const createListing = async (
  saleItemID: number,
  saleItemPrice: string,
  expiry: number,
  marketPlaceSaleCutReceiver: string,
  marketPlaceSaleCutPercentage: string,
  customID?: string
) => {
  const transaction = replaceImportPathWithAddress(
    SELL_ITEM_WITH_MARKETPLACE_CUT
  );

  const txId = await fcl.mutate({
    cadence: transaction,
    args: (arg, t) => [
      arg(saleItemID, t.UInt64),
      arg(saleItemPrice, t.UFix64),
      arg(customID, t.Optional(t.String)),
      arg(expiry, t.UInt64),
      arg(marketPlaceSaleCutReceiver, t.Address),
      arg(marketPlaceSaleCutPercentage, t.UFix64),
    ],
    limit: 999,
  });

  const txStatus = await fcl.tx(txId).onceSealed();
  return { txId, txStatus };
};
