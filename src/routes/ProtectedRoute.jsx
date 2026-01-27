import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Loader from "../components/common/Loader";
function ProtectedRoute({children}) {
  const { user, loading } = useAuthContext();


  if (loading) {
    return <Loader />;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children; 
}

export default ProtectedRoute;
