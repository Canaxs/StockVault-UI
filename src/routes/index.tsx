import { commonRoutes } from "./common";
import { publicRoutes } from "./public";
import { protectedRoutes } from "./protected";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useRoutes } from "react-router-dom";

export const AppRoutes = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  const routes = [
    ...protectedRoutes({ isAuthenticated, isAdmin }),
    ...publicRoutes({ isAuthenticated }),
    ...commonRoutes(),
  ];

  return useRoutes(routes);
};
