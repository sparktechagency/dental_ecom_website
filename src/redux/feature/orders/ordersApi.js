import { getBaseUrl } from "@/utils/getBaseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      try {
        const token =
          getState()?.auth?.token ||
          (typeof window !== "undefined"
            ? localStorage.getItem("token")
            : null);
        if (token) {
          headers.set("authorization", `Bearer ${token}`);
        }
      } catch {}
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMyOrders: builder.query({
      query: ({ page = 1, limit = 10 } = {}) => ({
        url: `/orders/my-orders`,
        method: "GET",
        params: { page, limit },
      }),
      keepUnusedDataFor: 60,
    }),
    createOrder: builder.mutation({
      query: (payload) => ({
        url: "/orders",
        method: "POST",
        body: payload,
      }),
    }),
    checkout: builder.mutation({
      query: (orderId) => ({
        url: `/checkout/success`,
        method: "GET",
        params: { orderId },
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useCheckoutMutation,
} = ordersApi;
export default ordersApi;
