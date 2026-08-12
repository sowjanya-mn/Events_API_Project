import { useState, useEffect } from "react";
import { useParams } from "react-router";

const fallbackEvents = [
  {
    id: 1,
    name: "Summer Music Festival",
    description: "An outdoor festival with live bands, food trucks, and evening fireworks.",
    date: "2026-08-15",
    time: "18:00",
    location: "Riverside Park",
  },
  {
    id: 2,
    name: "City Food Fair",
    description: "Sample local dishes and desserts from restaurants across the city.",
    date: "2026-08-22",
    time: "12:00",
    location: "Downtown Square",
  },
  {
    id: 3,
    name: "Tech Startup Meetup",
    description: "Network with founders and developers, hear lightning talks, and connect with investors.",
    date: "2026-09-03",
    time: "17:30",
    location: "Innovation Hub",
  },
];

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const res = await fetch(`/api/events/${id}`);
        if (!res.ok) throw new Error("Event not found");
        const data = await res.json();
        setEvent(data);
      } catch {
        const fallbackEvent = fallbackEvents.find(
          (item) => String(item.id) === String(id)
        );

        if (fallbackEvent) {
          setEvent(fallbackEvent);
        } else {
          setError("Event not found");
        }
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id]);

  if (loading) {
    return <p className="p-4">Loading event...</p>;
  }

  if (error) {
    return <p className="p-4 text-error">{error}</p>;
  }

  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold">{event.name}</h1>
      <p className="text-base-content/70">{event.date}</p>
      <p className="text-base-content/70">{event.location}</p>
      <p className="mt-4">{event.description}</p>
    </section>
  );
}
