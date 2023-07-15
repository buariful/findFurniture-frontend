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
    createProduct: builder.mutation({
      query: (data) => ({
        url: `/product/new`,
        method: "POST",
        body: data,
      }),
    }),
    getSingleProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
      }),
    }),
  }),
});

export const {
  useGetAllProductsMutation,
  useCreateProductMutation,
  useGetSingleProductMutation,
} = productApi;
