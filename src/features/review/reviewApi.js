import apiSlice from "../api/apiSlice";

const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductReviews: builder.query({
      query: (productId) => ({
        url: `/product-review/${productId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProductReviewsQuery } = reviewApi;
