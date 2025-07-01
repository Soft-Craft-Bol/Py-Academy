import {
  ChevronDown,
  ChevronRight,
  Book,
  Download,
  CheckCircle,
  Circle,
  FolderOpen,
  BookOpen,
} from 'lucide-react';
import { useState } from 'react';

import SectionContent from './components/SectionContent';

const tabs = [
  { key: 'outline', label: 'Contenido del Curso', icon: BookOpen },
  { key: 'practicas', label: 'Prácticas', icon: FolderOpen },
  { key: 'materiales', label: 'Materiales', icon: Book },
  { key: 'recursos', label: 'Recursos', icon: Download },
];

const courseData = {
  title: 'Desarrollo Web Avanzado',
  subtitle: 'Curso de Programación Frontend y Backend',
  progress: 25,
  modules: [
    {
      id: 'module1',
      title: 'Módulo 1: Fundamentos de HTML y CSS',
      progress: 75,
      completed: false,
      sections: [
        {
          id: '1.1',
          title: '1.1 Introducción a HTML5',
          completed: true,
          subsections: [
            { id: '1.1.1', title: 'Estructura básica de HTML', completed: true, type: 'reading' },
            { id: '1.1.2', title: 'Etiquetas semánticas', completed: true, type: 'video' },
            { id: '1.1.3', title: 'Formularios y validación', completed: true, type: 'reading' },
          ],
        },
        {
          id: '1.2',
          title: '1.2 CSS Avanzado',
          completed: false,
          subsections: [
            { id: '1.2.1', title: 'Flexbox y Grid', completed: false, type: 'reading' },
            { id: '1.2.2', title: 'Animaciones CSS', completed: false, type: 'video' },
          ],
        },
      ],
    },
    {
      id: 'module2',
      title: 'Módulo 2: JavaScript Moderno',
      progress: 15,
      completed: false,
      sections: [
        {
          id: '2.1',
          title: '2.1 ES6+ Características',
          completed: false,
          subsections: [
            {
              id: '2.1.1',
              title: 'Arrow Functions y Destructuring',
              completed: false,
              type: 'reading',
            },
            { id: '2.1.2', title: 'Promises y Async/Await', completed: false, type: 'video' },
            { id: '2.1.3', title: 'Módulos ES6', completed: false, type: 'reading' },
          ],
        },
        {
          id: '2.2',
          title: '2.2 DOM Manipulation',
          completed: false,
          subsections: [
            {
              id: '2.2.1',
              title: 'Selección y modificación de elementos',
              completed: false,
              type: 'reading',
            },
            { id: '2.2.2', title: 'Event Handling', completed: false, type: 'video' },
          ],
        },
      ],
    },
    {
      id: 'module3',
      title: 'Módulo 3: React Fundamentals',
      progress: 0,
      completed: false,
      sections: [
        {
          id: '3.1',
          title: '3.1 Componentes y Props',
          completed: false,
          subsections: [
            { id: '3.1.1', title: 'Componentes funcionales', completed: false, type: 'reading' },
            { id: '3.1.2', title: 'Estado y Hooks', completed: false, type: 'video' },
          ],
        },
      ],
    },
  ],
};

function CourseDashboard({ course, units }) {
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const [expandedModules, setExpandedModules] = useState({ module1: true });
  const [selectedItem, setSelectedItem] = useState('1.1.1');
  const [selectedUnit, setSelectedUnit] = useState({});
  const [selectedTitle, setSelectedTitle] = useState({});
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleModule = (moduleId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const handleSelectTitle = (unit, title) => {
    setSelectedUnit(unit);
    setSelectedTitle(title);
  };

  const renderOutlineContent = () => (
    <div className="flex flex-col">
      {/* Module Navigation */}
      <div className="flex-1">
        {units.map((unit) => (
          <div key={unit.id} className="border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => toggleModule(unit.title)}
              className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center space-x-3">
                {expandedModules[unit.title] ? (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                )}
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-base">
                    {unit.title}
                  </h4>
                  <div className="flex items-center space-x-3 mt-2">
                    <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${unit.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {unit.progress}%
                    </span>
                  </div>
                </div>
              </div>
            </button>

            {expandedModules[unit.title] && (
              <div className="pl-6 bg-gray-50 dark:bg-gray-800/50">
                {unit.titles.map((title) => (
                  <div key={title.id}>
                    <button
                      className="w-full p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-3 transition-colors"
                      onClick={() => handleSelectTitle(unit, title)}
                    >
                      {title.isActive ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400" />
                      )}
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {title.title}
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col -m-8">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`${sidebarCollapsed ? 'w-0' : 'w-80'} transition-all duration-300 bg-white dark:bg-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700 overflow-hidden`}
        >
          <div className="h-full flex flex-col">
            {/* Sidebar Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">Navegación</h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => {
                        setActiveTab(tab.key);
                        if (tab.key !== 'outline') {
                          setSelectedItem(null);
                        }
                      }}
                      className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-all focus:outline-none ${
                        activeTab === tab.key
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-gray-200 dark:border-gray-600'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="whitespace-nowrap">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sidebar Content */}
            {activeTab === 'outline' && renderOutlineContent()}
            {activeTab !== 'outline' && (
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  {tabs.find((t) => t.key === activeTab)?.label}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Explora el contenido disponible en la sección principal.
                </p>
              </div>
            )}
          </div>
        </div>
        <main className="flex-1 bg-gray-50 dark:bg-gray-900 overflow-y-auto">
          <SectionContent title={selectedTitle} unit={selectedUnit} />
        </main>
      </div>
    </div>
  );
}
export default CourseDashboard;
