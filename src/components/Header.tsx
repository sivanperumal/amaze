import {
  AppBar,
  Badge,
  Box,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { Link } from "react-router";

interface HeaderProps {
  onClickSidebar: () => void;
}
const Header: React.FC<HeaderProps> = (props) => {
  const { onClickSidebar } = props;
  return (
    <AppBar position="static" sx={{ backgroundColor: "#131921" }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={onClickSidebar}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
            amaze
          </Link>
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 1,
            px: 1,
          }}
        >
          <InputBase placeholder="Search Amazon.in" />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "white",
            px: 1,
          }}
        >
          <IconButton aria-label="cart" sx={{ color: "#fff" }}>
            <Badge badgeContent={2} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            aria-label={`show 3 items in wishlist`}
            sx={{ color: "#fff" }}
          >
            <Badge badgeContent={3} color="secondary">
              <FavoriteIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
