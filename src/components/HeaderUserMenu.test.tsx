import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { rootReducer } from "../redux/store";
import { MemoryRouter } from "react-router";
import HeaderUserMenu from "./HeaderUserMenu";
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
    id: 2,
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

describe("Header User Menu", () => {
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

  test("Popover opens and closes on toggle", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <HeaderUserMenu username="Sivan Perumal" />
        </MemoryRouter>
      </Provider>
    );

    const toggleButton = screen.getByTestId("toggle-open");
    fireEvent.click(toggleButton);
    expect(await screen.getByText(/PROFILE/i)).toBeVisible();
    fireEvent.click(toggleButton);
    await waitFor(() => {
      expect(screen.getByText(/PROFILE/i)).not.toBeVisible();
    });
  });

  test("Render Component correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <HeaderUserMenu username="Sivan Perumal" />
        </MemoryRouter>
      </Provider>
    );
    const togglebtn = screen.getByTestId("toggle-open");
    fireEvent.click(togglebtn);

    expect(screen.getByText(/Profile/i)).toBeInTheDocument();
    expect(screen.getByText(/Orders/i)).toBeInTheDocument();
    expect(screen.getByText(/Wishlist/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Profile/i));
    fireEvent.click(screen.getByText(/Orders/i));
    fireEvent.click(screen.getByText(/Wishlist/i));
    fireEvent.click(screen.getByText(/Logout/i));

    togglebtn.click();
    expect(screen.queryByText(/PROFILE/i)).not.toBeInTheDocument();
  });

  test("Renderin user logout in the App", () => {
    const logoutState = {
      ...preloadedState,
      user: { ...preloadedState.user, isAuthenticate: false },
    };

    const store = configureStore({
      reducer: rootReducer,
      preloadedState: logoutState,
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <HeaderUserMenu username="Sivan Perumal" />
        </MemoryRouter>
      </Provider>
    );
    const toggleOpen = screen.getByTestId("toggle-open");
    fireEvent.click(toggleOpen);
    //screen.debug(document.body);
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Login/i));
  });
});
