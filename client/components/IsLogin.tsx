import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as fcl from "@onflow/fcl";
import useCurrentUser from "hooks/useCurrentUser";
import { useAlertDispatch } from "context/AlertContext";
import { CurrentUser } from "@onflow/typedefs";

function isLogin(Component: any) {
  return function IsLogin(props: any) {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState<CurrentUser>();
    const user = useCurrentUser();

    const alertDispatch = useAlertDispatch();

    useEffect(() => {
      const checkLogin = async () => {
        try {
          const user = await fcl.currentUser.snapshot();

          if (!user.loggedIn && !user.addr) router.replace("/");
          else setCurrentUser(user);
        } catch (error) {
          console.log(error);
        }
      };
      checkLogin();
    }, [router]);

    if (!currentUser) return null;

    if (!user.loggedIn && !user.addr) router.replace("/");

    return <Component {...props} />;
  };
}

export default isLogin;
