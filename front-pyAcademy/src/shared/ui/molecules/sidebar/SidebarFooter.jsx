import { FiChevronsLeft, FiChevronsRight, FiLogOut } from 'react-icons/fi';

export function SidebarFooter({ isSidebarOpen, onToggleSidebar, onLogout }) {
  return (
    <div className="absolute left-0 bottom-4 w-full p-4 border-t border-gray-400">
      <button
        onClick={onToggleSidebar}
        className="flex items-center w-full space-x-2 rounded-md p-2 hover:bg-neutral-neu0 dark:hover:bg-primary-pri1 hover:text-white"
      >
        {isSidebarOpen ? (
          <FiChevronsLeft className="text-black dark:text-white text-xl" />
        ) : (
          <FiChevronsRight className="text-black dark:text-white text-xl" />
        )}
        <span
          className={`text-sm font-medium text-black dark:text-white ${
            isSidebarOpen ? 'inline' : 'hidden'
          }`}
        >
          Cerrar menu
        </span>
      </button>

      <button
        onClick={onLogout}
        className="flex items-center w-full space-x-2 rounded-md p-2 hover:bg-neutral-neu0 dark:hover:bg-primary-pri1 hover:text-white"
      >
        <FiLogOut className="text-xl text-black dark:text-white" />
        <span
          className={`text-sm font-medium text-black dark:text-white ${
            isSidebarOpen ? 'inline' : 'hidden'
          }`}
        >
          Cerrar sesión
        </span>
      </button>
    </div>
  );
}
