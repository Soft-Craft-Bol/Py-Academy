import { BsBook } from 'react-icons/bs';
import { GiEvilBook } from 'react-icons/gi';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { NavLink, useLocation } from 'react-router-dom';

import PythonEditor from './PyEditorPage';
import { ExerciseAchievements } from './components/ExerciseAchievements';

function ExercisePage() {
  const location = useLocation();
  const data = location.state || {};
  const exerciseAchievements = data.achievements || [];

  const DescriptorElement = ({ title, descripcion, icon, testCases }) => (
    <section className="mb-8">
      <h3 className="flex items-center gap-3 text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        {icon}
        {title}
      </h3>

      {descripcion && (
        <p className="p-5 rounded-lg bg-primary-pri4 border border-primary-pri3 text-gray-900 dark:text-gray-100 leading-relaxed">
          {descripcion}
        </p>
      )}

      {testCases && testCases.length > 0 && (
        <div className="mt-5 space-y-5">
          {testCases.slice(0, 2).map((tc, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-primary-pri4 border border-primary-pri3"
            >
              <p className="font-medium text-blue-600 dark:text-blue-400">
                Entrada: <code className="bg-gray-200 dark:bg-gray-700 rounded px-1 py-0.5">{tc.inputData}</code>
              </p>
              <p className="text-green-600 dark:text-green-400 font-medium mt-1">Salida:</p>
              <pre className="whitespace-pre-wrap text-gray-900 dark:text-gray-100">{tc.expectedOutput}</pre>
            </div>
          ))}
          {testCases.length > 2 && (
            <p className="italic text-gray-800 dark:text-gray-300">
              Y otros {testCases.length - 2} casos de prueba más...
            </p>
          )}
        </div>
      )}
    </section>
  );

  return (
    <div className="min-h-screen bg-gradient-to-tr from-primary-pri2 to-primary-pri4 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between border-b border-primary-pri3 py-5 px-6 sticky top-0 bg-primary-pri4 z-20">
        <NavLink
          to="/student/exercises"
          className="flex items-center gap-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition font-semibold"
        >
          <IoIosArrowRoundBack size={24} />
          Volver a Ejercicios
        </NavLink>

        <div className="flex items-center gap-5 mt-3 sm:mt-0">
          <h1
            className="text-2xl font-bold truncate max-w-xs"
            title={data.title}
          >
            {data.title || 'Ejercicio'}
          </h1>
          <span className="bg-green-600 text-white rounded-md px-4 py-1 font-semibold select-none">
            {data.difficultyLevel || 'N/A'}
          </span>
        </div>
      </header>

      {/* Contenedor principal con ancho máximo y padding */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Logros */}
        <ExerciseAchievements achievements={exerciseAchievements} />

        {/* Descripción y casos */}
        <DescriptorElement
          title="Descripción"
          descripcion={data.description}
          icon={<BsBook size={24} />}
        />
        <DescriptorElement
          title="Casos de Prueba"
          testCases={data.testCases}
          icon={<GiEvilBook size={24} />}
        />

        {/* Editor abajo */}
        <section className="mt-12 shadow-lg rounded-xl overflow-hidden border border-primary-pri3">
          <PythonEditor title={false} testCases={data.testCases} />
        </section>
      </main>
    </div>
  );
}

export default ExercisePage;
