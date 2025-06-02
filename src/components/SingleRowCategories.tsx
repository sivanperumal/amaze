import React from "react";
import { categories } from "../interface";
import { Grid } from "@mui/material";
import SingleCardCategory from "./SingleCardCategory";
interface SingleCategoryProps {
  categories: categories[];
}
const SingleRowCategory: React.FC<SingleCategoryProps> = (props) => {
  const { categories } = props;
  return (
    <Grid container spacing={2}>
      {categories &&
        categories.map((category) => (
          <Grid size={{ md: 12 }}>
            <SingleCardCategory key={category.slug} category={category} />
          </Grid>
        ))}
    </Grid>
  );
};
export default SingleRowCategory;
