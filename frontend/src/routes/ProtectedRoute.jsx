import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const isLoggedIn = sessionStorage.getItem("user"); // or token check

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}