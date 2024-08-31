import { Button } from "@material-tailwind/react";
import { nestAxios, nestAxiosToken } from "config/axios";
import { apiPath } from "constants/constants";
import { useAlertDispatch } from "context/AlertContext";
import Link from "next/link";
import React from "react";
import useSWR from "swr";

const Test = () => {
  const alertDispatch = useAlertDispatch();

  const { data, error } = useSWR(
    "aaaaaaa",
    () => nestAxiosToken.get(apiPath + "/listing"),
    {
      onError(err, key, config) {
        alertDispatch({ type: "open", message: err.message, class: "error" });
      },
    }
  );

  return (
    <div>
      <Button
        onClick={() =>
          alertDispatch({
            type: "open",
            message: (
              <div>
                please &nbsp;
                <Link
                  className="text-light-blue-900"
                  href="https://www.google.com"
                  target="_blank"
                >
                  click here
                </Link>
                &nbsp; to navigate
              </div>
            ),
            class: "success",
          })
        }
      >
        click
      </Button>
      <pre>{JSON.stringify(data, undefined, 2)}</pre>;
    </div>
  );
};

export default Test;
