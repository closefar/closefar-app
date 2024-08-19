import axios from "axios";
import { apiPath } from "constants/constants";

export const nestAxios = axios.create({
  baseURL: apiPath,
});

// const token =
//   typeof window !== "undefined" ? localStorage.getItem("token") : "";

export const nestAxiosToken = axios.create({
  baseURL: apiPath,
  // headers: {
  //   Authorization: "Bearer " + token,
  // },
});

nestAxiosToken.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (err) => Promise.reject(err)
);

// nestAxiosToken.defaults = {
//   headers: {
//     common: {
//       Authorization:
//         "Bearer " +
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHgxYmVhOGQzOGNmZTNkYjRmIiwiaWF0IjoxNzIzNTMwNTE0LCJleHAiOjE3MjM2MTY5MTR9.r-q0tbLdGx_6RTufWqqhdrcr21OsY_raBN2rk2H49-M",
//     },
//   },
// };
// export const nextAxios = axios.create({
//   baseURL: "http://localhost",
// });
