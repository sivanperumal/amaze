import React from "react";
import { categories } from "../interface";
import { Box, Card, CircularProgress, Grid, Typography } from "@mui/material";
import { Link } from "react-router";
import { useProductsFetch } from "../hooks/useProductsFetch";

interface CategoryProps {
  category: categories;
}
const FourCardCategory: React.FC<CategoryProps> = (props) => {
  const { category } = props;
  const {
    data: products,
    loading,
    error,
  } = useProductsFetch(`${category.url}?limit=4`);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }
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
        <Typography variant="h6" gutterBottom>
          {category.name}
        </Typography>
        <Grid container spacing={2}>
          {products &&
            products.map((product) => {
              return (
                <Grid size={{ md: 6 }}>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    width={`100%`}
                  />
                </Grid>
              );
            })}
        </Grid>
        <Link
          to={`/category/${category.slug}`}
          style={{ float: "right", margin: "5px 0" }}
        >
          See more products
        </Link>
      </Card>
    </>
  );
};
export default FourCardCategory;
