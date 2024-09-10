import React, { useEffect, useRef, useState } from "react";
import BreakLine from "./BreakLine";
import { Option, Select } from "@material-tailwind/react";

interface IInputWithSearch {
  value: string;
  setValue: (value: string) => void;
  data: string[];
  label: string;
  error?: string[];
}

const InputWithSearch: React.FC<IInputWithSearch> = ({
  value,
  setValue,
  data,
  label,
  error,
}) => {
  const select = useRef<HTMLDivElement>(null);

  const [options, setOptions] = useState(data);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setOptions(
      data.filter((d) => d.toLowerCase().includes(search.toLowerCase()))
    );
  }, [data, search]);

  const onFocus = () => {
    const btn = select.current?.children[0] as HTMLButtonElement;
    if (btn.ariaExpanded === "true") return;
    btn.click();
  };

  const onSearch = (inputValue: string) => {
    setValue("");
    setSearch(inputValue);
  };

  // const onBlur = () => {
  //   console.log("unb");
  //   if (!value) setSearch("");
  // };

  // console.log("search", search);
  // console.log("value", value);

  return (
    <div className="w-full relative">
      <input
        type="text"
        placeholder={label}
        className="py-2 px-[5%] relative placeholder:text-blue-gray-500 outline-none w-full z-10"
        onFocus={onFocus}
        onClick={onFocus}
        value={value ? value : search}
        onChange={(e) => onSearch(e.target.value)}
        // onBlur={() => onBlur()}
      />
      <div className="w-full absolute top-0 left-0 [&>div>button]:border-none [&>div>label]:text-base [&>div>label]:after:border-none [&>div>label]:top-1/3 [&>div>label]:left-[5%] ">
        <Select
          className="[&>span]:pl-[5%] [&>div]:z-10"
          variant="static"
          ref={select}
          value={value}
          onChange={(val) => setValue(val || "")}
        >
          {options.map((option) => (
            <Option key={option} className="font-ysabeau" value={option}>
              {option}
            </Option>
          ))}
        </Select>
      </div>
      <BreakLine error={(error?.length || 0) > 0} />
      <div className="text-red-500 text-xs ml-[5%]">
        {error?.map((err) => (
          <span key={err}>{err}</span>
        ))}
      </div>
    </div>
  );
};

export default InputWithSearch;
