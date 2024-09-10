import { nestAxios } from "config/axios";

export const uploadFile = (uploadUrl: string, file: any, cb: Function) =>
  nestAxios.put(uploadUrl, file, {
    onUploadProgress(pge) {
      if (!pge.total) return;
      let percentage = Math.floor((pge.loaded * 100) / pge.total);
      percentage = percentage < 100 ? percentage + 1 : 100;
      cb(percentage);
    },
    headers: {
      "Content-Type": file?.type || "video/mp4",
    },
  });
