import { nestAxiosToken } from "config/axios";

export const getSignedUrl = (fileName: string) =>
  nestAxiosToken.post<{ uploadUrl: string; key: string }>(
    "/aws/get-signed-url",
    {
      fileName,
    }
  );
