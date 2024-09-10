import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { INFT, Metadata } from "../../types/api/types";
import MINT_NFT from "./../../cadence/transactions/closefar-nft/mint_nft.cdc";
import { replaceImportPathWithAddress } from "lib/replaceImportPathWithAddress";

export const mintNFT = async (
  // userAddress: string,
  nftDetails: Omit<INFT, "id" | "uuid" | "metadata"> & Metadata
) => {
  const transaction = replaceImportPathWithAddress(MINT_NFT);

  const txId = await fcl.mutate({
    cadence: transaction,
    args: () => [
      fcl.arg(nftDetails.name, t.String),
      fcl.arg(nftDetails.country, t.String),
      fcl.arg(nftDetails.yearOfBirth, t.String),
      fcl.arg(nftDetails.monthOfBirth, t.String),
      fcl.arg(nftDetails.dayOfBirth, t.String),
      fcl.arg(nftDetails.nationality, t.String),
      fcl.arg(nftDetails.state, t.String),
      fcl.arg(nftDetails.language, t.String),
      fcl.arg(nftDetails.pronounce, t.String),
      fcl.arg(nftDetails.tags, t.Array(t.String)),
      fcl.arg(nftDetails.job, t.String),
      fcl.arg(nftDetails.url, t.String),
      fcl.arg("", t.String),
      fcl.arg("", t.String),
      fcl.arg([], t.Array(t.UFix64)),
      fcl.arg([], t.Array(t.String)),
      fcl.arg([], t.Array(t.Address)),
    ],
    limit: 999,
  });
  const txStatus = await fcl.tx(txId).onceSealed();
  return { txId, txStatus };
};
