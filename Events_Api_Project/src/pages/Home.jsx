import { useState, useEffect } from "react";
import { Link } from "react-router";
import EventCard from "../components/EventCard.jsx";
import { mockEvents, sortEventsByDate } from "../data/mockEvents.js";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await fetch("/api/events");
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        setEvents(sortEventsByDate(data));
      } catch {
        setEvents(sortEventsByDate(mockEvents));
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
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Upcoming Events</h1>
          <p className="text-sm text-gray-600">Host or attendee? Create a new event anytime.</p>
        </div>
        <Link to="/createevent" className="btn btn-primary">
          Create Event
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}