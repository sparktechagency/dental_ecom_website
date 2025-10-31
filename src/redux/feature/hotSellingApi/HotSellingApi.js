import { getBaseUrl } from "@/utils/getBaseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const hotSellingApi = createApi({
  reducerPath: "hotSellingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/products/hot`,
  }),
  endpoints: (builder) => ({
    fetchAllHotSelling: builder.query({
      query: () => "/",
      transformResponse: (response) => {
       
        if (Array.isArray(response)) return response;

       
        return response?.data || [];
      },
    }),
  }),
});

export const { useFetchAllHotSellingQuery } = hotSellingApi;
export default hotSellingApi 