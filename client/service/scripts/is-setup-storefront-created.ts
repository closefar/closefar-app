import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { replaceImportPathWithAddress } from "lib/replaceImportPathWithAddress";
import IS_ACCOUNT_SETUP_AND_STOREFRONT from "../../cadence/scripts/is-account-setup-and-storefront.cdc";

export const isSetupAndCreatedStorefront = (userAddress: string) => {
  const script = replaceImportPathWithAddress(IS_ACCOUNT_SETUP_AND_STOREFRONT);

  return fcl.query({
    cadence: script,
    args: () => [fcl.arg(userAddress, t.Address)],
    limit: 999,
  });
};
