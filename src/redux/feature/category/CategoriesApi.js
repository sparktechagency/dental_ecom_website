import { getBaseUrl } from "@/utils/getBaseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/categories`,
    credentials: "include",
  }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    fetchAllCategories: builder.query({
      query: () => "/", 
      providesTags: ["Category"],
      transformResponse: (response) => response.data, 
    }),
  }),
});

export const { useFetchAllCategoriesQuery } = categoriesApi;
export default categoriesApi;
