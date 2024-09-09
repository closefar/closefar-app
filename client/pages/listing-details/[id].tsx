import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import * as transactions from "@transactions";
import * as api from "@api";
import isLogin from "../../components/IsLogin";
import useSWR from "swr";
import { Spinner } from "@material-tailwind/react";
import useSWRMutation from "swr/mutation";
import ImageWithBorder from "components/ImageWithBorder";
import { useAlertDispatch } from "context/AlertContext";
import useCurrentUser from "hooks/useCurrentUser";
import * as fcl from "@onflow/fcl";
import { extractFlowErrorMessage } from "lib/extractFlowErrorMessage";
import Video from "components/Video";
import { flowdriveLink } from "constants/constants";
import Link from "next/link";

interface IArg {
  arg: { owner: string; listingId: string };
}

// this page get all details of Listing from database base on database id
const ListingDetails = () => {
  const router = useRouter();
  const id = router.query.id as string;

  // const [isPurchasing, setIsPurchasing] = useState(false);

  const currentUser = useCurrentUser();

  const alertDispatch = useAlertDispatch();

  const {
    data: listing,
    isLoading,
    isValidating,
  } = useSWR(
    id ? ["/api/listing/listing-details", id] : null,
    () => api.getListingDetails(id),
    {
      onError(err, key, config) {
        console.log(err);
        alertDispatch({ type: "open", message: err.message, class: "error" });
      },
    }
  );

  const {
    trigger,
    error,
    isMutating: isPurchasing,
  } = useSWRMutation(
    "/transactions/purchase-listing",
    async (key, options: IArg) => {
      const { txId } = await transactions.purchaseListing(
        parseInt(options.arg.listingId),
        options.arg.owner
      );
      alertDispatch({
        type: "open",
        message: (
          <div>
            {"listing purchased. to follow transaction "}
            <Link
              className="text-light-blue-900"
              href={flowdriveLink + txId}
              target="_blank"
            >
              click here
            </Link>
          </div>
        ),
        class: "success",
      });
      router.replace("/my-collections");
    },
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
      <h3 className="font-medium text-[2.5rem]">{listing?.name}</h3>
      <div className="w-1/2 flex justify-around">
        {listing?.price && (
          <div className="flex gap-1 items-end">
            <p className="text-2xl">{listing?.price}</p>
            <Image
              className="h-5 w-5"
              src={"/flow.ico"}
              alt=""
              width={20}
              height={20}
            />
          </div>
        )}
      </div>
      <div className="w-2/3 sm:w-1/2">
        {listing?.url && <Video src={listing?.url} />}
      </div>
      {listing?.owner && currentUser.addr !== listing?.owner && (
        <button
          onClick={() =>
            trigger({ owner: listing.owner, listingId: listing.listingId })
          }
          className="min-w-fit bg-gray-50 flex-1 hover:bg-gray-300 py-2 px-4 transition-all rounded-lg text-[#212925] font-ysabeau normal-case"
        >
          {isPurchasing ? <Spinner className="h-4 w-4" /> : "Purchase"}
        </button>
      )}
      {listing && (
        <div className="w-full flex gap-2 flex-wrap justify-center">
          <span className="border rounded px-2 border-black">
            Country: {listing.country}
          </span>
          <span className="border rounded px-2 border-black">
            State: {listing.state}
          </span>
          <span className="border rounded px-2 border-black">
            Nationality: {listing.nationality}
          </span>
          <span className="border rounded px-2 border-black">
            Language: {listing.language}
          </span>
          <span className="border rounded px-2 border-black">
            Birth:{" "}
            {`${listing.yearOfBirth}-${listing.monthOfBirth}-${listing.dayOfBirth}`}
          </span>
          <span className="border rounded px-2 border-black">
            Pronounce: {listing.pronounce}
          </span>
          <span className="border rounded px-2 border-black">
            Job: {listing.job}
          </span>
          <span className="flex gap-1 items-center border rounded px-2 border-black">
            Tags:
            {listing.tags.map((tag) => (
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

export default ListingDetails;
