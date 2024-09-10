import { contracts, flowNetwork } from "constants/constants";
import { withPrefix } from "@onflow/fcl";

export const replaceImportPathWithAddress = (str: string) => {
  const listOfImportedContracts = str.match(/(?<=import)(.*)(?=from)/gm);

  listOfImportedContracts?.forEach((contract) => {
    const address =
      contracts[contract.trim() as keyof typeof contracts].address[flowNetwork];
    str = str.replace(
      new RegExp(
        String.raw`(?<=import\s${contract.trim()}\sfrom\s)(".+")(?=\s*\n+)`,
        "gm"
      ),
      withPrefix(address)
    );
  });
  return str;
};
