import type { ReactNode } from "react";

export const Content: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="bg-[#f7f7f7] rounded-xl h-full">{children}</div>;
};
