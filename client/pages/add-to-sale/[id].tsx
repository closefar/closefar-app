import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import BreakLine from "../../components/BreakLine";
import * as transactions from "@transactions";
import useSWRMutation from "swr/mutation";
import isLogin from "components/IsLogin";
import isOwner from "components/IsOwner";
import ImageWithBorder from "components/ImageWithBorder";
import { useAlertDispatch } from "context/AlertContext";
import { Spinner } from "@material-tailwind/react";
import { z } from "zod";
import {
  adminAddress,
  adminCommission,
  flowdriveLink,
} from "constants/constants";
import { extractFlowErrorMessage } from "lib/extractFlowErrorMessage";
import ImageOfVideo from "components/ImageOfVideo";

const AddToSale = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const nftDetails = router.query as { [key: string]: string };

  const formSchema = z.object({
    price: z
      .string()
      .min(1, "this field must not be empty")
      .refine((value) => !isNaN(+value)),
  });
  type formType = z.infer<typeof formSchema>;

  const [formData, setFormData] = useState<Required<formType>>({
    price: "",
  });
  // const [isCreating, setIsCreating] = useState(false);

  const alertDispatch = useAlertDispatch();

  const [formError, setFormError] = useState<{
    [key in keyof formType]: string[];
  }>({});

  const { trigger, isMutating: isCreating } = useSWRMutation(
    "/transactions/create-listing",
    async () => {
      // setIsCreating(true);
      const parsedForm = formSchema.safeParse(formData);
      const errorObject: { [key in keyof formType]: string[] } = {
        price: [],
      };
      if (!parsedForm.success) {
        parsedForm.error.issues.forEach((error) =>
          error.path.forEach((path) => errorObject[path].push(error.message))
        );
        setFormError(errorObject);
        return;
      }
      setFormError({});

      const priceUFix68 = formData.price.includes(".")
        ? formData.price
        : parseFloat(formData.price).toFixed(1).toString();
      const { txId } = await transactions.createListing(
        parseInt(id),
        priceUFix68,
        new Date().setMonth(10),
        adminAddress,
        adminCommission
      );
      alertDispatch({
        type: "open",
        message: (
          <div>
            {"Listing created. to follow transaction "}
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

  return (
    <div className="w-full g:px-28 px-7 md:px-12 sm:py-9 py-3 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center py-9 gap-3">
        <h1 className="font-medium text-[2.5rem]">Add to Sale</h1>
      </div>
      <div className="flex flex-col sm:flex-row w-2/3 sm:w-full items-center sm:items-start gap-4">
        <div className="flex flex-col gap-3 w-full">
          <Link href={`/nft-details/${id}`} className="cursor-pointer w-full">
            <ImageOfVideo
              src={nftDetails.imageUrl}
              alt=""
              width={600}
              height={600}
              hoverHeader="O Watch"
            />
          </Link>
          <div className=" flex justify-center gap-7 text-xl">
            <span>{nftDetails.name}</span>
            {/* <span>{Mock[id].y_birth}</span> */}
          </div>
        </div>
        <div className="flex flex-col w-full gap-5">
          <div className="w-full">
            <input
              type="text"
              placeholder="Price"
              className="py-2 px-6 placeholder:text-black outline-none w-full"
              value={formData.price}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, price: e.target.value }))
              }
            />
            <BreakLine error={formError.price?.length > 0} />
            <div className="text-red-500 text-xs ml-[5%]">
              {formError?.price?.map((err) => (
                <span key={err}>{err}</span>
              ))}
            </div>
          </div>
          <button
            onClick={trigger}
            className="sm:self-end self-center bg-gray-50 hover:bg-gray-300 py-2 px-4 transition-all rounded-lg text-[#212925] font-ysabeau normal-case"
          >
            {isCreating ? <Spinner className="h-4 w-4" /> : "Add to Sale list"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default isLogin(isOwner(AddToSale));
