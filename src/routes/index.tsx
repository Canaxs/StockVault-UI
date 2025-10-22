import { commonRoutes } from "./common";
import { publicRoutes } from "./public";
import { protectedRoutes } from "./protected";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useRoutes } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export const AppRoutes = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  const routes = [
    ...protectedRoutes({ isAuthenticated, isAdmin }),
    ...publicRoutes({ isAuthenticated }),
    ...commonRoutes(),
  ];

  const element = useRoutes(routes);

  return (
    <div className="overflow-x-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          {element}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
