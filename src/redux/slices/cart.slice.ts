import { createSlice } from "@reduxjs/toolkit";
import { prdoductListState } from "../../interface";

const initialState: prdoductListState = {
  list: [],
  loading: false,
  error: null,
};
const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {},
});

export default cartSlice.reducer;
