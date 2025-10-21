import { Bell, LogOut, Mail, Settings } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { HamburgerMenu } from "./HamburgerMenu";
import { useEffect, useRef, useState } from "react";
import { logout } from "../../features/auth/slices/authSlice";

export const Header = () => {
  const username = useSelector((state: RootState) => state.auth.username);
  const roles = useSelector((state: RootState) => state.auth.roles);

  const dispatch = useDispatch();

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onLogout = async () => {
    dispatch(logout());
  };

  return (
    <div className="bg-[#f7f7f7] rounded-xl w-full h-20">
      <div className="flex justify-between h-full p-3">
        <div>
          <HamburgerMenu />
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white flex items-center justify-center">
            <Mail size={18} />
          </div>
          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white flex items-center justify-center">
            <Bell size={18} />
          </div>
          <div className="relative" ref={profileMenuRef}>
            <div
              onClick={() => setProfileMenuOpen(true)}
              className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white flex items-center justify-center cursor-pointer hover:scale-105 transition-all"
            >
              <img
                src="https://github.com/shadcn.png"
                className="rounded-full"
              />
            </div>
            {profileMenuOpen && (
              <div className="absolute top-full -left-7  lg:-left-5 mt-2 w-32 bg-white rounded-xl shadow-lg border border-gray-100 z-50">
                <ul className="py-2 text-sm text-gray-700">
                  <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
                    <Settings size={16} /> Ayarlar
                  </li>
                  <li
                    onClick={onLogout}
                    className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer text-red-600"
                  >
                    <LogOut size={16} /> Çıkış Yap
                  </li>
                </ul>
              </div>
            )}
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
