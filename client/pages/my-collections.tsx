import { Option, Select, Spinner } from "@material-tailwind/react";
import React, { useState } from "react";
import BreakLine from "../components/BreakLine";
import * as scripts from "@scripts";
import * as api from "@api";
import useCurrentUser from "hooks/useCurrentUser";
import isLogin from "components/IsLogin";
import { INFT } from "../types/api/types";
import useSWR from "swr";
import { useAlertDispatch } from "context/AlertContext";
import NftElement from "components/my-collections/NftElement";
import { extractFlowErrorMessage } from "lib/extractFlowErrorMessage";

const MyCollections = () => {
  const [value, setValue] = useState("all");

  const currentUser = useCurrentUser();

  const alertDispatch = useAlertDispatch();

  const { data: NFTs, isLoading: nftLoading } = useSWR<INFT[] | undefined>(
    currentUser.addr ? "/scripts/getNfts" : null,
    () => (currentUser.addr ? scripts.getNFTs(currentUser.addr) : undefined),
    {
      onError(err, key, config) {
        console.log(err);
        alertDispatch({
          type: "open",
          message: extractFlowErrorMessage(String(err)),
          class: "error",
        });
      },
    }
  );
  // const { data: listingFromFlow, isLoading: listingFromFlowLoading } = useSWR(
  //   currentUser.addr ? "/scripts/getListings" : null,
  //   () => scripts.getListingIDs(currentUser.addr),
  //   {
  //     onError(err, key, config) {
  //       alertDispatch({
  //         type: "open",
  //         message: extractPanic(err),
  //         class: "error",
  //       });
  //     },
  //   }
  // );
  // console.log(listingFromFlow);

  // useEffect(() => {
  //   const deleting = async () => {
  //     if (!data || !(data.length > 0)) return;
  //     for (const n of data) {
  //       console.log(n);
  //       await transactions.removeListing(+n);
  //     }
  //   };
  //   deleting();
  // }, [data]);

  const {
    data: isListingsExist,
    isLoading: existenceLoading,
    mutate: getListingExistence,
    isValidating: isExistenceValidating,
  } = useSWR<api.IIsListingExistRes | undefined>(
    NFTs && NFTs.length > 0 ? "/api/listing/is-listings-exist" : null,
    () => NFTs && api.isListingsExist(NFTs.map((nft) => nft.id)),
    {
      onError(err, key, config) {
        console.log(err);
        alertDispatch({ type: "open", message: err.message, class: "error" });
      },
    }
  );

  const refreshing = async () => {
    await getListingExistence();
  };

  if (nftLoading || existenceLoading || isExistenceValidating)
    return (
      // <div className="fixed bg-blue-gray-700 h-screen top-0 left-0 w-full opacity-50 flex items-center justify-center">
      //   <Spinner className="h-12 w-12" />
      // </div>
      <div className="h-screen flex items-center justify-center">
        <Spinner className="h-12 w-12" />
      </div>
    );

  return (
    <div className="relative w-full lg:px-28 px-7 md:px-12 sm:py-9 py-3 flex flex-col items-center justify-center">
      <button onClick={refreshing} className="absolute top-[5%] right-[5%]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </button>
      <div className="flex flex-col items-center sm:py-9 py-3 gap-3">
        <h1 className="font-medium text-[2.5rem]">My Collection</h1>
      </div>
      <div className="flex flex-col gap-7 w-full">
        <div className="w-1/3">
          <div className="[&>div>button]:border-none [&>div>label]:after:border-none">
            <Select
              className="[&>span]:pl-8"
              variant="static"
              value={value}
              onChange={(val) => setValue(val || "")}
            >
              <Option className="font-ysabeau" value="all">
                All
              </Option>
              <Option className="font-ysabeau" value="minted">
                Minted
              </Option>
              <Option className="font-ysabeau" value="collected">
                Collected
              </Option>
              <Option className="font-ysabeau" value="sale">
                On Sale
              </Option>
            </Select>
          </div>
          <BreakLine />
        </div>
        <div className="grid sm:grid-cols-3 grid-cols-2 gap-4">
          {NFTs?.map((nft) => {
            return (
              isListingsExist && (
                <NftElement
                  nft={nft}
                  isListingExist={isListingsExist[nft.id]?.isExist}
                  key={nft.uuid}
                  listingId={isListingsExist[nft.id]?.listingId}
                  // isBuildingListing={isListingsExist[nft.id]?.listingId}
                />
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default isLogin(MyCollections);
