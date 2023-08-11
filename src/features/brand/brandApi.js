import apiSlice from "../api/apiSlice";

const brandApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBrands: builder.query({
      query: () => ({
        url: "/brand",
        method: "GET",
      }),
    }),
    createBrand: builder.mutation({
      query: (data) => ({
        url: "/brand",
        method: "POST",
        body: data,
      }),
    }),
    deleteBrand: builder.mutation({
      query: ({ id, name }) => ({
        url: `/brand/${id}`,
        method: "DELETE",
        body: { name },
      }),
    }),
  }),
});

export const {
  useGetAllBrandsQuery,
  useCreateBrandMutation,
  useDeleteBrandMutation,
} = brandApi;
