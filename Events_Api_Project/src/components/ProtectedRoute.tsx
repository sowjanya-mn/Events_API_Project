import { Navigate, Outlet, useLocation } from "react-router";
import useAuth from "../hooks/useAuth.js";

interface ProtectedRouteProps {
  isSignedIn: boolean;
}

export default function ProtectedRoute({ isSignedIn }: ProtectedRouteProps) {
  const location = useLocation();

  const hasToken = localStorage.getItem("userToken") !== null;
  const isUserAuthenticated = isSignedIn || hasToken;

  if (!isUserAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
