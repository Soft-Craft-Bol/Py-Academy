import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';


import { isTokenValid } from '../../features/auth/services/authFunctions';
import {
  getToken,
  getUser,
  saveToken,
  saveUser,
  signOut,
} from '../../features/auth/utils/authCookies';
import { loginUser } from '../../shared/api/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initializeAuth = () => {
      const token = getToken();
      const userData = getUser();

      console.log('Initial auth check - Token:', token, 'UserData:', userData);

      if (token && isTokenValid(token)) {
        setIsAuthenticated(true);
        setUser(userData); // Ahora userData es el objeto completo
      } else {
        signOut(); // Limpia cookies inválidas
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
  setIsLoading(true);
  try {
    const res = await loginUser(credentials);
    console.log('Login response:', res.data);

    const { jwt: token, username, photo } = res.data;

    const decoded = jwtDecode(token);
    const role = decoded.authorities?.replace('ROLE_', ''); // MAESTRO o ESTUDIANTE

    const userData = { username, photo, role };

    saveToken(token);
    saveUser(userData);

    setUser(userData);
    setIsAuthenticated(true);
    return true;
  } catch (error) {
    console.error('Login error:', error);
    signOut();
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
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
