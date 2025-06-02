import { createSlice } from "@reduxjs/toolkit";

import { useSelector } from "react-redux";
import { users, userState } from "../../interface";
import { RootState } from "../store";

const initialState: userState = {
  userList: localStorage.getItem("userLists")
    ? JSON.parse(localStorage.getItem("userLists") || "[]")
    : [],
  isAuthenticate: JSON.parse(
    localStorage.getItem("isAuthenticated") ?? "false"
  ),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogout: (state) => {
      state.isAuthenticate = false;
      localStorage.removeItem("isAuthenticated");
    },
    userLogin: (state, action) => {
      const userLists: users[] = state.userList;
      const credential: users = action.payload;

      const authenticate = userLists.some(
        (user) =>
          user.email === credential.email &&
          user.password === credential.password
      );

      localStorage.setItem("isAuthenticated", authenticate.toString());
      state.isAuthenticate = authenticate;
    },
  },
});
export const { userLogin, userLogout } = userSlice.actions;
export const useUser = () => {
  const userObj = useSelector((state: RootState) => state.user);
  return { ...userObj };
};
export default userSlice.reducer;
