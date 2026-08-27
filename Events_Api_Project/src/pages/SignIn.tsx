import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// export default function SignIn({
//   setSuccessMessageFromSignUp,
//   setIsSignedIn,
//   setUserExistMessage,
// }) {
export default function SignIn({ setIsSignedIn }) {
  const navigate = useNavigate();
  // const location = useLocation();
  // const signUpSuccessMessage = location.state?.successMessage || "";
  // const signUpErrorMessage = location.state?.errorMessage || "";
  const location = useLocation();
  const signUpSuccessMessage = location.state?.successMessage || "";
  const signUpErrorMessage = location.state?.errorMessage || "";

  // Grab the saved location route path, or default to home "/"
  const redirectPath = location.state?.from?.pathname || "/";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        if (token) {
          // 1. Save token into storage first
          localStorage.setItem("userToken", token);

          // 2. Turn on the global login state (Updates Navbar options instantly)
          if (setIsSignedIn) {
            setIsSignedIn(true);
          }

          // 3. Wait a tiny millisecond split-second for React state to cycle,
          // then execute the redirect path to break through the page lock!
          setTimeout(() => {
            navigate(redirectPath, { replace: true });
          }, 0);
        }
      } else {
        setErrorMessage("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Error connecting to the server:", error);
      setErrorMessage("Network error. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 p-4">
      <form
        onSubmit={handleSubmit}
        className="card w-full max-w-sm bg-base-100 shadow-xl p-4 space-y-4 rounded-lg"
      >
        {/* <h5 className="text-green-600">{setSuccessMessageFromSignUp}</h5>
        <h5 className="text-red-600">{setUserExistMessage}</h5> */}
        {/* {signUpSuccessMessage && !errorMessage && (
          <h5 className="text-green-600 font-bold text-sm text-center bg-green-50 border border-green-200 p-2 rounded-lg">
            {signUpSuccessMessage}
          </h5>
        )}

        {signUpErrorMessage && !errorMessage && (
          <h5 className="text-red-500 font-bold text-sm text-center bg-red-50 border border-red-200 p-2 rounded-lg">
            {signUpErrorMessage}
          </h5>
        )} */}

        {signUpSuccessMessage && (
          <h5 className="text-green-600">{signUpSuccessMessage}</h5>
        )}
        {signUpErrorMessage && (
          <h5 className="text-red-600">{signUpErrorMessage}</h5>
        )}

        <h5 className="text-red-500">{errorMessage}</h5>
        <h2 className="text-2xl font-bold text-center mb-2">
          Sign In to continue
        </h2>

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

        <div className="form-control mt-6 flex justify-center mt-4">
          <button type="submit" className="btn btn-primary w-70">
            Sign In
          </button>
        </div>

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
