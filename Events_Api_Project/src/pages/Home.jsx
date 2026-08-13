import { useState, useEffect } from "react";
import { Link } from "react-router";


export default function Home() {
  const [events, setEvents] = useState([]);

  //fetch events and sort by date
  useEffect(() => {
    fetch("http://localhost:3001/api/events")
      .then((response) => response.json())
      .then((data) => {
        const sortedEvents = data.results.sort(
          (a, b) => Date(a.date) - Date(b.date)
        );
        setEvents(sortedEvents);
      });
  }, []);

  return (
  <div className="pt-24">
    <h1 className="text-4xl">Upcoming Events</h1>

    {/*responsive grid of event cards*/}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {events.map((event) => (

        //link the card to the event detail page
        <Link
          key={event.id}
          to={`/events/${event.id}`}
          className="card bg-base-100 gap-2 pt-4 pb-4 no-underline text-neutral"
        >
        <img
          src={`https://picsum.photos/seed/${event.id}/800/600`}
          alt={event.title}
          className="w-full aspect-auto object-cover mb-2"
        />
        <p className="text-neutral-400">{new Date(event.date).toLocaleDateString()}</p>
        <p className="font-medium">{event.location}</p>
        <h1 className="text-3xl hover:text-primary transition">{event.title}</h1>
    </Link>
  ))}
  </div>
  </div>
  );
}