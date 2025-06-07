import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  removeAllFav,
  removeFav,
  useFavProduct,
} from "../../redux/slices/wishlist.slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { fetchCartProduct } from "../../redux/slices/cart.slice";
import { Link } from "react-router";

const Wishlist: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list: favProducts } = useFavProduct();
  const handleRemoveFav = (productId: number) => {
    dispatch(removeFav(productId));
  };
  const handleMoveToCart = (productId: number) => {
    dispatch(fetchCartProduct({ productId }));
    dispatch(removeFav(productId));
  };
  const handleDeleteAllfav = () => {
    dispatch(removeAllFav());
  };

  if (favProducts?.length === 0) {
    return (
      <Box sx={{ p: 3, minHeight: "100vh" }}>
        <Typography variant="h5" gutterBottom>
          Wishlist
        </Typography>
        <Button
          variant="contained"
          color="error"
          size="large"
          sx={{ px: 4 }}
          component={Link}
          to="/"
        >
          CONTINUE SHOPPING
        </Button>
      </Box>
    );
  }
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4" fontWeight="bold">
          Wishlist
        </Typography>
        {favProducts && favProducts?.length >= 1 && (
          <Button
            variant="outlined"
            color="warning"
            startIcon={<DeleteIcon />}
            onClick={() => handleDeleteAllfav()}
          >
            Delete All
          </Button>
        )}
      </Box>
      <Grid container spacing={2}>
        {favProducts?.map((product) => {
          return (
            <Grid size={{ md: 6, xs: 12 }}>
              <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
                <CardMedia
                  component="img"
                  image={product.thumbnail}
                  alt={product.title}
                  sx={{
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                    borderRadius: 2,
                    mr: 2,
                  }}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography fontWeight="bold">{product.title}</Typography>
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="text.secondary"
                  >
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Stack direction="row" spacing={1} mt={1}>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      startIcon={<ShoppingCartIcon />}
                      onClick={() => handleMoveToCart(product.productId)}
                    >
                      Move to Cart
                    </Button>
                    <IconButton
                      color="warning"
                      onClick={() => handleRemoveFav(product.productId)}
                    >
                      <FavoriteIcon />
                    </IconButton>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
export default Wishlist;
