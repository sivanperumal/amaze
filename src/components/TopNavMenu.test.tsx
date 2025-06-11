import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { rootReducer } from "../redux/store";
import { MemoryRouter } from "react-router";
import TopNavMenu from "./TopNavMenu";
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
describe("Topnav menu component", () => {
  const preloadedState = {
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
          <TopNavMenu />
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
