import React, { useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { fetchCategories, useCategories } from "../redux/slices/category.slice";
import { Link } from "react-router";

const TopNavMenu: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list } = useCategories();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <Box sx={{ backgroundColor: "#232F3E", px: 2, py: 1 }}>
      <Stack direction="row" spacing={3} alignItems="center" flexWrap="wrap">
        {list &&
          list.slice(0, 9).map((item, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{ color: "white", cursor: "pointer", fontWeight: 500 }}
            >
              <Link
                to={`/category/${item.slug}`}
                style={{ color: "#fff", textDecoration: "none" }}
              >
                {item.name}
              </Link>
            </Typography>
          ))}
      </Stack>
    </Box>
  );
};
export default TopNavMenu;
