import * as fcl from "@onflow/fcl";
import SETUP_ACCOUNT_AND_CREATE_STOREFRONT from "./../../cadence/transactions/setup_and_create_storefront.cdc";
import { replaceImportPathWithAddress } from "lib/replaceImportPathWithAddress";

export const setupAccountAndCreateStorefront = async () => {
  const transaction = replaceImportPathWithAddress(
    SETUP_ACCOUNT_AND_CREATE_STOREFRONT
  );

  const txId = await fcl.mutate({
    cadence: transaction,
    limit: 999,
    // proposer: fcl.authz, // optional - default is fcl.authz
    // payer: fcl.authz, // optional - default is fcl.authz
    // authorizations: [fcl.authz], // optional - default is [fcl.authz]
  });
  const txStatus = await fcl.tx(txId).onceSealed();
  return { txId, txStatus };
};
