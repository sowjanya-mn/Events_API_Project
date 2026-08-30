import { Link } from "react-router";

export default function NotFound() {
  return (
    <div>
      <div className="hero-content text-center">
        <div>
          <h1 className="text-6xl font-bold">404</h1>
          <p className="py-6">This page does not exist</p>
          <Link to="/" className="btn btn-primary">
            Go Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
