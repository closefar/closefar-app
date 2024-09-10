import * as fcl from "@onflow/fcl";
import { CurrentUser } from "@onflow/typedefs";
import { useEffect, useState } from "react";

export default function useCurrentUser(): CurrentUser {
  const [user, setUser] = useState<CurrentUser>({
    addr: undefined,
    cid: undefined,
    expiresAt: undefined,
    f_type: "",
    f_vsn: "",
    loggedIn: false,
    services: [],
  });

  useEffect(() => {
    fcl.currentUser.subscribe(setUser);
  }, []);

  return user;
}
