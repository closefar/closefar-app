import * as fcl from "@onflow/fcl";
import CREATE_STOREFRONT from "./../../cadence/transactions/storefront/setup_account.cdc";
import { replaceImportPathWithAddress } from "lib/replaceImportPathWithAddress";

export const createStoreFront = async () => {
  const transaction = replaceImportPathWithAddress(CREATE_STOREFRONT);

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
