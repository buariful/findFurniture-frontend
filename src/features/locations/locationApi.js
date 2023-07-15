import apiSlice from "../api/apiSlice";

const locationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLocation: builder.query({
      query: (keyword) => ({
        url: `/location/${keyword}`,
        method: "GET",
      }),
    }),
    getUpazilas: builder.mutation({
      query: (id) => ({
        url: `/upazila/${id}`,
        method: "GET",
      }),
    }),
  }),
});
export const { useGetLocationQuery, useGetUpazilasMutation } = locationApi;
