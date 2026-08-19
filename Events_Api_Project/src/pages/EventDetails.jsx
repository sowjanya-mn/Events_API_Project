import { useState, useEffect } from "react";
import { useParams } from "react-router";

const fallbackImages = [
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
];

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/events/${id}`,
        );
        if (!res.ok) throw new Error("Event not found");
        const data = await res.json();
        setEvent(data);
      } catch {
        setError("Event not found");
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

  const fallbackIndex = Number(event.id || 0) % fallbackImages.length;
  const imageSrc = event.image || fallbackImages[fallbackIndex];

  const formattedDate = event.date
    ? new Date(event.date).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Date TBD";

  return (
    <section className="p-4">
      <img
        src={imageSrc}
        alt={event.title || event.name || "Event"}
        className="mb-4 h-120 w-full object-cover"
        onError={(e) => {
          const nextIndex = (fallbackIndex + 1) % fallbackImages.length;
          e.currentTarget.src = fallbackImages[nextIndex];
        }}
      />
      <h1 className="text-2xl font-bold">{event.title || event.name}</h1>
      <p className="text-base-content/70">{formattedDate}</p>
      <p className="text-base-content/70">{event.location}</p>
      <p className="mt-4">{event.description}</p>
    </section>
  );
}
