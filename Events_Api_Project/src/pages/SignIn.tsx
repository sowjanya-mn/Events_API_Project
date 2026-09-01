import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import type { AuthResponse, SignInFormData } from "../types/index";
import { buildApiUrl } from "../utils/apiConfig.js";

interface SignInProps {
  setIsSignedIn?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SignIn({ setIsSignedIn }: SignInProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const signUpSuccessMessage =
    (location.state as { successMessage?: string } | null)?.successMessage ?? "";
  const signUpErrorMessage =
    (location.state as { errorMessage?: string } | null)?.errorMessage ?? "";
  const redirectPath =
    (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || "/";

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
      const response = await fetch(buildApiUrl("/api/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = (await response.json()) as AuthResponse;
        const token = data.token;

        if (token) {
          localStorage.setItem("userToken", token);

          if (setIsSignedIn) {
            setIsSignedIn(true);
          }

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
          No account yet? <Link to="/signup" className="link hover:underline">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}
