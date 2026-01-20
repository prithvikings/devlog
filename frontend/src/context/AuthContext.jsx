import { createContext, useContext, useEffect, useState } from "react";
import api from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/auth/me")
      .then(({ data }) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = () => {
    // 1. Get the backend URL from environment variables
    // Use the same logic as your api.js or fallback to localhost for dev
    const backendUrl =
      import.meta.env.VITE_BACKEND_BASE || "http://localhost:8002";

    // 2. Redirect to the full URL
    window.location.href = `${backendUrl}/auth/github`;
  };

  const logout = async () => {
    try {
      await api.get("/auth/logout");
    } catch (error) {
      console.log("Logout request failed, but clearing client state anyway.");
    }

    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
