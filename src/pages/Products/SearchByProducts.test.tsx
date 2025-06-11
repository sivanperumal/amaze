import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { rootReducer } from "../../redux/store";
import SearchByProducts from "./SearchByProducts";
import { MemoryRouter } from "react-router";
import { configureStore } from "@reduxjs/toolkit";
import { ProductListProps } from "../../components/ProductList";

const mockSearchList = [
  {
    id: 16,
    title: "Apple",
    description:
      "Fresh and crisp apples, perfect for snacking or incorporating into various recipes.",
    category: "groceries",
    price: 1.99,
    discountPercentage: 12.62,
    rating: 4.19,
    reviews: [
      {
        rating: 5,
        comment: "Very satisfied!",
        date: "2025-04-30T09:41:02.053Z",
        reviewerName: "Sophia Brown",
        reviewerEmail: "sophia.brown@x.dummyjson.com",
      },
    ],
    stock: 8,
    tags: ["fruits"],
    brand: "",
    thumbnail:
      "https://cdn.dummyjson.com/product-images/groceries/apple/thumbnail.webp",
    images: ["https://cdn.dummyjson.com/product-images/groceries/apple/1.webp"],
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

describe("SearchByProducts component", () => {
  const preloadedState = {
    product: {
      item: null,
      searchProducts: mockSearchList,
      loading: false,
      error: null,
    },
  };
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });
  test("Loader Test", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchByProducts />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId("load-searchbox")).toBeInTheDocument();
  });

  test("Displays error message", async () => {
    const updatedState = {
      product: {
        ...preloadedState.product,
        error: "Something went wrong",
      },
    };
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: updatedState,
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchByProducts />
        </MemoryRouter>
      </Provider>
    );
  });
});
