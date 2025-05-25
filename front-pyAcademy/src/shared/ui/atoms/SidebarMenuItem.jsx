import { Link } from "react-router-dom";

export const SidebarMenuItem = ({
  title,
  to,
  Icon,
  isSidebarOpen,
  onSelect,
  className = "",
}) => {
  return (
    <Link
      to={to}
      onClick={() => onSelect(title)}
      className={`group flex items-center p-3 rounded-md transition-colors hover:bg-neutral-neu0 dark:hover:bg-primary-pri1 hover:text-white ${className}`}
    >
      <Icon className="text-xl text-black dark:text-white" />
      <span
        className={`ml-4 text-sm font-medium text-black dark:text-white ${
          isSidebarOpen ? "inline" : "hidden"
        }`}
      >
        {title}
      </span>
    </Link>
  );
};
