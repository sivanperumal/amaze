import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../../redux/store";
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import CartPage from "./CartPage";

const mockCarts = [
  {
    id: "bs6whudw35e7m260vsheks",
    productId: 78,
    title: "Apple MacBook Pro 14 Inch Space Grey",
    price: 1999.99,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp",
    quantity: 2,
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

describe("CartPage component", () => {
  const preloadedState = {
    cart: {
      list: mockCarts,
      cartProduct: null,
      loading: false,
      error: null,
    },
  };

  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  test("Component renders correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CartPage />
        </MemoryRouter>
      </Provider>
    );

    const incBTN = screen.getByTestId("incr-quantity-bs6whudw35e7m260vsheks");
    expect(incBTN).toBeInTheDocument();
    fireEvent.click(incBTN);
  });

  test("Cart quantity decrement", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CartPage />
        </MemoryRouter>
      </Provider>
    );

    const decBTN = screen.getByTestId("dec-quantity-bs6whudw35e7m260vsheks");
    expect(decBTN).toBeInTheDocument();
    fireEvent.click(decBTN);
  });

  test("Remove cart item", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CartPage />
        </MemoryRouter>
      </Provider>
    );

    const removeCartBTN = screen.getByTestId(
      "remove-cart-bs6whudw35e7m260vsheks"
    );
    expect(removeCartBTN).toBeInTheDocument();
    fireEvent.click(removeCartBTN);
  });

  test("Empty cart item", () => {
    const updateCartitem = {
      ...preloadedState,
      cart: {
        ...preloadedState.cart,
        list: [],
        loading: false,
        error: "something went wrong",
      },
    };
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: updateCartitem,
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CartPage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/CONTINUE SHOPPING/i)).toBeInTheDocument();
  });

  test("Error cart item", () => {
    const updateCartitem = {
      ...preloadedState,
      cart: {
        ...preloadedState.cart,
        loading: false,
        error: "something went wrong",
      },
    };
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: updateCartitem,
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CartPage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  test("Loading true", () => {
    const updateCartitem = {
      ...preloadedState,
      cart: {
        ...preloadedState.cart,
        loading: true,
      },
    };
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: updateCartitem,
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CartPage />
        </MemoryRouter>
      </Provider>
    );
  });
});
