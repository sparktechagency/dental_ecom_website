import { getBaseUrl } from "@/utils/getBaseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const newsletterApi = createApi({
  reducerPath: "newsletterApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/newsletter`,
    credentials: "include",
  }),
  tagTypes: ["Newsletter"],
  endpoints: (builder) => ({
    subscribeNewsletter: builder.mutation({
      query: (emailData) => ({
        url: "/subscribe",
        method: "POST",
        body: emailData, 
      }),
      invalidatesTags: ["Newsletter"],
    }),
  }),
});

export const { useSubscribeNewsletterMutation } = newsletterApi;
export default newsletterApi;
