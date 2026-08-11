import { NavLink, Link } from "react-router";
import logo from "../assets/Logo.svg";

export default function Navbar() {
  const navClass = ({ isActive }) => {
    return isActive ? "link link-primary no-underline" : "link no-underline";
  };

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
        <NavLink to="/signin" className={navClass}>
          Sign In
        </NavLink>
        <Link to="/signup" className="btn btn-primary">
          Sign Up
        </Link>
      </nav>
    </header>
  );
}
