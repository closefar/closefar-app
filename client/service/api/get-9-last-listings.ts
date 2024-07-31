import { IListing } from "../../types/api/types";
import { nestAxios } from "config/axios";

export const get9LastListings = async (): Promise<IListing[]> => {
  const res = await nestAxios.get<IListing[]>("/listing/get-9-last-listings");
  return res.data;
};
