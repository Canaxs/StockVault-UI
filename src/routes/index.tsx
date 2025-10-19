import { commonRoutes } from "./common";
import { publicRoutes } from "./public";
import { protectedRoutes } from "./protected";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useRoutes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const routes = [
    ...protectedRoutes({ isAuthenticated }),
    ...publicRoutes({ isAuthenticated }),
    ...commonRoutes(),
  ];

  const element = useRoutes(routes, location);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 overflow-hidden"
      >
        {element}
      </motion.div>
    </AnimatePresence>
  );
};
