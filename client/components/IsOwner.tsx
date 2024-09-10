import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useCurrentUser from "hooks/useCurrentUser";
import * as scripts from "@scripts";
import { useAlertDispatch } from "context/AlertContext";

function isOwner(Component: any) {
  return function IsOwner(props: any) {
    const router = useRouter();
    const currentUser = useCurrentUser();
    const [isOwner, setIsOwner] = useState(0);
    const alertDispatch = useAlertDispatch();

    useEffect(() => {
      const checkOwner = async () => {
        try {
          if (currentUser.addr && router.query.id) {
            const result = await scripts.isOwner(
              currentUser.addr,
              router.query.id as string
            );

            if (!result) router.replace("/");

            setIsOwner(result);
          }
        } catch (error) {
          const err = new String(error);
          let startIndex = err.indexOf("error:");
          startIndex = err.indexOf(` `, startIndex);

          const endIndex = err.indexOf(`\n`, startIndex + 1);

          const message = err.slice(startIndex + 1, endIndex);
          alertDispatch({ message, class: "error", type: "open" });
        }
      };

      checkOwner();
    }, [router, currentUser, alertDispatch]);

    if (!isOwner) return null;

    return <Component {...props} />;
  };
}

export default isOwner;
