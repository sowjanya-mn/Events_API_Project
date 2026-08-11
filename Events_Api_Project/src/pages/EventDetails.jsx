import { useState, useEffect } from "react";
import { useParams } from "react-router";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/events/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Event not found");
        return res.json();
      })
      .then((data) => setEvent(data))
      .catch(() => setError("Event not found"))
      .finally(() => setLoading(false));
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