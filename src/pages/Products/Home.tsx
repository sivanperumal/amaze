import React, { useEffect } from "react";
import {
  fetchCategories,
  useCategories,
} from "../../redux/slices/category.slice";
import { Box, CircularProgress, Typography } from "@mui/material";
import { distributeCategories } from "../../utils";
import FourRowCategory from "../../components/FourRowCategories";
import SingleRowCategory from "../../components/SingleRowCategories";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import HomeSlider from "../../components/HomeSlider";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  const { list, loading, error } = useCategories();
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

  if (error) {
    return (
      <Typography variant="h6" color="error" textAlign="center" mt={4}>
        {`Error: ${error}`}
      </Typography>
    );
  }
  if (!list) {
    return (
      <Typography variant="h6" textAlign="center" mt={4}>
        No product found.
      </Typography>
    );
  }
  const sections = distributeCategories(list);
  return (
    <div>
      <HomeSlider />
      <div
        style={{
          margin: "24px 0",
          padding: "0 16px",
          position: "absolute",
          top: "60%",
          zIndex: "999",
        }}
      >
        {sections.map((section, index) =>
          section.type === "CategoryCard" ? (
            <FourRowCategory key={index} categories={section.data} />
          ) : (
            <SingleRowCategory key={index} categories={section.data} />
          )
        )}
      </div>
    </div>
  );
};
export default Home;
