import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isLoading: null,
  data: [],
  error: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setAllCategories: (state, action) => {
      state.data = action.payload;
    },
    setCategoryLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCategoryError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setAllCategories, setCategoryLoading, setCategoryError } =
  categorySlice.actions;

export default categorySlice.reducer;
