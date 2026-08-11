import { NavLink } from "react-router";
export default function Navbar() {
  const navClass = ({ isActive }) => {
    return isActive ? "btn btn-primary btn-sm" : "btn btn-sm btn-ghost";
  };

  return (
    <header className="navbar bg-base-100 px-4 shadow-sm">
      <div className="flex-1">
        <span className="text-xl font-bold">User Directory</span>
      </div>
      <nav className="flex gap-1">
        <NavLink to="/" className={navClass}>
          Home
        </NavLink>
        <NavLink to="/createevent" className={navClass}>
          Create Event
        </NavLink>
        <NavLink to="/signin" className={navClass}>
          Sign In
        </NavLink>
        <NavLink to="/signup" className={navClass}>
          Sign Up
        </NavLink>
      </nav>
    </header>
  );
}
