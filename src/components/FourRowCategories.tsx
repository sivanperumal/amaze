import React from "react";
import { categories } from "../interface";
import { Grid } from "@mui/material";
import FourCardCategory from "./FourCardCategory";
interface FourRowCategoryProps {
  categories: categories[];
}
const FourRowCategory: React.FC<FourRowCategoryProps> = (props) => {
  const { categories } = props;
  return (
    <Grid container spacing={2}>
      {categories &&
        categories.map((category) => (
          <Grid size={{ md: 3 }}>
            <FourCardCategory key={category.slug} category={category} />
          </Grid>
        ))}
    </Grid>
  );
};
export default FourRowCategory;
