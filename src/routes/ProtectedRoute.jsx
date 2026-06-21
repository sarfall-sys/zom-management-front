import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Loader from "../components/common/Loader";
function ProtectedRoute({allowedRoles}) {
  const { user,loading } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role_id)) {
    return <Navigate to="/unauthorized" replace />;
  }

    return (
      <div className="flex h-full">
        <div className="flex flex-col flex-1">
          <main className="flex-1 p-4 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    );
}

export default ProtectedRoute;
