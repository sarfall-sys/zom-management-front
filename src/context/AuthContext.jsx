import { useEffect, useContext, useState } from "react";
import { createContext } from "react";
import { authService } from "../services/authService";
const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get CSRF cookie
  const login = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      await authService.login(credentials);
      await checkAuth();
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.me();
      setUser(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        setUser(null); // not logged in → normal
        return null;
      }
      throw err; // real error
    } finally {
      setLoading(false);
    }
  };

  const register = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await authService.register(data);
      await checkAuth();
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      await authService.logout();
      setUser(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const values = {
    user,
    loading,
    error,
    login,
    logout,
    checkAuth,
    register,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
