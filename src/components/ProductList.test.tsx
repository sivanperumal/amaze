import { fireEvent, render, screen } from "@testing-library/react";
import ProductList from "./ProductList";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { rootReducer } from "../redux/store";
import { product } from "../interface";
import { configureStore } from "@reduxjs/toolkit";

const mockFavProducts = [
  {
    id: "cfvk340ebpnupccjaw0gnj",
    productId: 16,
    title: "Apple",
    price: 1.99,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/groceries/apple/thumbnail.webp",
  },
];

const mockProducts: product[] = [
  {
    id: 16,
    title: "Apple",
    description:
      "Fresh and crisp apples, perfect for snacking or incorporating into various recipes.",
    category: "groceries",
    price: 1.99,
    discountPercentage: 12.62,
    rating: 4,
    stock: 3,
    tags: ["fruits"],
    thumbnail:
      "https://cdn.dummyjson.com/product-images/groceries/apple/thumbnail.webp",
    images: ["https://cdn.dummyjson.com/product-images/groceries/apple/1.webp"],
    reviews: [],
    brand: "",
  },
  {
    id: 78,
    title: "Apple MacBook Pro 14 Inch Space Grey",
    description:
      "The MacBook Pro 14 Inch in Space Grey is a powerful and sleek laptop",
    category: "laptops",
    price: 1999.99,
    discountPercentage: 4.69,
    rating: 3.65,
    stock: 24,
    tags: [],
    brand: "Apple",
    reviews: [],
    thumbnail:
      "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp",
    images: [
      "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp",
      "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/2.webp",
    ],
  },
  {
    id: 104,
    title: "Apple iPhone Charger",
    description:
      "The Apple iPhone Charger is a high-quality charger designed for fast and efficient charging of your iPhone. Ensure your device stays powered up and ready to go.",
    category: "mobile-accessories",
    price: 19.99,
    discountPercentage: 18.52,
    rating: 4.15,
    stock: 31,
    tags: [],
    brand: "Apple",
    reviews: [],
    thumbnail:
      "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-iphone-charger/thumbnail.webp",
    images: [
      "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-iphone-charger/1.webp",
      "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-iphone-charger/2.webp",
    ],
  },
];

describe("Product List Component", () => {
  test("ProductList renders correctly", () => {
    const preloadedState = {
      wishlist: {
        list: mockFavProducts,
        favProduct: null,
        loading: false,
        error: null,
      },
    };

    const store = configureStore({
      reducer: rootReducer,
      preloadedState,
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductList products={mockProducts} />
        </MemoryRouter>
      </Provider>
    );

    mockProducts.forEach((product) => {
      expect(screen.getByTestId(`product-${product.id}`)).toBeInTheDocument();
      expect(screen.getByAltText(product.title)).toBeInTheDocument();
      const cartbtn = screen.getByTestId(`prodAddCart-${product.id}`);
      fireEvent.click(cartbtn);
      const isFav = mockFavProducts.some((fav) => fav.productId === product.id);
      if (isFav) {
        const favElement = screen.getByTestId(`fav-${product.id}`);
        expect(favElement).toBeInTheDocument();
        fireEvent.click(favElement);
      } else {
        const unfavElement = screen.getByTestId(`unfav-${product.id}`);
        expect(unfavElement).toBeInTheDocument();
        fireEvent.click(unfavElement);
      }
    });
  });
});
