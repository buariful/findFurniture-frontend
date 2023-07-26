import apiSlice from "../api/apiSlice";

const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (data) => ({
        url: `/order/new`,
        method: "POST",
        body: data,
      }),
    }),
    getOneOrder: builder.query({
      query: (trans_id) => ({
        url: `/order/get-one/${trans_id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { usePlaceOrderMutation, useGetOneOrderQuery } = orderApi;
