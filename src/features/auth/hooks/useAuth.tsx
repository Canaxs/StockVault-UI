import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";

export const useAuth = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const isAuthenticated = Boolean(token);

  return { token, isAuthenticated };
};
