import { NavLink, Link } from "react-router";
import logo from "../assets/Logo.svg";

export default function Navbar() {
  const navClass = ({ isActive }) => {
    return isActive ? "link link-primary no-underline" : "link no-underline";
  };
  let isSignedIn = false; // Replace with your actual logic to check if the user is signed in
  const token = localStorage.getItem("userToken");
  if (token !== null) {
    isSignedIn = true;
  }
  return (
    <header className="navbar px-4">
      <div className="flex-1">
        <Link to="/">
          <img src={logo} alt="User Directory" className="h-8" />
        </Link>
      </div>
      <nav className="flex gap-1 bg-base-200 px-4 py-2 gap-8 items-center">
        <NavLink to="/createevent" className={navClass}>
          Create Event
        </NavLink>
        {/* Put this block inside your Navbar menu stack */}
        {isSignedIn && (
          <NavLink
            to="#" /* Sets a placeholder path */
            onClick={(e) => {
              e.preventDefault(); // 1. STOPS the link from navigating anywhere

              // 2. RUN your custom click actions here!
              localStorage.removeItem("userToken"); // Clears your login session
              alert("Signed out successfully!");
              window.location.reload(); // Reloads the page to update the buttons
            }}
            className={navClass} /* Keeps your beautiful theme styles active */
          >
            Sign Out
          </NavLink>
        )}

        {!isSignedIn && (
          <NavLink to="/signup" className={navClass}>
            Sign Up
          </NavLink>
        )}
      </nav>
    </header>
  );
}
