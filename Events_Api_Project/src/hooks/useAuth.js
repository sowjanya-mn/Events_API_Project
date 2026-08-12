export default function useAuth() {
  const token = localStorage.getItem("token");

  const isAuthenticated = () => {
    return token !== null && token !== undefined;
  };

  return { token, isAuthenticated };
}