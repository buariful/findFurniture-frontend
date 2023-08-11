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
    getAllOrders: builder.mutation({
      query: (queryParams) => ({
        url: `/order/all?${queryParams}`,
        method: "GET",
      }),
    }),
    updateOrder: builder.mutation({
      query: (data) => ({
        url: `/order/update`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  usePlaceOrderMutation,
  useGetOneOrderQuery,
  useGetAllOrdersMutation,
  useUpdateOrderMutation,
} = orderApi;
