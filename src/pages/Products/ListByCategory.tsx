import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { AppDispatch } from "../../redux/store";
import {
  fetchProductsByCategory,
  useProductListsByCategory,
} from "../../redux/slices/categoryproduct.slice";
import ProductList from "../../components/ProductList";

const ProductListByCategory: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { slug } = useParams<{ slug: string | undefined }>();
  const { list: products, loading, error } = useProductListsByCategory();

  useEffect(() => {
    dispatch(fetchProductsByCategory({ slug, limit: 10 }));
  }, [dispatch, slug]);

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
        {`Error: ${error}`}
      </Typography>
    );
  }

  if (products?.length === 0) {
    return (
      <Typography variant="h6" textAlign="center" mt={4}>
        No product found.
      </Typography>
    );
  }

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ padding: "0 15px", margin: "30px 0 0 0" }}
      >
        <ProductList products={products} />
      </Grid>
    </>
  );
};

export default ProductListByCategory;
