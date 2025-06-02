import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router";
import { AppDispatch } from "../../redux/store";
import {
  fetchProductsByCategory,
  useProductListsByCategory,
} from "../../redux/slices/categoryproduct.slice";
import { product } from "../../interface";

const ProductListByCategory: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { slug } = useParams<{ slug: string | undefined }>();
  const { list, loading, error } = useProductListsByCategory();

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
  if (!list) {
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
        {list &&
          list.map((product: product) => {
            return (
              <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Card>
                  <CardMedia
                    component="img"
                    height="180"
                    image={product.thumbnail}
                    alt={product.title}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      <Link
                        to={`/product/${product.id}`}
                        style={{ textDecoration: "none", color: "#1976d2" }}
                      >
                        {product.title.length > 10
                          ? product.title.slice(0, 10) + "..."
                          : product.title}
                      </Link>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description.length > 80
                        ? product.description.slice(0, 80) + "..."
                        : product.description}
                    </Typography>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ mt: 1 }}
                    >
                      <Button variant="contained" size="small">
                        Add to Cart
                      </Button>
                      <IconButton>
                        <FavoriteBorderIcon />
                      </IconButton>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

export default ProductListByCategory;
