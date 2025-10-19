import type { ReactNode } from "react";
import { Content } from "./Content";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export const LayoutDashboard: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <div className="w-full h-screen p-3 box-border flex">
      <div className="flex h-full w-full gap-3">
        <div className="h-full">
          <Sidebar />
        </div>
        <div className="flex flex-col w-full h-full gap-2">
          <Header />
          <Content children={children} />
        </div>
      </div>
    </div>
  );
};
