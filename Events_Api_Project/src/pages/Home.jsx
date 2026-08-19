import { useState, useEffect } from "react";
import EventCard from "../components/EventCard.jsx";
import { Link } from "react-router";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //fetch events and sort by date
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/events`);
        console.log("Response from API:", res);
        if (!res.ok) {
          console.error("Failed to fetch events:", res.status, res.statusText);
          setError("Couldn't load events. Try again later.");
          setLoading(false);
          return;
        }
        const data = await res.json();
        const items = Array.isArray(data?.results)
          ? data.results
          : Array.isArray(data)
            ? data
            : [];

        const sorted = [...items].sort(
          (a, b) => Date.parse(a.date) - Date.parse(b.date),
        );

        setEvents(sorted);
      } catch {
        setError("Couldn't load events. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  if (loading) {
    return <p className="p-4">Loading events...</p>;
  }

  if (error) {
    return <p className="p-4 text-error">{error}</p>;
  }

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Upcoming Events</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
