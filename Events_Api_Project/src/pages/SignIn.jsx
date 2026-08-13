import { useState } from "react";
import { Link } from "react-router-dom";
import Home from "./Home";
export default function SignIn({ setSuccessMessageFromSignUp }) {
  // 1. Create state to hold the input values
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
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
    e.preventDefault();

    try {
      // Send the POST request to your API
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("Response from server:", response);
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        if (token) {
          localStorage.setItem("token", token);
          alert("Sign in successful!");
        } else {
          console.error(
            "The server responded successfully, but no token was found in the data.",
          );
        }
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Error connecting to the server:", error);
    }
  };
  if (isSuccess) {
    return <Home />;
  }
  return (
    // Centers the card layout perfectly on the light grey background screen
    <div className="flex min-h-screen items-center justify-center bg-base-200 p-4">
      {/* Forms a rounded card component matching your white design style */}
      <form
        onSubmit={handleSubmit}
        className="card w-full max-w-sm bg-base-100 shadow-xl p-8 space-y-4"
      >
        <h5 className="text-green-600">{setSuccessMessageFromSignUp}</h5>

        <h2 className="text-2xl font-bold text-center mb-2">
          Sign In to continue
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
            placeholder="*****"
            value={formData.password}
            onChange={handleChange}
            required
            className="input input-bordered w-full focus:input-primary"
          />
        </div>

        {/* Submit Action using your customized red button styles */}
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary w-full">
            Sign In
          </button>
        </div>

        {/* Links to Sign In using your custom .link utility settings */}
        <p className="text-sm text-center mt-4">
          No account yet?{" "}
          <Link to="/signup" className="link hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
