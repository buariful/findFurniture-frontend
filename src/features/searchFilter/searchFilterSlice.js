import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  keyword: "",
  brands: [],
  categories: [],
  colors: [],
  discount: null,
};

function toggleValueOfArray(array, value) {
  if (array.includes(value)) {
    array = array.filter((b) => b !== value);
  } else {
    array.push(value);
  }
  return array;
}

const searchFilterSlice = createSlice({
  name: "searchFilter",
  initialState,
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    setBrands: (state, action) => {
      const result = toggleValueOfArray(state.brands, action.payload);
      state.brands = result;
    },
    setCategories: (state, action) => {
      const result = toggleValueOfArray(state.categories, action.payload);
      state.categories = result;
    },
    setColors: (state, action) => {
      const result = toggleValueOfArray(state.colors, action.payload);
      state.colors = result;
    },
    setDiscount: (state, action) => {
      state.discount = action.payload;
    },
  },
});

export const { setKeyword, setBrands, setCategories, setColors, setDiscount } =
  searchFilterSlice.actions;
export default searchFilterSlice.reducer;
