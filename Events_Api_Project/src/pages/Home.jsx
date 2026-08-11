import { useState, useEffect } from "react";
import EventCard from "../components/EventCard.jsx";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch events");
        return res.json();
      })
      .then((data) => {
        const sorted = [...data].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setEvents(sorted);
      })
      .catch(() => {
        setError("Couldn't load events. Try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="p-4">Loading events...</p>;
  }

  if (error) {
    return <p className="p-4 text-error">{error}</p>;
  }

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}