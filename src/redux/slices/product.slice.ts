import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { productDetail } from "../../interface";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const fetchProduct = createAsyncThunk(
  "product/fetch",
  async (
    { productId }: { productId: number | string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios(
        `https://dummyjson.com/products/${productId}`
      );
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSearchProducts = createAsyncThunk(
  "Product/fetchSearch",
  async (query: string | null, { rejectWithValue }) => {
    try {
      const response = await axios(
        `https://dummyjson.com/products/search?q=${query}&limit=10`
      );
      return response.data.products;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

const initialState: productDetail = {
  item: null,
  searchProducts: [],
  loading: false,
  error: null,
};
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.item = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSearchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSearchProducts.fulfilled, (state, action) => {
        state.searchProducts = action.payload;
        state.loading = false;
      })
      .addCase(fetchSearchProducts.rejected, (state, action) => {
        state.loading = false;
        state.searchProducts = [];
        state.error = action.payload;
      });
  },
});

export const useProduct = () => {
  const productObj: productDetail = useSelector(
    (state: RootState) => state.product
  );
  return { ...productObj };
};
export default productSlice.reducer;
