// product

import api from "../api/api";

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.mutation({
      query: () => ({
        url: "/product",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllProductsMutation } = productApi;
