import { Routes, Route } from "react-router";
import { useState } from "react";
import MainLayout from "./layouts/MainLayout.js";
import Home from "./pages/Home.js";
import SignIn from "./pages/SignIn.js";
import SignUp from "./pages/SignUp.js";
import CreateEvent from "./pages/CreateEvent.js";
import EventDetails from "./pages/EventDetails.js";
import NotFound from "./pages/NotFound.js";
import ProtectedRoute from "./components/ProtectedRoute.js";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(() => {
    return localStorage.getItem("userToken") !== null;
  });
  return (
    <Routes>
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
