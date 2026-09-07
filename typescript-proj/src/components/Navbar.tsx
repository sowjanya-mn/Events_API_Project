import { NavLink, Link } from "react-router";
import logo from "../assets/Logo.svg";
import type { MouseEvent } from "react";

type NavLinkState = {
  isActive: boolean;
};

type NavbarProps = {
  isSignedIn: any;
  setIsSignedIn: any;
};

export default function Navbar({ isSignedIn, setIsSignedIn }: NavbarProps) {
  const navClass = ({ isActive }: NavLinkState) => {
    return isActive ? "link link-primary no-underline" : "link no-underline";
  };

  // FIX: Create a new local variable combining both the live state and the localStorage backup
  const hasToken = localStorage.getItem("userToken") !== null;
  const isUserLoggedIn = isSignedIn || hasToken;

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

        {/* FIX: Use the new local variable for conditional rendering */}
        {isUserLoggedIn && (
          <NavLink
            to="#"
            onClick={(e: MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();

              localStorage.removeItem("userToken");

              // Updates the live React state loop instantly
              setIsSignedIn(false);

              alert("Signed out successfully!");

              // OPTIONAL: We can remove window.location.reload() now because
              // setIsSignedIn(false) will refresh the layout seamlessly!
            }}
            className={navClass}
          >
            Sign Out
          </NavLink>
        )}

        {!isUserLoggedIn && (
          <NavLink to="/signup" className={navClass}>
            Sign Up
          </NavLink>
        )}
      </nav>
    </header>
  );
}
