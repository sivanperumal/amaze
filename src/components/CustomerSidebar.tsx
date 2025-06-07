import React from "react";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router";
import { useUser } from "../redux/slices/user.slice";

const CustomerSidebar: React.FC = () => {
  const { loggedUser } = useUser();
  return (
    <Box
      width={{ xs: "100%", md: 250 }}
      mr={{ md: 4 }}
      mb={{ xs: 2, md: 0 }}
      p={2}
      sx={{ borderRight: { md: "1px solid #ddd" } }}
    >
      <Box display="flex" alignItems="center" mb={2}>
        <Box ml={2}>
          <Typography fontWeight="bold">{`${loggedUser?.firstname} ${loggedUser?.lastname}`}</Typography>
          <Typography color="orange">{loggedUser?.email}</Typography>
        </Box>
      </Box>
      <Divider />
      <List>
        <ListItem key="Person" component={Link} to="/customer/account/profile">
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Person" />
        </ListItem>
        <ListItem key="Order" component={Link} to="/customer/account/orders">
          <ListItemIcon>
            <ListAltIcon />
          </ListItemIcon>
          <ListItemText primary="Order" />
        </ListItem>
        <ListItem
          key="Wishlist"
          component={Link}
          to="/customer/account/wishlist"
        >
          <ListItemIcon>
            <FavoriteBorderIcon />
          </ListItemIcon>
          <ListItemText primary="Wishlist" />
        </ListItem>
      </List>
    </Box>
  );
};
export default CustomerSidebar;
