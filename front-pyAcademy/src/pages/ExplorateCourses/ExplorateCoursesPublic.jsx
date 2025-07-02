import { useInfiniteCourses } from '@/shared/hooks/useInfiniteCourses';
import CourseCardPublic from './components/CourseCardPublic';


function PublicCourses() {
  const { courses, loading, error, hasMore } = useInfiniteCourses();

  return (
    <section className="px-4 md:px-10 py-12 min-h-screen bg-gray-50 dark:bg-gradient-1">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Cursos Disponibles</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error al cargar los cursos: {error.message}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((courseData) => (
          <CourseCardPublic
            key={`${courseData.course.id}-${courseData.course.name}`}
            course={courseData}
          />
        ))}
      </div>

      {loading && (
        <div className="flex justify-center mt-6">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {!hasMore && courses.length > 0 && (
        <div className="text-center mt-6 text-gray-500 dark:text-gray-400">
          No hay más cursos disponibles
        </div>
      )}

      {!loading && courses.length === 0 && !error && (
        <div className="text-center mt-6 text-gray-500 dark:text-gray-400">
          No se encontraron cursos
        </div>
      )}
    </section>
  );
}

export default PublicCourses;
