export const mockEvents = [
  {
    id: 1,
    name: 'Summer Music Festival',
    description: 'An outdoor festival with live bands, food trucks, and evening fireworks.',
    date: '2026-08-15',
    time: '18:00',
    location: 'Riverside Park',
  },
  {
    id: 2,
    name: 'City Food Fair',
    description: 'Sample local dishes and desserts from restaurants across the city.',
    date: '2026-08-22',
    time: '12:00',
    location: 'Downtown Square',
  },
  {
    id: 3,
    name: 'Tech Startup Meetup',
    description: 'Network with founders and developers, hear lightning talks, and connect with investors.',
    date: '2026-09-03',
    time: '17:30',
    location: 'Innovation Hub',
  },
];

export function sortEventsByDate(events) {
  return [...events].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
}

export function getEventById(id) {
  return mockEvents.find((event) => Number(event.id) === Number(id)) ?? null;
}
