import { Navigate, Outlet, useLocation } from "react-router";
import useAuth from "../hooks/useAuth.js";

interface ProtectedRouteProps {
  isSignedIn: boolean;
}

export default function ProtectedRoute({ isSignedIn }: ProtectedRouteProps) {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const isUserAuthenticated = isSignedIn || isAuthenticated();

  if (!isUserAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
