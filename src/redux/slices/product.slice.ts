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

const initialState: productDetail = {
  item: null,
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
