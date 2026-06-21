import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

import { Routes, Route } from "react-router-dom";

import BrandList from "../pages/brands/BrandList";
import BrandCreate from "../pages/brands/BrandCreate";
import BrandEdit from "../pages/brands/BrandEdit";

import ProductList from "../pages/products/ProductList";
import ProductCreate from "../pages/products/ProductCreate";
import ProductEdit from "../pages/products/ProductEdit";

import Unauthorized from "../pages/Unauthorized";
import AdminLayout from "./AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";

import UserCreate from "../pages/admin/UserCreate";
import UserEdit from "../pages/admin/UserEdit";
import UserList from "../pages/admin/UserList";
import RoleRoute from "./RoleRoute";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import HomePage from "../pages/HomePage";
import HomeRedirect from "../components/HomeRedirect";
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
export default function AppRoutes() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-bold text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/" replace />}
      />

      <Route path="/" element={<HomeRedirect />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Admin */}
      <Route element={<ProtectedRoute allowedRoles={[1]} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserList />} />
          <Route path="/admin/users/create" element={<UserCreate />} />
          <Route path="/admin/users/edit/:id" element={<UserEdit />} />
        </Route>
      </Route>

      {/* Manager  ,When its exists*/}
      <Route path="/manager" element={<ProtectedRoute allowedRoles={[2]} />}>
        <Route element={<AdminLayout />}>
          <Route path="/manager/dashboard" element={<AdminDashboard />} />
        </Route>
      </Route>

      {/*Products */}
      <Route element={<ProtectedRoute allowedRoles={[1, 2, 3]} />}>
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/create" element={<ProductCreate />} />
        <Route path="/products/edit/:id" element={<ProductEdit />} />

        {/* Protected routes */}
        <Route path="/brands" element={<BrandList />} />
        <Route path="/brands/create" element={<BrandCreate />} />
        <Route path="/brands/edit/:id" element={<BrandEdit />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
