import React, { useEffect, useState } from "react";
import { categories, product } from "../interface";
import { Box, Card, Grid, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";
import { Link } from "react-router";

interface CategoryProps {
  category: categories;
}
const SingleCardCategory: React.FC<CategoryProps> = (props) => {
  const [products, setProducts] = useState<product[] | null>();
  const [error, setError] = useState<string | null>(null);

  const { category } = props;

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios(`${category.url}?limit=6`);
        setProducts(response.data.products);
      } catch (e) {
        const error = e as AxiosError;
        setError(error.message);
      }
    };
    getProduct();
  }, [category.url]);

  if (error) {
    return (
      <Typography variant="h6" color="error" textAlign="center" mt={4}>
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
            products.map((product) => {
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
