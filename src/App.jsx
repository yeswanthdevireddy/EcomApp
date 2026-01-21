import { Routes, Route, Navigate } from "react-router-dom";

import RequireAuth from "./auth/RequireAuth";
import RequireRole from "./auth/RequireRole";

import AdminLogin from "./admin/AdminLogin";
import UserLogin from "./user/UserLogin";
import AdminDashboard from "./admin/AdminDashBoard";
import UserDashboard from "./user/UserDashboard";

import UserRegister from "./user/UserRegister";
import AdminRegister from "./admin/AdminRegister";

import ProductBrowse from "./user/ProductBrowse";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";

export default function App() {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/user/login" />} />

      {/* LOGIN */}
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route path="/user/register" element={<UserRegister />} />
      <Route path="/admin/register" element={<AdminRegister />} />

      {/* USER */}
      <Route
        path="/user/dashboard"
        element={
          <RequireRole role="USER">
            <UserDashboard />
          </RequireRole>
        }
      />

      <Route
        path="/products"
        element={
          <RequireAuth>
            <ProductBrowse />
          </RequireAuth>
        }
      />

      {/* ADMIN */}
      <Route
        path="/admin/dashboard"
        element={
          <RequireRole role="ADMIN">
            <AdminDashboard />
          </RequireRole>
        }
      />



      <Route
        path="/admin/category"
        element={
          <RequireRole role="ADMIN">
            <AddCategory />
          </RequireRole>
        }
      />

      <Route
        path="/admin/product"
        element={
          <RequireRole role="ADMIN">
            <AddProduct />
          </RequireRole>
        }
      />

    </Routes>
  );
}
