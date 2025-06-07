import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
} from "@mui/material";
import { useParams } from "react-router";
import { useUser } from "../../redux/slices/user.slice";

const OrderDetails: React.FC = () => {
  const { orderId } = useParams();
  const { loggedUser } = useUser();
  const orderList = loggedUser?.orders;
  const orderDetails = orderList?.find((order) => order.id === orderId);
  return (
    <Box p={4}>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Order #{orderId}
      </Typography>
      <Box mb={2}>
        <Typography variant="body1">
          <strong>Placed On:{orderDetails?.date}</strong>
        </Typography>
      </Box>

      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        Products Ordered
      </Typography>

      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Price</strong>
              </TableCell>
              <TableCell>
                <strong>Item Status</strong>
              </TableCell>
              <TableCell>
                <strong>Subtotal</strong>
              </TableCell>
              <TableCell>
                <strong>Grand Total</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderDetails?.cart?.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.title}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{`Ordered(${product.quantity})`}</TableCell>
                <TableCell>
                  ${(product.price * product.quantity).toFixed(2)}
                </TableCell>
                <TableCell>
                  ${(product.price * product.quantity).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Summary */}
      <Box mt={2}>
        <Divider sx={{ mb: 2 }} />
        <Box display="flex" justifyContent="flex-end" gap={4} flexWrap="wrap">
          <Typography variant="body1">
            <strong>Subtotal:</strong> ${orderDetails?.total.toFixed(2)}
          </Typography>
          <Typography variant="body1">
            <strong>Shipping & Handling:</strong> $0
          </Typography>
          <Typography variant="body1" fontWeight="bold" color="primary">
            <strong>Grand Total:</strong> ${orderDetails?.total.toFixed(2)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default OrderDetails;
