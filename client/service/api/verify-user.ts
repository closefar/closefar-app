import { Service } from "@onflow/typedefs";
import { nestAxios } from "config/axios";

export const verifyUser = async (accountProofData: Service) => {
  const res = await nestAxios.post<{ accessToken: string }>(
    "/auth/verify-user",
    { accountProofData }
  );
  return res.data.accessToken;
};
