import { useParams, useLocation } from 'react-router-dom';
import EncabezadoCurso from '@/shared/ui/molecules/EncabezadoCurso';
import SidebarCurso from '@/shared/ui/organisms/SideBarCurso';
import { ReproductorVideo } from '@/shared/ui/organisms/ReproductorVideo';
import { useCourseUnits } from '@/shared/hooks/useCourseUnits';
import UnitDisplay from '@/shared/ui/molecules/UnitDisplay';

function CourseStudent({ units }) {
  const { id } = useParams();
  const location = useLocation();
  const courseDetails = sessionStorage.getItem('Course');

  // const { units, loading, error } = useCourseUnits(id);

  console.log('Los courses details son', courseDetails);
  console.log('Las unidades son', units);

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 flex flex-col">
      <EncabezadoCurso courseData={courseDetails} />
      <div className="flex flex-1 overflow-hidden">
        <SidebarCurso />
        <main className="flex-1 bg-gray-100 dark:bg-gray-800 p-4 text-gray-500 dark:text-gray-400 overflow-hidden">
          {/* {loading && (
            <div className="text-center w-full mt-10">
              <p className="text-blue-500">Cargando unidades...</p>
            </div>
          )} */}

          {/* {error && (
            <div className="text-center w-full mt-10 text-red-500">
              Error al cargar las unidades: {error.message}
            </div>
          )} */}

          {units.length === 0 && (
            <div className="text-center w-full mt-10">
              No hay unidades disponibles para este curso.
            </div>
          )}

          {units.length > 0 && (
            <div className="flex w-full h-full gap-4">
              <div className="w-full overflow-y-auto pr-4 space-y-6">
                {units.map((unit, index) => (
                  <UnitDisplay key={unit.id || unit.unitId || index} unit={unit} />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default CourseStudent;
