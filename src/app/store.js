import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import productReducer from "../features/product/productSlice";
import searchFilterReducer from "../features/searchFilter/searchFilterSlice";
import categoryReducer from "../features/category/categorySlice";
import apiSlice from "../features/api/apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    filter: searchFilterReducer,
    user: userReducer,
    products: productReducer,
    categories: categoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
