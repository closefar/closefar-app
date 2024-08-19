import { nestAxios } from "config/axios";

export const getNonce = async () => {
  const res = await nestAxios.get<{ nonce: string }>("/auth/get-nonce");
  return res.data.nonce;
};
