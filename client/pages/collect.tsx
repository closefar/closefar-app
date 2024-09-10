import { Option, Select, Spinner } from "@material-tailwind/react";
import React, { useState } from "react";
import BreakLine from "../components/BreakLine";
import Image from "next/image";
import Link from "next/link";
import * as api from "@api";
import isLogin from "../components/IsLogin";
import useSWR from "swr";
import ImageWithBorder from "components/ImageWithBorder";
import InputWithSearch from "components/InputWithSearch";
import last100Years from "constants/last-100-years";
import countryList from "../constants/list-of-country";
import months from "constants/list-of-month";
import nationalityList from "../constants/list-of-nationality";
import languageList from "../constants/list-of-lang";
import { useAlertDispatch } from "context/AlertContext";
import ImageOfVideo from "components/ImageOfVideo";

const Collect = () => {
  const [name, setName] = useState("");
  const [yearOfBirth, setYearOfBirth] = useState("");
  const [dayOfBirth, setDayOfBirth] = useState("");
  const [state, setState] = useState("");
  const [pronounce, setPronounce] = useState("");
  const [job, setJob] = useState("");
  const [country, setCountry] = useState("");
  const [monthOfBirth, setMonthOfBirth] = useState("");
  const [nationality, setNationality] = useState("");
  const [language, setLanguage] = useState("");
  const [Tags, setTags] = useState("");

  const alertDispatch = useAlertDispatch();

  const {
    data: listings,
    isLoading,
    isValidating,
  } = useSWR("/api/listing", api.getAllListings, {
    onError(err, key, config) {
      console.log(err);
      alertDispatch({ type: "open", message: err.message, class: "error" });
    },
  });

  if (isLoading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner className="h-12 w-12" />
      </div>
    );

  return (
    <div className="w-full lg:px-28 px-7 md:px-12 sm:py-9 py-3 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center sm:py-9 py-3 gap-3">
        <h1 className="font-medium text-[2.5rem]">Collect</h1>
      </div>
      <div className="w-full flex flex-wrap">
        <div className="xs:w-1/2 xs:sm:w-1/3 w-full">
          <input
            type="text"
            placeholder="Name"
            className="py-2 px-[5%] placeholder:text-blue-gray-500 outline-none w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <BreakLine />
        </div>
        <div className="xs:w-1/2 xs:sm:w-1/3 w-full">
          <InputWithSearch
            data={countryList.map((country) => country.name)}
            value={country}
            setValue={setCountry}
            label="Country"
          />
        </div>
        <div className="xs:w-1/2 xs:sm:w-1/3 w-full">
          <InputWithSearch
            data={last100Years.map((year) => year.toString())}
            value={yearOfBirth}
            setValue={setYearOfBirth}
            label="Year of Birth"
          />
        </div>
        <div className="xs:w-1/2 xs:sm:w-1/3 w-full">
          <InputWithSearch
            data={months.map((month) => month.name)}
            value={monthOfBirth}
            setValue={setMonthOfBirth}
            label="Month of Birth"
          />
        </div>
        <div className="xs:w-1/2 xs:sm:w-1/3 w-full">
          <InputWithSearch
            data={Array.from({ length: 31 }, (v, k) => (k + 1).toString())}
            value={dayOfBirth}
            setValue={setDayOfBirth}
            label="Day of Birth"
          />
        </div>
        <div className="xs:w-1/2 xs:sm:w-1/3 w-full">
          <InputWithSearch
            data={nationalityList}
            value={nationality}
            setValue={setNationality}
            label="Nationality"
          />
        </div>
        <div className="xs:w-1/2 xs:sm:w-1/3 w-full">
          <input
            type="text"
            placeholder="State"
            className="py-2 px-[5%] placeholder:text-blue-gray-500 outline-none w-full"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <BreakLine />
        </div>
        <div className="xs:w-1/2 xs:sm:w-1/3 w-full">
          <InputWithSearch
            data={languageList.map((lang) => lang.name)}
            value={language}
            setValue={setLanguage}
            label="Language"
          />
        </div>
        <div className="xs:w-1/2 xs:sm:w-1/3 w-full">
          <InputWithSearch
            data={["he/him/his", "she/her/her", "they/them/their"]}
            value={pronounce}
            setValue={setPronounce}
            label="Pronounce"
          />
        </div>
        <div className="xs:w-1/2 xs:sm:w-1/3 w-full">
          <input
            type="text"
            placeholder="Tags"
            className="py-2 px-[5%] placeholder:text-blue-gray-500 outline-none w-full"
            // onKeyDown={(e) => {
            //   const target = e.target as HTMLTextAreaElement;
            //   if (e.key === "Enter" && !tags.includes(target.value)) {
            //     setTags((prev) => [...prev, target.value]);
            //     target.value = "";
            //   }
            // }}
          />
          <BreakLine />
        </div>
        <div className="xs:w-1/2 xs:sm:w-1/3 w-full">
          <input
            type="text"
            placeholder="Job"
            className="py-2 px-[5%] placeholder:text-blue-gray-500 outline-none w-full"
            value={job}
            onChange={(e) => setJob(e.target.value)}
          />
          <BreakLine />
        </div>
        {/* <div className="w-1/2 flex gap-1 items-center">
              {tags.map((tag) => (
                <p
                  className="border rounded px-2 border-black"
                  key={tag}
                  onClick={(e) => {
                    setTags((prev) =>
                      prev.filter((prevTag) => tag !== prevTag)
                    );
                  }}
                >
                  {tag}
                </p>
              ))}
            </div> */}
      </div>
      <div className="flex flex-col gap-2 w-full mt-6">
        <div className="grid grid-cols-3 gap-4">
          {listings &&
            listings.length > 0 &&
            listings.map((listing) => (
              <div key={listing._id}>
                <Link
                  className="flex-auto cursor-pointer"
                  href={`/listing-details/${listing._id}`}
                >
                  <ImageOfVideo
                    src={listing.url}
                    alt=""
                    width={200}
                    height={200}
                    hoverHeader="O Watch"
                  />
                </Link>
                <div className="flex gap-1 items-end">
                  <p className="text-2xl">{listing.price}</p>
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
};

export default isLogin(Collect);
