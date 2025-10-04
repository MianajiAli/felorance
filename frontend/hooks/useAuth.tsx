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
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
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

  // Fetch /me using access token
  const fetchUser = async (token?: string) => {
    if (!token) return setUser(null);
    try {
      const res = await fetch("http://localhost:8000/api/accounts/me/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return setUser(null);
      const data: User = await res.json();
      setUser(data);
    } catch {
      setUser(null);
    }
  };

  // Refresh access token using refresh cookie
  const refreshAccessToken = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/token/refresh/", {
        method: "POST",
        credentials: "include", // httpOnly refresh cookie
      });
      if (!res.ok) throw new Error("Refresh failed");
      const data = await res.json();
      setAccessToken(data.access);
      return data.access;
    } catch {
      setAccessToken(null);
      setUser(null);
      return null;
    }
  };

  // Auto-login on mount
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const token = await refreshAccessToken();
      if (token) await fetchUser(token);
      setLoading(false);
    };
    init();
  }, []);

  // Login
  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/accounts/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include", // refresh token stored in httpOnly cookie
      });
      if (!res.ok) throw new Error("Invalid credentials");
      const data = await res.json();
      setAccessToken(data.access);
      await fetchUser(data.access);
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    try {
      await fetch("http://localhost:8000/api/accounts/logout/", {
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
    <AuthContext.Provider value={{ user, loading, login, logout }}>
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
