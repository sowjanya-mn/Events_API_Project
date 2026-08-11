import { useNavigate } from "react-router";

export default function EventCard({ event }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/events/${event.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="card bg-base-100 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="card-body">
        <h2 className="card-title">{event.name}</h2>
        <p className="text-sm text-base-content/70">{event.date}</p>
        <p className="text-sm text-base-content/70">{event.location}</p>
      </div>
    </div>
  );
}