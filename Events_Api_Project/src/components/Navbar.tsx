import { NavLink, Link } from "react-router";
import logo from "../assets/Logo.svg";

interface NavbarProps {
  isSignedIn: boolean;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ isSignedIn, setIsSignedIn }: NavbarProps) {
  const navClass = ({ isActive }: { isActive: boolean }) => {
    return isActive ? "link link-primary no-underline" : "link no-underline";
  };

  const handleSignOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    localStorage.removeItem("userToken");
    setIsSignedIn(false);
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

        {isSignedIn && (
          <NavLink to="#" onClick={handleSignOut} className={navClass}>
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
