import { fireEvent, render, screen } from "@testing-library/react";
import { rootReducer } from "../redux/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import Header from "./Header";
import { configureStore } from "@reduxjs/toolkit";
import { SearchStrProps } from "./Search";

jest.mock("./Search", () => {
  return {
    __esModule: true,
    default: (props: SearchStrProps) => (
      <div>
        <button data-testid="searchBtn" onClick={props.onSearchClick}>
          Search BTN
        </button>
        <input
          type="text"
          data-testid="searchTextbox"
          placeholder="Search"
          onChange={props.onSearchChange}
          onKeyDown={props.onSearchKeyPress}
        />
      </div>
    ),
  };
});

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
const mockCartState = [
  {
    id: "bs6whudw35e7m260vsheks",
    productId: 78,
    title: "Apple MacBook Pro 14 Inch Space Grey",
    price: 1999.99,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp",
    quantity: 1,
  },
  {
    id: "fvzkr81e09fubbro86yxh",
    productId: 49,
    title: "Black Aluminium Cup",
    price: 5.99,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/black-aluminium-cup/thumbnail.webp",
    quantity: 1,
  },
];
describe("Header Component", () => {
  const preloadedState = {
    user: {
      userList: mockedUsers,
      isAuthenticate: true,
      loggedUser: mockUserData,
      loading: false,
      error: null,
    },
    cart: {
      list: mockCartState,
      cartProduct: null,
      loading: false,
      error: null,
    },
  };

  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  test("Render correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header onClickSidebar={jest.fn()}></Header>
        </MemoryRouter>
      </Provider>
    );
  });

  test("Search Component Renders", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header onClickSidebar={jest.fn()}></Header>
        </MemoryRouter>
      </Provider>
    );

    const searchbtn = screen.getByTestId("searchBtn");
    expect(searchbtn).toBeInTheDocument();
    fireEvent.click(searchbtn);
  });

  test("calls handleOnChange & handleSearch", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header onClickSidebar={jest.fn()}></Header>
        </MemoryRouter>
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText(/Search/i); // adjust if needed
    fireEvent.change(searchInput, { target: { value: "test value" } });
    fireEvent.keyDown(searchInput, { key: "Enter", code: "Enter" });
    expect((searchInput as HTMLInputElement).value).toBe("test value");
  });
});
