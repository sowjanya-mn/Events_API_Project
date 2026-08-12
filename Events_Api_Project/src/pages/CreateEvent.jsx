import { useState } from "react";
import { useNavigate } from "react-router";
import apiFetch from "../utils/api.js";

export default function CreateEvent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
  });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await apiFetch("/api/events", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (res.status === 401 || res.status === 403) {
        setError("Session expired. Please sign in again.");
        return;
      }

      if (!res.ok) {
        setError("Couldn't create event. Try again.");
        return;
      }

      navigate("/");
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-center mb-10">
        Create an Event
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label htmlFor="name" className="block font-semibold mb-1">
            Event name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-gray-100 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-semibold mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full bg-gray-100 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black resize-none"
          />
        </div>

        <div>
          <label htmlFor="date" className="block font-semibold mb-1">
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full bg-gray-100 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label htmlFor="location" className="block font-semibold mb-1">
            Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full bg-gray-100 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-black text-white font-bold rounded-md py-3 mt-2 hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {submitting ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}