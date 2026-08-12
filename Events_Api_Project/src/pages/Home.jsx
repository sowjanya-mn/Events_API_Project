// useState = stores values that change over time and trigger a re-render
// useEffect = runs side effects (like fetching data) after render
import { useState, useEffect } from "react";

// Link = React Router's version of <a>, navigates without a full page
// reload (unlike a plain <a href="...">)
import { Link } from "react-router";

// Our reusable card component — one per event, handles its own click-to-navigate
import EventCard from "../components/EventCard.jsx";

// mockEvents = a local array of fake event objects, used as a fallback
// sortEventsByDate = a helper function that sorts an array of events
// chronologically (presumably by their date field)
import { mockEvents, sortEventsByDate } from "../data/mockEvents.js";

export default function Home() {
  // Will hold the array of events once loaded — starts empty
  const [events, setEvents] = useState([]);

  // True while the fetch is in progress — starts true since we fetch
  // immediately when the component first renders
  const [loading, setLoading] = useState(true);

  // Holds an error message string, or null if nothing went wrong.
  // Note: nothing in this file ever calls setError — see the note below
  const [error, setError] = useState(null);

  // Empty dependency array [] means this effect runs exactly ONCE,
  // right after the component's first render — the standard pattern
  // for "fetch data when this page loads"
  useEffect(() => {
    // Declared inside the effect since useEffect can't take an async
    // function directly
    const loadEvents = async () => {
      try {
        // Try the real backend first
        const res = await fetch("/api/events");

        // fetch() doesn't throw on 404/500 by itself, so we check
        // res.ok manually and throw if the response wasn't 2xx
        if (!res.ok) throw new Error("Failed to fetch events");

        // Parse the JSON body into a JS array of event objects
        const data = await res.json();

        // Sort the real data chronologically before storing it in state
        setEvents(sortEventsByDate(data));
      } catch {
        // If the fetch failed for ANY reason (server down, bad response,
        // network error), silently fall back to the local mock data —
        // still sorted the same way, so the UI behaves consistently
        setEvents(sortEventsByDate(mockEvents));
      } finally {
        // Whether it succeeded or fell back to mock data, we're done
        // loading either way
        setLoading(false);
      }
    };

    // Actually run the function defined above
    loadEvents();
  }, []); // <- empty array = run once on mount only

  // While the fetch (or fallback) is still in progress, show only this
  if (loading) {
    return <p className="p-4">Loading events...</p>;
  }

  // Dead code: error is never set anywhere above, so this condition
  // never actually triggers (see note below)
  if (error) {
    return <p className="p-4 text-error">{error}</p>;
  }

  // Main render: header row + responsive grid of event cards
  return (
    <div className="p-4">
      {/* Header row: title+subtitle on the left, "Create Event" button
          on the right. Stacks vertically on small screens (flex-col),
          becomes a horizontal row on larger screens (sm:flex-row) */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Upcoming Events</h1>
          <p className="text-sm text-gray-600">
            Host or attendee? Create a new event anytime.
          </p>
        </div>

        {/* Link instead of useNavigate here — this is just "go to this
            route" with no logic needed first, so Link is simpler */}
        <Link to="/createevent" className="btn btn-primary">
          Create Event
        </Link>
      </div>

      {/* Responsive grid: 1 column on mobile, 2 on small screens,
          3 on large screens, with consistent gaps between cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* .map() loops over the events array and renders one EventCard
            per event. "key" is required by React for list items — it
            uses event.id so React can track each card individually
            across re-renders */}
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}