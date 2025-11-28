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
      query: (params = {}) => {
        const { page = 1, limit = 20 } = params;
        return `/?page=${page}&limit=${limit}`;
      },
      providesTags: ["Category"],
      transformResponse: (response) => response, 
    }),
  }),
});

export const { useFetchAllCategoriesQuery } = categoriesApi;
export default categoriesApi;