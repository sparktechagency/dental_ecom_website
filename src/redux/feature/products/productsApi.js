import { getBaseUrl } from "@/utils/getBaseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/products`,
    credentials: "include",
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    fetchAllProducts: builder.query({
      query: (params = {}) => {
        const queryParams = new URLSearchParams();
        if (params.category) {
          if (Array.isArray(params.category)) {
            params.category.forEach((cat) => queryParams.append("category", cat));
          } else if (typeof params.category === "string" && params.category.includes(",")) {
            params.category.split(",").forEach((cat) => queryParams.append("category", cat));
          } else {
            queryParams.append("category", params.category);
          }
        }
        if (params.procedureType) {
          if (Array.isArray(params.procedureType)) {
            params.procedureType.forEach((prc) => queryParams.append("procedureType", prc));
          } else if (typeof params.procedureType === "string" && params.procedureType.includes(",")) {
            params.procedureType.split(",").forEach((prc) => queryParams.append("procedureType", prc));
          } else {
            queryParams.append("procedureType", params.procedureType);
          }
        }
        if (params.brand) {
          if (Array.isArray(params.brand)) {
            params.brand.forEach((b) => queryParams.append("brand", b));
          } else if (typeof params.brand === "string" && params.brand.includes(",")) {
            params.brand.split(",").forEach((b) => queryParams.append("brand", b));
          } else {
            queryParams.append("brand", params.brand);
          }
        }
        if (params.availability)
          queryParams.append("availability", params.availability);
        if (params.minPrice !== undefined && params.minPrice !== "")
          queryParams.append("minPrice", params.minPrice);
        if (params.maxPrice !== undefined && params.maxPrice !== "")
          queryParams.append("maxPrice", params.maxPrice);
        if (params.search) {
          queryParams.append("search", params.search);
          queryParams.append("q", params.search);
        }
        queryParams.append("page", params.page || 1);
        queryParams.append("limit", params.limit || 10);

        const queryString = queryParams.toString();
        return queryString ? `/?${queryString}` : "/";
      },
      providesTags: ["Products"],
    }),

    fetchProductbyId: builder.query({
      query: (productId) => `${productId}`,
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),
  }),
});

export const { useFetchAllProductsQuery, useFetchProductbyIdQuery } =
  productsApi;
export default productsApi;
