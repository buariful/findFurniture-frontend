import apiSlice from "../api/apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({ data }) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: ({ data }) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
    getUserByCookie: builder.mutation({
      query: () => ({
        url: "/getuserby-cookie",
      }),
    }),
    logOut: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),

    addProdToCart: builder.mutation({
      query: (data) => ({
        url: "/cart/new",
        method: "PUT",
        body: data,
      }),
    }),
    updateProdOfCart: builder.mutation({
      query: (data) => ({
        url: "/cart/update",
        method: "PUT",
        body: data,
      }),
    }),
    deleteProdFromCart: builder.mutation({
      query: (productId) => ({
        url: "/cart/delete",
        method: "PUT",
        body: { productId },
      }),
    }),
    addProdToWishlist: builder.mutation({
      query: (productId) => ({
        url: "/wishlist/new",
        method: "PUT",
        body: { productId },
      }),
    }),
    deleteProdFromWishlist: builder.mutation({
      query: (productId) => ({
        url: "/wishlist/delete",
        method: "PUT",
        body: { productId },
      }),
    }),
    userOrders: builder.query({
      query: () => ({
        url: "/order/myorders",
        method: "GET",
      }),
    }),
    userProfileUpdate: builder.mutation({
      query: (data) => ({
        url: "/user/profile",
        method: "PUT",
        body: data,
      }),
    }),
    userPasswordUpdate: builder.mutation({
      query: (data) => ({
        url: "/user/password",
        method: "PUT",
        body: data,
      }),
    }),
    getAllUsers: builder.mutation({
      query: (queryParam) => ({
        url: `/user/all/?${queryParam}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUserByCookieMutation,
  useLogOutMutation,
  useAddProdToCartMutation,
  useUpdateProdOfCartMutation,
  useDeleteProdFromCartMutation,
  useAddProdToWishlistMutation,
  useDeleteProdFromWishlistMutation,
  useUserOrdersQuery,
  useUserProfileUpdateMutation,
  useUserPasswordUpdateMutation,
  useGetAllUsersMutation,
} = userApi;
