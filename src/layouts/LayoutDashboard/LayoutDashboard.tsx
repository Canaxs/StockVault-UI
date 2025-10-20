import type { ReactNode } from "react";
import { Content } from "./Content";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export const LayoutDashboard: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <div className="w-full min-h-screen p-3 box-border flex gap-3">
      <Sidebar />
      <div className="flex flex-col w-full gap-2">
        <Header />
        <Content>{children}</Content>
      </div>
    </div>
  );
};
