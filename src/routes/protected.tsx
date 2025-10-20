import { Navigate } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { ProductDashboard } from "../features/products/pages/ProductDashboard/ProductDashboard";
import { WarehouseDashboard } from "../features/warehouses/pages/WarehouseDashboard/WarehouseDashboard";
import { ShipmentDashboard } from "../features/shipments/pages/ShipmentDashboard/ShipmentDashboard";
import { CustomerDashboard } from "../features/customers/pages/CustomerDashboard/CustomerDashboard";
import { UserDashboard } from "../features/users/pages/UserDashboard/UserDashboard";

export const protectedRoutes = ({
  isAuthenticated,
  isAdmin,
}: {
  isAuthenticated: boolean | null;
  isAdmin: boolean | null;
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
  {
    path: "/warehouses",
    element: isAuthenticated ? (
      <WarehouseDashboard />
    ) : (
      <Navigate to="/login" replace />
    ),
  },
  {
    path: "/shipments",
    element: isAuthenticated ? (
      <ShipmentDashboard />
    ) : (
      <Navigate to="/login" replace />
    ),
  },
  {
    path: "/customers",
    element: isAuthenticated ? (
      <CustomerDashboard />
    ) : (
      <Navigate to="/login" replace />
    ),
  },
  {
    path: "/users",
    element:
      isAuthenticated && isAdmin ? (
        <UserDashboard />
      ) : (
        <Navigate to="/login" replace />
      ),
  },
];
