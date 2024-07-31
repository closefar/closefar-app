import { nestAxios } from "config/axios";

export const deleteListing = async (id: string) =>
  nestAxios.delete("/listing/" + id);
