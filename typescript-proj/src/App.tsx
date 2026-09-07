import { Routes, Route } from "react-router";
import { useState } from "react";
// FIX 1: Dropped explicit .tsx file extensions on relative imports
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CreateEvent from "./pages/CreateEvent";
import EventDetails from "./pages/EventDetails";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(() => {
    return localStorage.getItem("userToken") !== null;
  });

  return (
    <Routes>
      {/* FIX 2: Pass the live state directly into MainLayout here */}
      <Route
        element={
          <MainLayout isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
        }
      >
        <Route path="/" element={<Home />} />
        <Route
          path="/signin"
          element={<SignIn setIsSignedIn={setIsSignedIn} />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/events/:id" element={<EventDetails />} />

        <Route element={<ProtectedRoute isSignedIn={isSignedIn} />}>
          <Route path="/createevent" element={<CreateEvent />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
