import { Navigate } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { ProductDashboard } from "../features/products/pages/Product/ProductDashboard";

export const protectedRoutes = ({
  isAuthenticated,
}: {
  isAuthenticated: boolean | null;
}) => [
  {
    path: "/dashboard",
    element: isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />,
  },
  {
    path: "/products",
    element: isAuthenticated ? (
      <ProductDashboard />
    ) : (
      <Navigate to="/login" replace />
    ),
  },
];
