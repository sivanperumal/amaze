import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { wishlistState } from "../../interface";
import axios, { AxiosError } from "axios";
import { generateUniqueId } from "../../utils";
import { useSelector } from "react-redux";
import { RootState } from "../store";
export const fetchFavProduct = createAsyncThunk(
  "FavProduct/fetch",
  async (productId: number | string, { rejectWithValue }) => {
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
const initialState: wishlistState = {
  list: localStorage.getItem("Fav_Item")
    ? JSON.parse(localStorage.getItem("Fav_Item") || "[]")
    : [],
  favProduct: null,
  loading: false,
  error: null,
};
const wishlist = createSlice({
  name: "Wishlist",
  initialState,
  reducers: {
    removeFav: (state, action) => {
      state.list = state.list?.filter(
        (favPro) => favPro.productId !== action.payload
      );
      localStorage.setItem("Fav_Item", JSON.stringify(state.list));
    },
    removeAllFav: (state) => {
      state.list = [];
      localStorage.setItem("Fav_Item", JSON.stringify(state.list));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavProduct.fulfilled, (state, action) => {
        state.error = false;
        state.favProduct = action.payload;
        const isWishItem = state.list?.some(
          (fav) => fav.productId === state.favProduct?.id
        );
        if (!isWishItem) {
          const favID = generateUniqueId();
          state.list?.push({
            id: favID,
            productId: action.payload?.id,
            title: action.payload?.title,
            price: action.payload?.price,
            thumbnail: action.payload?.thumbnail,
          });
        }
        localStorage.setItem("Fav_Item", JSON.stringify(state.list));
        state.favProduct = null;
      })
      .addCase(fetchFavProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.favProduct = null;
      });
  },
});
export const { removeFav, removeAllFav } = wishlist.actions;
export const useFavProduct = () => {
  const favObj = useSelector((state: RootState) => state.wishlist);
  return { ...favObj };
};
export default wishlist.reducer;
