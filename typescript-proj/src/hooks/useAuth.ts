// A custom hook — by convention, any function starting with "use" that
// can call other hooks (or, like here, just centralizes some logic) is
// treated as a hook. This one's job: read the token and expose a clean
// way to check "is this user logged in?"

// TS CHANGE 1: Defined a custom type structure explaining exactly what this hook returns
type AuthHookResult = {
  token: string | null;
  isAuthenticated: () => boolean;
};

export default function useAuth(): AuthHookResult {
  // Read the token directly from the browser's localStorage.
  const token = localStorage.getItem("token");

  // A small function that turns the raw token value into a clean
  // true/false answer
  // TS CHANGE 2: Explicitly declared that this helper function always returns a clean boolean
  const isAuthenticated = (): boolean => {
    // Both checks are safely handled as boolean outcomes
    return token !== null && token !== undefined;
  };

  // Return an object with both pieces, matching our AuthHookResult type signature precisely
  return { token, isAuthenticated };
}
