import { IListing } from "../../types/api/types";
import { nestAxios } from "config/axios";

export const getListingDetails = async (id: string): Promise<IListing> => {
  const res = await nestAxios.get<IListing>("/listing/listing-details/" + id);
  return res.data;
};
