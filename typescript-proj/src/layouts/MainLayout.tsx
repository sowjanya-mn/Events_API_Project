import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// FIX 1: Explicitly add the properties here as 'any' so App.tsx is completely allowed to pass them
type MainLayoutProps = {
  isSignedIn: any;
  setIsSignedIn: any;
};

// FIX 2: Attach the type descriptor directly to the layout parameters
export default function MainLayout({
  isSignedIn,
  setIsSignedIn,
}: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Pass them down safely into the navbar layout */}
      <Navbar isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />

      <main className="mx-auto w-full flex-1 p-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
