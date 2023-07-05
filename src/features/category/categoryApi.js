import apiSlice from "../api/apiSlice";

const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoryApi;
