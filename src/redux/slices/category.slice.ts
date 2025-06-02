import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { categoryState } from "../../interface";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const fetchCategories = createAsyncThunk(
  "categories/fetch",
  async () => {
    try {
      const res = await axios("https://dummyjson.com/products/categories");
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
);

const initialState: categoryState = {
  list: [],
  loading: false,
  error: null,
};
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.list = [];
        state.error = action.payload as string;
      });
  },
});

export const useCategories = () => {
  const categoryObj = useSelector((state: RootState) => {
    return state.categories;
  });
  return { ...categoryObj };
};
export default categorySlice.reducer;
