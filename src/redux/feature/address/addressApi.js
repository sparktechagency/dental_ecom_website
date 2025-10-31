// addressApi.js
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../../../utils/baseQueryWithAuth";

export const addressApi = createApi({
  reducerPath: "addressApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Address"],
  endpoints: (builder) => ({
    fetchMyAddresses: builder.query({
      query: () => '/addresses/my',
      providesTags: ["Address"],
    }),
    
    // Add new address
    addAddress: builder.mutation({
      query: (addressData) => ({
        url: '/addresses',
        method: 'POST',
        body: addressData,
      }),
      invalidatesTags: ["Address"],
    }),

    // Delete address
    deleteAddress: builder.mutation({
      query: (addressId) => ({
        url: `/addresses/${addressId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["Address"],
    }),
  }),
});

export const { 
  useFetchMyAddressesQuery,
  useAddAddressMutation,
  useDeleteAddressMutation 
} = addressApi;