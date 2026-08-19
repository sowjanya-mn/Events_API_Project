import { Outlet } from "react-router";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function MainLayout({ isSignedIn, setIsSignedIn }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />

      <main className="mx-auto w-full flex-1 p-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
