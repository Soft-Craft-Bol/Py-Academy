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

const staticData = {
  practicas: [
    {
      id: 1,
      title: 'Práctica 1: Landing Page con HTML/CSS',
      due: '28/06/2025',
      description:
        'Crear una landing page responsive utilizando HTML5 semántico y CSS Grid/Flexbox.',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=400&fit=crop',
      status: 'pending',
    },
    {
      id: 2,
      title: 'Práctica 2: Calculadora con JavaScript',
      due: '05/07/2025',
      description:
        'Desarrollar una calculadora interactiva usando JavaScript vanilla y programación orientada a objetos.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
      status: 'in-progress',
    },
    {
      id: 3,
      title: 'Práctica 3: ToDo App con React',
      due: '15/07/2025',
      description:
        'Construir una aplicación de tareas usando React con hooks y gestión de estado local.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
      status: 'upcoming',
    },
  ],
  materiales: [
    {
      id: 1,
      title: 'Slides Módulo 1: HTML/CSS',
      description: 'Presentación completa sobre HTML5 semántico y CSS moderno.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
      link: '#',
      type: 'slides',
    },
    {
      id: 2,
      title: 'Guía de JavaScript ES6+',
      description: 'Manual completo de las nuevas características de JavaScript moderno.',
      image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&h=400&fit=crop',
      link: '#',
      type: 'document',
    },
    {
      id: 3,
      title: 'Ejemplos de código React',
      description: 'Repositorio con ejemplos prácticos y patrones comunes en React.',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop',
      link: '#',
      type: 'code',
    },
  ],
  recursos: [
    {
      id: 1,
      title: 'Herramientas de Desarrollo',
      description: 'Lista de extensiones y herramientas recomendadas para VS Code.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop',
      link: '#',
    },
    {
      id: 2,
      title: 'Recursos de Diseño',
      description: 'Colección de recursos gratuitos para mejorar el diseño de tus proyectos.',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
      link: '#',
    },
  ],
};

function CourseDashboard() {
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const [expandedModules, setExpandedModules] = useState({ module1: true });
  const [selectedItem, setSelectedItem] = useState('1.1.1');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleModule = (moduleId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const toggleSection = (sectionId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4 text-blue-500" />;
      case 'reading':
        return <FileText className="w-4 h-4 text-green-500" />;
      case 'slides':
        return <FileText className="w-4 h-4 text-purple-500" />;
      case 'document':
        return <Book className="w-4 h-4 text-orange-500" />;
      case 'code':
        return <FolderOpen className="w-4 h-4 text-blue-600" />;
      default:
        return <Book className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'pending':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'upcoming':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completada';
      case 'in-progress':
        return 'En progreso';
      case 'pending':
        return 'Pendiente';
      case 'upcoming':
        return 'Próximamente';
      default:
        return 'Sin estado';
    }
  };

  const renderOutlineContent = () => (
    <div className="h-full flex flex-col">
      {/* Back button when viewing content */}
      {selectedItem && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setSelectedItem(null)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            <span className="text-sm font-medium">Volver al índice</span>
          </button>
        </div>
      )}

      {/* Course Progress */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">Progreso del Curso</h3>
        <div className="flex items-center space-x-3">
          <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${courseData.progress}%` }}
            ></div>
          </div>
          <span className="text-lg font-bold text-gray-700 dark:text-gray-200">
            {courseData.progress}%
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          ¡Sigue así! Ya has completado el {courseData.progress}% del curso.
        </p>
      </div>

      {/* Module Navigation */}
      <div className="flex-1 overflow-y-auto">
        {courseData.modules.map((module) => (
          <div key={module.id} className="border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => toggleModule(module.id)}
              className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center space-x-3">
                {expandedModules[module.id] ? (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                )}
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-base">
                    {module.title}
                  </h4>
                  <div className="flex items-center space-x-3 mt-2">
                    <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${module.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {module.progress}%
                    </span>
                  </div>
                </div>
              </div>
            </button>

            {expandedModules[module.id] && (
              <div className="pl-6 bg-gray-50 dark:bg-gray-800/50">
                {module.sections.map((section) => (
                  <div key={section.id}>
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-3 transition-colors"
                    >
                      {expandedModules[section.id] ? (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      )}
                      {section.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400" />
                      )}
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {section.title}
                      </span>
                    </button>

                    {expandedModules[section.id] && (
                      <div className="pl-10 pb-2">
                        {section.subsections.map((subsection) => (
                          <button
                            key={subsection.id}
                            onClick={() => setSelectedItem(subsection.id)}
                            className={`w-full p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-3 rounded-lg transition-colors ${
                              selectedItem === subsection.id
                                ? 'bg-blue-100 dark:bg-blue-900/30 border-l-4 border-blue-500'
                                : ''
                            }`}
                          >
                            {subsection.completed ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <Circle className="w-4 h-4 text-gray-400" />
                            )}
                            {getTypeIcon(subsection.type)}
                            <span
                              className={`text-sm ${
                                selectedItem === subsection.id
                                  ? 'text-blue-700 dark:text-blue-300 font-semibold'
                                  : 'text-gray-600 dark:text-gray-400'
                              }`}
                            >
                              {subsection.title}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderGridContent = () => {
    const list = staticData[activeTab] || [];
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {list.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group hover:scale-105"
          >
            {item.image && (
              <div className="relative overflow-hidden rounded-xl mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            )}

            <div className="space-y-3">
              <h4 className="font-bold text-xl text-gray-800 dark:text-white leading-tight">
                {item.title}
              </h4>

              {activeTab === 'practicas' && (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Fecha límite: {item.due}
                    </p>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(item.status)}`}
                    >
                      {getStatusText(item.status)}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                  <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg">
                    Ver Práctica
                  </button>
                </>
              )}

              {(activeTab === 'materiales' || activeTab === 'recursos') && (
                <>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    {item.type && (
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(item.type)}
                        <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                          {item.type}
                        </span>
                      </div>
                    )}
                    <a
                      href={item.link}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold text-sm flex items-center space-x-1 hover:underline transition-colors"
                    >
                      <span>Acceder</span>
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 shadow-lg p-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">DW</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{courseData.title}</h1>
              <p className="text-blue-100">{courseData.subtitle}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-3 text-white hover:text-yellow-200 hover:bg-white/10 rounded-xl transition-all">
            <Search className="w-6 h-6" />
          </button>
          <button className="p-3 text-white hover:text-yellow-200 hover:bg-white/10 rounded-xl transition-all">
            <Bell className="w-6 h-6" />
          </button>
          <button className="p-3 text-white hover:text-yellow-200 hover:bg-white/10 rounded-xl transition-all">
            <User className="w-6 h-6" />
          </button>
        </div>
      </header>

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
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  {sidebarCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
                </button>
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
          {activeTab === 'outline' && selectedItem ? (
            <SectionContent selectedItem={selectedItem} courseData={courseData} />
          ) : (
            <div className="p-8">
              <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    {tabs.find((t) => t.key === activeTab)?.label}
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
                </div>

                {activeTab === 'outline' ? (
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                      Contenido Interactivo
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                      Selecciona un módulo o lección del panel lateral para comenzar tu aprendizaje.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                      <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                        <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                        <h4 className="font-semibold text-gray-800 dark:text-white">
                          Lecciones Interactivas
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                          Contenido multimedia y ejercicios prácticos
                        </p>
                      </div>
                      <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
                        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                        <h4 className="font-semibold text-gray-800 dark:text-white">
                          Seguimiento de Progreso
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                          Monitorea tu avance en tiempo real
                        </p>
                      </div>
                      <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                        <Users className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                        <h4 className="font-semibold text-gray-800 dark:text-white">Comunidad</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                          Colabora con otros estudiantes
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  renderGridContent()
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default CourseDashboard;
