import React from "react";
import { categories, product } from "../interface";
import { Box, Card, Grid, Typography } from "@mui/material";
import { Link } from "react-router";
import { useProductsFetch } from "../hooks/useProductsFetch";

interface CategoryProps {
  category: categories;
}
const SingleCardCategory: React.FC<CategoryProps> = (props) => {
  const { category } = props;
  const { data: products, error } = useProductsFetch(`${category.url}?limit=6`);

  if (error) {
    return (
      <Typography
        variant="h6"
        color="error"
        textAlign="center"
        mt={4}
        data-testid={error}
      >
        Error: {error}
      </Typography>
    );
  }
  return (
    <>
      <Card sx={{ marginBottom: 4, padding: 2 }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            {category.name}
          </Typography>
          <Link to={`/category/${category.slug}`} style={{ float: "right" }}>
            See more products
          </Link>
        </Box>
        <Grid container spacing={2}>
          {products &&
            products?.map((product: product) => {
              return (
                <Grid size={{ md: 2 }}>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    width={`100%`}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Card>
    </>
  );
};
export default SingleCardCategory;
