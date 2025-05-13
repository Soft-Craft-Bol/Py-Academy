import React from "react";

export const NavigationLink = ({ text }) => {
  return (
    <li className="relative group">
      <span className="text-gray-600 group-hover:text-blue-600 active:text-blue-600 font-medium transition-colors duration-200 cursor-pointer">
        {text}
      </span>
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300 ease-in-out"></span>
    </li>
  );
};
