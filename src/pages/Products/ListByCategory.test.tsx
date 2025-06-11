import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { rootReducer } from "../../redux/store";
import { MemoryRouter, Route, Routes } from "react-router";
import { configureStore } from "@reduxjs/toolkit";
import { ProductListProps } from "../../components/ProductList";
import ProductListByCategory from "./ListByCategory";
import { product } from "../../interface";

const Mocklist: product[] = [
  {
    id: 1,
    title: "Essence Mascara Lash Princess",
    description:
      "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
    category: "beauty",
    price: 9.99,
    discountPercentage: 10.48,
    rating: 2.56,
    reviews: [],
    stock: 99,
    tags: ["beauty", "mascara"],
    brand: "Essence",
    thumbnail:
      "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
    images: [
      "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
    ],
  },
  {
    id: 2,
    title: "Eyeshadow Palette with Mirror",
    description:
      "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
    category: "beauty",
    price: 19.99,
    discountPercentage: 18.48,
    rating: 2.86,
    reviews: [],
    stock: 34,
    tags: ["beauty", "eyshadow"],
    brand: "Glamour Beauty",
    thumbnail:
      "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp",
    images: [
      "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
    ],
  },
];

jest.mock("../../components/ProductList", () => {
  const ProductList = (props: ProductListProps) => {
    const { products } = props;

    // Use mock data to render conditionally
    if (products && products?.length > 0) {
      return <div>Mock Component with name: {products[0].id}</div>;
    }
  };
  return ProductList;
});

describe("Product list by Category", () => {
  const preloadedState = {
    categoryProducts: {
      list: Mocklist,
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
        <MemoryRouter initialEntries={["/category/beauty"]}>
          <Routes>
            <Route
              path="/category/:beauty"
              element={<ProductListByCategory />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  });

  test("Error Renders", () => {
    const updatedState = {
      categoryProducts: {
        ...preloadedState.categoryProducts,
        error: "Something went wrong",
      },
    };
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: updatedState,
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/category/beauty"]}>
          <Routes>
            <Route
              path="/category/:beauty"
              element={<ProductListByCategory />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  });
  test("Empty list Renders", () => {
    const updatedState = {
      categoryProducts: {
        ...preloadedState.categoryProducts,
        list: [],
      },
    };
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: updatedState,
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/category/beauty"]}>
          <Routes>
            <Route
              path="/category/:beauty"
              element={<ProductListByCategory />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  });
});
