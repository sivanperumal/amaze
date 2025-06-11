import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import Wishlist from "./Wishlist";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../../redux/store";

const mockedFavProducts = [
  {
    id: "cfvk340ebpnupccjaw0gnj",
    productId: 43,
    title: "Decoration Swing",
    price: 59.99,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/home-decoration/decoration-swing/thumbnail.webp",
  },
  {
    id: "9xvkr8ma6s35msadujgrd",
    productId: 78,
    title: "Apple MacBook Pro 14 Inch Space Grey",
    price: 1999.99,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp",
  },
];
describe("Wishlist component", () => {
  const preloadedState = {
    wishlist: {
      list: mockedFavProducts,
      favProduct: null,
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
          <Wishlist />
        </MemoryRouter>
      </Provider>
    );

    const moveCartEle = screen.getByTestId(`favProMov-Cart-43`);
    fireEvent.click(moveCartEle);

    const removeCartEle = screen.getByTestId(`favProRemove-Cart-78`);
    fireEvent.click(removeCartEle);
  });

  test("Remove all Favourite Products", () => {
    const updateFavProd = {
      ...preloadedState,
      wishlist: { ...preloadedState.wishlist, list: mockedFavProducts },
    };
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: updateFavProd,
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Wishlist />
        </MemoryRouter>
      </Provider>
    );
    const removeallfavBtn = screen.getByTestId("remove-allfav-btn");
    fireEvent.click(removeallfavBtn);
  });
});
