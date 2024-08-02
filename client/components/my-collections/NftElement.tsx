import ImageWithBorder from "components/ImageWithBorder";
import Link from "next/link";
import React from "react";
import { INFT } from "types/api/types";
import useSWRMutation from "swr/mutation";
import * as transactions from "@transactions";
import { useAlertDispatch } from "context/AlertContext";
import { Spinner } from "@material-tailwind/react";
import { extractPanic } from "lib/extractPanic";

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

  // const [isRemoving, setIsRemoving] = useState(false);
  console.log(nft.metadata.url);

  const { trigger: removeTrigger, isMutating: isRemoving } = useSWRMutation(
    "/transactions/remove-listing",
    async (key, options: { arg: { nftId: string } }) => {
      if (!isListingExist) return;

      // setIsRemoving(true);

      await transactions.removeListing(+listingId);
      alertDispatch({
        type: "open",
        message: "listing removed.",
        class: "success",
      });
      // setTimeout(async () => {
      //   await mutate();
      //   alertDispatch({
      //     type: "open",
      //     message: "listing removed.",
      //     class: "success",
      //   });
      //   setIsRemoving(false);
      // }, delayTimeForEventHandler);
    },
    {
      onError(err, key, config) {
        console.log(err);
        alertDispatch({
          type: "open",
          message: extractPanic(err),
          class: "error",
        });
      },
    }
  );

  return (
    <div key={nft.uuid} className="flex flex-col gap-2">
      <Link
        href={`/nft-details/${nft?.id}`}
        className="flex-auto cursor-pointer"
      >
        <ImageWithBorder
          src={nft?.metadata.url}
          height={300}
          width={300}
          hoverHeader="O Watch"
          alt=""
        />
      </Link>
      <div className="flex gap-1 flex-wrap">
        {/* <Link
      onClick={(e) =>
        isListingsExist[nft.id]?.isExist && e.preventDefault()
      }
      href={`/edit/${nft.id}`}
      className={`min-w-fit flex justify-center bg-gray-50 flex-1 hover:bg-gray-300 py-2 px-4 transition-all rounded-lg text-[#212925] font-ysabeau normal-case ${
        isListingsExist[nft.id]?.isExist ? "cursor-not-allowed" : ""
      }
      `}
    >
      Edit
    </Link> */}

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
            disabled={!isListingExist}
            className={`flex justify-center min-w-fit bg-gray-50 flex-1 xs:text-base text-xs hover:bg-gray-300 py-2 px-4 transition-all rounded-lg text-[#212925] font-ysabeau normal-case ${
              !isListingExist ? "cursor-not-allowed" : ""
            }
      `}
            onClick={() => removeTrigger({ nftId: nft.id })}
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
