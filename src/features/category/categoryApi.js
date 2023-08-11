import apiSlice from "../api/apiSlice";

const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
    }),
    createCategories: builder.mutation({
      query: (data) => ({
        url: "/category",
        method: "POST",
        body: data,
      }),
    }),
    delteCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/category/${id}`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useCreateCategoriesMutation,
  useDelteCategoryMutation,
} = categoryApi;
