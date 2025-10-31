import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "@/utils/getBaseUrl";

const pagesApi = createApi({
  reducerPath: "pagesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/pages`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getPageByKey: builder.query({
      query: (key) => ({ url: `/by-key/${key}`, method: "GET" }),
      transformResponse: (res) => res,
    }),
  }),
});

export const { useGetPageByKeyQuery } = pagesApi;
export default pagesApi;
