import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Toastify CSS
import AuthLayout from "./layouts/AuthLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import CategoryPage from "./pages/Category";
import Product from "./pages/Product";
import ProductInformation from "./pages/ProductInformation";
import AdminProfile from "./pages/Profile";

function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      {/* Toast Container for Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />

      <Routes>
        {!token ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            <Route
              path="/"
              element={
                <AuthLayout>
                  <Dashboard />
                </AuthLayout>
              }
            />
            <Route
              path="/category"
              element={
                <AuthLayout>
                  <CategoryPage />
                </AuthLayout>
              }
            />
            <Route
              path="/products"
              element={
                <AuthLayout>
                  <Product />
                </AuthLayout>
              }
            />
            <Route
              path="/products/:slug"
              element={
                <AuthLayout>
                  <ProductInformation />
                </AuthLayout>
              }
            />
            <Route
              path="/profile"
              element={
                <AuthLayout>
                  <AdminProfile />
                </AuthLayout>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
