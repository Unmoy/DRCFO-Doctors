import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  console.log(currentUser);
  const location = useLocation();
  return currentUser?.user_email?.length || currentUser?.user_phone?.length ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}
