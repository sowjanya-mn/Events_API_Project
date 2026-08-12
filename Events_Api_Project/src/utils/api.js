export default function apiFetch(url, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  return fetch(url, { ...options, headers });
}