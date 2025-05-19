import { useState } from "react";
import {
  FiChevronsLeft,
  FiChevronsRight,
  FiLogOut,
  FiMenu,
} from "react-icons/fi";
import { IoCodeSlash } from "react-icons/io5";
import { LuBookCopy } from "react-icons/lu";
import { GiArtificialIntelligence } from "react-icons/gi";

import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export const Sidebar = ({
  isSidebarOpen,
  isMenuOpen,
  toggleSidebar,
  toggleMenu,
}) => {
  const [selected, setSelected] = useState("Inicio");
  const navigate = useNavigate();

  const options = [
    { title: "Mis cursos", to: "/inicio", Icon: LuBookCopy },
    { title: "Editor de codigo", to: "/", Icon: IoCodeSlash },
    { title: "IA Tutor", to: "/", Icon: GiArtificialIntelligence },
  ];

  const handleLogout = async () => {
    try {
      navigate("/", { replace: true, state: { loggedOut: true } });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <>
      <motion.div
        layout
        className={`hidden md:block fixed top-0 left-0 h-screen bg-white dark:bg-primary-pri2 text-white transition-all duration-300 ${
          isSidebarOpen ? "w-56" : "w-16"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b-2 border-gray-400">
          <Link to="/inicio">
            <img
              src="/logoS.svg"
              alt="Logo"
              className={`h-10 transition-opacity ${
                isSidebarOpen ? "opacity-100" : "opacity-0"
              }`}
            />
          </Link>
        </div>

        <div className="flex flex-col space-y-2 mt-6 px-2">
          {options.map(({ title, to, Icon }) => (
            <Link
              key={title}
              to={to}
              onClick={() => setSelected(title)}
              className={`group flex items-center p-3 rounded-md transition-colors ${
                selected === title
                  ? "bg-gradient-to-r from-[#023047] to-[#082938] text-white"
                  : "hover:bg-gradient-to-r from-[#023047] to-[#082938] hover:text-white"
              }`}
            >
              <Icon className="text-xl" />
              <span
                className={`ml-4 text-sm font-medium ${
                  isSidebarOpen ? "inline" : "hidden"
                }`}
              >
                {title}
              </span>
            </Link>
          ))}
        </div>

        <div className="absolute left-0 bottom-4 w-full p-4 border-t border-gray-400">
          <button
            onClick={toggleSidebar}
            className=" flex items-center w-full space-x-2 rounded-md p-2 hover:bg-gradient-to-r from-[#023047] to-[#082938] hover:text-white"
          >
            {isSidebarOpen ? (
              <FiChevronsLeft className="text-white text-xl" />
            ) : (
              <FiChevronsRight className="text-white text-xl" />
            )}

            <span
              className={`text-sm font-medium ${
                isSidebarOpen ? "inline" : "hidden"
              }`}
            >
              Cerrar menu
            </span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center w-full space-x-2 rounded-md p-2 hover:bg-gradient-to-r from-[#023047] to-[#082938] hover:text-white"
          >
            <FiLogOut className="text-xl" />
            <span
              className={`text-sm font-medium ${
                isSidebarOpen ? "inline" : "hidden"
              }`}
            >
              Cerrar sesión
            </span>
          </button>
        </div>
      </motion.div>

      {/* Moviles :3 */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMenu}
          className="p-2 bg-transparent rounded focus:outline-none"
        >
          <FiMenu className="text-2xl text-white" />
        </button>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        />
      )}

      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isMenuOpen ? 0 : "-100%" }}
        transition={{ type: "tween" }}
        className="fixed top-0 left-0 w-64 h-full bg-gradient-to-r from-[#023047] to-[#3089b1] text-white z-50 p-6"
      >
        <div className="flex flex-col space-y-6">
          {options.map(({ title, to, Icon }) => (
            <Link
              key={title}
              to={to}
              onClick={toggleMenu}
              className="flex items-center space-x-4 p-3 rounded-md hover:bg-[#082938] transition-colors"
            >
              <Icon className="text-xl" />
              <span className="text-base font-medium">{title}</span>
            </Link>
          ))}

          <button
            onClick={() => {
              handleLogout();
              toggleMenu();
            }}
            className="flex items-center space-x-4 p-3 rounded-md hover:bg-[#082938] transition-colors"
          >
            <FiLogOut className="text-xl" />
            <span className="text-base font-medium">Cerrar sesión</span>
          </button>
        </div>
      </motion.div>
    </>
  );
};
