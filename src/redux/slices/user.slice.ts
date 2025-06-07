import { createSlice } from "@reduxjs/toolkit";

import { useSelector } from "react-redux";
import { user, userState } from "../../interface";
import { RootState } from "../store";
import { generateUniqueId } from "../../utils";

const initialState: userState = {
  userList: localStorage.getItem("userLists")
    ? JSON.parse(localStorage.getItem("userLists") || "[]")
    : [],
  isAuthenticate: JSON.parse(
    localStorage.getItem("isAuthenticated") ?? "false"
  ),
  loggedUser: localStorage.getItem("loggedUser")
    ? JSON.parse(localStorage.getItem("loggedUser") || "{}")
    : null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogout: (state) => {
      state.isAuthenticate = false;
      state.loggedUser = undefined;
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("loggedUser");
    },
    userLogin: (state, action) => {
      state.loading = true;
      const userLists: user[] = state.userList;
      const credential: user = action.payload;
      if (credential.email && credential.password) {
        const authenticate = userLists.some(
          (user) =>
            user.email === credential.email &&
            user.password === credential.password
        );
        const loggedUser = userLists.find(
          (user) =>
            user.email === credential.email &&
            user.password === credential.password
        );
        localStorage.setItem("isAuthenticated", authenticate.toString());
        state.isAuthenticate = authenticate;

        if (authenticate) {
          localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
          state.loggedUser = loggedUser;
          state.error = null;
        } else {
          state.error = "Username or Password Wrong";
        }
      } else {
        state.error = "Please fill in both fields";
      }

      state.loading = false;
    },
    addUserOrder: (state, action) => {
      state.loading = true;
      const orderID = generateUniqueId();
      const now =
        new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
      const order = {
        id: orderID,
        date: now,
        total: action.payload.total,
        status: "Completed",
        cart: action.payload.cart,
      };
      state.loggedUser?.orders?.push(order);
      localStorage.setItem("loggedUser", JSON.stringify(state.loggedUser));
      state.userList = state.userList?.map((user) =>
        user.id === state.loggedUser?.id
          ? { ...user, orders: [...user.orders, order] }
          : user
      );
      localStorage.setItem("userLists", JSON.stringify(state.userList));
    },
  },
});
export const { userLogin, userLogout, addUserOrder } = userSlice.actions;
export const useUser = () => {
  const userObj = useSelector((state: RootState) => state.user);
  return { ...userObj };
};
export default userSlice.reducer;
