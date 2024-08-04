import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import * as scripts from "@scripts";
import useCurrentUser from "hooks/useCurrentUser";
import isOwner from "components/IsOwner";
import isLogin from "components/IsLogin";
import { INFT } from "types/api/types";
import useSWR from "swr";
import { Spinner } from "@material-tailwind/react";
import ImageWithBorder from "components/ImageWithBorder";
import { useAlertDispatch } from "context/AlertContext";
import { extractFlowErrorMessage } from "lib/extractFlowErrorMessage";

// this page get all details of NFT from flow base on flow id
const NFTDetails = () => {
  const id = useRouter().query.id as string;

  const currentUser = useCurrentUser();

  const alertDispatch = useAlertDispatch();

  const {
    data: NFTDetails,
    isLoading,
    isValidating,
  } = useSWR<INFT>(
    currentUser.addr && id ? ["/scripts/getNftDetails", id] : null,
    () => scripts.getNFTDetails(currentUser.addr, parseInt(id)),
    {
      onError(err, key, config) {
        console.log(err);
        alertDispatch({
          type: "open",
          message: extractFlowErrorMessage(err),
          class: "error",
        });
      },
    }
  );

  if (isLoading || isValidating)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner className="h-12 w-12" />
      </div>
    );

  return (
    <div className="w-full g:px-28 px-7 md:px-12 sm:py-9 py-3 flex flex-col items-center justify-center gap-4">
      <h3 className="font-medium text-[2.5rem]">{NFTDetails?.name}</h3>
      <div className="w-1/2 flex justify-around">
        {/* <h3 className="text-2xl">{Mock[id]?.y_birth}</h3>
        <h3 className="text-2xl">{Mock[id]?.language}</h3>
        <h3 className="text-2xl">{Mock[id]?.born}</h3> */}
      </div>
      <div className="w-2/3 sm:w-1/2">
        {NFTDetails?.metadata.url && (
          <ImageWithBorder
            src={NFTDetails?.metadata.url}
            alt=""
            width={400}
            height={400}
          />
        )}
      </div>
      {NFTDetails && (
        <div className="w-full flex gap-2 flex-wrap justify-center">
          <span className="border rounded px-2 border-black">
            Country: {NFTDetails.metadata.country}
          </span>
          <span className="border rounded px-2 border-black">
            State: {NFTDetails.metadata.state}
          </span>
          <span className="border rounded px-2 border-black">
            Nationality: {NFTDetails.metadata.nationality}
          </span>
          <span className="border rounded px-2 border-black">
            Language: {NFTDetails.metadata.language}
          </span>
          <span className="border rounded px-2 border-black">
            Birth:{" "}
            {`${NFTDetails.metadata.yearOfBirth}-${NFTDetails.metadata.monthOfBirth}-${NFTDetails.metadata.dayOfBirth}`}
          </span>
          <span className="border rounded px-2 border-black">
            Pronounce: {NFTDetails.metadata.pronounce}
          </span>
          <span className="border rounded px-2 border-black">
            Job: {NFTDetails.metadata.job}
          </span>
          <span className="flex gap-1 items-center border rounded px-2 border-black">
            Tags:
            {NFTDetails.metadata.tags.map((tag) => (
              <p className="" key={tag}>
                {tag}
              </p>
            ))}
          </span>
        </div>
      )}
    </div>
  );
};

export default isLogin(isOwner(NFTDetails));
