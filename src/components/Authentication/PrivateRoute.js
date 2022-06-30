import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  const location = useLocation();
  return currentUser.user_email ? (
    children
  ) : (
    <Navigate to="/signup" replace state={{ from: location }} />
  );
}
