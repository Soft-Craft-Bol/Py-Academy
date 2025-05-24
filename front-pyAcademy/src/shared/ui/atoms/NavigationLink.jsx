import React from "react";
import { NavLink } from "react-router-dom";

export const NavigationLink = ({ text, to, disable }) => {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <div className="relative group cursor-pointer">
          <span
            className={`text-gray-600 dark:text-white group-hover:text-blue-600 ${
              isActive ? "text-blue-600" : ""
            } font-medium transition-colors duration-200`}
          >
            {text}
          </span>
          <span
            className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ease-in-out ${
              isActive ? "w-full" : "w-0 group-hover:w-full"
            }`}
          ></span>
        </div>
      )}
    </NavLink>
  );
};
