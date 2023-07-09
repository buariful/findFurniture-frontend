import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isLoading: false,
  error: null,
  data: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProdLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setProdError: (state, action) => {
      state.error = action.payload;
    },
    setProdData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setProdLoading, setProdError, setProdData } =
  productSlice.actions;
export default productSlice.reducer;
