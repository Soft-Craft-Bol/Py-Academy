import { useNavigate } from 'react-router-dom';

import Select from '../../shared/ui/atoms/Select';

//Data
import { exercises } from "./dataTest";

const ExercisesPage = () => {
  const navigation = useNavigate();

  return (
    <div>
      <header>
        <div>
          <h1 className="text-title-md font-bold">Ejercicios de Programacion</h1>
          {/* <div>Barra de progreso</div> */}
          <div className="flex gap-5 my-10">
            <Select placeholder={'Dificultades'} />
            <Select placeholder={'Tema'} />
          </div>
        </div>
      </header>

      <div>
        {exercises &&
          exercises.map((exercise, key) => {
            return <ExcerciseCard key={key} exercise={exercise} btnText={'Resolver'} />;
          })}
      </div>
    </div>
  );
}
export default ExercisesPage;
