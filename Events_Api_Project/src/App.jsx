import { Routes, Route } from "react-router";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import EventDetails from "./pages/EventDetails.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
// import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        {/* <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} /> */}
        <Route path="/events/:id" element={<EventDetails />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/createevent" element={<CreateEvent />} />
        </Route>

        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>
  );
}

export default App;