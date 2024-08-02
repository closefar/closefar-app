import axios from "axios";
import { apiPath } from "constants/constants";

export const nestAxios = axios.create({
  baseURL: apiPath,
});
// export const nextAxios = axios.create({
//   baseURL: "http://localhost",
// });
