import { Link } from 'react-router-dom';

export function SidebarMenuItem({ title, to, Icon, isSidebarOpen, className = '' }) {
  return (
    <Link
      to={to}
      className={`group flex items-center p-3 rounded-md transition-colors hover:bg-neutral-neu0 dark:hover:bg-primary-pri1 hover:text-white ${className}`}
    >
      <Icon className="text-xl text-black dark:text-white" />
      <span
        className={`ml-4 text-sm font-medium text-black dark:text-white ${
          isSidebarOpen ? 'inline' : 'hidden'
        }`}
      >
        {title}
      </span>
    </Link>
  );
}
