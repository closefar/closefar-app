import { IListing } from "../../types/api/types";
import { nestAxios } from "config/axios";

export const getAllListings = async (): Promise<IListing[]> => {
  const res = await nestAxios.get<IListing[]>("/listing");
  return res.data;
};
