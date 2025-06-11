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
  const { isAuthenticate } = useUser();
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

  return (
    <Box display="flex" alignItems="center">
      <IconButton
        size="small"
        onClick={handleToggleMenu}
        sx={{ color: "#fff" }}
        data-testid="toggle-open"
      >
        <AccountCircle sx={{ mr: 1 }} />
        <Typography variant="body1" fontWeight="bold">
          Welcome, {username && username}
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
        data-testid={`login-${isAuthenticate.toString}`}
      >
        <Box p={1} textAlign="center">
          <Typography variant="subtitle2" color="primary" fontWeight="bold">
            {username && username.toUpperCase()}
          </Typography>
        </Box>
        <Divider />
        {isAuthenticate
          ? [
              <MenuItem
                key="profile"
                onClick={() => handleMenuItemClick("/customer/account/profile")}
                data-testid="menuitem-link"
              >
                Profile
              </MenuItem>,
              <MenuItem
                key="orders"
                onClick={() => handleMenuItemClick("/customer/account/orders")}
                data-testid="menuitem-link"
              >
                Orders
              </MenuItem>,
              <MenuItem
                key="wishlist"
                onClick={() =>
                  handleMenuItemClick("/customer/account/wishlist")
                }
                data-testid="menuitem-link"
              >
                Wishlist
              </MenuItem>,
              <MenuItem key="logout" onClick={handleLogout}>
                Logout
              </MenuItem>,
            ]
          : [
              <MenuItem key="login" component={Link} to="/customer/login">
                Login
              </MenuItem>,
            ]}
      </Menu>
    </Box>
  );
};
export default HeaderUserMenu;
