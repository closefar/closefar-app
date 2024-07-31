import { IListing } from "../../types/api/types";
import { nestAxios } from "config/axios";

export const createListing = async (data: IListing) =>
  nestAxios.post<IListing>("/listing", data);
