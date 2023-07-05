import apiSlice from "../api/apiSlice";

const brandApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBrands: builder.query({
      query: () => ({
        url: "/brand",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllBrandsQuery } = brandApi;
