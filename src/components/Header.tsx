import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useRef } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { Link, useNavigate, useSearchParams } from "react-router";
import { useCart } from "../redux/slices/cart.slice";
import HeaderUserMenu from "./HeaderUserMenu";
import { useUser } from "../redux/slices/user.slice";
import Search from "./Search";

export interface HeaderProps {
  onClickSidebar: () => void;
}
const Header: React.FC<HeaderProps> = (props) => {
  const { onClickSidebar } = props;
  const { list: cartList } = useCart();
  const { loggedUser } = useUser();

  const ref = useRef("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    ref.current = e.target.value;
  };

  const handleSearch = () => {
    searchParams.set("k", ref.current);
    setSearchParams(searchParams);
    navigate(`/searchproducts?k=${searchParams.get("k")}`);
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
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
        <Search
          onSearchChange={handleOnChange}
          onSearchKeyPress={handleKeyPress}
          onSearchClick={handleSearch}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "white",
            px: 1,
          }}
        >
          <HeaderUserMenu
            username={`${
              loggedUser
                ? loggedUser?.firstname + " " + loggedUser?.lastname
                : "GUEST"
            }`}
          />
          <IconButton
            size="large"
            aria-label={`show 3 items in wishlist`}
            sx={{ color: "#fff" }}
            component={Link}
            to="/customer/account/wishlist"
          >
            <Badge color="secondary">
              <FavoriteIcon />
            </Badge>
          </IconButton>
          <IconButton
            aria-label="cart"
            sx={{ color: "#fff!important" }}
            disabled={cartList?.length ? false : true}
            component={Link}
            to="/checkout/cart"
          >
            <Badge badgeContent={cartList?.length} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
