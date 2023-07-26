import apiSlice from "../api/apiSlice";

const locationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLocation: builder.query({
      query: (keyword) => ({
        url: `/location/${keyword}`,
        method: "GET",
      }),
    }),
    getDistrict: builder.mutation({
      query: (divsion_id) => ({
        url: `/district/${divsion_id}`,
        method: "GET",
      }),
    }),
    getUpazilas: builder.mutation({
      query: (district_id) => ({
        url: `/upazila/${district_id}`,
        method: "GET",
      }),
    }),
  }),
});
export const {
  useGetLocationQuery,
  useGetUpazilasMutation,
  useGetDistrictMutation,
} = locationApi;
