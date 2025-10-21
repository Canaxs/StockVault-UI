import { Navigate } from "react-router-dom";
import { Login } from "../features/auth/pages/Login/Login";

export const publicRoutes = ({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) => [
  {
    path: "/login",
    element: !isAuthenticated ? (
      <Login />
    ) : (
      <Navigate to="/dashboard" replace />
    ),
  },
  {
    path: "/",
    element: !isAuthenticated ? (
      <Navigate to="/login" replace />
    ) : (
      <Navigate to="/dashboard" replace />
    ),
  },
];
