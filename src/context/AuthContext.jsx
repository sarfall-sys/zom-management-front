import { useEffect, useContext, useState } from "react";
import { createContext } from "react";
import { authService } from "../services/authService";
const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  const login = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      await authService.login(credentials);
      const user = await checkAuth();

      return user;
    } catch (err) {
      setError(err);
      throw err;
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

  const checkAuth = async () => {
    setLoading(true);
    setError(null);

    try {
      const user = await authService.me();
      setUser(user);
      return user;
    } catch (err) {
      setError(err);
      setUser(null);
      throw err;
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
