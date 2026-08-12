// Routes = the container that holds all your route definitions
// Route = defines a single path -> component mapping
import { Routes, Route } from "react-router";

// Shared layout (navbar/footer) that wraps every page — see how it's
// used as a wrapping <Route> below
import MainLayout from "./layouts/MainLayout.jsx";

import Home from "./pages/Home.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import EventDetails from "./pages/EventDetails.jsx";

// Our auth guard — wraps any route that needs a valid token
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Commented out — NotFound page isn't wired up yet
// import NotFound from "./pages/NotFound.jsx";
import { useState } from "react";

  return (
    // <Routes> must wrap all <Route> elements — it's the router's way
    // of knowing "pick exactly one of these based on the current URL"
    <Routes>
      {/* This outer Route has no "path" — it's a LAYOUT route.
          Every route nested inside it renders through MainLayout's
          <Outlet />, so the navbar/footer wrap every page automatically
          without repeating <Navbar /> in every single page component */}
      <Route element={<MainLayout />}>
        {/* path="/" = the homepage */}
        <Route path="/" element={<Home />} />

        {/* Sign in/up routes not wired up yet — waiting on teammates'
            components or intentionally disabled for now */}
        {/* <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} /> */}

        {/* :id is a dynamic segment — matches /events/1, /events/42, etc.
            useParams() inside EventDetails reads whatever value is here */}
        <Route path="/events/:id" element={<EventDetails />} />

        {/* Another LAYOUT-style route, but this one's job is auth, not
            visual layout. Any <Route> nested inside only renders if
            ProtectedRoute's check passes (see ProtectedRoute.jsx) —
            otherwise the user gets redirected to /signin */}
        <Route element={<ProtectedRoute />}>
          <Route path="/createevent" element={<CreateEvent />} />
        </Route>

        {/* Catch-all route (path="*") for any URL that doesn't match
            anything above — a 404 page. Still disabled */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>
  );
}

export default App;