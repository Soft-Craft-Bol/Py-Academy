import { useParams, useLocation } from 'react-router-dom';
import EncabezadoCurso from '@/shared/ui/molecules/EncabezadoCurso';
import SidebarCurso from '@/shared/ui/organisms/SideBarCurso';
import { VisorFile } from '@/shared/ui/organisms/VisorFile';
import { ReproductorVideo } from '@/shared/ui/organisms/ReproductorVideo';
import { useCourseUnits } from '@/shared/hooks/useCourseUnits'; // ruta según tu estructura

function CourseStudent() {
  const { id } = useParams();
  const location = useLocation();
  const { courseDetails } = location.state || {};

  const { units, loading, error } = useCourseUnits(id);

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 flex flex-col">
      <EncabezadoCurso courseData={courseDetails} />
      <div className="flex flex-1 overflow-hidden">
        <SidebarCurso />
        <main className="flex-1 bg-gray-100 dark:bg-gray-800 p-4 text-gray-500 dark:text-gray-400 overflow-hidden">
          {loading && (
            <div className="text-center w-full mt-10">
              <p className="text-blue-500">Cargando unidades...</p>
            </div>
          )}

          {error && (
            <div className="text-center w-full mt-10 text-red-500">
              Error al cargar las unidades: {error.message}
            </div>
          )}

          {!loading && !error && units.length === 0 && (
            <div className="text-center w-full mt-10">
              No hay unidades disponibles para este curso.
            </div>
          )}

          {!loading && !error && units.length > 0 && (
            <div className="flex w-full h-full gap-4">
              <div className="w-1/2 overflow-y-auto pr-4 space-y-6">
                {units.map((unit) => (
                  <UnitDisplay key={unit.id} unit={unit} />
                ))}
              </div>
              <div className="w-1/2 p-1 flex items-center justify-center">
                <ReproductorVideo />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default CourseStudent;
