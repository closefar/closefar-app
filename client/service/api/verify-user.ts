import { nestAxios } from "config/axios";

export const verifyUser = async (accountProofData) => {
  const res = await nestAxios.post<{ accessToken: string }>(
    "/auth/verify-user",
    { accountProofData }
  );
  return res.data.accessToken;
};
