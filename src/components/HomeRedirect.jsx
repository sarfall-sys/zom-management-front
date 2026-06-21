import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { RiEyeCloseFill } from "react-icons/ri";

function HomeRedirect() {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" replace />;
  } 

  switch (user.role_id) {
    case 1:
      return <Navigate to="/admin/dashboard" replace />;
    case 2:
      return <Navigate to="/manager/dashboard" replace />;
    case 3:
      return <Navigate to="/dashboard" replace />;
    default:
      return <Navigate to="/unauthorized" replace />;
  } 
  
}

export default HomeRedirect;
