import { contracts } from "constants/constants";
import { withPrefix } from "@onflow/fcl";

export const replaceImportPathWithAddress = (str: string) => {
  const listOfImportedContracts = str.match(/(?<=import)(.*)(?=from)/gm);
  const flowNetwork = process.env.NEXT_PUBLIC_FLOW_NETWORK;

  listOfImportedContracts.forEach((contract) => {
    str = str.replace(
      new RegExp(
        String.raw`(?<=import\s${contract.trim()}\sfrom\s)(".+")(?=\s*\n+)`,
        "gm"
      ),

      withPrefix(contracts[contract.trim()].address[flowNetwork])
    );
  });
  return str;
};
