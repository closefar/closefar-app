import ImageWithBorder from "components/ImageWithBorder";
import Link from "next/link";
import React from "react";
import { INFT } from "types/api/types";
import useSWRMutation from "swr/mutation";
import * as transactions from "@transactions";
import { useAlertDispatch } from "context/AlertContext";
import { Spinner } from "@material-tailwind/react";
import { extractFlowErrorMessage } from "lib/extractFlowErrorMessage";
import ImageOfVideo from "components/ImageOfVideo";
import { flowdriveLink } from "constants/constants";

interface INftElement {
  nft: INFT;
  listingId?: string;
  isListingExist: boolean;
}

const NftElement: React.FC<INftElement> = ({
  nft,
  isListingExist,
  listingId,
}) => {
  const alertDispatch = useAlertDispatch();

  const { trigger: removeTrigger, isMutating: isRemoving } = useSWRMutation(
    "/transactions/remove-listing",
    async () => {
      const res = listingId
        ? await transactions.removeListing(+listingId)
        : undefined;

      alertDispatch({
        type: "open",
        message: (
          <div>
            {"listing removed.. to follow transaction "}
            <Link
              className="text-light-blue-900"
              href={flowdriveLink + res?.txId}
              target="_blank"
            >
              click here
            </Link>
          </div>
        ),
        class: "success",
      });
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
  console.log(isRemoving);
  return (
    <div className="flex flex-col gap-2">
      <Link
        href={`/nft-details/${nft?.id}`}
        className="flex-auto cursor-pointer"
      >
        <ImageOfVideo
          src={nft?.metadata.url}
          height={300}
          width={300}
          hoverHeader="O Watch"
          alt=""
        />
      </Link>

      <div className="flex gap-1 flex-wrap">
        {!isListingExist ? (
          <Link
            onClick={(e) => isListingExist && e.preventDefault()}
            href={{
              pathname: `/add-to-sale/${nft.id}`,
              query: { imageUrl: nft.metadata.url, name: nft.name },
            }}
            className={`min-w-fit flex justify-center bg-gray-50 flex-1 xs:text-base text-sm hover:bg-gray-300 py-2 px-4 transition-all rounded-lg text-[#212925] font-ysabeau normal-case ${
              isListingExist ? "cursor-not-allowed" : ""
            }
      `}
          >
            Add to sale List
          </Link>
        ) : (
          <button
            className={`flex justify-center min-w-fit bg-gray-50 flex-1 xs:text-base text-xs hover:bg-gray-300 py-2 px-4 transition-all rounded-lg text-[#212925] font-ysabeau normal-case ${
              !isListingExist ? "cursor-not-allowed" : ""
            }
      `}
            onClick={() => removeTrigger()}
          >
            {isRemoving ? (
              <Spinner className="h-4 w-4" />
            ) : (
              "Remove from sale list"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default NftElement;
