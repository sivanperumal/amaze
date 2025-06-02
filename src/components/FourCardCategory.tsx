import React, { useEffect, useState } from "react";
import { categories, product } from "../interface";
import { Box, Card, CircularProgress, Grid, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";
import { Link } from "react-router";

interface CategoryProps {
  category: categories;
}
const FourCardCategory: React.FC<CategoryProps> = (props) => {
  const [products, setProducts] = useState<product[] | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { category } = props;

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const response = await axios(`${category.url}?limit=4`);
        setLoading(false);
        setProducts(response.data.products);
      } catch (e) {
        setLoading(false);
        const error = e as AxiosError;
        setError(error.message);
      }
    };
    getProduct();
  }, [category.url]);

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
      <Typography variant="h6" color="error" textAlign="center" mt={4}>
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
