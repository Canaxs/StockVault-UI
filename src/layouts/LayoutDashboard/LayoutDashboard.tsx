import type { ReactNode } from "react";
import { Content } from "./Content";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
  searchValue?: string;
  searchPlaceHolder?: string;
  searchOnChange?: (val: string) => void;
  searchResults?: any[];
  searchRenderResults?: (item: any) => React.ReactNode;
  searchOnSelect?: (item: any) => void;
}

export const LayoutDashboard: React.FC<LayoutProps> = ({
  children,
  searchValue,
  searchPlaceHolder,
  searchOnChange,
  searchResults,
  searchRenderResults,
  searchOnSelect,
}) => {
  return (
    <div className="w-full min-h-screen p-3 box-border flex gap-3">
      <Sidebar />
      <div className="flex flex-col w-full gap-2">
        <Header
          searchValue={searchValue}
          searchPlaceHolder={searchPlaceHolder}
          searchOnChange={searchOnChange}
          searchResults={searchResults}
          searchRenderResults={searchRenderResults}
          searchOnSelect={searchOnSelect}
        />
        <Content>{children}</Content>
      </div>
    </div>
  );
};
