import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React from "react";
import { product } from "../interface";
import {
  fetchFavProduct,
  removeFav,
  useFavProduct,
} from "../redux/slices/wishlist.slice";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { fetchCartProduct } from "../redux/slices/cart.slice";

export type ProductListProps = {
  products: product[] | undefined;
};
const ProductList: React.FC<ProductListProps> = (props) => {
  const navigate = useNavigate();
  const { products } = props;
  const dispatch = useDispatch<AppDispatch>();
  const { list: favProducts } = useFavProduct();
  const handleAddCart = (productId: number) => {
    dispatch(fetchCartProduct({ productId }));
    navigate("/checkout/cart");
  };
  const handleAddFav = (productId: number) => {
    dispatch(fetchFavProduct(productId));
  };
  const handleRemoveFav = (productId: number) => {
    dispatch(removeFav(productId));
  };
  return (
    <>
      {products &&
        products?.map((product) => {
          const isFav = favProducts?.some(
            (fav) => fav.productId === product.id
          );
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
                  <Box>
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
                    <Typography
                      variant="h6"
                      color="text.primary"
                      sx={{ float: "right" }}
                    >
                      ${product.price.toFixed(2)}
                    </Typography>
                  </Box>

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
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleAddCart(product.id)}
                    >
                      Add to Cart
                    </Button>
                    {isFav ? (
                      <IconButton onClick={() => handleRemoveFav(product.id)}>
                        <FavoriteIcon />
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => handleAddFav(product.id)}>
                        <FavoriteBorderIcon />
                      </IconButton>
                    )}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
    </>
  );
};
export default ProductList;
