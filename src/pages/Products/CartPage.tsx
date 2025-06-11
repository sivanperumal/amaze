import React from "react";
import {
  Box,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  quantityDecrement,
  quantityIncrement,
  removeCart,
  useCart,
} from "../../redux/slices/cart.slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { Link } from "react-router";

const CartPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list: cartList, loading, error } = useCart();
  const handleRemoveCart = (productId: number | undefined) => {
    dispatch(removeCart(productId));
  };

  const handleIncrementQuantity = (cartId: number | string) => {
    dispatch(quantityIncrement(cartId));
  };
  const handleDecrementQuantity = (cartId: number | string) => {
    dispatch(quantityDecrement(cartId));
  };

  const total = cartList
    ?.reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

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
  if (cartList && cartList?.length === 0) {
    return (
      <Box sx={{ p: 3, bgcolor: "#fdf6f1", minHeight: "100vh" }}>
        <Typography variant="h5" gutterBottom>
          Shopping Cart
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
  if (error) {
    return (
      <Typography variant="h6" color="error" textAlign="center" mt={4}>
        {`Error: ${error}`}
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 3, bgcolor: "#fdf6f1", minHeight: "100vh" }}>
      <Typography variant="h5" gutterBottom>
        Shopping Cart
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        <Box flex={2}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Items
            </Typography>
            {cartList?.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  p: 1,
                  borderBottom: "1px solid #eee",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 80, height: 80, objectFit: "contain", mr: 2 }}
                  image={item.thumbnail}
                  alt={item.title}
                />
                <Box flex={1}>
                  <Typography variant="body1">
                    <Link
                      to={`/product/${item.productId}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {item.title}
                    </Link>
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    ${item.price.toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    color="primary"
                    size="small"
                    disabled={item.quantity == 1 ? true : false}
                    onClick={() => handleDecrementQuantity(item.id)}
                    data-testid={`dec-quantity-${item.id}`}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => handleIncrementQuantity(item.id)}
                    data-testid={`incr-quantity-${item.id}`}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
                <Typography
                  sx={{ width: 80, textAlign: "right", fontWeight: "bold" }}
                >
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
                <IconButton
                  color="error"
                  size="small"
                  sx={{ ml: 1 }}
                  data-testid={`remove-cart-${item.id}`}
                  onClick={() => handleRemoveCart(item.productId)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Card>
        </Box>

        <Box flex={1}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Cart Summary
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Typography variant="body1">Sub Total</Typography>
              <Typography variant="body1">{`$${total}`}</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Grand Total
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", color: "#f5a623" }}
              >
                {`$${total}`}
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="error"
              fullWidth
              sx={{ mb: 2 }}
              component={Link}
              to="/checkout/onepage"
            >
              PROCEED TO CHECKOUT
            </Button>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};
export default CartPage;
