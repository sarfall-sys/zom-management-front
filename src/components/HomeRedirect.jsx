import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { RiEyeCloseFill } from "react-icons/ri";

function HomeRedirect() {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" replace />;
  } else if (user.role_id === 1) {
    return <Navigate to="/admin/dashboard" replace />;
  } else if (user.role_id === 2 || user.role_id === 3) {
    return <Navigate to="/user/dashboard" replace />;
  }
}

export default HomeRedirect;
