import { getBaseUrl } from "@/utils/getBaseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/auth`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      try {
        const token = getState()?.auth?.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
        if (token) {
          headers.set('authorization', `Bearer ${token}`);
        }
      } catch {}
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: "/signup",
        method: "POST",
        body: newUser,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/forgot",
        method: "POST",
        body: { email },
      }),
    }),
    verifyOtp: builder.mutation({
      query: (otpData) => ({
        url: "/email/verify",
        method: "POST",
        body: otpData,
      }),
      transformResponse: (response) => {
        console.log(' verifyOtp transformResponse:', response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.log(' verifyOtp transformErrorResponse:', response);
        return response;
      }
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    resetPassword: builder.mutation({
      query: (resetData) => ({
        url: "/reset-password",
        method: "POST",
        body: resetData,
      }),
    }),
    changePassword: builder.mutation({
      query: (payload) => ({
        url: "/change-password",
        method: "PATCH",
        body: payload,
      }),
    }),
  }),
});

export const { 
  useLoginUserMutation, 
  useRegisterUserMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation, 
  useResetPasswordMutation,
  useLogoutMutation,
  useChangePasswordMutation
} = authApi;
export default authApi;