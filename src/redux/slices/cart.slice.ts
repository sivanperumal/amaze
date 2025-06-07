import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cartList } from "../../interface";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import axios, { AxiosError } from "axios";
import { generateUniqueId } from "../../utils";

export const fetchCartProduct = createAsyncThunk(
  "cartProduct/fetch",
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
const initialState: cartList = {
  list: localStorage.getItem("Cart_Item")
    ? JSON.parse(localStorage.getItem("Cart_Item") || "[]")
    : [],
  cartProduct: null,
  loading: false,
  error: null,
};
const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    removeCart: (state, action) => {
      state.loading = true;
      state.list = state.list?.filter(
        (cart) => cart.productId !== action.payload
      );
      state.loading = false;
      localStorage.setItem("Cart_Item", JSON.stringify(state.list));
    },
    removeAllCart: (state) => {
      state.list = [];
      localStorage.setItem("Cart_Item", JSON.stringify(state.list));
    },
    quantityIncrement: (state, action) => {
      state.list = state.list?.map((cart) =>
        cart.id === action.payload
          ? { ...cart, quantity: cart.quantity + 1 }
          : cart
      );
      localStorage.setItem("Cart_Item", JSON.stringify(state.list));
    },
    quantityDecrement: (state, action) => {
      state.list = state.list?.map((cart) =>
        cart.id === action.payload
          ? { ...cart, quantity: cart.quantity - 1 }
          : cart
      );
      localStorage.setItem("Cart_Item", JSON.stringify(state.list));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.cartProduct = action.payload;
        const isCartItem = state.list?.some(
          (cart) => cart.productId === state.cartProduct?.id
        );
        if (!isCartItem) {
          const cartID = generateUniqueId();
          state.list?.push({
            id: cartID,
            productId: action.payload?.id,
            title: action.payload?.title,
            price: action.payload?.price,
            thumbnail: action.payload?.thumbnail,
            quantity: 1,
          });
        } else {
          const updateCart = state.list?.map((cart) =>
            cart.productId === state.cartProduct?.id
              ? { ...cart, quantity: cart.quantity + 1 }
              : cart
          );
          state.list = updateCart;
        }
        localStorage.setItem("Cart_Item", JSON.stringify(state.list));
        state.cartProduct = null;
      })
      .addCase(fetchCartProduct.rejected, (state, action) => {
        state.loading = false;
        state.cartProduct = null;
        state.error = action.payload;
      });
  },
});
export const {
  removeCart,
  removeAllCart,
  quantityIncrement,
  quantityDecrement,
} = cartSlice.actions;
export default cartSlice.reducer;

export const useCart = () => {
  const cartObj = useSelector((state: RootState) => state.cart);
  return { ...cartObj };
};
