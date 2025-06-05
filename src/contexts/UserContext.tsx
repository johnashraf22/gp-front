// src/contexts/UserContext.tsx
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import api from "@/lib/api";

type UserType = "guest" | "user" | "seller" | "admin";

interface UserData {
  id: number;
  name: string;
  email: string;
  role: UserType;
  token: string;
}

type UserContextType = {
  isLoggedIn: boolean;
  userType: UserType;
  username: string;
  token: string | null;
  login: (userData: UserData) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userType, setUserType] = useState<UserType>("guest");
  const [username, setUsername] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        if (userData.token) {
          login(userData);
        }
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Update API client authorization header when token changes
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const login = (userData: UserData) => {
    setIsLoggedIn(true);
    setUserType(userData.role);
    setUsername(userData.name);
    setToken(userData.token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserType("guest");
    setUsername("");
    setToken(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, userType, username, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
