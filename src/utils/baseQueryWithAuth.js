import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { getToken } from "./getToken";
import { getBaseUrl } from "./getBaseUrl";

export const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api`,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = getToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});