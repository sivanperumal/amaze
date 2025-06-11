import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore } from "../redux/store";
import { categories } from "../interface";
import { MemoryRouter } from "react-router";
import SingleRowCategory from "./SingleRowCategories";

const mockcategories: categories[] = [
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
];

describe("Single row categories componenet", () => {
  test("Renders correctly", () => {
    render(
      <Provider store={setupStore()}>
        <MemoryRouter>
          <SingleRowCategory categories={mockcategories} />
        </MemoryRouter>
      </Provider>
    );
  });
});
