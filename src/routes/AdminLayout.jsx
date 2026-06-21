import React from "react";

import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import AdminSidebar from "../components/layouts/AdminSidebar";
function AdminLayout() {
  const { user, loading } = useAuthContext();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-bold text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return navigate("/login");
  }

  if (user && user.role_id !== 1) {
    return navigate("/unauthorized");
  }

  return <Outlet />;
}

export default AdminLayout;
