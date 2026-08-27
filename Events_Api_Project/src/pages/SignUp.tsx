import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Home from "./Home";
import SignIn from "./SignIn";
export default function SignUp() {
  // 1. Create state to hold the input values
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSignIn, setShowSignIn] = useState(false);
  const [isUserExists, setIsUserExists] = useState(false);

  //const [showSignIn, setShowSignIn] = useState(false);
  // 2. Update state whenever a user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 3. Handle form submission
  const handleSubmit = async (e) => {
    // Prevent the page from reloading
    e.preventDefault();
    setErrorMessage("");
    try {
      // Send the POST request to your API
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );
      if (response.ok) {
        navigate("/signin", {
          state: {
            from: location.state?.from, // Keeps track of /createevent
            successMessage: "Sign up successful! Please sign in.",
            //errorMessage: "User already exists. Please sign in.",
          },
        });
      } else if (response.status === 400) {
        setErrorMessage("Sign up failed. Please provide a valid email.");
      } else if (response.status === 409) {
        navigate("/signin", {
          state: {
            from: location.state?.from, // Keeps track of /createevent
            //setErrorMessage: "User already exists. Please sign in.",
            errorMessage: "User already exists. Please sign in.",
          },
        });
        //setErrorMessage(" Username already exists. Please Sign In");
      }
    } catch (error) {
      console.error("Error connecting to the server:", error);
      setErrorMessage("Sign up failed. Please try again.");
    }
  };

  if (showSignIn) {
    return (
      <SignIn setSuccessMessageFromSignUp="Sign up successful! Please sign in." />
    );
  }

  if (isUserExists) {
    return (
      <SignIn setUserExistMessage="User already exists. Please sign in." />
    );
  }

  return (
    // Centers the card layout perfectly on the light grey background screen
    <div className="flex min-h-screen items-center justify-center bg-base-200 p-4">
      {/* Forms a rounded card component matching your white design style */}
      <form
        onSubmit={handleSubmit}
        className="card w-full max-w-sm bg-base-100 shadow-xl p-4 space-y-4 rounded-lg"
      >
        {errorMessage && (
          <h5 className="text-red-500 font-bold text-sm text-center bg-red-50 border border-red-200 p-2 rounded-lg">
            {errorMessage}
          </h5>
        )}
        <h2 className="text-2xl font-bold text-center mb-2 pt-4">
          Create an Account
        </h2>

        {/* Email Field Container */}
        <div className="form-control w-full">
          <label htmlFor="email" className="label">
            <span className="label-text font-semibold">Email</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="input input-bordered w-full focus:input-primary"
          />
        </div>

        {/* Password Field Container */}
        <div className="form-control w-full">
          <label htmlFor="password" className="label">
            <span className="label-text font-semibold">Password</span>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
            required
            className="input input-bordered w-full focus:input-primary"
          />
        </div>

        {/* Submit Action using your customized red button styles */}
        <div className="form-control mt-6 flex justify-center mt-4">
          <button type="submit" className="btn btn-primary w-70 ">
            Sign Up
          </button>
        </div>

        {/* Links to Sign In using your custom .link utility settings */}
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/signin" className="link hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
