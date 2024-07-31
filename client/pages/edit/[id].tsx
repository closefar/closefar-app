import { useRouter } from "next/router";
import React, { useState } from "react";
import BreakLine from "../../components/BreakLine";
import { Option, Select } from "@material-tailwind/react";
import isOwner from "components/IsOwner";
import isLogin from "components/IsLogin";

const Edit = () => {
  const { id } = useRouter().query;
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
  const [tags, setTags] = useState([]);

  return (
    <div className="w-full px-28 py-9 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center py-9 gap-3">
        <h1 className="font-medium text-[2.5rem]">Edit</h1>
      </div>
      <div className="w-full flex flex-wrap gap-y-2">
        <div className="w-1/2">
          <input
            type="text"
            placeholder="Name"
            className="py-2 px-8 placeholder:text-blue-gray-500 outline-none w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <BreakLine />
        </div>
        <div
          className={`w-1/2 [&>div>button]:border-none [&>div>label]:text-base [&>div>label]:after:border-none [&>div>label]:top-1/3 [&>div>label]:left-[5%] ${
            country && "[&>div>label]:hidden"
          }`}
        >
          <Select
            className="[&>span]:pl-8"
            variant="static"
            value={country}
            onChange={(val) => setCountry(val)}
            label="Country"
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
          <BreakLine />
        </div>
        <div
          className={`w-1/2 [&>div>button]:border-none [&>div>label]:text-base [&>div>label]:after:border-none [&>div>label]:top-1/3 [&>div>label]:left-[5%] ${
            yearOfBirth && "[&>div>label]:hidden"
          }`}
        >
          <Select
            className="[&>span]:pl-8"
            variant="static"
            value={yearOfBirth}
            onChange={(val) => setYearOfBirth(val)}
            label="Year of Birth"
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
          <BreakLine />
        </div>
        <div
          className={`w-1/2 [&>div>button]:border-none [&>div>label]:text-base [&>div>label]:after:border-none [&>div>label]:top-1/3 [&>div>label]:left-[5%] ${
            monthOfBirth && "[&>div>label]:hidden"
          }`}
        >
          <Select
            className="[&>span]:pl-8"
            variant="static"
            value={monthOfBirth}
            onChange={(val) => setMonthOfBirth(val)}
            label="Month of Birth"
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
          <BreakLine />
        </div>
        <div
          className={`w-1/2 [&>div>button]:border-none [&>div>label]:text-base [&>div>label]:after:border-none [&>div>label]:top-1/3 [&>div>label]:left-[5%] ${
            dayOfBirth && "[&>div>label]:hidden"
          }`}
        >
          <Select
            className="[&>span]:pl-8"
            variant="static"
            value={dayOfBirth}
            onChange={(val) => setDayOfBirth(val)}
            label="Day of Birth"
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
          <BreakLine />
        </div>
        <div
          className={`w-1/2 [&>div>button]:border-none [&>div>label]:text-base [&>div>label]:after:border-none [&>div>label]:top-1/3 [&>div>label]:left-[5%] ${
            nationality && "[&>div>label]:hidden"
          }`}
        >
          <Select
            className="[&>span]:pl-8"
            variant="static"
            value={nationality}
            onChange={(val) => setNationality(val)}
            label="Nationality"
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
          <BreakLine />
        </div>
        <div
          className={`w-1/2 [&>div>button]:border-none [&>div>label]:text-base [&>div>label]:after:border-none [&>div>label]:top-1/3 [&>div>label]:left-[5%] ${
            state && "[&>div>label]:hidden"
          }`}
        >
          <Select
            className="[&>span]:pl-8"
            variant="static"
            value={state}
            onChange={(val) => setState(val)}
            label="State"
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
          <BreakLine />
        </div>
        <div
          className={`w-1/2 [&>div>button]:border-none [&>div>label]:text-base [&>div>label]:after:border-none [&>div>label]:top-1/3 [&>div>label]:left-[5%] ${
            language && "[&>div>label]:hidden"
          }`}
        >
          <Select
            className="[&>span]:pl-8"
            variant="static"
            value={language}
            onChange={(val) => setLanguage(val)}
            label="Language"
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
          <BreakLine />
        </div>
        <div
          className={`w-1/2 [&>div>button]:border-none [&>div>label]:text-base [&>div>label]:after:border-none [&>div>label]:top-1/3 [&>div>label]:left-[5%] ${
            pronounce && "[&>div>label]:hidden"
          }`}
        >
          <Select
            className="[&>span]:pl-8"
            variant="static"
            value={pronounce}
            onChange={(val) => setPronounce(val)}
            label="Pronounce"
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
          <BreakLine />
        </div>

        <div className="w-1/2">
          <input
            type="text"
            placeholder="Tags"
            className="py-2 px-8 placeholder:text-blue-gray-500 outline-none w-full"
          />
          <BreakLine />
        </div>
        <div
          className={`w-1/2 [&>div>button]:border-none [&>div>label]:text-base [&>div>label]:after:border-none [&>div>label]:top-1/3 [&>div>label]:left-[5%] ${
            job && "[&>div>label]:hidden"
          }`}
        >
          <Select
            className="[&>span]:pl-8"
            variant="static"
            value={job}
            onChange={(val) => setJob(val)}
            label="Jobs"
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
          <BreakLine />
        </div>
      </div>
      <button className="self-end mt-10 bg-gray-50 hover:bg-gray-300 py-2 px-4 transition-all rounded-lg text-[#212925] font-ysabeau normal-case">
        Update
      </button>
    </div>
  );
};

export default isLogin(isOwner(Edit));
