export interface UseAuthReturn {
  token: string | null;
  isAuthenticated: () => boolean;
}

export default function useAuth(): UseAuthReturn {
  const token = localStorage.getItem("userToken");

  const isAuthenticated = (): boolean => {
    return token !== null && token !== undefined;
  };

  return { token, isAuthenticated };
}