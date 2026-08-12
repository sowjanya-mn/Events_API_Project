// A wrapper AROUND the built-in fetch() function. Instead of calling
// fetch directly everywhere in the app, components call apiFetch —
// this way the Authorization header logic lives in exactly one place.
//
// "url" = the endpoint to call (e.g. "/api/events")
// "options = {}" = a default empty object, so calling apiFetch(url)
// with no second argument doesn't crash when we try to read options.headers
export default function apiFetch(url, options = {}) {
  // Read the token fresh from localStorage on every call — this matters
  // because the token can change between calls (user logs in, logs out,
  // token expires) — we don't want to cache a stale value
  const token = localStorage.getItem("token");

  // Build the final set of headers to send with the request
  const headers = {
    // Tells the server the request body is JSON, so it parses it correctly
    "Content-Type": "application/json",

    // Spread in any custom headers the CALLER passed in via options.headers
    // (e.g. if some future request needs a different header) — spreading
    // AFTER Content-Type means a caller could override it if truly needed
    ...options.headers,

    // Conditionally spread in the Authorization header — ONLY if a token
    // exists. This is the key trick: `token ? {...} : {}` evaluates to
    // either an object with Authorization, or an empty object.
    // Spreading an empty object adds nothing, so unauthenticated requests
    // (e.g. GET /api/events, which doesn't need a token) don't send a
    // broken "Authorization: Bearer null" header
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  // Call the real fetch(), passing through everything the caller gave us
  // (method, body, etc. via ...options) but with our headers object
  // instead of whatever headers they might have passed — this is why
  // options.headers is merged in above rather than just overwritten
  return fetch(url, { ...options, headers });
}