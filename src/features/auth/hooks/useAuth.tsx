import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";

export const useAuth = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const roles = useSelector((state: RootState) => state.auth.roles);
  const isAuthenticated = Boolean(token);
  const isAdmin = roles?.includes("Admin") ?? false;

  return { token, isAuthenticated, isAdmin };
};
