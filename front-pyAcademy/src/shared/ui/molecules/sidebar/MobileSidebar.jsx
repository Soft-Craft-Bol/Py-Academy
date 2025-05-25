import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

export const MobileSidebar = ({
  isMenuOpen,
  options,
  onToggleMenu,
  onLogout,
}) => {
  return (
    <>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onToggleMenu}
        />
      )}

      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isMenuOpen ? 0 : "-100%" }}
        transition={{ type: "tween" }}
        className="fixed top-0 left-0 w-64 h-full bg-white dark:bg-primary-pri2 dark:text-white text-black z-50 p-6 mt-[73px] px-2 border-t-2 border-gray-400"
      >
        <div className="flex flex-col space-y-6">
          {options.map(({ title, to, Icon }) => (
            <Link
              key={title}
              to={to}
              onClick={onToggleMenu}
              className="flex items-center space-x-4 p-3 rounded-md hover:bg-[#082938] transition-colors"
            >
              <Icon className="text-xl" />
              <span className="text-base font-medium">{title}</span>
            </Link>
          ))}

          <button
            onClick={() => {
              onLogout();
              onToggleMenu();
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
