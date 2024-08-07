import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cartItems: JSON.parse(localStorage.getItem("cartData")) || [],
    restMenuInfo: JSON.parse(localStorage.getItem("restMenuInfo")) || [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { info, restMenuInfo } = action.payload;
      state.cartItems = [...state.cartItems, info];
      state.restMenuInfo = restMenuInfo;
      localStorage.setItem("cartData", JSON.stringify(state.cartItems));
      localStorage.setItem("restMenuInfo", JSON.stringify(restMenuInfo));
    },
    deleteItem: (state, action) => {
      state.cartItems = action.payload;
      localStorage.setItem("cartData", JSON.stringify(action.payload));
    },
    clearCart: (state, action) => {
      state.cartItems = [];
      state.restMenuInfo = [];
      localStorage.removeItem("cartData");
      localStorage.removeItem("restMenuInfo");
    },
  },
});

export const { addToCart, deleteItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
