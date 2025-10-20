import { Bell, Mail } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

export const Header = () => {
  const username = useSelector((state: RootState) => state.auth.username);
  const roles = useSelector((state: RootState) => state.auth.roles);

  return (
    <div className="bg-[#f7f7f7] rounded-xl w-full h-20">
      <div className="flex justify-between h-full p-3">
        <div></div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white flex items-center justify-center">
            <Mail size={18} />
          </div>
          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white flex items-center justify-center">
            <Bell size={18} />
          </div>
          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white flex items-center justify-center">
            <img src="https://github.com/shadcn.png" className="rounded-full" />
          </div>
          <div>
            <div className="text-xs lg:text-sm text-gray-600">
              {username || "Username"}
            </div>
            <div className="text-[10px] lg:text-xs text-gray-400">
              {roles?.[roles.length - 1]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
