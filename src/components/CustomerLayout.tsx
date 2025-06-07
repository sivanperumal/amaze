import React from "react";
import { Box } from "@mui/material";
import CustomerSidebar from "./CustomerSidebar";
import { Outlet } from "react-router";

const CustomerLayout: React.FC = () => {
  return (
    <Box display="flex" flexDirection={{ xs: "column", md: "row" }} p={2}>
      <CustomerSidebar />
      {/* Content Section */}
      <Box flexGrow={1}>
        <Outlet />
      </Box>
    </Box>
  );
};
export default CustomerLayout;
