import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "./path";

export default function ProtectedRoute() {
  const {
    isAuthenticated,
    isProfileCompleted,
    isLoading,
  } = useAuth();

  const location = useLocation();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (
    !isProfileCompleted &&
    location.pathname !== ROUTES.PROFILE
  ) {
    return <Navigate to={ROUTES.PROFILE} replace />;
  }

  return <Outlet />;
}