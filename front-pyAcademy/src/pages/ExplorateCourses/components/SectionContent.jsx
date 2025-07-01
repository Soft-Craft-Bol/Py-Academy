import { BookOpen, CheckCircle, Clock, FileText, PlayCircle } from 'lucide-react';

function SectionContent({ title, unit }) {
  if (!title || !unit) {
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

  const unitTitle = unit.title || 'Unidad sin nombre';
  const unitDescription = unit.description || 'Sin descripción';

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-title-lg font-bold text-gray-900 dark:text-white mb-2">
              {unitTitle}
            </h1>
            <p className="text-title-sm mt-4 text-gray-600 dark:text-gray-300">{unitDescription}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-8">
          <div className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow">
            <h2 className="text-title-md font-semibold text-gray-900 dark:text-white mb-1">
              {title.title}
            </h2>
            <p className="text-label-md my-5 text-gray-700 dark:text-gray-300">
              {title.description}
            </p>

            {title.contents?.length > 0 ? (
              <div className="space-y-2">
                <h3 className="text-label-md font-medium text-gray-800 dark:text-gray-200 mb-5">
                  Contenidos:
                </h3>
                {title.contents.map((contentItem, i) => (
                  <div key={i} className="text-label-md pl-4 border-l-4 border-blue-500">
                    {contentItem.content}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm italic text-gray-500 dark:text-gray-400">
                No hay contenido disponible.
              </p>
            )}
          </div>
        </div>
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
}

export default SectionContent;
