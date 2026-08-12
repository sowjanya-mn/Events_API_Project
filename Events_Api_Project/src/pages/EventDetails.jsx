// useState = stores values that change and trigger re-renders (the event
// data, loading flag, and error message)
// useEffect = runs side effects (like fetching data) AFTER the component
// renders, and can re-run when its dependencies change
import { useState, useEffect } from "react";

// useParams reads dynamic segments from the URL — since the route is
// defined as "/events/:id" in App.jsx, this gives us access to that :id
import { useParams } from "react-router";

// A fallback data source — presumably a local array of fake events used
// for development/testing when the real API isn't reachable
import { getEventById } from "../data/mockEvents.js";

export default function EventDetails() {
  // Destructure "id" out of the URL params object.
  // Visiting /events/42 makes id === "42" here
  const { id } = useParams();

  // Will hold the fetched event object once loaded (starts as null)
  const [event, setEvent] = useState(null);

  // True while we're waiting on the fetch; starts true since we fetch
  // immediately on mount
  const [loading, setLoading] = useState(true);

  // Holds an error message string, or null if there's no error
  const [error, setError] = useState(null);

  // useEffect's first argument is the function to run; the array at the
  // end ([id]) is the dependency list — this effect re-runs whenever
  // "id" changes (e.g. user navigates from /events/1 to /events/2
  // without leaving the component)
  useEffect(() => {
    // Defined as a separate async function INSIDE the effect, because
    // useEffect itself isn't allowed to be async directly — this is the
    // standard workaround
    const loadEvent = async () => {
      try {
        // Try the real API first
        const res = await fetch(`/api/events/${id}`);

        // If the server responds with a non-2xx status, manually throw
        // so it's caught below — fetch does NOT throw automatically on
        // 404/500 the way it does on network failure
        if (!res.ok) throw new Error("Event not found");

        // Parse the JSON response body into a JS object
        const data = await res.json();
        setEvent(data);
      } catch {
        // Runs if the fetch failed OR the res.ok check above threw —
        // both real network errors AND "not found" responses land here.
        // Fall back to local mock data instead of giving up entirely
        const fallbackEvent = getEventById(id);

        if (fallbackEvent) {
          // Found a matching mock event — use it so the page still works
          setEvent(fallbackEvent);
        } else {
          // Neither the API nor the mock data has this id — genuinely
          // show an error to the user
          setError("Event not found");
        }
      } finally {
        // Runs after either the try or catch block finishes —
        // stop showing the loading state either way
        setLoading(false);
      }
    };

    // Actually call the function we just defined — declaring it above
    // doesn't run it on its own
    loadEvent();
  }, [id]);

  // Early return: while loading, show only this message and skip
  // rendering the rest of the component
  if (loading) {
    return <p className="p-4">Loading event...</p>;
  }

  // Early return: if there was an error, show only the error message
  if (error) {
    return <p className="p-4 text-error">{error}</p>;
  }

  // If we reach here, loading is false AND error is null, so "event"
  // is guaranteed to be populated — safe to render its fields
  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold">{event.name}</h1>
      <p className="text-base-content/70">{event.date}</p>
      <p className="text-base-content/70">{event.location}</p>
      <p className="mt-4">{event.description}</p>
    </section>
  );
}