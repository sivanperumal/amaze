import React, { useEffect } from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { AppDispatch } from "../../redux/store";
import { fetchProduct, useProduct } from "../../redux/slices/product.slice";
import ReviewSection from "../../components/ReviewSection";
import { fetchCartProduct } from "../../redux/slices/cart.slice";
import {
  fetchFavProduct,
  removeFav,
  useFavProduct,
} from "../../redux/slices/wishlist.slice";
import { useUser } from "../../redux/slices/user.slice";

const Detail: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { productId } = useParams();
  const { item, loading, error } = useProduct();
  const { list: favProducts } = useFavProduct();
  const { isAuthenticate } = useUser();
  const isFav = favProducts?.some((fav) => fav.productId === item?.id);

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
  const handleCheckout = (productId: number) => {
    dispatch(fetchCartProduct({ productId }));
    if (isAuthenticate) {
      navigate("/checkout/onepage");
    } else {
      navigate("/checkout/cart");
    }
  };

  useEffect(() => {
    if (productId) {
      dispatch(fetchProduct({ productId }));
    }
  }, [productId, dispatch]);

  if (error) {
    return (
      <Typography variant="h6" color="error" textAlign="center" mt={4}>
        {`Error: ${error}`}
      </Typography>
    );
  }

  if (item === null) {
    return (
      <Typography variant="h6" textAlign="center" mt={4}>
        No product found.
      </Typography>
    );
  }

  return (
    <>
      {item ? (
        <Container maxWidth="lg">
          <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
            <Grid container spacing={4} alignItems="center">
              <Grid size={{ xs: 12, md: 5 }}>
                <Box
                  component="img"
                  src={item.thumbnail}
                  alt={item.title}
                  sx={{ width: "100%", borderRadius: 2 }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 7 }}>
                <Typography variant="h5" gutterBottom>
                  {item.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                  component="div"
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ mr: 2 }}>{`Brand: ${item.brand} |`} </Box>
                    <Rating
                      name="text-feedback"
                      value={item.rating}
                      readOnly
                      precision={0.5}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                    />
                    <Box sx={{ ml: 2 }}>
                      {`(${item.reviews.length} ratings)`}{" "}
                    </Box>
                  </Box>
                </Typography>

                <Chip
                  label={`-${item.discountPercentage}%`}
                  color="error"
                  sx={{ fontWeight: "bold", mr: 1 }}
                />
                <Typography variant="h4" component="span" color="primary">
                  ${Number(item.price)}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ textDecoration: "line-through", ml: 2 }}
                >
                  $
                  {(
                    Number(
                      ((item.price * item.discountPercentage) / 100).toFixed(2)
                    ) + Number(item.price)
                  ).toFixed(2)}
                </Typography>
                <Typography variant="body2" mt={1}>
                  {`Inclusive of all taxes | $${Number(
                    ((item.price * item.discountPercentage) / 100).toFixed(2)
                  )} / count`}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography color="success.main" fontWeight="bold">
                  {`Only ${item.stock} left in stock.`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ships from: Amazon | Sold by: STANDODD WELLNESS PRIVATE
                  LIMITED
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Grid container spacing={2}>
                  <Grid>
                    <Button
                      variant="contained"
                      color="warning"
                      startIcon={<ShoppingCartIcon />}
                      onClick={() => handleAddCart(item.id)}
                      data-testid={`detail-product-${item.id}`}
                    >
                      Add to Cart
                    </Button>
                  </Grid>
                  <Grid>
                    <Button
                      variant="contained"
                      color="error"
                      data-testid={`detail-check-${item.id}`}
                      onClick={() => handleCheckout(item.id)}
                    >
                      Buy Now
                    </Button>
                  </Grid>
                  <Grid>
                    {isFav ? (
                      <Button
                        variant="contained"
                        startIcon={<FavoriteIcon />}
                        onClick={() => handleRemoveFav(item.id)}
                        data-testid={`removeFav-${item.id}`}
                      >
                        Remove to Wishlist
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        startIcon={<FavoriteBorderIcon />}
                        onClick={() => handleAddFav(item.id)}
                        data-testid="addFav-btn"
                      >
                        Add to Wishlist
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Container maxWidth="md">
              <ReviewSection data={item.reviews} />
            </Container>
          </Paper>
        </Container>
      ) : (
        loading && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="80vh"
          >
            <CircularProgress />
          </Box>
        )
      )}
    </>
  );
};
export default Detail;
