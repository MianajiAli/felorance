"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  mobile: number;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (mobile: number, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getAuthHeader: () => Promise<{ Authorization: string } | {}>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();

  // --------------------------
  // Helper to read cookie
  // --------------------------
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  };

  // --------------------------
  // Fetch /me
  // --------------------------
  const fetchUser = async (token?: string) => {
    if (!token) return setUser(null);
    try {
      const res = await fetch("http://localhost:8000/api/auth/me/", {
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });
      if (!res.ok) return setUser(null);
      const data: User = await res.json();
      setUser(data);
    } catch {
      setUser(null);
    }
  };

  // --------------------------
  // Refresh access token using refresh cookie
  // --------------------------
  const refreshAccessToken = async (): Promise<string | null> => {
    try {
      const refreshToken = getCookie("refresh_token");
      if (!refreshToken) throw new Error("No refresh token");

      const res = await fetch("http://localhost:8000/api/auth/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
        credentials: "include",
      });

      if (!res.ok) {
        setAccessToken(null);
        setUser(null);
        return null;
      }

      const data = await res.json();
      if (!data.access) throw new Error("No access token returned");

      setAccessToken(data.access);
      return data.access;
    } catch {
      setAccessToken(null);
      setUser(null);
      return null;
    }
  };

  // --------------------------
  // Helper for headers
  // --------------------------
  const getAuthHeader = async () => {
    if (!accessToken) {
      const token = await refreshAccessToken();
      if (!token) return {};
      return { Authorization: `Bearer ${token}` };
    }
    return { Authorization: `Bearer ${accessToken}` };
  };

  // --------------------------
  // Auto-login on mount
  // --------------------------
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const token = await refreshAccessToken();
      if (token) await fetchUser(token);
      setLoading(false);
    };
    init();
  }, []);

  // --------------------------
  // Login
  // --------------------------
  const login = async (mobile: number, password: string) => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, password }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Invalid credentials");

      const data = await res.json();
      setAccessToken(data.tokens?.access || data.access);
      await fetchUser(data.tokens?.access || data.access);
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  // --------------------------
  // Logout
  // --------------------------
  const logout = async () => {
    setLoading(true);
    try {
      await fetch("http://localhost:8000/api/auth/logout/", {
        method: "POST",
        credentials: "include",
      });
      setAccessToken(null);
      setUser(null);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, getAuthHeader }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
