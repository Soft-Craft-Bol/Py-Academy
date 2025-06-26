//React
import { BsBook } from 'react-icons/bs';
import { GiBurningBook, GiEvilBook } from 'react-icons/gi';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { NavLink, useLocation } from 'react-router-dom';

//Componentes
import PythonEditor from './PyEditorPage';
import { ExerciseAchievements } from './components/ExerciseAchievements';

function ExercisePage() {
  const location = useLocation();
  const data = location.state || {};

  const exerciseAchievements = data.achievements || [];

  const DescriptorElement = ({ title, descripcion, icon, testCases }) => {
    return (
      <div>
        <h3 className="flex gap-2 items-center">
          {icon && icon}
          {title}
        </h3>
        {descripcion && <p className="p-3 bg-primary-pri4 border rounded-md my-4">{descripcion}</p>}
        {testCases && testCases.length > 0 && (
          <>
            {testCases[0] && (
              <p className="p-3 bg-primary-pri4 border rounded-md my-4">
                <span className="text-blue-400">Entrada: {testCases[0].inputData}</span>
                <br />
                <span className="text-green-500">Salida: </span>
                {testCases[0].expectedOutput}
              </p>
            )}
            {testCases[1] && (
              <p className="p-3 bg-primary-pri4 border rounded-md my-4">
                <span className="text-blue-400">Entrada: {testCases[1].inputData}</span>
                <br />
                <span className="text-green-500">Salida: </span>
                {testCases[1].expectedOutput}
              </p>
            )}
            {testCases.length > 2 && (
              <p className="text-primary-pri1">
                Y otros {testCases.length - 2} casos de prueba más...
              </p>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="-m-8">
      <header className="flex justify-between items-center dark:bg-primary-pri4 py-5 px-4 border-t">
        <div className="flex gap-7">
          <NavLink
            to={'/student/exercises'}
            className={'flex gap-3 items-center hover:text-blue-400'}
          >
            {<IoIosArrowRoundBack className="text-title-lg" />}Volver a Ejercicios
          </NavLink>
          <p>|</p>
          <h1 className="text-title-sm font-semibold">{data.title}</h1>
        </div>
        <p className="bg-green-500 p-1 rounded-md h-[90%]">{data.difficultyLevel}</p>
      </header>
      <ExerciseAchievements achievements={exerciseAchievements} />
      <div className="flex">
        <section className="dark:bg-gradient-2 w-[40%] h-screen p-5 sticky top-0">
          <DescriptorElement
            title={'Descripción'}
            descripcion={data.description}
            icon={<BsBook />}
          />

          <DescriptorElement
            title={'Casos de Prueba'}
            testCases={data.testCases}
            icon={<GiEvilBook className="text-label-lg" />}
          />
        </section>
        <section className="w-[60%]">
          <PythonEditor title={false} testCases={data.testCases} />
        </section>
      </div>
    </div>
  );
}

export default ExercisePage;
