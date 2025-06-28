import React, { createContext, useState, useEffect } from "react";
import { tokenManager } from "../utils/tokenManager";

export interface AuthContextType {
  isAuthenticated: boolean;
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

  useEffect(() => {
    const checkAuth = () => {
      const hasTokens = tokenManager.hasValidTokens();
      setIsAuthenticated(hasTokens);
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
  };

  const logout = () => {
    tokenManager.clearTokens();
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
