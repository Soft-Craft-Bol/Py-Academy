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
        <p className="bg-white p-5 rounded-lg dark:bg-primary-pri4 border dark:border-primary-pri3 text-gray-900 dark:text-gray-100 leading-relaxed">
          {descripcion}
        </p>
      )}

      {testCases && testCases.length > 0 && (
        <div className="mt-5 space-y-5">
          {testCases.slice(0, 2).map((tc, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-lg dark:bg-primary-pri4 border dark:border-primary-pri3"
            >
              <p className="font-medium text-blue-600 dark:text-blue-400">
                Entrada:{' '}
                <code className="bg-gray-200 dark:bg-gray-700 rounded px-1 py-0.5">
                  {tc.inputData}
                </code>
              </p>

              <p className="text-green-600 dark:text-green-400 font-medium mt-1">
                Salida:{' '}
                <code className="bg-gray-200 dark:bg-gray-700 rounded px-1 py-0.5">
                  {tc.expectedOutput}
                </code>
              </p>
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
    <div className="-m-8 min-h-screen">
      <header className="bg-white flex justify-between items-center dark:bg-primary-pri4 py-5 px-4 border-y">
        <div className="flex gap-7">
          <NavLink
            to={'/student/exercises'}
            className={'flex gap-3 items-center hover:text-blue-400'}
          >
            {<IoIosArrowRoundBack className="text-title-lg" />}Volver a Ejercicios
          </NavLink>
          <p>|</p>
          <h1 className="text-title-md font-semibold">{data.title}</h1>
        </div>
        <p className="bg-green-500 p-1 rounded-md h-[90%]">{data.difficultyLevel}</p>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <ExerciseAchievements achievements={exerciseAchievements} />

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

        <PythonEditor title={false} testCases={data.testCases} />
      </main>
    </div>
  );
}

export default ExercisePage;
