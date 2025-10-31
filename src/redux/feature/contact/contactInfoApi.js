import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "@/utils/getBaseUrl";

const contactInfoApi = createApi({
  reducerPath: "contactInfoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getContactInfo: builder.query({
      query: () => ({ url: "/contact-info", method: "GET" }),
      transformResponse: (res) => res,
    }),
    sendContactMessage: builder.mutation({
      query: (payload) => ({
        url: "/contact/message",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useGetContactInfoQuery, useSendContactMessageMutation } = contactInfoApi;
export default contactInfoApi;
