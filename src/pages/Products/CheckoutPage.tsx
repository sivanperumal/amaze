import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  Button,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import { removeAllCart, useCart } from "../../redux/slices/cart.slice";
import { useNavigate } from "react-router";
import { addUserOrder, useUser } from "../../redux/slices/user.slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

const CheckoutPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loggedUser } = useUser();
  const { list: CartList } = useCart();
  const total = CartList?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  ).toFixed(2);

  const handleOrder = () => {
    const orderDetails = {
      userId: loggedUser?.id,
      cart: CartList,
      total: Number(total),
    };
    dispatch(addUserOrder(orderDetails));
    dispatch(removeAllCart());
    navigate("/customer/account/orders");
  };
  useEffect(() => {
    if (CartList && CartList?.length === 0) {
      navigate("/checkout/cart");
    }
  }, [CartList, navigate]);
  return (
    <Box p={4}>
      {/* Checkout Title */}
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Checkout
      </Typography>

      <Grid container spacing={3}>
        {/* Left Section */}
        <Grid size={{ xs: 12, md: 8 }}>
          {/* Order Summary */}
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Order Summary
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography fontWeight="bold" mb={1}>
                  Billing Address
                </Typography>
                <Typography variant="body2">
                  Sivananchaperumal Krishnamoorthy
                  <br />
                  32/1-69/D12 First Floor, Kesavaperumal colony,
                  <br />
                  Arattarvadi, Vadasery, TN
                  <br />
                  India 629001
                  <br />
                  Contact: 09944387062
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography fontWeight="bold" mb={1}>
                  Shipping Address
                </Typography>
                <Typography variant="body2">
                  Sivananchaperumal Krishnamoorthy
                  <br />
                  32/1-69/D12 First Floor, Kesavaperumal colony,
                  <br />
                  Arattarvadi, Vadasery, TN
                  <br />
                  India 629001
                  <br />
                  Contact: 09944387062
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Items */}
          <Box mt={4}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Items
            </Typography>
            {CartList &&
              CartList?.map((item) => (
                <Box key={item.id} display="flex" alignItems="center" mb={2}>
                  <Box
                    component="img"
                    src={item.thumbnail}
                    alt={item.title}
                    width={60}
                    height={60}
                    sx={{ objectFit: "cover", mr: 2 }}
                  />
                  <Box flexGrow={1}>
                    <Typography variant="body1">{item.title}</Typography>
                    <Typography variant="body2">
                      ${item.price}.00 x {item.quantity} (Quantity)
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body1" fontWeight="bold">
                      ${item.price * item.quantity}
                    </Typography>
                  </Box>
                </Box>
              ))}
          </Box>

          {/* Payment Section */}
          <Box
            mt={4}
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
          >
            <Typography variant="body1" fontWeight="bold">
              Payment Method
            </Typography>
            <Button
              variant="contained"
              color="error"
              size="large"
              sx={{ mt: { xs: 2, md: 0 } }}
              onClick={() => handleOrder()}
              data-testid="order-btn"
            >
              Place Order
            </Button>
          </Box>

          {/* Bottom Summary */}
          <Box
            mt={2}
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            flexWrap="wrap"
          >
            <Card variant="outlined" sx={{ mt: 2, width: "300px" }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" mb={1}>
                  <Typography>Sub Total</Typography>
                  <Typography>₹{total}</Typography>
                </Stack>
                <Divider />
                <Stack direction="row" justifyContent="space-between" mt={2}>
                  <Typography fontWeight="bold" color="text.secondary">
                    Grand Total
                  </Typography>
                  <Typography fontWeight="bold" color="orange">
                    ₹{total}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Grid>

        {/* Right Section */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Cart Summary
              </Typography>
              <Stack direction="row" justifyContent="space-between" mb={1}>
                <Typography>Sub Total</Typography>
                <Typography>${total}</Typography>
              </Stack>
              <Divider />
              <Stack direction="row" justifyContent="space-between" mt={2}>
                <Typography fontWeight="bold" color="text.secondary">
                  Grand Total
                </Typography>
                <Typography fontWeight="bold" color="orange">
                  ${total}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
export default CheckoutPage;
