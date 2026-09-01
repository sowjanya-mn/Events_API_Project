import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { buildApiUrl } from "../utils/apiConfig.js";
import type { SignInFormData } from "../types/index";

export default function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((current) => ({
      ...current,
      [name as keyof SignInFormData]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch(buildApiUrl("/api/users"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/signin", {
          state: {
            from: (location.state as { from?: { pathname?: string } } | null)?.from,
            successMessage: "Sign up successful! Please sign in.",
          },
        });
      } else if (response.status === 400) {
        setErrorMessage("Sign up failed. Please provide a valid email.");
      } else if (response.status === 409) {
        navigate("/signin", {
          state: {
            from: (location.state as { from?: { pathname?: string } } | null)?.from,
            errorMessage: "User already exists. Please sign in.",
          },
        });
      }
    } catch (error) {
      console.error("Error connecting to the server:", error);
      setErrorMessage("Sign up failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 p-4">
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
          <button type="submit" className="btn btn-primary w-70 ">
            Sign Up
          </button>
        </div>

        <p className="text-sm text-center mt-4">
          Already have an account? <Link to="/signin" className="link hover:underline">Sign In</Link>
        </p>
      </form>
    </div>
  );
}
