import { getBaseUrl } from "@/utils/getBaseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const procedureApi = createApi({
  reducerPath: "procedureApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/procedures`,
    credentials: "include",
  }),
  tagTypes: ["Procedure"],
  endpoints: (builder) => ({
    fetchAllProcedure: builder.query({
      query: () => "/",   
      providesTags: ["Procedure"],
      transformResponse: (response) => response.data,  
    }),
     fetchProcedureById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),
  }),
});

export const { useFetchAllProcedureQuery,useFetchProcedureByIdQuery } = procedureApi;
export default procedureApi;
