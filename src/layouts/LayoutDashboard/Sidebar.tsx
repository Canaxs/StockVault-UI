import { NavLink, useLocation } from "react-router-dom";
import { sidebarItems } from "../../shared/constants/sidebarItems";
import { useState } from "react";

export const Sidebar = () => {
  const location = useLocation();
  const [pathName] = useState(location.pathname);

  return (
    <div className="bg-[#f7f7f7] rounded-xl h-full w-56 xl:w-60 2xl:w-64">
      <div className="flex items-center gap-1 py-7 justify-center">
        <img src="depo-logo.png" width={60} height={60} />
        <span className="text-base text-gray-800 text-shadow-md">
          StockVault
        </span>
      </div>
      <div className="flex flex-col space-y-5">
        <span className="text-gray-400 text-xs font-medium leading-5 ml-3">
          MENÜ
        </span>
        <ul className="text-gray-600">
          {sidebarItems.map((item, index) => (
            <li key={`sidebarItem-${index}`}>
              <NavLink
                to={item.path}
                className={`relative flex items-center mb-3 rounded-lg transition-colors duration-200 ${
                  pathName == item.path ? "text-black" : "hover:bg-gray-200"
                }`}
              >
                {/* Sol renk çubuğu */}
                <span
                  className={`absolute h-full w-[7px] rounded-br-full rounded-tr-full ${
                    pathName == item.path ? "bg-[#33986a]" : "bg-transparent"
                  }`}
                ></span>
                <div className="flex p-3 items-center gap-3 ml-2">
                  <span
                    className={`${
                      pathName == item.path ? "text-[#33986a]" : "text-gray-400"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
