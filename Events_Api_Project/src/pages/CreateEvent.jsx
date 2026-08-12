// useState = React hook for storing values that change over time and
// trigger a re-render when updated (form fields, loading state, errors, etc.)
import { useState } from "react";

// Hook to change routes programmatically (used to send the user back
// to Home after a successful submission)
import { useNavigate } from "react-router";

// Our custom fetch wrapper — automatically attaches the Authorization
// header with the token, so we don't have to do it manually here
import apiFetch from "../utils/api.js";

export default function CreateEvent() {
  // Grab the navigate function so we can redirect after submit
  const navigate = useNavigate();

  // formData holds all 4 form fields in ONE object instead of 4 separate
  // useState calls — this is a common pattern for forms with several inputs.
  // setFormData is the function we call to update it.
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
  });

  // Holds an error message string (or null if there's no error).
  // When this is non-null, we show it to the user below the form.
  const [error, setError] = useState(null);

  // Tracks whether a submit request is currently in flight, so we can
  // disable the button and show "Creating..." instead of letting the
  // user click Submit multiple times
  const [submitting, setSubmitting] = useState(false);

  // Runs on every keystroke in ANY input, because we attached this same
  // handler to all 4 fields (see onChange props below)
  const handleChange = (e) => {
    // e.target.name = which input fired this (e.g. "name", "date")
    // e.target.value = what the user typed
    // Spread the old formData (...formData) to keep the other 3 fields
    // untouched, then overwrite just the one field that changed using
    // computed property syntax [e.target.name]
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Runs when the form is submitted (button click or pressing Enter
  // in a text field). Marked "async" because it awaits a network request.
  const handleSubmit = async (e) => {
    // Stops the browser's default form behavior, which would normally
    // reload the whole page on submit — we want to handle it with JS instead
    e.preventDefault();

    // Show the "submitting" state and clear any old error before retrying
    setSubmitting(true);
    setError(null);

    // try/catch/finally: try the request, catch any network failure,
    // and finally always runs regardless of success or failure
    try {
      // The API expects the event title to be sent as `title`, not `name`.
      // Keep the form field as `name` for the UI but transform it before POST.
      const payload = {
        ...formData,
        title: formData.name,
      };
      delete payload.name;

      const res = await apiFetch("/api/events", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      // 401 = "not authenticated at all", 403 = "authenticated but not
      // allowed" — both mean the token is missing/invalid/expired
      if (res.status === 401 || res.status === 403) {
        setError("Session expired. Please sign in again.");
        return; // stop here, skip the rest of the function
      }

      // res.ok is true only for 2xx status codes. Anything else that
      // isn't already handled above (400, 500, etc.) falls here
      if (!res.ok) {
        setError("Couldn't create event. Try again.");
        return;
      }

      // If we reach this line, the request succeeded (2xx) —
      // send the user back to the Home page to see their new event
      navigate("/");
    } catch {
      // This runs if the fetch itself failed to complete — e.g. the
      // backend server is down, or the user's wifi dropped —
      // as opposed to the server responding with an error status
      setError("Network error. Check your connection and try again.");
    } finally {
      // Runs no matter what happened above (success, handled error,
      // or network failure) — always re-enable the submit button
      setSubmitting(false);
    }
  };

  return (
    // Outer wrapper: constrains form width and centers it horizontally,
    // with padding on the sides (px) and top/bottom (py)
    <div className="max-w-md mx-auto px-4 py-12">
      {/* Page heading — large, bold, centered */}
      <h1 className="text-4xl font-extrabold text-center mb-10">
        Create an Event
      </h1>

      {/* The form itself. onSubmit fires handleSubmit when submitted.
          flex-col + gap-5 stacks the fields vertically with even spacing */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        {/* --- Event name field --- */}
        <div>
          {/* htmlFor="name" links this label to the input with id="name" —
              clicking the label text focuses the input (accessibility) */}
          <label htmlFor="name" className="block font-semibold mb-1">
            Event name
          </label>
          <input
            id="name"
            name="name" // must match the key in formData/handleChange
            type="text"
            value={formData.name} // "controlled input" — React owns the value
            onChange={handleChange} // updates formData on every keystroke
            required // browser blocks submit if this is empty
            className="w-full bg-gray-100 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* --- Description field (multi-line, so textarea not input) --- */}
        <div>
          <label htmlFor="description" className="block font-semibold mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4} // sets the visible height to 4 lines of text
            className="w-full bg-gray-100 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black resize-none"
            // resize-none = user can't drag-resize the textarea corner
          />
        </div>

        {/* --- Date field — type="date" gives a native calendar picker --- */}
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

        {/* --- Location field --- */}
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

        {/* Only renders this <p> at all if error is truthy (not null).
            This is the "&&" short-circuit pattern: if error is null,
            React renders nothing; if it's a string, React renders the <p> */}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          // Greys out and blocks clicks while a request is already in flight
          disabled={submitting}
          className="w-full bg-black text-white font-bold rounded-md py-3 mt-2 hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {/* Ternary: show "Creating..." while submitting, "Create" otherwise */}
          {submitting ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}