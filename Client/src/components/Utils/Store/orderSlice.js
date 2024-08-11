import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orderSlice",
  initialState: {
    orders: JSON.parse(localStorage.getItem("orders")) || [],
  },
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },
  },
});

export const { addOrder, setRestMenuInfo } = orderSlice.actions;
export default orderSlice.reducer;
