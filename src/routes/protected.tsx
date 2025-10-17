import { Navigate } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard/Dashboard";

export const protectedRoutes = ({
  isAuthenticated,
}: {
  isAuthenticated: boolean | null;
}) => [
  {
    path: "/dashboard",
    element: isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />,
  },
];
