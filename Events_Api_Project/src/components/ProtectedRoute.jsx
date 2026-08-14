// Navigate = a component that redirects the browser to another route
//   when it renders (React Router's way of doing redirects in JSX)
// Outlet = a placeholder that renders whichever CHILD route matched —
//   this is what makes ProtectedRoute a "wrapper" for other routes
import { Navigate, Outlet } from "react-router";

// Our custom hook (the one we wrote) that reads the token from localStorage
import useAuth from "../hooks/useAuth.js";

// This component doesn't render a page itself — it decides whether
// to show the real page or redirect away, based on auth status
export default function ProtectedRoute() {
  // Call our hook; destructure just the isAuthenticated function out of
  // what it returns (it also returns "token", but we don't need it here)
  const { isAuthenticated } = useAuth();

  // isAuthenticated() runs the check (returns true/false).
  // The "!" flips it: this block runs when the user is NOT logged in
  if (!isAuthenticated()) {
    // Redirect the browser to /signin instead of rendering anything else.
    // "replace" swaps the current history entry rather than adding a new one —
    // so clicking the browser's Back button won't bounce the user
    // back to the protected page they were just blocked from
    return <Navigate to="/signin" replace />;
  }

  // If we get here, the user IS authenticated.
  // <Outlet /> tells React Router: "render whatever child route was
  // requested" — in our case, that's <CreateEvent /> (see App.jsx)
  return <Outlet />;
}