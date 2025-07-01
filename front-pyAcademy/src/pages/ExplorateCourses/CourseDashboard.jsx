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
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

//Components
import SectionContent from './components/SectionContent';
import CourseStudent from '../student/CourseStudent';

//Api
import { getCourseUnits } from '@/shared/api/api';

const tabs = [
  { key: 'outline', label: 'Contenido del Curso', icon: BookOpen },
  { key: 'practicas', label: 'Prácticas', icon: FolderOpen },
  { key: 'recursos', label: 'Recursos', icon: Download },
];

function CourseDashboard({ course, unitsArray }) {
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const [expandedModules, setExpandedModules] = useState({ module1: true });
  const [selectedItem, setSelectedItem] = useState('1.1.1');
  const [selectedUnit, setSelectedUnit] = useState({});
  const [selectedTitle, setSelectedTitle] = useState({});
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { id } = useParams();
  const [units, setUnits] = useState(unitsArray);

  useEffect(() => {
    async function fetchUnits() {
      const res = await getCourseUnits(id);
      setUnits(res.data);
      console.log('El res es', res);
    }
    if (!units) fetchUnits();
  }, [id]);

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

  const renderResourceContent = () => <CourseStudent units={units} />;

  const renderOutlineContent = () => (
    <div className="flex flex-col">
      {/* Module Navigation */}
      <div className="flex-1">
        {units &&
          units.map((unit) => (
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
          {activeTab === 'outline' && <SectionContent title={selectedTitle} unit={selectedUnit} />}
          {activeTab === 'recursos' && renderResourceContent()}   
        </main>
      </div>
    </div>
  );
}
export default CourseDashboard;
