import apiSlice from "../api/apiSlice";

const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductReviews: builder.query({
      query: (productId) => ({
        url: `/product-review/${productId}`,
        method: "GET",
      }),
    }),
    addReview: builder.mutation({
      query: (data) => ({
        url: `/review/new`,
        method: "POST",
        body: data,
      }),
    }),
    updateReview: builder.mutation({
      query: ({ reviewId, data }) => ({
        url: `/review/${reviewId}`,
        method: "PUT",
        body: data,
      }),
    }),
    usersReview: builder.query({
      query: () => ({
        url: `/user-reviews`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetProductReviewsQuery,
  useAddReviewMutation,
  useUpdateReviewMutation,
  useUsersReviewQuery,
} = reviewApi;
