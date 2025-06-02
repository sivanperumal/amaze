import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { prdoductListState } from "../../interface";

export const fetchProductsByCategory = createAsyncThunk(
  "productsByCategory/fetch",
  async (
    { slug, limit = 10 }: { slug: string | undefined; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios(
        `https://dummyjson.com/products/category/${slug}?limit=${limit}`
      );
      return response.data.products;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

const initialState: prdoductListState = {
  list: [],
  loading: false,
  error: "",
};

const categoryProductSlice = createSlice({
  name: "categoryProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const useProductListsByCategory = () => {
  const productsObj = useSelector((state: RootState) => {
    return state.categoryProducts;
  });
  return { ...productsObj };
};

export default categoryProductSlice.reducer;
