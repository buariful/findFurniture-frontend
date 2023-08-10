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
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ data, id }) => ({
        url: `/product/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    addProdImage: builder.mutation({
      query: ({ data, id }) => ({
        url: `/product-image/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteProdImage: builder.mutation({
      query: ({ data, id }) => ({
        url: `/product-image/${id}`,
        method: "DELETE",
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllProductsMutation,
  useCreateProductMutation,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useAddProdImageMutation,
  useDeleteProdImageMutation,
  useDeleteProductMutation,
} = productApi;
