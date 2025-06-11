import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { rootReducer } from "../../redux/store";
import Home from "./Home";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router";

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
  {
    slug: "furniture",
    name: "Furniture",
    url: "https://dummyjson.com/products/category/furniture",
  },
  {
    slug: "groceries",
    name: "Groceries",
    url: "https://dummyjson.com/products/category/groceries",
  },
  {
    slug: "home-decoration",
    name: "Home Decoration",
    url: "https://dummyjson.com/products/category/home-decoration",
  },
  {
    slug: "kitchen-accessories",
    name: "Kitchen Accessories",
    url: "https://dummyjson.com/products/category/kitchen-accessories",
  },
  {
    slug: "laptops",
    name: "Laptops",
    url: "https://dummyjson.com/products/category/laptops",
  },
  {
    slug: "mens-shirts",
    name: "Mens Shirts",
    url: "https://dummyjson.com/products/category/mens-shirts",
  },
  {
    slug: "mens-shoes",
    name: "Mens Shoes",
    url: "https://dummyjson.com/products/category/mens-shoes",
  },
  {
    slug: "mens-watches",
    name: "Mens Watches",
    url: "https://dummyjson.com/products/category/mens-watches",
  },
];

describe("Home Component", () => {
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
  test("Rendering correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
  });

  test("Empty Categories List", () => {
    const nullList = {
      ...preloadedState,
      categories: {
        ...preloadedState.categories,
        list: [],
        error: "Something went wrong",
      },
    };
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: nullList,
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
  });
});
