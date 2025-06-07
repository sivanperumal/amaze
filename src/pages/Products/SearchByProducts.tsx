import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router";
import { AppDispatch } from "../../redux/store";
import {
  fetchSearchProducts,
  useProduct,
} from "../../redux/slices/product.slice";
import ProductList from "../../components/ProductList";

const SearchByProducts: React.FC = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { searchProducts: products, loading, error } = useProduct();
  useEffect(() => {
    dispatch(fetchSearchProducts(searchParams.get("k")));
  }, [dispatch, searchParams]);
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
      <Box sx={{ p: 3, bgcolor: "#fdf6f1", minHeight: "100vh" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ padding: "0 15px", margin: "30px 0 0 0" }}
        >
          {products?.length} Search Results Found
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{ padding: "0 15px", margin: "30px 0 0 0" }}
        >
          <ProductList products={products} />
        </Grid>
      </Box>
    </>
  );
};
export default SearchByProducts;
