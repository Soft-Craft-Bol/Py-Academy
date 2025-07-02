//React
import { useParams, useNavigate } from 'react-router-dom';

//Components
import Button from '@/shared/ui/atoms/Button';

export const UnitCard = ({ unit }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const addExercise = () => {
    console.log('El unit es', unit);
    navigate(`/teacher/course/${id}/unit/${unit.unitId}/create-practice`);
  };

  return (
    <div className="p-6 bg-white dark:bg-primary-pri4 rounded-lg mt-10 hover:scale-[1.02] transition-scale duration-300">
      <div className="flex justify-between">
        <h2 className="font-semibold text-title-sm">{unit.title}</h2>
        <span className="text-label-md">✔</span>
      </div>
      <p className="text-gray-500 dark:text-gray-300 my-4">{unit.description}</p>
      <div className="flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <span>📚 5 lecciones</span>
          <span>⏱️ 8 horas</span>
          <span>📝 2 ejercicios</span>
        </div>
        <Button onClick={addExercise}>{'Agregar Ejercicios'}</Button>
      </div>
    </div>
  );
};
