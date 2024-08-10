import Image from "next/image";
import Link from "next/link";
import * as api from "@api";
import useSWR from "swr";
import { Spinner } from "@material-tailwind/react";
import ImageWithBorder from "components/ImageWithBorder";
import { useAlertDispatch } from "context/AlertContext";
import ImageOfVideo from "components/ImageOfVideo";

export default function Home() {
  const alertDispatch = useAlertDispatch();

  const {
    data: listings,
    isLoading,
    isValidating,
  } = useSWR("/api/listing/get-9-last-listings", api.get9LastListings, {
    onError(err, key, config) {
      console.log(err);
      alertDispatch({ type: "open", message: err.message, class: "error" });
    },
  });

  if (isLoading || isValidating)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner className="h-12 w-12" />
      </div>
    );

  return (
    <div className="w-full lg:px-28 px-7 md:px-12 sm:py-9 py-3 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center sm:py-9 py-3 gap-3">
        <h1 className="font-medium text-[2.5rem] text-center">
          Mint and Collect Everlasting Lives
        </h1>
        <h3>Learn More...</h3>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <h4>Latest Closeups</h4>
        <div className="grid grid-cols-3 gap-4">
          {listings?.map((listing) => (
            <div key={listing?._id}>
              <Link
                className="flex-auto cursor-pointer"
                href={`/listing-details/${listing?._id}`}
              >
                <ImageOfVideo
                  src={listing?.url}
                  alt=""
                  width={200}
                  height={200}
                  hoverHeader="O Watch"
                />
              </Link>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
