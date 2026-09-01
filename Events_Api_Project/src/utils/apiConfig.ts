export const DEFAULT_API_BASE_URL = "https://events-api-tbzb.onrender.com";

export function resolveApiBaseUrl(env = typeof import.meta !== "undefined" ? import.meta.env : {}) {
  const rawBaseUrl = env.VITE_API_URL || DEFAULT_API_BASE_URL;
  return String(rawBaseUrl).replace(/\/+$/, "");
}

export function buildApiUrl(path = "/") {
  const safePath = String(path).startsWith("/") ? path : `/${path}`;
  return `${resolveApiBaseUrl()}${safePath}`;
}
