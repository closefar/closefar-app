import { INFT, Metadata } from "../../types/api/types";
import * as fcl from "@onflow/fcl";
import MINT_NFT from "./../../cadence/transactions/closefar-nft/mint_nft.cdc";
import { replaceImportPathWithAddress } from "lib/replaceImportPathWithAddress";

export const mintNFT = async (
  // userAddress: string,
  nftDetails: Omit<INFT, "id" | "uuid" | "metadata"> & Metadata
) => {
  const transaction = replaceImportPathWithAddress(MINT_NFT);

  const txId = await fcl.mutate({
    cadence: transaction,
    args: (arg, t) => [
      // arg(userAddress, t.Address),
      arg(nftDetails.name, t.String),
      arg(nftDetails.country, t.String),
      arg(nftDetails.yearOfBirth, t.String),
      arg(nftDetails.monthOfBirth, t.String),
      arg(nftDetails.dayOfBirth, t.String),
      arg(nftDetails.nationality, t.String),
      arg(nftDetails.state, t.String),
      arg(nftDetails.language, t.String),
      arg(nftDetails.pronounce, t.String),
      arg(nftDetails.tags, t.Array(t.String)),
      arg(nftDetails.job, t.String),
      arg(nftDetails.url, t.String),
      arg("", t.String),
      arg("", t.String),
      arg([], t.Array(t.UFix64)),
      arg([], t.Array(t.String)),
      arg([], t.Array(t.Address)),
    ],
    limit: 999,
  });
  const txStatus = await fcl.tx(txId).onceSealed();
  return { txId, txStatus };
};
