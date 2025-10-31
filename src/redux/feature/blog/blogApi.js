import { getBaseUrl } from "@/utils/getBaseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/blogs`,
    credentials: "include",
  }),
  tagTypes: ["Blog"],
  endpoints: (builder) => ({
    fetchAllBlogs: builder.query({
      query: () => "/",   
      providesTags: ["Blog"],
      transformResponse: (response) => response.data,  
    }),
    fetchBlogById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),
  }),
});

export const { useFetchAllBlogsQuery, useFetchBlogByIdQuery } = blogApi;
export default blogApi;
