import { combineReducers } from "redux";
import userReducer from "./slices/user.slice";
import productReducer from "./slices/product.slice";
import categoriesReducer from "./slices/category.slice";
import categoryProductReducer from "./slices/categoryproduct.slice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
export const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  categories: categoriesReducer,
  categoryProducts: categoryProductReducer,
});
// only for jest test cases
export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const store = configureStore({
  reducer: rootReducer,
});
export default store;
