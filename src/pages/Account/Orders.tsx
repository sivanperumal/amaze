import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  IconButton,
  Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useUser } from "../../redux/slices/user.slice";
import { Link } from "react-router";
const Orders: React.FC = () => {
  const { loggedUser } = useUser();
  const orders = loggedUser?.orders;
  return (
    <Box p={4}>
      {orders?.length !== 0 ? (
        <>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            My Orders
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Order ID</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Date</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Total</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Status</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Actions</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders?.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>₹{order.total}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        color="success"
                        sx={{ color: "white", fontWeight: "bold" }}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="View Details"
                        component={Link}
                        to={`/customer/account/orders/view/${order.id}`}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <>
          <Typography variant="h5" fontWeight="normal" gutterBottom>
            My order was empty
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
        </>
      )}
    </Box>
  );
};

export default Orders;
