// Import the navigation hook from React Router — lets us change the URL
// programmatically (i.e. without the user clicking an <a> tag)
import { useNavigate } from "react-router";

// EventCard receives one "event" object as a prop (destructured directly
// in the function signature) — this component renders ONE card
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

export default function EventCard({ event }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/events/${event.id}`);
  };

  const formattedDate = event.date
    ? new Date(event.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Date TBD";

  const fallbackIndex = Number(event.id || 0) % fallbackImages.length;
  const imageSrc = event.image || fallbackImages[fallbackIndex];

  return (
    <div
      onClick={handleClick}
      className="card bg-base-100 shadow-md cursor-pointer hover:shadow-lg transition-shadow overflow-hidden"
    >
      <figure className="h-48 overflow-hidden bg-base-200">
        <img
          src={imageSrc}
          alt={event.title || event.name || "Event"}
          className="h-full w-full object-cover"
          onError={(e) => {
            const nextIndex = (fallbackIndex + 1) % fallbackImages.length;
            e.currentTarget.src = fallbackImages[nextIndex];
          }}
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{event.title || event.name}</h2>
        <p className="text-sm text-base-content/70">{formattedDate}</p>
        <p className="text-sm text-base-content/70">{event.location}</p>
      </div>
    </div>
  );
}