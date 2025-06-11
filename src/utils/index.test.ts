import { distributeCategories, generateUniqueId } from ".";
import { categories } from "../interface";

describe("Utils components", () => {
  test("Utils -> Generate Uniqid", () => {
    const id1 = generateUniqueId();
    const id2 = generateUniqueId();

    expect(id1).not.toBe(id2);
  });

  test("Utils -> distributeCategories", () => {
    const categories: categories[] = [
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
    ];
    const resultCat = distributeCategories(categories);
    expect(resultCat.length).toBeGreaterThan(1);
  });
});
