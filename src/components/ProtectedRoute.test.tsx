import { render } from "@testing-library/react";
import ProtectedRoute from "./ProtectedRoute";
import { MemoryRouter } from "react-router";
import { rootReducer } from "../redux/store";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

const mockedUsers = [
  {
    id: 1,
    firstname: "Sivanananchaperumal",
    lastname: "Moorthi",
    username: "s.perumal2013@gmail.com",
    email: "s.perumal2013@gmail.com",
    password: "asdfasdf",
    orders: [],
  },
  {
    id: 1,
    firstname: "Test",
    lastname: "User",
    username: "Test user",
    email: "test@gmail.com",
    password: "asdfasdf",
    orders: [],
  },
];
const mockUserData = {
  id: 1,
  firstname: "Sivanananchaperumal",
  lastname: "Moorthi",
  username: "s.perumal2013@gmail.com",
  email: "s.perumal2013@gmail.com",
  password: "asdfasdf",
  orders: [],
};
describe("Protected Route component", () => {
  const preloadedState = {
    user: {
      userList: mockedUsers,
      isAuthenticate: true,
      loggedUser: mockUserData,
      loading: false,
      error: null,
    },
  };

  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });
  test("render correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProtectedRoute />
        </MemoryRouter>
      </Provider>
    );
  });
  test("Not user logged in", () => {
    const preloadedState = {
      user: {
        userList: mockedUsers,
        isAuthenticate: false,
        loggedUser: mockUserData,
        loading: false,
        error: null,
      },
    };

    const store = configureStore({
      reducer: rootReducer,
      preloadedState,
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProtectedRoute />
        </MemoryRouter>
      </Provider>
    );
  });
});
