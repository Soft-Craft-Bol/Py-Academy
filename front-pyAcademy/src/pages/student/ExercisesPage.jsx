import { useNavigate } from 'react-router-dom';
import Select from '../../shared/ui/atoms/Select';
import { useState } from 'react';
//Data
import { exercisesExamples } from './dataTest';
import { ExcerciseCard } from './components/ExcerciseCard';
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import { useEffect } from 'react';
import { getExercises } from '@/shared/api/api';

const getGeneralAchievements = (exercises) => {
  let total = 0;
  let completed = 0;
  exercises.forEach((ex) => {
    ex.achievements?.forEach((a) => {
      total++;
      if (a.completed) completed++;
    });
  });
  return [
    {
      label: `Logros totales: ${completed} de ${total}`,
      completed: completed === total && total > 0,
    },
  ];
};

const ExercisesPage = () => {
  const navigation = useNavigate();
  const [exercises, setExercises] = useState(exercisesExamples);
  const [resumenLogros, setResumenLogros] = useState();

  useEffect(() => {
    async function fetchExercises() {
      const res = await getExercises();
      console.log('El res es', res);
      setExercises((prev) => {
        const ids = new Set(prev.map((e) => e.id));
        const nuevos = res.data.filter((e) => !ids.has(e.id));
        return [...prev, ...nuevos];
      });
      const generalAchievements = getGeneralAchievements(res.data);
      setResumenLogros(generalAchievements[0]?.label);
    }
    fetchExercises();
  }, []);

  return (
    <div>
      <header>
        <div>
          <h1 className="text-title-md font-bold">Ejercicios de Programacion</h1>
          <div className="text-sm text-gray-700 dark:text-gray-200 font-semibold my-2">
            {resumenLogros}
          </div>
          <div className="flex gap-5 my-10">
            <Select placeholder={'Dificultades'} />
            <Select placeholder={'Tema'} />
          </div>
        </div>
      </header>

      <div>
        {exercises &&
          exercises.map((exercise, key) => (
            <div key={key} className="mb-8">
              <ExcerciseCard exercise={exercise} btnText={'Resolver'} />
              <div className="flex flex-wrap gap-2 mt-2">
                {exercise.achievements?.map((ach, idx) => (
                  <span
                    key={idx}
                    title={ach.label}
                    className="flex items-center gap-1 text-xs px-2 py-1 rounded-full border shadow-sm bg-white dark:bg-primary-pri4"
                  >
                    {ach.completed ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaRegCircle className="text-gray-400" />
                    )}
                    <span
                      className={
                        ach.completed
                          ? 'text-green-700 dark:text-green-200 font-semibold'
                          : 'text-gray-500 dark:text-gray-300'
                      }
                    >
                      {ach.label}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default ExercisesPage;
