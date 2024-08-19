import { nestAxios, nestAxiosToken } from "config/axios";
import { apiPath } from "constants/constants";
import React from "react";
import useSWR from "swr";

const Test = () => {
  const { data, error } = useSWR("aaaaaaa", () =>
    nestAxiosToken.get(apiPath + "/listing")
  );
  console.log(data);
  console.log(error);
  if (error) return <pre>{JSON.stringify(error, undefined, 2)}</pre>;

  return <pre>{JSON.stringify(data, undefined, 2)}</pre>;
};

export default Test;
