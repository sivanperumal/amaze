import { render } from "@testing-library/react";
import { rootReducer } from "../../redux/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import CheckoutPage from "./CheckoutPage";
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

describe("Checkout Page", () => {
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
  test("Renders Correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CheckoutPage />
        </MemoryRouter>
      </Provider>
    );
  });
});
