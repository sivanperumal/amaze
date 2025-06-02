import { categories } from "../interface";

export const distributeCategories = (categories: categories[]) => {
  const result = [];
  const pattern = [4, 4, 2]; // Repeating pattern
  let i = 0; // current index in categories
  let patternIndex = 0;

  while (i < categories.length) {
    const chunkSize = pattern[patternIndex % pattern.length];
    const chunk = categories.slice(i, i + chunkSize);
    const componentType = chunkSize === 4 ? "CategoryCard" : "SingleRow";
    result.push({ type: componentType, data: chunk });

    i += chunkSize;
    patternIndex++;
  }

  return result;
};
