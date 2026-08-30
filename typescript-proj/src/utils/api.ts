// A wrapper AROUND the built-in fetch() function. Instead of calling
// fetch directly everywhere in the app, components call apiFetch —
// this way the Authorization header logic lives in exactly one place.
//
// "url" = the endpoint to call (e.g. "/api/events")
// "options" = typed using standard global RequestInit to safely match built-in fetch configurations

// TS CHANGE 1: Used standard RequestInit type for options, making it optional by defaulting to an empty object
export default function apiFetch(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  // Read the token fresh from localStorage on every call — this matters
  // because the token can change between calls (user logs in, logs out,
  // token expires) — we don't want to cache a stale value
  const token = localStorage.getItem("userToken");

  // Build the final set of headers to send with the request
  // TS CHANGE 2: Typed headers as a Record of string keys and string values to allow dynamic merging
  const headers: Record<string, string> = {
    // Tells the server the request body is JSON, so it parses it correctly
    "Content-Type": "application/json",

    // Spread in any custom headers the CALLER passed in via options.headers
    // TS CHANGE 3: Safely cast headers to a Record so TypeScript knows it can be spread cleanly
    ...(options.headers as Record<string, string>),

    // Conditionally spread in the Authorization header — ONLY if a token
    // exists. This is the key trick: `token ? {...} : {}` evaluates to
    // either an object with Authorization, or an empty object.
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  // Call the real fetch(), passing through everything the caller gave us
  // (method, body, etc. via ...options) but with our headers object
  // TS CHANGE 4: Explicitly returns the built-in fetch Promise type
  return fetch(url, { ...options, headers });
}
