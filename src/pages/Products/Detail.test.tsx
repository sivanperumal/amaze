import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../../redux/store";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import Detail from "./Detail";
import { fireEvent, render, screen } from "@testing-library/react";
import { useNavigate } from "react-router";

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: jest.fn(),
}));

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
    productId: 1,
    title: "Essence Mascara Lash Princess",
    price: 9.99,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
  },
];

const mockProductItem = {
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
};

describe("Product detail component", () => {
  const mockedNavigate = jest.fn();
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockedNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  const preloadedState = {
    product: {
      item: mockProductItem,
      searchProducts: [],
      loading: false,
      error: null,
    },
    wishlist: {
      list: mockedFavProducts,
      favProduct: null,
      loading: false,
      error: null,
    },
    user: {
      userList: [
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
      ],
      isAuthenticate: true,
      loggedUser: {
        id: 1,
        firstname: "Sivanananchaperumal",
        lastname: "Moorthi",
        username: "s.perumal2013@gmail.com",
        email: "s.perumal2013@gmail.com",
        password: "asdfasdf",
        orders: [],
      },
      loading: false,
      error: null,
    },
  };
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  test("Render Correctly", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/product/1"]}>
          <Routes>
            <Route path="/product/:productId" element={<Detail />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const removeFavBtn = screen.getByTestId("removeFav-1");
    expect(removeFavBtn).toBeInTheDocument();
    fireEvent.click(removeFavBtn);

    const addFavBtn = screen.getByTestId("addFav-btn");
    expect(addFavBtn).toBeInTheDocument();
    fireEvent.click(addFavBtn);
  });

  test("Add Wishlist to the product", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/product/1"]}>
          <Routes>
            <Route path="/product/:productId" element={<Detail />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    const addCartBtn = screen.getByTestId("detail-product-1");
    expect(addCartBtn).toBeInTheDocument();
    fireEvent.click(addCartBtn);
  });

  test("Check out btn Trigger", async () => {
    const updatedState = {
      product: {
        ...preloadedState.product,
        item: {
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
      },
      user: { ...preloadedState.user },
    };
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: updatedState,
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/product/1"]}>
          <Routes>
            <Route path="/product/:productId" element={<Detail />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    const checkoutBtn = screen.getByTestId("detail-check-1");
    expect(checkoutBtn).toBeInTheDocument();
    fireEvent.click(checkoutBtn);
    expect(mockedNavigate).toHaveBeenCalledWith("/checkout/onepage");
  });

  test("Check out btn Trigger", async () => {
    const updatedState = {
      product: {
        ...preloadedState.product,
      },
      user: { ...preloadedState.user, isAuthenticate: false },
    };
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: updatedState,
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/product/1"]}>
          <Routes>
            <Route path="/product/:productId" element={<Detail />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    const checkoutBtn = screen.getByTestId("detail-check-1");
    expect(checkoutBtn).toBeInTheDocument();
    fireEvent.click(checkoutBtn);
    expect(mockedNavigate).toHaveBeenCalledWith("/checkout/cart");
  });

  test("Error msg", async () => {
    const updatedState = {
      product: {
        ...preloadedState.product,
        error: "Something went wrong",
      },
      user: { ...preloadedState.user, isAuthenticate: true },
    };
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: updatedState,
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/product/1"]}>
          <Routes>
            <Route path="/product/:productId" element={<Detail />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  });

  test("Empty item in product details", async () => {
    const updatedState = {
      product: {
        ...preloadedState.product,
        item: null,
      },
      user: { ...preloadedState.user, isAuthenticate: true },
    };
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: updatedState,
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/product/1"]}>
          <Routes>
            <Route path="/product/:productId" element={<Detail />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  });

  test("Loading component", async () => {
    const updatedState = {
      product: {
        ...preloadedState.product,
        loading: true,
      },
      user: { ...preloadedState.user, isAuthenticate: true },
    };
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: updatedState,
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/product/1"]}>
          <Routes>
            <Route path="/product/:productId" element={<Detail />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  });
});
