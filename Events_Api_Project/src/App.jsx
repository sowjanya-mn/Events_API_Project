import { Routes, Route } from "react-router";
import { useState } from "react";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import EventDetails from "./pages/EventDetails.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

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
