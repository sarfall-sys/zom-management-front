import React from 'react'
import { Navigate,Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import Loader from '../components/common/Loader';
function RoleRoute({allowedRoles}) {
    const { user ,loading } = useAuthContext();
    if(loading){
        return <Loader />;
    }

    if(!user){
        return <Navigate to="/login" replace />;
    }

    if(!allowedRoles.includes(user.role_id)){
        return <Navigate to="/unauthorized" replace />;
    }

  return <Outlet />;
}

export default RoleRoute