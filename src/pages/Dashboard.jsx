import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
function Dashboard() {
  const { user, logout } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
      <Navigate to="/login" replace />;
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark">
      <h1 className="mb-4 text-2xl font-bold ">Dashboard</h1>
        {user && (
            <div className="mb-4">
                <p className="mb-2">Welcome, {user.name}!</p>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
        )}
    </div>
  );
  
}

export default Dashboard;
