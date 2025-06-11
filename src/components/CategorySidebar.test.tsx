import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { rootReducer } from "../redux/store";
import CategorySidebar from "./CategorySidebar";
import { MemoryRouter } from "react-router";
import { configureStore } from "@reduxjs/toolkit";

const mockCategories = [
  {
    slug: "beauty",
    name: "Beauty",
    url: "https://dummyjson.com/products/category/beauty",
  },
  {
    slug: "fragrances",
    name: "Fragrances",
    url: "https://dummyjson.com/products/category/fragrances",
  },
];
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
describe("Category Sidebar Component", () => {
  const preloadedState = {
    user: {
      userList: mockedUsers,
      isAuthenticate: true,
      loggedUser: mockUserData,
      loading: false,
      error: null,
    },
    categories: {
      list: mockCategories,
      loading: false,
      error: null,
    },
  };

  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });
  test("Renders correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CategorySidebar open={true} onCloseSidebar={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );

    mockCategories.forEach((category) => {
      const catSlug = screen.getByTestId(category.slug);
      expect(catSlug).toBeInTheDocument();
      fireEvent.click(catSlug);
    });
  });
});
