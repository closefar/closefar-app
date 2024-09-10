import {
  Button,
  Progress,
  Spinner,
  Step,
  Stepper,
} from "@material-tailwind/react";
import React, { useState } from "react";
import BreakLine from "../components/BreakLine";
import * as transactions from "@transactions";
import useCurrentUser from "hooks/useCurrentUser";
import { nestAxios, nestAxiosToken } from "config/axios";
import isLogin from "components/IsLogin";
import countryList from "../constants/list-of-country";
import nationalityList from "../constants/list-of-nationality";
import languageList from "../constants/list-of-lang";
import months from "../constants/list-of-month";
import last100Years from "../constants/last-100-years";
import InputWithSearch from "../components/InputWithSearch";
import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";
import { useAlertDispatch } from "context/AlertContext";
import { z } from "zod";
import { apiPath, flowdriveLink } from "constants/constants";
import { extractFlowErrorMessage } from "lib/extractFlowErrorMessage";
import ImageOfVideo from "components/ImageOfVideo";
import Link from "next/link";

const Mint = () => {
  const router = useRouter();

  const formSchema = z.object({
    name: z.string().min(1, "this filed must not be empty"),
    dayOfBirth: z
      .string()
      .min(1, "this filed must not be empty")
      .refine((value) => !isNaN(+value)),
    monthOfBirth: z.string().min(1, "this filed must not be empty"),
    yearOfBirth: z
      .string()
      .min(1, "this filed must not be empty")
      .refine((value) => !isNaN(+value)),
    country: z.string().min(1, "this filed must not be empty"),
    nationality: z.string().min(1, "this filed must not be empty"),
    language: z.string().min(1, "this filed must not be empty"),
    job: z.string().min(1, "this filed must not be empty"),
    state: z.string().min(1, "this filed must not be empty"),
    pronounce: z.string().min(1, "this filed must not be empty"),
    tags: z.array(z.string().min(1, "this filed must not be empty")),
  });

  type formType = z.infer<typeof formSchema>;

  const [formData, setFormData] = useState<Required<formType>>({
    name: "",
    country: "",
    yearOfBirth: "",
    monthOfBirth: "",
    dayOfBirth: "",
    state: "",
    pronounce: "",
    language: "",
    nationality: "",
    job: "",
    tags: [],
  });

  const [error, setError] = useState<{ [key in keyof formType]: string[] }>();

  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);

  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState(0);
  const [isUploadDone, setIsUploadDone] = useState(false);

  const [dragging, setDragging] = useState(false);

  const alertDispatch = useAlertDispatch();

  const handleNext = () => {
    if (activeStep !== 1) {
      !isLastStep && setActiveStep((cur) => cur + 1);
      return;
    }

    const parsedForm = formSchema.safeParse(formData);

    const errorObject: { [key in keyof formType]: string[] } = {
      name: [],
      dayOfBirth: [],
      monthOfBirth: [],
      yearOfBirth: [],
      country: [],
      nationality: [],
      language: [],
      job: [],
      state: [],
      pronounce: [],
      tags: [],
    };
    if (parsedForm.success) setActiveStep((cur) => cur + 1);
    else
      parsedForm.error.issues.forEach((error) =>
        error.path.forEach((path) => errorObject[path].push(error.message))
      );
    setError(errorObject);
  };

  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const onDropHandler = (ev) => {
    ev.preventDefault();
    const newFile = ev.dataTransfer.files[0];
    setFile(newFile);
    setDragging(false);
  };

  const onDragOver = (ev) => {
    ev.preventDefault();
    setDragging(true);
  };
  const onDragEnter = (ev) => {
    ev.preventDefault();
    setDragging(true);
  };
  const onDragLeave = (ev) => {
    ev.preventDefault();
    setDragging(false);
  };

  const { trigger: upload, data: fileLink } = useSWRMutation(
    "/api/uploads",
    async () => {
      setActiveStep((cur) => cur + 1);
      // upload image to server and get name and produce link of it
      const fd = new FormData();
      fd.set("file", file);

      const {
        data: { uploadUrl, key },
      } = await nestAxiosToken.post("/aws/get-signed-url", {
        fileName: file.name,
      });
      await nestAxios.put(uploadUrl, fd.get("file"), {
        onUploadProgress(pge) {
          console.log(pge);
          console.log(pge.progress);
          let percentage = Math.floor((pge.loaded * 100) / pge.total);
          percentage = percentage < 100 ? percentage + 1 : 100;
          setProgress(percentage);
        },
        headers: {
          "Content-Type": file?.type || "video/mp4",
        },
      });
      setIsUploadDone(true);
      const fileLink =
        "https://testnet-closefar.s3.ca-central-1.amazonaws.com/" + key;
      return fileLink;
    },
    {
      onError(err, key, config) {
        console.log(err);
        alertDispatch({ type: "open", message: err.message, class: "error" });
      },
    }
  );

  const { trigger: mint, isMutating: isMinting } = useSWRMutation(
    "/transactions/mint-nft",
    async () => {
      // now mint nft with name and link of nft for current user
      const { txId } = await transactions.mintNFT(
        // currentUser.addr,
        {
          ...formData,
          url: fileLink,
        }
      );
      alertDispatch({
        type: "open",
        message: (
          <div>
            {"NFT minted. to follow transaction "}
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
    <div className="w-full lg:px-28 px-7 md:px-12 sm:py-9 py-3 flex flex-col items-center justify-center gap-14">
      <h1 className="font-medium text-[2.5rem]">Mint</h1>
      <div className="w-full flex flex-col gap-12">
        <Stepper
          activeStep={activeStep}
          isLastStep={(value) => setIsLastStep(value)}
          isFirstStep={(value) => setIsFirstStep(value)}
          className="justify-stretch"
        >
          <Step className="rounded-none rounded-l-lg flex-1 text-xs font-normal h-auto py-[0.6rem]">
            Upload Video
          </Step>
          <Step className="rounded-none flex-1 text-xs font-normal h-auto py-[0.6rem]">
            Add Information
          </Step>
          <Step className="rounded-none rounded-r-lg flex-1 text-xs font-normal h-auto py-[0.6rem]">
            Review and Mint
          </Step>
        </Stepper>
        {activeStep === 0 ? (
          file ? (
            <div className="md:w-1/3 sm:w-1/2 w-2/3 self-center relative">
              <button
                onClick={() => setFile(null)}
                className="w-[10%] aspect-square absolute top-0 text-[#212925] text-xs right-0 rounded-full bg-red-500 z-10 leading-none p-1 translate-x-1/2 -translate-y-1/2"
              >
                X
              </button>
              <ImageOfVideo
                src={URL.createObjectURL(file)}
                alt=""
                width={300}
                height={300}
              />
            </div>
          ) : (
            <div
              id="drop_zone"
              onDrop={onDropHandler}
              onDragOver={onDragOver}
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              className={`sm:mt-14 mt-7 border relative border-gray-500 border-dashed sm:w-1/2 w-2/3 self-center h-32 ${
                dragging ? "bg-green-400" : null
              }`}
            >
              <label
                htmlFor={"file_picker"}
                className="cursor-pointer absolute top-0 left-0 w-full h-full flex items-center justify-center"
              >
                Select a video or drag here
              </label>
              <input
                id="file_picker"
                type="file"
                accept="video/mp4"
                onChange={(ev) => setFile(ev.target.files[0])}
                style={{ display: "none" }}
              ></input>
            </div>
          )
        ) : null}

        {activeStep === 1 ? (
          <>
            <div className="w-full flex flex-wrap">
              <div className="xs:w-1/2 w-full">
                <input
                  type="text"
                  placeholder="Name"
                  className="py-2 px-[5%] placeholder:text-blue-gray-500 outline-none w-full"
                  value={formData?.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
                <BreakLine error={error?.name.length > 0} />
                <div className="text-red-500 text-xs ml-[5%]">
                  {error?.name?.map((err) => (
                    <span key={err}>{err}</span>
                  ))}
                </div>
              </div>
              <div className="xs:w-1/2 w-full">
                <InputWithSearch
                  data={countryList.map((country) => country.name)}
                  value={formData?.country}
                  setValue={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      country: value,
                    }))
                  }
                  label="Country"
                  error={error?.country}
                />
              </div>
              <div className="xs:w-1/2 w-full">
                <InputWithSearch
                  data={last100Years.map((year) => year.toString())}
                  value={formData?.yearOfBirth}
                  setValue={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      yearOfBirth: value,
                    }))
                  }
                  label="Year of Birth"
                  error={error?.yearOfBirth}
                />
              </div>
              <div className="xs:w-1/2 w-full">
                <InputWithSearch
                  data={months.map((month) => month.name)}
                  value={formData?.monthOfBirth}
                  setValue={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      monthOfBirth: value,
                    }))
                  }
                  label="Month of Birth"
                  error={error?.monthOfBirth}
                />
              </div>
              <div className="xs:w-1/2 w-full">
                <InputWithSearch
                  data={Array.from({ length: 31 }, (v, k) =>
                    (k + 1).toString()
                  )}
                  value={formData?.dayOfBirth}
                  setValue={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      dayOfBirth: value,
                    }))
                  }
                  label="Day of Birth"
                  error={error?.dayOfBirth}
                />
              </div>
              <div className="xs:w-1/2 w-full">
                <InputWithSearch
                  data={nationalityList}
                  value={formData?.nationality}
                  setValue={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      nationality: value,
                    }))
                  }
                  label="Nationality"
                  error={error?.nationality}
                />
              </div>
              <div className="xs:w-1/2 w-full">
                <input
                  type="text"
                  placeholder="State"
                  className="py-2 px-[5%] placeholder:text-blue-gray-500 outline-none w-full"
                  value={formData?.state}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, state: e.target.value }))
                  }
                />
                <BreakLine error={error?.state.length > 0} />
                <div className="text-red-500 text-xs ml-[5%]">
                  {error?.state?.map((err) => (
                    <span key={err}>{err}</span>
                  ))}
                </div>
              </div>
              <div className="xs:w-1/2 w-full">
                <InputWithSearch
                  data={languageList.map((lang) => lang.name)}
                  value={formData?.language}
                  setValue={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      language: value,
                    }))
                  }
                  label="Language"
                  error={error?.language}
                />
              </div>
              <div className="xs:w-1/2 w-full">
                <InputWithSearch
                  data={["he/him/his", "she/her/her", "they/them/their"]}
                  value={formData?.pronounce}
                  setValue={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      pronounce: value,
                    }))
                  }
                  label="Pronounce"
                  error={error?.pronounce}
                />
              </div>
              <div className="xs:w-1/2 w-full">
                <input
                  type="text"
                  placeholder="Job"
                  className="py-2 px-[5%] placeholder:text-blue-gray-500 outline-none w-full"
                  value={formData?.job}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, job: e.target.value }))
                  }
                />
                <BreakLine error={error?.job.length > 0} />
                <div className="text-red-500 text-xs ml-[5%]">
                  {error?.job?.map((err) => (
                    <span key={err}>{err}</span>
                  ))}
                </div>
              </div>
              <div className="xs:w-1/2 w-full">
                <input
                  type="text"
                  placeholder="Tags"
                  className="py-2 px-[5%] placeholder:text-blue-gray-500 outline-none w-full"
                  onKeyDown={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    if (
                      e.key === "Enter" &&
                      !formData?.tags.includes(target.value)
                    ) {
                      setFormData((prev) => ({
                        ...prev,
                        tags: [...prev.tags, target.value],
                      }));
                      target.value = "";
                    }
                  }}
                />
                <BreakLine />
              </div>
              <div className="w-1/2 xs:mt-0 mt-4 flex gap-1 items-center">
                {formData?.tags?.map((tag) => (
                  <p
                    className="border rounded px-2 border-black"
                    key={tag}
                    onClick={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        tags: prev.tags.filter((prevTag) => tag !== prevTag),
                      }));
                    }}
                  >
                    {tag}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <Progress
                value={progress}
                label={true}
                className="transition-all [&>*]:transition-all"
              />
            </div>
          </>
        ) : null}

        {activeStep === 2 ? (
          <div className="flex sm:flex-row sm:items-start flex-col items-center gap-3">
            <div className="md:w-1/3 sm:w-1/2 w-2/3">
              <ImageOfVideo
                src={URL.createObjectURL(file)}
                alt=""
                width={300}
                height={300}
              />
            </div>
            <div className="flex flex-col">
              <span>Name: {formData?.name}</span>
              <span>Country: {formData?.country}</span>
              <span>State: {formData?.state}</span>
              <span>Nationality: {formData?.nationality}</span>
              <span>Language: {formData?.language}</span>
              <span>
                Birth:{" "}
                {`${formData?.yearOfBirth}-${formData?.monthOfBirth}-${formData?.dayOfBirth}`}
              </span>
              <span>Pronounce: {formData?.pronounce}</span>
              <span>Job: {formData?.job}</span>
              <span className="flex gap-1 items-center">
                Tags:
                {formData?.tags?.map((tag) => (
                  <p className="border rounded px-2 border-black" key={tag}>
                    {tag}
                  </p>
                ))}
              </span>
            </div>
          </div>
        ) : null}

        <div className="flex justify-between">
          <Button
            className={`font-ysabeau ${
              isFirstStep || activeStep === 1
                ? "bg-transparent text-transparent"
                : ""
            }`}
            onClick={handlePrev}
            disabled={isFirstStep || activeStep === 1}
          >
            Prev
          </Button>

          <Button
            className="font-ysabeau"
            onClick={(e) =>
              isLastStep ? mint() : isFirstStep ? upload() : handleNext()
            }
            disabled={
              (isFirstStep && !file) || (activeStep === 1 && !isUploadDone)
            }
          >
            {isLastStep ? (
              isMinting ? (
                <Spinner className="h-4 w-4" />
              ) : (
                "Mint"
              )
            ) : (
              "Next"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default isLogin(Mint);
