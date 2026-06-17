import React from 'react'
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
function HomePage() {
 const { user  } = useAuthContext();



  return (
    <div className="min-h-screen p-6 bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark">
      <h1 className="mb-4 text-2xl font-bold ">
        Welcome { user?.name || 'User'} to Zom Management System
      </h1>
        



    </div>
  );
  
}

export default HomePage