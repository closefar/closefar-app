import { nestAxios } from "config/axios";

// export type IIsListingExistRes<T = boolean> = {
//   [key: string]: T extends true
//     ? { isExist: T; listingId: string }
//     : { isExist: T };
// };

export interface IIsListingExistRes {
  [key: string]: { isExist: boolean; listingId: string };
}

export const isListingsExist = async (
  ids: string[]
): Promise<IIsListingExistRes> => {
  const res = await nestAxios.get<IIsListingExistRes>(
    "/listing/is-listings-exist",
    { params: { ids } }
  );
  return res.data;
};
