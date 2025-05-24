import React, { createContext, useContext, useEffect, useState } from "react";
import { getToken, saveToken, saveUser, getUser, signOut } from "../../features/auth/utils/authCookies";
import { isTokenValid } from "../../features/auth/services/authFunctions";
import { loginUser } from "../../shared/api/api";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initializeAuth = () => {
      const token = getToken();
      const userData = getUser();

      if (token && isTokenValid(token)) {
        setIsAuthenticated(true);
        setUser(userData);
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const { token, user } = await loginUser(credentials);
      console.log("Login successful:", token, user);
      saveToken(token);
      saveUser(user);
      setUser(user);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    signOut();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      loading, 
      isLoading,
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};