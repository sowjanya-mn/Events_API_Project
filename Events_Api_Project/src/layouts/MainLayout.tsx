import { Outlet } from "react-router";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";

interface MainLayoutProps {
  isSignedIn: boolean;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MainLayout({ isSignedIn, setIsSignedIn }: MainLayoutProps) {
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
