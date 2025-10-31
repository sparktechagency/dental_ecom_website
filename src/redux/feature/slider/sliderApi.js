import { getBaseUrl } from "@/utils/getBaseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const sliderApi = createApi({
  reducerPath: "sliderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/sliders`,
    credentials: "include",
  }),
  tagTypes: ["Slider"],
  endpoints: (builder) => ({
    fetchAllSliders: builder.query({
      query: () => "/", 
      providesTags: ["Slider"],
      transformResponse: (response) => response.data, 
    }),
  }),
});

export const { useFetchAllSlidersQuery } = sliderApi;
export default sliderApi;
