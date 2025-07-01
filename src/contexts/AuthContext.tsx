import { createContext, useState, useEffect } from "react";
import { tokenManager } from "../utils/tokenManager";
import { getUserFromToken } from "../utils/jwtUtils";
import type { User } from "../types/User";

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (
    accessToken: string,
    refreshToken: string,
    rememberMe?: boolean
  ) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const hasTokens = tokenManager.hasValidTokens();
      setIsAuthenticated(hasTokens);

      if (hasTokens) {
        try {
          const userFromToken = getUserFromToken();
          if (userFromToken) {
            setUser(userFromToken);
          } else {
            logout();
          }
        } catch (error) {
          console.error("Failed to extract user from token:", error);
          logout();
        }
      }
    };

    checkAuth();
  }, []);

  const login = (
    accessToken: string,
    refreshToken: string,
    rememberMe: boolean = false
  ) => {
    tokenManager.setTokens(accessToken, refreshToken, rememberMe);
    setIsAuthenticated(true);

    const userFromToken = getUserFromToken();
    if (userFromToken) {
      setUser(userFromToken);
    }
  };

  const logout = () => {
    tokenManager.clearTokens();
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
