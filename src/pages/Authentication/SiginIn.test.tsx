import { fireEvent, render, screen } from "@testing-library/react";
import { rootReducer } from "../../redux/store";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import SignIn from "./SiginIn";
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

describe("SignIn Component", () => {
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
          <SignIn />
        </MemoryRouter>
      </Provider>
    );
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /password/i
    ) as HTMLInputElement;
    const signinBtn = screen.getByTestId("signin-btn");
    fireEvent.change(emailInput, {
      target: { value: "s.perumal2013@gmail.com" },
    });
    fireEvent.change(passwordInput, { target: { value: "asdfasdf" } });
    fireEvent.click(signinBtn);
  });
  test("Loader Show status", () => {
    const loaderStateUpdate = {
      ...preloadedState,
      user: { ...preloadedState.user, loading: true },
    };
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: loaderStateUpdate,
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      </Provider>
    );
  });

  test("Error for Empty form submission", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      </Provider>
    );
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /password/i
    ) as HTMLInputElement;
    const signinBtn = screen.getByTestId("signin-btn");
    fireEvent.change(emailInput, {
      target: { value: "" },
    });
    fireEvent.change(passwordInput, { target: { value: "" } });
    fireEvent.click(signinBtn);
    expect(screen.getByText(/Please fill in both fields/i)).toBeInTheDocument();
  });
});
