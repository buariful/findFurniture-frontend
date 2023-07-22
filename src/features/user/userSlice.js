import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    resetUser: (state) => {
      state.data = {};
    },
    addToCart: (state, action) => {
      state?.data?.cartItem.push(action.payload);
    },
    deleteFromCart: (state, action) => {
      const prodIndex = state?.data?.cartItem.findIndex(
        (cart) => cart?.product?._id === action.payload
      );
      state?.data?.cartItem.splice(prodIndex, 1);
    },
    updateCartProdQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const prodIndex = state?.data?.cartItem.findIndex(
        (cart) => cart?.product?._id === productId
      );
      let product = state?.data?.cartItem.find(
        (cart) => cart?.product?._id === productId
      );
      product.quantity = quantity;

      state?.data?.cartItem.splice(prodIndex, 1, product);
    },
    addToWislist: (state, action) => {
      state?.data?.wishList.push(action.payload);
    },
    deleteFromWishlist: (state, action) => {
      console.log(action.payload);
      const prodIndex = state?.data?.wishList.findIndex(
        (item) => item?._id === action.payload
      );
      state?.data?.wishList.splice(prodIndex, 1);
    },
  },
});

export const {
  setUser,
  resetUser,
  addToCart,
  deleteFromCart,
  updateCartProdQuantity,
  addToWislist,
  deleteFromWishlist,
} = userSlice.actions;
export default userSlice.reducer;
