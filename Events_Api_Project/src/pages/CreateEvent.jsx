import { useState } from "react";
import { useNavigate } from "react-router";
import apiFetch from "../utils/api.js";

export default function CreateEvent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: "",
    description: "",
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
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto flex flex-col gap-3">
      <h1 className="text-2xl font-bold">Create Event</h1>

      <input
        name="name"
        placeholder="Event name"
        value={formData.name}
        onChange={handleChange}
        required
        className="input input-bordered w-full"
      />
      <input
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        required
        className="input input-bordered w-full"
      />
      <input
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        required
        className="input input-bordered w-full"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="textarea textarea-bordered w-full"
      />

      {error && <p className="text-error text-sm">{error}</p>}

      <button type="submit" disabled={submitting} className="btn btn-primary">
        {submitting ? "Creating..." : "Create Event"}
      </button>
    </form>
  );
}