import HomePage from "../pages/HomePage";
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
export default function AppRoutes() {
  return (
    <Routes>
      {/*Public routes */}
      {/* Public routes */}
      <Route path="/" element={<ProtectedRoute fallback={<Login />}><Dashboard /></ProtectedRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="unauthorized" element={<Unauthorized />} />

      {/* Admin */}
      <Route path="admin" element={<RoleRoute allowedRoles={[1]} />}>
        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users/create" element={<UserCreate />} />
          <Route path="users/edit/:id" element={<UserEdit />} />
          <Route path="users" element={<UserList />} />
        </Route>
      </Route>

      {/*Products */}
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <ProductList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products/create"
        element={
          <ProtectedRoute>
            <ProductCreate />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products/edit/:id"
        element={
          <ProtectedRoute>
            <ProductEdit />
          </ProtectedRoute>
        }
      />

      {/* Protected routes */}
      <Route
        path="/brands"
        element={
          <ProtectedRoute>
            <BrandList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/brands/create"
        element={
          <ProtectedRoute>
            <BrandCreate />
          </ProtectedRoute>
        }
      />
      <Route
        path="/brands/edit/:id"
        element={
          <ProtectedRoute>
            <BrandEdit />
          </ProtectedRoute>
        }
      />
   
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
