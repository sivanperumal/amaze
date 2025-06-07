import React, { MouseEvent, useState } from "react";
import {
  Box,
  Typography,
  Menu,
  MenuItem,
  Divider,
  IconButton,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { Link, useNavigate } from "react-router";
import { userLogout, useUser } from "../redux/slices/user.slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

export type UserMenuProps = {
  username: string;
};
const HeaderUserMenu: React.FC<UserMenuProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { username } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const { loggedUser } = useUser();
  const handleToggleMenu = (event: MouseEvent<HTMLElement>) => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/customer/login");
  };
  const handleMenuItemClick = (url: string) => {
    navigate(url);
    handleCloseMenu();
  };
  //return <h4>Welcome {username ? username : "Guest"}</h4>;
  return (
    <Box display="flex" alignItems="center">
      <IconButton
        size="small"
        onClick={handleToggleMenu}
        sx={{ color: "#fff" }}
      >
        <AccountCircle sx={{ mr: 1 }} />
        <Typography variant="body1" fontWeight="bold">
          Welcome, {username ? username : "Guest"}
        </Typography>
      </IconButton>

      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleCloseMenu}
        slotProps={{
          paper: {
            elevation: 4,
            sx: { minWidth: 200 },
          },
        }}
      >
        <Box p={1} textAlign="center">
          <Typography variant="subtitle2" color="primary" fontWeight="bold">
            {username && username.toUpperCase()}
          </Typography>
        </Box>
        <Divider />
        {loggedUser ? (
          <>
            <MenuItem
              onClick={() => handleMenuItemClick("/customer/account/profile")}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => handleMenuItemClick("/customer/account/orders")}
            >
              Orders
            </MenuItem>
            <MenuItem
              onClick={() => handleMenuItemClick("/customer/account/wishlist")}
            >
              Wishlist
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </>
        ) : (
          <MenuItem component={Link} to="/customer/login">
            Login
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};
export default HeaderUserMenu;
