import { useState, useEffect } from "react";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        console.log("API response:", data);  // ← check console to see the shape
        setEvents(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Events</h1>
      {events.map((event) => (
        <div key={event.id}>
          <h2>{event.title}</h2>
          <p>{event.date}</p>
          <p>{event.location}</p>
        </div>
      ))}
    </div>
  );
}


//   return (
//     <div>
//         <video
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="absolute inset-0 w-full h-full object-cover"
//       >
//         <source src="https://www.pexels.com/video/man-and-woman-dancing-10273486/" type="video/mp4" />
//       </video>
//       <h1 className="text-6xl text-white leading-tight">
//         <span className="font-normal">There's</span>
//         <br />
//         <span className="font-bold">✳ ALWAYS ✳</span>
//         <br />
//         <span className="font-normal italic">something</span>
//         <br />
//         <span className="font-bold">happening</span>
//       </h1>
//     </div>
//   );
// }
