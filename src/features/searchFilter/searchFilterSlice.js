import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  keyword: "",
  brands: [],
  categories: [],
  colors: [],
  discount: null,
  selectedPage: 1,
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
    setPage: (state, action) => {
      state.selectedPage = action.payload;
    },
    resetFilter: (state) => {
      state.keyword = "";
      state.brands = [];
      state.categories = [];
      state.colors = [];
      state.discount = null;
      state.selectedPage = 1;
    },
  },
});

export const {
  setKeyword,
  setBrands,
  setCategories,
  setColors,
  setDiscount,
  setPage,
  resetFilter,
} = searchFilterSlice.actions;
export default searchFilterSlice.reducer;
