import { Navigate, Outlet } from "react-router";
import useAuth from "../hooks/useAuth.js";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}