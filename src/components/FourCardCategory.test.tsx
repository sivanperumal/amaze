import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore } from "../redux/store";
import { MemoryRouter } from "react-router";
import FourCardCategory from "./FourCardCategory";
import { useProductsFetch } from "../hooks/useProductsFetch";

jest.mock("../hooks/useProductsFetch");
const mockedUseProductsFetch = useProductsFetch as jest.MockedFunction<
  typeof useProductsFetch
>;

const mockCategory = {
  slug: "beauty",
  name: "Beauty",
  url: "https://dummyjson.com/products/category/beauty",
};

const mockProductsData = {
  products: [
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
      images: [
        "https://cdn.dummyjson.com/product-images/groceries/apple/1.webp",
      ],
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
  ],
  loading: false,
  error: null,
};
describe("FourCardCategory component", () => {
  beforeEach(() => {
    mockedUseProductsFetch.mockReturnValue({
      data: mockProductsData.products,
      loading: false,
      error: null,
    });
  });

  test("Renders correctly", () => {
    render(
      <Provider store={setupStore()}>
        <MemoryRouter>
          <FourCardCategory category={mockCategory} key={mockCategory.slug} />
        </MemoryRouter>
      </Provider>
    );

    mockProductsData.products.forEach((product) => {
      const prodEle = screen.getByAltText(product.title);
      expect(prodEle).toBeInTheDocument();
    });
  });
  test("Error True condition check", () => {
    mockedUseProductsFetch.mockReturnValue({
      data: [],
      loading: false,
      error: "Something went wrong",
    });

    render(
      <Provider store={setupStore()}>
        <MemoryRouter>
          <FourCardCategory category={mockCategory} key={mockCategory.slug} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId("Something went wrong")).toBeInTheDocument();
  });

  test("Loading True condition check", () => {
    mockedUseProductsFetch.mockReturnValue({
      data: [],
      loading: true,
      error: null,
    });

    render(
      <Provider store={setupStore()}>
        <MemoryRouter>
          <FourCardCategory category={mockCategory} key={mockCategory.slug} />
        </MemoryRouter>
      </Provider>
    );
  });
});
