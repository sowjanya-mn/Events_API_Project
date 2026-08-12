// A custom hook — by convention, any function starting with "use" that
// can call other hooks (or, like here, just centralizes some logic) is
// treated as a hook. This one's job: read the token and expose a clean
// way to check "is this user logged in?"
export default function useAuth() {
  // Read the token directly from the browser's localStorage.
  // This runs every time a component calls useAuth() — so if the token
  // changes and the component re-renders, this picks up the fresh value
  const token = localStorage.getItem("token");

  // A small function that turns the raw token value into a clean
  // true/false answer, instead of making every component that uses
  // this hook write its own "token !== null" check
  const isAuthenticated = () => {
    // localStorage.getItem returns the stored string if it exists,
    // or `null` if the key was never set. Checking for `undefined` too
    // is a bit of extra safety, though getItem never actually returns
    // undefined — only null — so that second check doesn't really do
    // anything extra here, just harmless redundancy
    return token !== null && token !== undefined;
  };

  // Return an object with both pieces, so components can destructure
  // just what they need:
  //   const { token } = useAuth()             -> just the raw value
  //   const { isAuthenticated } = useAuth()    -> just the check function
  //   const { token, isAuthenticated } = useAuth() -> both
  return { token, isAuthenticated };
}