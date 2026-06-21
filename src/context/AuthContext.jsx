import { useEffect, useContext, useState } from "react";
import { createContext } from "react";
import { authService } from "../services/authService";
const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
    const initAuth = async () => {
      try {
        // Intentamos traer al usuario de Laravel silenciosamente al arrancar
        const userData = await authService.me();
        setUser(userData?.data || null); // Ajusta esto según la estructura de tu respuesta
      } catch (err) {
        // Si da 401, significa que no hay sesión. No pasa nada, se queda en null.
        setUser(null);
      } finally {
        // ESTO es lo que salva tu app del loading infinito:
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      await authService.login(credentials);
      const userData = await authService.me();
      setUser(userData.data);
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
      const userData = await authService.me();
      setUser(userData.data);
      return user;
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

  // Agrega esto dentro de tu AuthProvider


  const values = {
    user,
    loading,
    error,
    login,
    logout,
    register,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
