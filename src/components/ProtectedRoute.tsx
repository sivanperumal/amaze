import React from "react";
import { useUser } from "../redux/slices/user.slice";
import { Navigate, Outlet } from "react-router";
const ProtectedRoute: React.FC = () => {
  const { isAuthenticate } = useUser();
  return isAuthenticate ? <Outlet /> : <Navigate to="/customer/login" />;
};
export default ProtectedRoute;
