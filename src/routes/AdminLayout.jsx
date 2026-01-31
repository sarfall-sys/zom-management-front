import React from 'react'

import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
function AdminLayout() {

  const navigate = useNavigate();

  const { user } = useAuthContext();


  if(user && user.role_id !== 1){
    return navigate("/unauthorized");
  }

  return <Outlet />;    
}

export default AdminLayout