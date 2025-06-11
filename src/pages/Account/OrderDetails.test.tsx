import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { rootReducer } from "../../redux/store";
import { MemoryRouter, Route, Routes } from "react-router";
import OrderDetails from "./OrderDetails";
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
  orders: [
    {
      id: "j7gn37g4ijq7x9lznvzmnw",
      date: "06/06/2025 17:18:11",
      total: 85.97,
      status: "Completed",
      cart: [
        {
          id: "gec9axa7azvyxj8vip88m",
          productId: 17,
          title: "Beef Steak",
          price: 12.99,
          thumbnail:
            "https://cdn.dummyjson.com/product-images/groceries/beef-steak/thumbnail.webp",
          quantity: 2,
        },
        {
          id: "r06odjv8vk8kvt6hv7hvb",
          productId: 43,
          title: "Decoration Swing",
          price: 59.99,
          thumbnail:
            "https://cdn.dummyjson.com/product-images/home-decoration/decoration-swing/thumbnail.webp",
          quantity: 1,
        },
      ],
    },
    {
      id: "h5lt3se9584vr64r6ol53q",
      date: "06/06/2025 17:28:36",
      total: 44.98,
      status: "Completed",
      cart: [
        {
          id: "rws8svj1n7rvaqhj75mvj",
          productId: 85,
          title: "Man Plaid Shirt",
          price: 34.99,
          thumbnail:
            "https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/thumbnail.webp",
          quantity: 1,
        },
        {
          id: "ltiyar1ofok2x9p3vv031u",
          productId: 50,
          title: "Black Whisk",
          price: 9.99,
          thumbnail:
            "https://cdn.dummyjson.com/product-images/kitchen-accessories/black-whisk/thumbnail.webp",
          quantity: 1,
        },
      ],
    },
  ],
};

describe("Order details component", () => {
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

  test("Renders correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/orders/j7gn37g4ijq7x9lznvzmnw"]}>
          <Routes>
            <Route path="/orders/:orderId" element={<OrderDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByText(/Order #j7gn37g4ijq7x9lznvzmnw/i)
    ).toBeInTheDocument();
  });
});
