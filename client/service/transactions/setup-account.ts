import * as fcl from "@onflow/fcl";
import SETUP_ACCOUNT from "./../../cadence/transactions/closefar-nft/setup_account.cdc";
import { replaceImportPathWithAddress } from "lib/replaceImportPathWithAddress";

export const setupAccount = async () => {
  const transaction = replaceImportPathWithAddress(SETUP_ACCOUNT);

  const txId = await fcl.mutate({
    cadence: transaction,
    limit: 999,
    proposer: fcl.authz, // optional - default is fcl.authz
    payer: fcl.authz, // optional - default is fcl.authz
    authorizations: [fcl.authz], // optional - default is [fcl.authz]
  });
  return fcl.tx(txId).onceSealed();
};
