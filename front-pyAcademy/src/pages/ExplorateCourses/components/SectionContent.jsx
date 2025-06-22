import React from 'react';
import { 
  Play, 
  FileText, 
  Download, 
  Clock, 
  User, 
  BookOpen, 
  CheckCircle,
  PlayCircle,
  Calendar,
  Target
} from 'lucide-react';

const SectionContent = ({ selectedItem, courseData }) => {
  const findSelectedSubsection = () => {
    for (const module of courseData.modules) {
      for (const section of module.sections) {
        const subsection = section.subsections.find(sub => sub.id === selectedItem);
        if (subsection) {
          return {
            subsection,
            section,
            module
          };
        }
      }
    }
    return null;
  };

  const selectedData = findSelectedSubsection();

  if (!selectedData) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
            Selecciona una lección
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Elige una lección del menú lateral para comenzar a aprender
          </p>
        </div>
      </div>
    );
  }

  const { subsection, section, module } = selectedData;

  const getContentByType = (type, title) => {
    switch (type) {
      case 'video':
        return {
          type: 'Video',
          duration: '15 min',
          content: (
            <div className="space-y-6">
              <div className="bg-gray-900 rounded-xl overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                  <div className="text-center">
                    <PlayCircle className="w-20 h-20 text-white mx-auto mb-4 opacity-80" />
                    <p className="text-white text-lg font-medium">Video: {title}</p>
                    <p className="text-blue-200 text-sm mt-2">Haz clic para reproducir</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                  📋 En este video aprenderás:
                </h4>
                <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-400">
                  <li>• Conceptos fundamentales del tema</li>
                  <li>• Ejemplos prácticos y casos de uso</li>
                  <li>• Mejores prácticas y recomendaciones</li>
                  <li>• Ejercicios para practicar</li>
                </ul>
              </div>
            </div>
          )
        };
      
      case 'reading':
        return {
          type: 'Lectura',
          duration: '10 min',
          content: (
            <div className="space-y-6">
              <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {title}
                </h2>
                
                <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 mb-6">
                  <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                    🎯 Objetivos de aprendizaje
                  </h3>
                  <ul className="text-sm text-green-700 dark:text-green-400 space-y-1">
                    <li>• Comprender los conceptos básicos</li>
                    <li>• Aplicar los conocimientos en ejemplos prácticos</li>
                    <li>• Identificar patrones y mejores prácticas</li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold mb-3">Introducción</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  En esta lección exploraremos los conceptos fundamentales de <strong>{title.toLowerCase()}</strong>. 
                  Este tema es esencial para tu progreso en el desarrollo web moderno y te proporcionará 
                  las bases sólidas necesarias para avanzar en tu aprendizaje.
                </p>

                <h3 className="text-xl font-semibold mb-3">Conceptos Clave</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">🔑 Concepto 1</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Descripción detallada del primer concepto importante que debes dominar.
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">🔧 Concepto 2</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Explicación práctica del segundo concepto con ejemplos de aplicación.
                    </p>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-3">Ejemplo Práctico</h3>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                  <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
{`// Ejemplo de código relacionado con ${title}
function ejemploPractico() {
  console.log("Aplicando los conceptos aprendidos");
  // Implementación práctica aquí
}`}
                  </pre>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4">
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
                    💡 Tip Importante
                  </h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-400">
                    Recuerda practicar estos conceptos regularmente para consolidar tu aprendizaje.
                    La práctica constante es clave para dominar estos temas.
                  </p>
                </div>
              </div>
            </div>
          )
        };
      
      default:
        return {
          type: 'Contenido',
          duration: '5 min',
          content: (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                Contenido en desarrollo
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Este contenido estará disponible próximamente
              </p>
            </div>
          )
        };
    }
  };

  const contentData = getContentByType(subsection.type, subsection.title);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span>{module.title}</span>
              <span>•</span>
              <span>{section.title}</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {subsection.title}
            </h1>
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{contentData.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <FileText className="w-4 h-4" />
                <span>{contentData.type}</span>
              </div>
              {subsection.completed && (
                <div className="flex items-center space-x-1 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>Completado</span>
                </div>
              )}
            </div>
          </div>
          
          {!subsection.completed && (
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Marcar como completado
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {contentData.content}
      </div>

      {/* Navigation Footer */}
      <div className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex justify-between">
          <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <span>← Anterior</span>
          </button>
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            <span>Siguiente</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionContent;