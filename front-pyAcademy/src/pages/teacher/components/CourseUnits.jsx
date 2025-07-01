//React
import { data, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

//Components
import Button from '@/shared/ui/atoms/Button';
import { UnitCard } from './UnitCard';

//Api
import { getCourseUnits } from '@/shared/api/api';

export const CourseUnits = () => {
  const { id: courseId } = useParams();
  const navigate = useNavigate();
  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['courseUnits', courseId],
    queryFn: () => getCourseUnits(courseId),
  });

  const units = response?.data || response || [];

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Unidades del Curso</h2>
        <Button
          onClick={() =>
            navigate(`/teacher/course/${courseId}/add-units`, { state: { unitsTest: units } })
          }
        >
          Agregar Unidades
        </Button>
      </div>

      <section>{units && units.map((unit, key) => <UnitCard key={key} unit={unit} />)}</section>
    </>
  );
};
