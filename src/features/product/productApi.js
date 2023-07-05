// product

import apiSlice from "../api/apiSlice";

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.mutation({
      query: (queryParams) => ({
        url: `/product${queryParams}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllProductsMutation } = productApi;
