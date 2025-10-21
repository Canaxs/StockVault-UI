import { Menu, X } from "lucide-react";
import { useState } from "react";
import { sidebarItems } from "../../shared/constants/sidebarItems";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { NavLink, useLocation } from "react-router-dom";

export const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);
  const { isAdmin } = useAuth();
  const location = useLocation();
  const [pathName] = useState(location.pathname);

  return (
    <>
      <div className="flex items-center h-full lg:hidden">
        <div
          onClick={() => setOpen(true)}
          className="flex items-center ml-2 bg-white w-10 h-10 justify-center rounded-lg cursor-pointer hover:scale-105 hover:bg-gray-50 transition-all"
        >
          <Menu className="text-black" size={30} />
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-base font-medium text-center">Menü</h2>
          <button
            onClick={() => setOpen(false)}
            className="cursor-pointer transition-all hover:scale-105 "
          >
            <X size={24} />
          </button>
        </div>

        <ul className="flex flex-col py-3 space-y-3">
          {sidebarItems.map((item, index) => {
            const disabled = item.requiresAdmin && !isAdmin;

            return (
              <li key={`hamburgerSidebarItem-${index}`}>
                <NavLink
                  to={disabled ? "#" : item.path}
                  className={`relative flex items-center mb-3 rounded-lg transition-colors duration-200 ${
                    pathName === item.path ? "text-black" : "hover:bg-gray-200"
                  } ${disabled ? "opacity-50 pointer-events-none" : ""}`}
                >
                  <span
                    className={`absolute h-full w-[7px] rounded-br-full rounded-tr-full ${
                      pathName === item.path ? "bg-[#33986a]" : "bg-transparent"
                    }`}
                  ></span>
                  <div className="flex p-3 items-center gap-3 ml-2">
                    <span
                      className={`${
                        pathName === item.path
                          ? "text-[#33986a]"
                          : "text-gray-400"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="text-sm xl:text-base">{item.name}</span>
                  </div>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
        />
      )}
    </>
  );
};
