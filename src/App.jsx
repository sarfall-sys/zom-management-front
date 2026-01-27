import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";
import { useThemeContext } from "./context/ThemeContext";
import { useAuthContext } from "./context/AuthContext";
import SidebarLayout from "./components/layouts/SidebarLayout";
import { Navigate } from "react-router-dom";

function App() {
  const { dark, setDark } = useThemeContext();
  const { user, logout } = useAuthContext();

  const handleLogout = async () => {
    // Logout logic can be added here
    try {
      await logout();
      <Navigate to="/" replace />;
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen max-w-screen bg-bg-light text-text-light dark:bg-bg-dark dark:text-text-dark">
      <header className="flex items-center justify-between p-4 border-b border-border-light dark:border-border-dark">
        <h1 className="text-2xl font-bold text-primary-light dark:text-primary-dark">
          Zom Management System
        </h1>

        <div className="flex gap-3 ml-auto">
          {user && (
            <button
              onClick={handleLogout}
              className="px-3 py-1 text-white transition bg-red-500 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          )}

          <button
            onClick={() => setDark(!dark)}
            className="px-3 py-1 text-white transition rounded-lg bg-primary-light dark:bg-primary-dark"
          >
            {dark ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </div>
      </header>

      <main className="flex gap-4 p-4">
        {user && <SidebarLayout />}

        <div className="flex-1 p-6 border bg-surface-light dark:bg-surface-dark border-border-light dark:border-border-dark rounded-xl">
          <AppRoutes />
        </div>
      </main>
    </div>
  );
}

export default App;
