// Import the navigation hook from React Router — lets us change the URL
// programmatically (i.e. without the user clicking an <a> tag)
import { useNavigate } from "react-router";

// EventCard receives one "event" object as a prop (destructured directly
// in the function signature) — this component renders ONE card
export default function EventCard({ event }) {
  // Call the hook once when the component renders; "navigate" is now
  // a function we can call later to change routes
  const navigate = useNavigate();

  // This function runs when the card is clicked.
  // Template literal builds a URL like "/events/42" using the event's id
  const handleClick = () => {
    navigate(`/events/${event.id}`);
  };

  return (
    // The whole card is one div. onClick attaches our handler above,
    // so clicking ANYWHERE on this div triggers navigation.
    <div
      onClick={handleClick}
      // Tailwind/DaisyUI classes:
      // "card" + "bg-base-100" + "shadow-md" = DaisyUI's card styling
      // "cursor-pointer" = mouse turns into a hand icon on hover,
      //   signaling "this is clickable" since it's a div, not a link
      // "hover:shadow-lg transition-shadow" = shadow grows smoothly on hover
      className="card bg-base-100 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
    >
      {/* DaisyUI's inner wrapper that adds consistent padding inside the card */}
      <div className="card-body">
        {/* Event name, styled as the card's title */}
        <h2 className="card-title">{event.name}</h2>

        {/* Event date — smaller, muted gray text (70% opacity of base text color) */}
        <p className="text-sm text-base-content/70">{event.date}</p>

        {/* Event location — same small/muted styling as the date above */}
        <p className="text-sm text-base-content/70">{event.location}</p>
      </div>
    </div>
  );
}