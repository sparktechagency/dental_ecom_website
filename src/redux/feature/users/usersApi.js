import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "@/utils/baseQueryWithAuth";

const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getMyProfile: builder.query({
      query: () => ({
        url: "/users/profile",
        method: "GET",
      }),
      providesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: ({ body }) => ({
        url: `/users/profile`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useGetMyProfileQuery, useUpdateUserMutation } = usersApi;
export default usersApi;
