import type { ReactNode } from "react";

export const Content: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="bg-[#f7f7f7] min-h-screen rounded-xl">{children}</div>;
};
