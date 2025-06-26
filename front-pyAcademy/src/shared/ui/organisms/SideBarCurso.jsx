import React, { useState } from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import {
  ChevronDown,
  ChevronRight,
  Book,
  FileText,
  Video,
  Download,
  CheckCircle,
  Circle,
  User,
  Search,
  Bell,
  Menu,
  X,
  FolderOpen,
  Calendar,
  BookOpen,
  Users,
} from 'lucide-react';

const tabs = [
  { key: 'contenido', label: 'Contenido', icon: BookOpen},
  { key: 'noticias', label: 'Noticias', icon: FolderOpen},
  { key: 'descargables', label: 'Descargar recursos', icon: Download},
];

const SidebarCurso = () => {
  const [activeTab, setActiveTab] = useState('contenido');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="relative flex h-full min-h-screen">
      {/* Sidebar */}
      <div
        className={`${
          sidebarCollapsed ? 'w-0' : 'w-64'
        } transition-all duration-300 bg-white dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 overflow-hidden`}
      >
        <div className="h-full flex flex-col overflow-y-auto">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">Navegación</h2>
          </div>

          <div className="flex flex-col gap-2 p-4">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${
                  activeTab === key
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className={`absolute top-4 z-10 transform -translate-x-1/2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300
    ${sidebarCollapsed ? 'left-4' : 'left-64'}`}
      >
        {sidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </button>
    </div>
  );
};

export default SidebarCurso;
